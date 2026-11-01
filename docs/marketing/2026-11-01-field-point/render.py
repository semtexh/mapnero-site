"""Compose real iPhone demo screens. Never draw replacement application UI."""
from pathlib import Path
import argparse
import hashlib
import json
import math
import shutil
import subprocess
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 24
BG, GOLD, WHITE, MUTED = (5, 20, 30), (234, 177, 61), (249, 246, 235), (164, 183, 195)
BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
REG = '/System/Library/Fonts/Supplemental/Arial.ttf'


def font(n, bold=True):
    return ImageFont.truetype(BOLD if bold else REG, n)


def center(d, text, y, size=52, color=WHITE, bold=True):
    for line in text.split('\n'):
        f = font(size, bold)
        width = d.textlength(line, font=f)
        assert width < 960, (line, width)
        d.text(((W-width)/2, y), line, fill=color, font=f)
        y += size + 15


def main():
    p = argparse.ArgumentParser()
    p.add_argument('output', type=Path)
    p.add_argument('--site', type=Path, required=True)
    p.add_argument('--capture-dir', type=Path, required=True)
    p.add_argument('--ffmpeg', type=Path, required=True)
    p.add_argument('--frames-only', action='store_true')
    a = p.parse_args()
    out = a.output
    out.mkdir(parents=True, exist_ok=True)
    sources = {
        'map': a.capture_dir/'offline_map.png',
        'point': a.capture_dir/'point_detail.png',
        'layers': a.site/'assets/guides/screenshots/apple/en/pins-layers.png',
        'icon': a.site/'assets/mapnero-brand-icon.png',
    }
    source_images = {k: Image.open(v).convert('RGB') for k, v in sources.items() if k != 'icon'}
    icon = Image.open(sources['icon']).convert('RGBA')
    base = Image.new('RGB', (W,H), BG)
    d = ImageDraw.Draw(base)
    for j in range(37):
        pts = [(x, int(330+j*47+30*math.sin(x/155+j*.18)+14*math.sin(x/70+j))) for x in range(-20,W+20,9)]
        d.line(pts, fill=(21,41,47), width=2)

    def brand(im, step):
        mark = icon.resize((80,80), Image.Resampling.LANCZOS)
        im.paste(mark,(75,76),mark)
        dd = ImageDraw.Draw(im)
        f = font(58)
        dd.text((177,86),'Map',font=f,fill=WHITE)
        dd.text((177+dd.textlength('Map',font=f),86),'Nero',font=f,fill=GOLD)
        center(dd, 'FIELD NOTES  /  '+step, 186,25,MUTED)

    def shot(im,key,box=None,width=600,y=480):
        img = source_images[key]
        if box:
            assert 0 <= box[0] < box[2] <= img.width and 0 <= box[1] < box[3] <= img.height
            img = img.crop(box)
        h = round(img.height*width/img.width)
        assert y+h <= 1650, (key,y,h)
        img = img.resize((width,h),Image.Resampling.LANCZOS)
        x = (W-width)//2
        dd=ImageDraw.Draw(im)
        dd.rounded_rectangle((x-9,y-9,x+width+9,y+h+9),radius=35,fill=(0,0,0),outline=GOLD,width=3)
        mask=Image.new('L',img.size)
        ImageDraw.Draw(mask).rounded_rectangle((0,0,width,h),radius=27,fill=255)
        im.paste(img,(x,y),mask)

    frames=[]
    labels=['START','01','02','03','04','05','TRY IT']
    for i in range(7):
        im=base.copy(); brand(im,labels[i]); dd=ImageDraw.Draw(im)
        if i==0:
            center(dd,'SAVE THE PLACE.\nKEEP THE CONTEXT.',280,65)
            shot(im,'point',(0,210,1206,1630),width=850,y=520)
            center(dd,'A name. A field note. A place to return to.',1590,31,MUTED,False)
        elif i==1:
            center(dd,'CHOOSE A LAYER.',290,65)
            center(dd,'VISIBLE + WRITABLE',390,40,GOLD)
            shot(im,'layers',(0,200,1206,1020),width=900,y=580)
            center(dd,'Select the destination before adding a pin.',1390,34,WHITE,False)
        elif i==2:
            center(dd,'ADD AND NAME\nYOUR POINT.',280,65)
            shot(im,'map',(120,1980,1100,2390),width=900,y=590)
            shot(im,'point',(0,210,1206,730),width=900,y=1060)
            center(dd,'Add Pin  >  Name  >  Save',1540,39,GOLD)
        elif i==3:
            center(dd,'ADD YOUR\nFIELD NOTE.',280,65)
            shot(im,'point',(0,940,1206,1610),width=900,y=600)
            center(dd,'Open the saved point. Use Information.',1300,35,WHITE,False)
            center(dd,'Use a short, specific observation.',1395,33,MUTED,False)
        elif i==4:
            center(dd,'REOPEN IT.\nCHECK THE DETAILS.',280,62)
            shot(im,'point',(0,210,1206,1630),width=820,y=520)
            center(dd,'Close the card, reopen the point,\nand check the name and note.',1540,34,WHITE,False)
        elif i==5:
            center(dd,'BRING IT BACK\nONTO THE MAP.',280,62)
            shot(im,'point',(0,210,1206,940),width=900,y=620)
            center(dd,'Tap Show on the saved point.',1340,43,GOLD)
        else:
            mark=icon.resize((220,220),Image.Resampling.LANCZOS)
            im.paste(mark,(430,470),mark);dd=ImageDraw.Draw(im)
            center(dd,'ONE MAP.\nMANY WAYS.',810,80)
            center(dd,'Try it with practice data.',1100,42,MUTED,False)
            dd.rounded_rectangle((170,1240,910,1370),radius=58,fill=GOLD)
            center(dd,'mapnero.com',1270,56,BG)
        dd=ImageDraw.Draw(im)
        if i<6:
            center(dd,'Real iPhone screens · demo data',1690,27,MUTED,False)
        center(dd,'Controls and limits vary by platform and version.',1750,25,MUTED,False)
        center(dd,'mapnero.com',1810,31,GOLD)
        im.save(out/f'scene-{i+1}.jpg',quality=95)
        frames.append(im)
    frames[0].save(out/'cover.jpg',quality=95)
    sheet=Image.new('RGB',(7*270,480),BG)
    for i,img in enumerate(frames):
        sheet.paste(img.resize((270,480)),(270*i,0))
    sheet.save(out/'storyboard.jpg',quality=95)
    if a.frames_only:
        return
    voice=out/'narration-american-english.wav'
    with wave.open(str(voice)) as f:
        voice_seconds=f.getnframes()/f.getframerate()
    duration=32.0
    # Timing follows the pauses in this saved OmniVoice take, with room to read.
    assert abs(voice_seconds-21.32)<.05, ('Review timing for a different voice take',voice_seconds)
    tempo=0.72
    rate=48000
    t=np.arange(round(duration*rate))/rate
    env=np.minimum(1,t/1.5)*np.minimum(1,(duration-t)/2)
    mono=(np.sin(2*np.pi*110*t)+.5*np.sin(2*np.pi*164.8138*t)+.3*np.sin(2*np.pi*220*t))*.012*env
    pcm=np.int16(np.column_stack((mono,mono*.97))*32767)
    music=out/'original-ambient-bed.wav'
    with wave.open(str(music),'wb') as f:
        f.setnchannels(2);f.setsampwidth(2);f.setframerate(rate);f.writeframes(pcm.tobytes())
    dest=out/'mapnero-save-a-field-point-en.mp4'
    audio=f'[1:a]atempo={tempo:.6f},highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=7,adelay=250|250,apad[v];[2:a]volume=0.5[m];[v][m]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.89:level=false[a]'
    cmd=[str(a.ffmpeg),'-y','-v','error','-threads','1','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-i',str(voice),'-i',str(music),'-filter_complex_threads','1','-filter_complex',audio,'-map','0:v','-map','[a]','-t',str(duration),'-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-threads','1','-ar','48000','-ac','2','-c:a','aac','-b:a','192k','-movflags','+faststart',str(dest)]
    cuts=[0,4.1,7.5,11.1,15.4,19.0,22.3,duration]
    with (out/'encode.log').open('w') as log:
        proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=log)
        for n in range(round(duration*FPS)):
            time=n/FPS
            i=next(i for i in range(7) if cuts[i]<=time<cuts[i+1])
            im=frames[i].copy();dd=ImageDraw.Draw(im)
            dd.rectangle((80,1870,1000,1876),fill=(37,55,62))
            dd.rectangle((80,1870,80+int(920*time/duration),1876),fill=GOLD)
            local=time-cuts[i]
            if local<.18:
                im=Image.blend(Image.new('RGB',(W,H),BG),im,.45+.55*local/.18)
            proc.stdin.write(im.tobytes())
        proc.stdin.close()
        assert proc.wait()==0, 'Encode failed'
    with (out/'full-decode.log').open('w') as log:
        subprocess.run([str(a.ffmpeg),'-v','error','-threads','1','-i',str(dest),'-f','null','-'],check=True,stderr=log)
    manifest=dict(file=str(dest),seconds=duration,width=W,height=H,fps=FPS,
        codecs='H264/AAC',source_hashes={str(v):hashlib.sha256(v.read_bytes()).hexdigest() for v in sources.values()},
        sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),voice_seconds=voice_seconds,voice_tempo=tempo,
        cuts=cuts,full_decode_exit=0,footage='Existing real iPhone demo screenshots, reframed only; editorial guide, not a new live save/reopen recording.',
        source_check='PinCardView Save, FeatureDetailCard notes/Done/Show and current pins-layers guide reviewed.',
        limitations='No fresh physical-device persistence acceptance, navigation guarantee, team tracking or release claim.',
        publication='Prepared locally; not uploaded or published')
    (out/'verification.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(manifest),flush=True)


if __name__=='__main__':
    main()
