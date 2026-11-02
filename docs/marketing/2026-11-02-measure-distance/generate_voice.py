"""Submit once to the existing local OmniVoice voice-design service."""
from pathlib import Path
import argparse
import hashlib
import json
import urllib.request
import urllib.parse
import wave

parser = argparse.ArgumentParser()
parser.add_argument('output', type=Path)
parser.add_argument('--base', default='http://127.0.0.1:8767')
args = parser.parse_args()
assert urllib.parse.urlparse(args.base).hostname in ('127.0.0.1', 'localhost')
args.output.mkdir(parents=True, exist_ok=True)
receipt = args.output / 'voice-request.json'
text = Path(__file__).with_name('narration.txt').read_text().strip()
request = dict(text=text, lang='English', ns=40, gs=2.5, dn=True, sp=1.0,
               du=None, pp=True, po=True, param_9='Male / 男',
               param_10='Young Adult / 青年', param_11='Moderate Pitch / 中音调',
               param_12='Auto', param_13='American Accent / 美式口音', param_14='Auto')
if receipt.exists():
    submitted = json.loads(receipt.read_text())['response']
else:
    req = urllib.request.Request(args.base + '/gradio_api/call/v2/_design_fn',
                                 data=json.dumps(request).encode(),
                                 headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=30) as response:
        submitted = json.load(response)
    receipt.write_text(json.dumps(dict(request=request, response=submitted), indent=2))
print('Following local voice event', submitted['event_id'], flush=True)
result = None
with urllib.request.urlopen(args.base + '/gradio_api/call/_design_fn/' + submitted['event_id'], timeout=60) as response:
    event = ''
    for raw in response:
        line = raw.decode().strip()
        if line.startswith('event:'):
            event = line.split(':', 1)[1].strip()
        if line.startswith('data:'):
            data = json.loads(line.split(':', 1)[1].strip())
            if event == 'error':
                raise RuntimeError(str(data))
            if event == 'complete':
                result = data
                break
assert result and result[0], result
url = result[0]['url']
assert urllib.parse.urlparse(url).hostname in ('127.0.0.1', 'localhost')
destination = args.output / 'narration-american-english.wav'
with urllib.request.urlopen(url, timeout=30) as response:
    destination.write_bytes(response.read())
with wave.open(str(destination)) as audio:
    duration = audio.getnframes() / audio.getframerate()
    assert audio.getnchannels() == 1 and audio.getframerate() >= 16000
    assert 8 < duration < 35
manifest = dict(engine='Local OmniVoice', accent='American', gender='male',
                reference_audio=None, seconds=duration,
                sha256=hashlib.sha256(destination.read_bytes()).hexdigest(), status=result[1])
(args.output / 'voice-verification.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps(manifest), flush=True)
