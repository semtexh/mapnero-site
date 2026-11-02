"""Compose a short layer-check guide from unchanged real iPhone screenshots."""
from pathlib import Path
import argparse, hashlib, json, subprocess, wave
from PIL import Image, ImageDraw, ImageFont
import numpy as np

W,H,FPS=1080,1920,24
BG,GOLD,WHITE,MUTED=(5,20,30),(234,177,61),(249,246,235),(164,183,195)
def font(n): return ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf',n)
def lines(d,text,y,size=60,color=WHITE):
    for line in text.split('\n'):
        f=font(size); width=d.textlength(line,font=f)
        assert width<970,(line,width)
        d.text(((W-width)/2,y),line,font=f,fill=color); y+=size+18

def main():
    p=argparse.ArgumentParser();p.add_argument('output',type=Path);p.add_argument('--site',type=Path,required=True);p.add_argument('--captures',type=Path,required=True);p.add_argument('--frames-only',action='store_true');p.add_argument('--ffmpeg',type=Path,required=True);a=p.parse_args();o=a.output;o.mkdir(parents=True,exist_ok=True)
    sources={'layers':a.site/'assets/guides/screenshots/apple/en/pins-layers.png','map':a.captures/'offline_map.png','icon':a.site/'assets/mapnero-brand-icon.png'}
    icon=Image.open(sources['icon']).convert('RGBA');layer=Image.open(sources['layers']).convert('RGB');mp=Image.open(sources['map']).convert('RGB')
    frames=[]
    for i in range(4):
        im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
        mark=icon.resize((78,78),Image.Resampling.LANCZOS);im.paste(mark,(66,65),mark);d.text((168,76),'Map',font=font(56),fill=WHITE);x=168+d.textlength('Map',font=font(56));d.text((x,76),'Nero',font=font(56),fill=GOLD)
        lines(d,'LAYER CHECK  /  iPHONE GUIDE',190,25,MUTED)
        if i<3:
            titles=["CAN'T ADD A PIN?",'CHECK THE LAYER.','TRY ADD PIN AGAIN.'];lines(d,titles[i],310,64)
            if i<2:shot=layer.crop((0,200,1206,1020))
            else:shot=mp.crop((120,1980,1100,2390))
            sw=940;sh=round(shot.height*sw/shot.width);shot=shot.resize((sw,sh),Image.Resampling.LANCZOS);sy=560
            d.rounded_rectangle((64,sy-6,1016,sy+sh+6),radius=18,outline=GOLD,width=3);im.paste(shot,(70,sy))
            if i==0:lines(d,'First, check the active layer.',1330,42,GOLD)
            elif i==1:
                lines(d,'VISIBLE + WRITABLE',1310,46,GOLD)
                lines(d,'Hidden, locked or web-service layer?\nChoose a writable destination.',1430,35,MUTED)
            else:lines(d,'Use a visible, writable layer.\nThen try adding your point.',1220,43,GOLD)
            lines(d,'Real iPhone guide screens.',1680,27,MUTED)
        else:
            mark=icon.resize((230,230),Image.Resampling.LANCZOS);im.paste(mark,(425,470),mark)
            lines(d,'NEED THE STEPS?',850,66)
            lines(d,'mapnero.com',1100,78,GOLD)
            lines(d,'Open the pins and layers guide.',1290,36,MUTED)
        lines(d,'Controls vary by platform and version.',1770,28,MUTED)
        im.save(o/f'scene-{i+1}.jpg',quality=94);frames.append(im)
    board=Image.new('RGB',(W,H),BG)
    for i,im in enumerate(frames):board.paste(im.resize((540,960)),((i%2)*540,(i//2)*960))
    board.save(o/'storyboard.jpg',quality=92);frames[0].save(o/'cover.jpg',quality=94)
    if a.frames_only:return
    voice=o/'narration-american-english.wav'
    with wave.open(str(voice)) as w: vd=w.getnframes()/w.getframerate()
    tempo=0.85;vd=vd/tempo
    duration=max(18,vd+1.2);assert duration<25,vd
    cuts=[0,3.0,0.80*vd,vd+0.15,duration];assert all(x<y for x,y in zip(cuts,cuts[1:]))
    dest=o/'mapnero-check-active-layer-en.mp4';log=o/'encode.log'
    cmd=[str(a.ffmpeg),'-y','-v','error','-threads','1','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-i',str(voice),'-filter_complex_threads','1','-af',f'atempo={tempo},loudnorm=I=-16:TP=-1.5:LRA=7,apad','-t',str(duration),'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-threads','1','-c:a','aac','-b:a','160k','-ar','48000','-movflags','+faststart',str(dest)]
    with log.open('w') as lf:
        proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=lf)
        for n in range(round(duration*FPS)):
            t=n/FPS;i=next(k for k in range(4) if cuts[k]<=t<cuts[k+1]);proc.stdin.write(np.asarray(frames[i]).tobytes())
        proc.stdin.close();assert proc.wait()==0,log.read_text()
    subprocess.run([str(a.ffmpeg),'-v','error','-i',str(dest),'-f','null','-'],check=True,stderr=(o/'decode.log').open('w'))
    manifest={'file':str(dest),'seconds':duration,'voice_seconds':vd,'cuts':cuts,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'sources':{k:{'path':str(v),'sha256':hashlib.sha256(v.read_bytes()).hexdigest()} for k,v in sources.items()},'fresh_device_test':False,'uploaded':False}
    (o/'render-verification.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps(manifest),flush=True)
if __name__=='__main__':main()
