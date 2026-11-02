"""Render a result-first distance guide from an unchanged iPhone capture."""
from pathlib import Path
import argparse, hashlib, json, subprocess, wave
from PIL import Image, ImageDraw, ImageFont
import numpy as np
W,H,FPS=1080,1920,24
BG,GOLD,WHITE,MUTED=(5,20,30),(234,177,61),(249,246,235),(164,183,195)
def font(n):return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',n)
def text(d,s,y,size=54,color=WHITE):
 for line in s.split('\n'):
  f=font(size);width=d.textlength(line,font=f);assert width<970,(line,width)
  d.text(((W-width)/2,y),line,font=f,fill=color);y+=size+16
p=argparse.ArgumentParser();p.add_argument('output',type=Path);p.add_argument('--site',type=Path,required=True);p.add_argument('--ffmpeg',type=Path,required=True);a=p.parse_args();o=a.output;o.mkdir(parents=True,exist_ok=True)
source=a.site/'assets/guides/screenshots/apple/en/measure-cogo-buffer.png';brand=a.site/'assets/mapnero-brand-icon.png'
shot=Image.open(source).convert('RGB');icon=Image.open(brand).convert('RGBA');frames=[]
for i in range(3):
 im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im);mark=icon.resize((78,78),Image.Resampling.LANCZOS);im.paste(mark,(66,60),mark)
 d.text((168,70),'Map',font=font(56),fill=WHITE);d.text((168+d.textlength('Map',font=font(56)),70),'Nero',font=font(56),fill=GOLD)
 text(d,'DISTANCE  /  iPHONE GUIDE',180,27,MUTED)
 if i==0:
  text(d,'371 m ON THE MAP',290,70,GOLD)
  # Full-width crop includes the original line, result panel and MapLibre mark.
  crop=shot.crop((0,800,1206,2622));crop.thumbnail((930,1200),Image.Resampling.LANCZOS);im.paste(crop,((W-crop.width)//2,435))
  text(d,'Read the distance as you measure.',1660,38)
 elif i==1:
  text(d,'MORE → MEASURE',290,62,GOLD)
  small=shot.copy();small.thumbnail((620,1220),Image.Resampling.LANCZOS);im.paste(small,((W-small.width)//2,430))
  text(d,'Place points on the map.\nRead the live distance.',1660,39)
 else:
  text(d,'MEASURE ON YOUR MAP',340,62)
  mark=icon.resize((250,250),Image.Resampling.LANCZOS);im.paste(mark,(415,610),mark)
  text(d,'mapnero.com',1030,82,GOLD)
  text(d,'Guides → Apple → Measure',1240,39)
  text(d,'Map measurement.\nNot a surveyed ground distance.',1450,36,MUTED)
 text(d,'Existing iPhone guide screen.\nControls vary by platform and version.',1800,26,MUTED)
 im.save(o/f'scene-{i+1}.jpg',quality=94);frames.append(im)
board=Image.new('RGB',(1080,640),BG)
for i,im in enumerate(frames):board.paste(im.resize((360,640)),(i*360,0))
board.save(o/'storyboard.jpg',quality=94);frames[0].save(o/'cover.jpg',quality=94)
with wave.open(str(o/'narration-american-english.wav'))as f:voice=f.getnframes()/f.getframerate()
tempo=0.85; voice=voice/tempo
duration=max(15,voice+1);assert duration<24,voice
cuts=[0,3.2,max(10.5,voice-2.5),duration];assert all(x<y for x,y in zip(cuts,cuts[1:]))
dest=o/'mapnero-measure-distance-en.mp4'
cmd=[str(a.ffmpeg),'-y','-v','error','-threads','1','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-i',str(o/'narration-american-english.wav'),'-filter_complex_threads','1','-af',f'atempo={tempo},loudnorm=I=-16:TP=-1.5:LRA=7,apad','-t',str(duration),'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-threads','1','-c:a','aac','-b:a','160k','-ar','48000','-movflags','+faststart',str(dest)]
with (o/'encode.log').open('w')as log:
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=log)
 try:
  for n in range(round(duration*FPS)):
   t=n/FPS;i=next(k for k in range(3)if cuts[k]<=t<cuts[k+1]);proc.stdin.write(np.asarray(frames[i]).tobytes())
 finally:proc.stdin.close()
 assert proc.wait()==0
subprocess.run([str(a.ffmpeg),'-v','error','-i',str(dest),'-f','null','-'],check=True,stderr=(o/'decode.log').open('w'))
manifest={'file':str(dest),'seconds':duration,'voice_seconds':voice,'cuts':cuts,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'source':str(source),'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'fresh_device_test':False,'published':False}
(o/'render-verification.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(manifest),flush=True)
