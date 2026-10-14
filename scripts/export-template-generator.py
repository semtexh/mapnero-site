from pathlib import Path
import re,json,hashlib,argparse
r=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--source',type=Path,default=Path('/Users/serhanucar/Developer/mapnero/MapNeroApp/Core/Services/TemplateAIGenerator.swift'));source=parser.parse_args().source;s=source.read_text()
assert hashlib.sha256(s.encode()).hexdigest()=='f79e9ed6d2d992ebf5849d1879bd56830d41cce64716f36507a67cd506f5e3fd','Review changed Swift before updating this bounded translator.'
def body(name):
 a=s.index('{',s.index('func '+name)); depth=1;i=a+1; quoted=False;esc=False
 while depth:
  c=s[i]
  if quoted:
   if esc:esc=False
   elif c=='\\':esc=True
   elif c=='"':quoted=False
  elif c=='"':quoted=True
  elif c=='{':depth+=1
  elif c=='}':depth-=1
  i+=1
 return s[a+1:i-1]
def transform(t):
 strings=[]
 def protect(m):strings.append(m.group());return 'STR'+str(len(strings)-1)+'TOKEN'
 t=re.sub(r'"(?:\\.|[^"\\])*"',protect,t)
 t=re.sub(r'//[^\n]*','',t)
 def args(text):
  out=[];start=0;d=0
  for i,c in enumerate(text):
   if c in '([{':d+=1
   elif c in ')]}':d-=1
   elif c==',' and d==0:out.append(text[start:i].strip());start=i+1
  out.append(text[start:].strip());return out
 for call,pos in [('TemplateField',0),('TemplateSchema',0),('TemplateStyleRule',0),('f',3),('step',2)]:
  pattern=re.compile(r'\b'+call+r'\(')
  offset=0
  while m:=pattern.search(t,offset):
   end=m.end();d=1
   while d:
    if t[end]=='(':d+=1
    elif t[end]==')':d-=1
    end+=1
   parts=args(t[m.end():end-1]);p=parts[:pos];kw=parts[pos:]
   if pos==0:replacement='{'+','.join(kw)+'}'
   else:replacement=call+'('+','.join(p)+', {'+','.join(kw)+'})'
   if call=='TemplateField':replacement='field('+replacement+')'
   t=t[:m.start()]+replacement+t[end:];offset=m.start()+len(replacement)
 t=re.sub(r'\b(let|var) (\w+)(?:\s*:\s*\[[^\]]+\])?\s*=',r'let \2 =',t)
 t=t.replace('.contains(','.includes(').replace('.isEmpty','.length===0').replace('.count','.length')
 t=t.replace('!domains.length===0','domains.length!==0')
 t=re.sub(r'\.(text|multiline|number|dropdown|radio|checkbox|gps|camera|date|slider|symbol|section)\b',lambda m:json.dumps(m[1]),t)
 t=t.replace('nil','undefined').replace('buildGenericFields(lower: lower, comprehensive: comprehensive)', 'buildGenericFields(lower, comprehensive)')
 t=re.sub(r'for (\w+) in (\w+)\s*\{',r'for (const \1 of \2) {',t)
 t=re.sub(r'\bif ([^{}\n]*(?:\n\s*[^{}\n]+)?)\s*\{',lambda m:'if ('+m[1].strip()+') {',t)
 t=re.sub(r'STR(\d+)TOKEN',lambda m:strings[int(m[1])],t)
 return t
form=body('buildFormSchema');form=form[form.index('// --- ALWAYS'):]
generic=body('buildGenericFields');generic=generic[generic.index('// ── Form type'):]
check=body('buildChecklistSchema');check=check[check.index('        if domains.contains'):]
style=body('buildStyleSchema')
# Extract the ordered native vocabulary without translating it.
dom=body('detectDomains');pairs=[]
for m in re.finditer(r'\("([^"\n]+)",\s*\[(.*?)\]\)',dom,re.S):
 pairs.append([m[1],json.loads('['+m[2]+']')])
typebody=body('detectType'); arrays=[]
for name in ['checklistWords','styleWords']:
 m=re.search(name+r'\s*=\s*\[(.*?)\]',typebody,re.S);arrays.append(json.loads('['+m[1]+']'))
header='''(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroTemplateGenerator=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
// Generated from the native offline rule generator; no network AI service.
const has=(text,words)=>words.some(w=>text.includes(w));
function field(data){return {required:false,...data};}
function sectionID(fields){return 'sec-'+fields.filter(f=>f.type==='section').length;}
'''
code=header+'const vocabulary='+json.dumps(pairs,ensure_ascii=False)+';\nconst checklistWords='+json.dumps(arrays[0],ensure_ascii=False)+';\nconst styleWords='+json.dumps(arrays[1],ensure_ascii=False)+';\n'
code+='''function generate(prompt){if(typeof prompt!=='string'||!prompt.trim()||prompt.length>4000)throw Error('Describe a template using 1–4000 characters.');const lower=prompt.toLowerCase(), type=has(lower,checklistWords)?'checklist':has(lower,styleWords)?'style':'form';let domains=vocabulary.filter(([,words])=>has(lower,words)).map(([name])=>name);if(!domains.length)domains=['General'];const comprehensive=!has(lower,['quick','kısa','short','minimal','basit','simple']);const schema=type==='form'?buildFormSchema(lower,domains,comprehensive):type==='checklist'?buildChecklistSchema(lower,domains,comprehensive):buildStyleSchema(lower,domains);return {type,category:domains[0]||'General',schema};}
function buildFormSchema(lower,domains,comprehensive){const fields=[],addedIds=new Set();function add(f){if(!addedIds.has(f.id)){addedIds.add(f.id);fields.push(f);}}function section(label){fields.push(field({id:sectionID(fields),label,type:'section'}));}
'''+transform(form)+'\n}\n'
code+='''function buildGenericFields(lower,comprehensive){const fields=[],ids=new Set();function f(id,label,type,options={}){if(!ids.has(id)){ids.add(id);fields.push(field({id,label,type,...options}));}}function sec(label){fields.push(field({id:sectionID(fields),label,type:'section'}));}
'''+transform(generic)+'\n}\n'
code+='''function buildChecklistSchema(lower,domains,comprehensive){const steps=[];function step(title,description,options={}){steps.push({id:'s'+(steps.length+1),title,description,requiresSignoff:options.signoff??true,warningLevel:options.level??'medium'});}
'''+transform(check)+'\n}\n'
code+='function buildStyleSchema(lower,domains){'+transform(style)+'\n}\nreturn {generate,vocabulary:vocabulary.map(([name,words])=>[name,[...words]])};\n});\n'
(r/'assets/template-generator-engine.js').write_text(code)
print('Source SHA256',hashlib.sha256(s.encode()).hexdigest(),'domains',len(pairs))
