from pathlib import Path
import re,json,subprocess,hashlib,argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--native-root',type=Path,default=Path('/Users/serhanucar/Developer/mapnero/MapNeroApp'));native=parser.parse_args().native_root
model=(native/'Core/Models/MapNeroTemplate.swift').read_text();generator=(native/'Core/Services/TemplateAIGenerator.swift').read_text()
def struct(name):
 start=model.index('struct '+name+':'); end=model.index('\n}',start)+2; chunk=model[start:end]
 # Keep pure stored model fields, not UIKit-dependent computed properties.
 lines=[]
 for line in chunk.splitlines():
  if re.match(r'\s*var \w+:.*\{',line):break
  lines.append(line)
 return '\n'.join(lines).rstrip('}')+'\n}'
preamble='import Foundation\nenum MapNeroTemplateType: String, Codable {case form, checklist, style}\nenum TemplateFieldType: String, Codable {case text,multiline,number,dropdown,radio,checkbox,gps,camera,date,slider,symbol,section}\n'+'\n'.join(struct(n) for n in ['TemplateField','TemplateStep','TemplateStyleRule','TemplateSchema'])
cli='''
struct Result: Codable { let prompt:String; let type:MapNeroTemplateType;let category:String;let schema:TemplateSchema }
let prompts = try JSONDecoder().decode([String].self, from: FileHandle.standardInput.readDataToEndOfFile())
let results = prompts.map { prompt -> Result in
 let (type,category,original) = TemplateAIGenerator.generate(from:prompt)
 var schema=original; var n=0
 if var fields=schema.fields {for i in fields.indices {if fields[i].type == .section {fields[i].id="sec-\\(n)";n+=1}};schema.fields=fields}
 return Result(prompt:prompt,type:type,category:category,schema:schema)
}
let encoder=JSONEncoder();encoder.outputFormatting=[.sortedKeys]
FileHandle.standardOutput.write(try encoder.encode(results))
'''
build=root/'outputs/template-generator-verification';build.mkdir(parents=True,exist_ok=True); swift=build/'main.swift';swift.write_text(preamble+'\n'+generator+'\n'+cli);exe=build/'native-generator'
subprocess.run(['swiftc',str(swift),'-o',str(exe)],check=True)
# Vocabulary branches, combinations, fallback/type precedence, Turkish, empty and unusual strings.
prompts=['Field Survey Form','something','gps location date','quick something','car employee application','General visitor signature','EOD CBRN Medical Safety Survey Navigation Commerce','EOD CBRN Medical Safety Survey Navigation Commerce quick','CHECKLIST style','İŞ GÜVENLİĞİ','kısa araştırma formu','😀 unknown','survey terraindate','quickly survey','']
words=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify(require('./assets/template-generator-engine.js').vocabulary.flatMap(x=>x[1])))"],cwd=root))
for word in words:
 for suffix in [' form',' form quick',' checklist quick',' checklist',' style']:
  prompts.append(word+suffix)
prompts=list(dict.fromkeys(prompts)); output=subprocess.check_output([str(exe)],input=json.dumps(prompts,ensure_ascii=False).encode())
fixture=root/'tests/fixtures/native-template-generator.json';fixture.write_bytes(output+b'\n')
print(len(prompts),'native outputs',len(output),'bytes','SHA256',hashlib.sha256(generator.encode()).hexdigest())
