#!/usr/bin/env python3
"""Notify IndexNow of already-published MapNero HTML changes. No account API key.

The public ownership proof in indexnow-key.txt is intentionally hosted on the
website. Run only after deployment, passing the changed public HTML paths.
"""
import argparse
import json
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
HOST = 'www.mapnero.com'
BASE = 'https://' + HOST + '/'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('paths', nargs='+', help='Changed HTML file paths, e.g. index.html geotiff-maps.html')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    paths = list(dict.fromkeys(args.paths))
    for path in paths:
        if '/' in path or not path.endswith('.html') or not (ROOT / path).is_file():
            parser.error('Pass existing root-level HTML filenames only')
    key = (ROOT / 'indexnow-key.txt').read_text().strip()
    payload = {'host': HOST, 'key': key, 'keyLocation': BASE + 'indexnow-key.txt',
               'urlList': [BASE if path == 'index.html' else BASE + path for path in paths]}
    if args.dry_run:
        print(json.dumps({'urlList': payload['urlList'], 'dryRun': True}, indent=2))
        return
    # Refuse to notify pages or ownership proof that do not match the deployment.
    for path in ['indexnow-key.txt'] + paths:
        url = BASE if path == 'index.html' else BASE + path
        with urlopen(Request(url, headers={'User-Agent': 'MapNero-Deployment-Check/1.0'}), timeout=30) as response:
            if response.read() != (ROOT / path).read_bytes():
                raise SystemExit('Live content differs from local file: ' + path)
    request = Request('https://api.indexnow.org/indexnow',
                      data=json.dumps(payload).encode(),
                      headers={'Content-Type': 'application/json; charset=utf-8'}, method='POST')
    try:
        with urlopen(request, timeout=45) as response:
            status, body = response.status, response.read().decode()
    except HTTPError as exc:
        raise SystemExit('IndexNow HTTP ' + str(exc.code) + ': ' + exc.read().decode()) from exc
    print(json.dumps({'status': status, 'urls': payload['urlList'], 'response': body,
                      'meaning': 'Received; indexing is not guaranteed.' if status == 200 else
                                 'Received; ownership validation pending.' if status == 202 else 'Inspect response.'}, indent=2))

if __name__ == '__main__':
    main()
