"""Export the six read-only Flutter presets used by the real mode picker."""
from pathlib import Path
import re,json,hashlib,sys
root=Path(__file__).resolve().parents[1]
source=Path(sys.argv[1]) if len(sys.argv)>1 else root.parent/'mapnero/mapnero_flutter/lib/core/models/app_mode.dart'
s=source.read_text(); modes=[]
names={'general':'Simple Map','eod':'EOD / Mine Action','survey':'Surveyor / GIS','forestry':'Forestry','hiker':'Hiker','cyclist':'Cyclist'}
for match in re.finditer(r"    AppMode\(\s*id: '([^']+)',(.*?)\n    \),",s,re.S):
 key,body=match.groups(); p=re.search(r'preset: ModePreset\((.*)\n      \),',body,re.S).group(1)
 values={}
 for field,raw in re.findall(r"^        (\w+):\s*(true|false|null|'[^']*'|\{.*?\}|\[.*?\]),",p,re.S|re.M):
  if raw in ['true','false','null']:value={'true':True,'false':False,'null':None}[raw]
  elif raw.startswith(("{","[")):value=re.findall(r"'([^']*)'",raw)
  else:value=raw[1:-1]
  values[field]=value
 expected=re.findall(r'^        (\w+):',p,re.M)
 assert set(expected)==set(values),(key,expected,values)
 modes.append({'id':key,'name':names[key],'minTier':re.search(r'minTier: UserTier\.(\w+)',body).group(1),'preset':values})
assert {m['id'] for m in modes}==set(names)
modes.sort(key=lambda x:list(names).index(x['id']))
data={'source':'mapnero_flutter/lib/core/models/app_mode.dart','source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'modes':modes}
js="(function(root){const data="+json.dumps(data,ensure_ascii=False,separators=(',',':'))+";if(typeof module==='object'&&module.exports)module.exports=data;else root.MapNeroModePresets=data;})(typeof window==='undefined'?globalThis:window);\n"
(root/'assets/usage-mode-presets.js').write_text(js)
print('Exported',len(modes),'native mode presets; SHA256',data['source_sha256'])
