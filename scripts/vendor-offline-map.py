"""Vendor a bounded, attributed real OSM vector example from a pinned public demo."""
from pathlib import Path
import urllib.request, json, math, hashlib, gzip
ROOT=Path(__file__).resolve().parents[1]
COMMIT='601ae60796ceceda2cbd2ed3d2ea92d17a84be4b'
BASE=f'https://raw.githubusercontent.com/maplibre/demotiles/{COMMIT}/'
COVERAGE=[11.37,47.25,11.43,47.29]
def xy(lon,lat,z):return (int((lon+180)/360*2**z),int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z))
def download(path):return urllib.request.urlopen(BASE+path,timeout=30).read()
def main():
 out=ROOT/'assets/offline-basemap';out.mkdir(exist_ok=True)
 meta=json.loads(download('tiles-omt/tiles.json'))
 (out/'LICENSE-MapLibre.txt').write_bytes(download('LICENSE'))
 (out/'NOTICE.txt').write_text('Real Innsbruck vector tiles from MapLibre demotiles, pinned commit '+COMMIT+'\nMap data © OpenStreetMap contributors (ODbL): https://www.openstreetmap.org/copyright\nSchema © OpenMapTiles: https://openmaptiles.org/\nUpstream: https://github.com/maplibre/demotiles/tree/'+COMMIT+'/tiles-omt\nThis bounded example has no street labels or icons. It is not a MapNero account download.\n')
 entries=[]
 for z in range(12,15):
  west,south,east,north=COVERAGE;x0,y0=xy(west,north,z);x1,y1=xy(east,south,z)
  for x in range(x0,x1+1):
   for y in range(y0,y1+1):
    source=f'tiles-omt/{z}/{x}/{y}.pbf';raw=download(source);data=gzip.decompress(raw) if raw[:2]==b'\x1f\x8b' else raw
    path=f'tiles/{z}/{x}/{y}.pbf';target=out/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
    entries.append({'z':z,'x':x,'y':y,'path':path,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'upstream_path':source,'upstream_sha256':hashlib.sha256(raw).hexdigest()})
 manifest={'version':1,'id':'innsbruck-omt-'+COMMIT[:12],'name':'Innsbruck · real OSM sample','coverage':COVERAGE,'default_bounds':[11.386,47.261,11.407,47.278],'minzoom':12,'maxzoom':14,'source':{'repository':'https://github.com/maplibre/demotiles','commit':COMMIT,'upstream_bounds':meta['bounds']},'attribution':'© OpenMapTiles · © OpenStreetMap contributors','tiles':entries}
 (out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print(json.dumps({'tiles':len(entries),'bytes':sum(t['bytes'] for t in entries),'id':manifest['id']}))
if __name__=='__main__':main()
