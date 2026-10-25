#!/usr/bin/env python3
"""Build MapNero's original, fictional, openly reusable GeoPDF practice map."""
from pathlib import Path
from io import BytesIO
import math
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DictionaryObject, NameObject, ArrayObject, FloatObject, NumberObject, TextStringObject

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'downloads/mapnero-practice-map.pdf'
OUT.parent.mkdir(exist_ok=True)
buf = BytesIO()
c = canvas.Canvas(buf, pagesize=(720, 900), invariant=1, pageCompression=1)
c.setTitle('MapNero Practice Island - fictional GeoPDF training map')
c.setAuthor('The Nero Labs / MapNero')
c.setSubject('Original fictional training map. CC0. WGS84 / EPSG:4326. Not for navigation.')
navy, gold, white = '#071724', '#edb64e', '#f7f4eb'
def fill(color): c.setFillColor(HexColor(color))
def stroke(color): c.setStrokeColor(HexColor(color))
def text(x,y,s,size=12,color=white,font='Helvetica'):
    fill(color); c.setFont(font,size); c.drawString(x,y,s)
fill(navy); c.rect(0,0,720,900,fill=1,stroke=0)
c.drawImage(str(ROOT/'image.png'),36,815,48,48,mask='auto')
text(98,836,'Map',28,white,'Helvetica-Bold')
text(156,836,'Nero',28,gold,'Helvetica-Bold')
text(36,786,'PRACTICE ISLAND',35,white,'Helvetica-Bold')
text(36,760,'A small map. A first import. A place to practise.',14)
# The only georeferenced viewport: 0..0.02 degrees in both axes.
x0,y0,x1,y1 = 60,190,660,710
fill('#0c2839'); c.rect(x0,y0,x1-x0,y1-y0,fill=1,stroke=0)
def xy(u,v): return x0+600*u,y0+520*v
island=[(.10,.27),(.13,.52),(.26,.70),(.34,.87),(.56,.88),(.65,.75),(.82,.70),(.90,.48),(.78,.26),(.63,.15),(.40,.10),(.24,.17)]
p=c.beginPath();p.moveTo(*xy(*island[0]))
for point in island[1:]:p.lineTo(*xy(*point))
p.close();fill('#183b3c');stroke('#81aaa2');c.setLineWidth(1.6);c.drawPath(p,fill=1,stroke=1)
# Original synthetic contour rings, not measured terrain or elevation data.
for k in range(12):
    r=.035+k*.017;p=c.beginPath()
    for j in range(101):
        a=j*2*math.pi/100
        u=.44+r*math.cos(a)*(1+.12*math.sin(3*a));v=.55+r*1.04*math.sin(a)
        (p.moveTo if j==0 else p.lineTo)(*xy(u,v))
    stroke('#64877a' if k%3==0 else '#365d54');c.setLineWidth(.8 if k%3==0 else .45);c.drawPath(p)
# Geographic graticule, printed independently from the illustrative terrain.
for i in range(5):
    u=i/4;stroke('#355464');c.setLineWidth(.45);c.line(*xy(u,0),*xy(u,1));c.line(*xy(0,u),*xy(1,u))
    text(x0+600*u-15,y0-18,f'{i*.005:.3f} E',8,'#c0d3d8')
    if i<4:text(8,y0+520*u-2,f'{i*.005:.3f} N',8,'#c0d3d8')
route=[(.22,.30),(.30,.38),(.41,.42),(.52,.48),(.60,.63),(.72,.69)]
p=c.beginPath();p.moveTo(*xy(*route[0]))
for pt in route[1:]:p.lineTo(*xy(*pt))
stroke(gold);c.setLineWidth(4);c.drawPath(p)
for label,pt in [('A',route[0]),('B',route[2]),('C',route[-1])]:
    x,y=xy(*pt);fill(navy);stroke(gold);c.circle(x,y,7,fill=1,stroke=1)
    text(x+11,y+8,label,13,gold,'Helvetica-Bold')
text(423,355,'Practice Bay',13,'#a8cbd5')
text(215,534,'Contour Hill',12)
text(470,653,'N',15,gold,'Helvetica-Bold');stroke(gold);c.setLineWidth(1.5);c.line(477,619,477,644)
c.line(477,644,473,635);c.line(477,644,481,635)
stroke(gold);c.setLineWidth(1);c.rect(x0,y0,600,520)
text(36,143,'CHECK THE REFERENCE POINTS',11,gold,'Helvetica-Bold')
text(36,121,'A  0.0060 N, 0.0044 E     B  0.0084 N, 0.0082 E     C  0.0138 N, 0.0144 E',10)
text(36,96,'WGS84 / EPSG:4326. Gold line: fictional practice path, not a GPS recording.',10,'#c0d3d8')
text(36,71,'Fictional training map. It does not depict real terrain. Do not use it for navigation.',10)
text(36,48,'Original artwork: MapNero / The Nero Labs. Map artwork released under CC0.',9,'#c0d3d8')
text(36,30,'mapnero.com/geopdf-maps.html#practice-map',9,gold)
c.showPage();c.save()
writer=PdfWriter();writer.append(PdfReader(buf))
def arr(v):return ArrayObject([FloatObject(n) for n in v])
measure=DictionaryObject({NameObject('/Type'):NameObject('/Measure'),NameObject('/Subtype'):NameObject('/GEO'),
    NameObject('/GPTS'):arr([.02,0,.02,.02,0,.02,0,0]),NameObject('/LPTS'):arr([0,1,1,1,1,0,0,0]),
    NameObject('/Bounds'):arr([0,1,1,1,1,0,0,0]),NameObject('/GCS'):DictionaryObject({NameObject('/Type'):NameObject('/GEOGCS'),NameObject('/EPSG'):NumberObject(4326)})})
writer.pages[0][NameObject('/VP')]=ArrayObject([DictionaryObject({NameObject('/Type'):NameObject('/Viewport'),NameObject('/Name'):TextStringObject('MapNero Practice Island'),NameObject('/BBox'):arr([x0,y0,x1,y1]),NameObject('/Measure'):measure})])
writer.add_metadata({'/Title':'MapNero Practice Island','/Author':'The Nero Labs / MapNero','/Subject':'Fictional CC0 training map; not for navigation'})
with OUT.open('wb') as f:writer.write(f)
print(OUT)
