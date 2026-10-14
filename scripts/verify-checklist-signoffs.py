from pathlib import Path
import json,re,subprocess,hashlib
root=Path(__file__).resolve().parents[1]
source=Path('/Users/serhanucar/Developer/mapnero/MapNeroApp/Core/Services/TemplateEngine.swift'); text=source.read_text()
clause=text.split('case .checklist:',1)[1].split('case .style:',1)[0]
out=root/'outputs/checklist-verification';out.mkdir(parents=True,exist_ok=True)
swift='''import Foundation
struct Step:Codable {let id:String;let requiresSignoff:Bool}
struct Schema:Codable {let steps:[Step]?}
struct Template:Codable {let schema:Schema}
struct Result:Codable {let completedStepIds:[String]}
enum Issue {case requiredSignoff(stepID:String)}
func issues(template:Template,result:Result)->[Issue] {
'''+clause+'''
}
struct Input:Codable {let template:Template;let result:Result}
let inputs=try JSONDecoder().decode([Input].self,from:FileHandle.standardInput.readDataToEndOfFile())
let output=inputs.map {input in issues(template:input.template,result:input.result).map {issue -> String in switch issue {case .requiredSignoff(let id):return id}}}
FileHandle.standardOutput.write(try JSONEncoder().encode(output))
'''
(out/'main.swift').write_text(swift);subprocess.run(['swiftc',str(out/'main.swift'),'-o',str(out/'validator')],check=True)
fixtures=json.loads((root/'tests/fixtures/native-template-generator.json').read_text()); templates=[]
for prompt in ['nature checklist','eod checklist']:
 f=next(f for f in fixtures if f['prompt']==prompt);templates.append({'name':prompt,'schema':f['schema']})
cases=[]
for t in templates:
 for mask in range(1<<len(t['schema']['steps'])):
  cases.append({'template':t,'result':{'completedStepIds':[s['id'] for i,s in enumerate(t['schema']['steps']) if mask&(1<<i)]}})
input=json.dumps(cases).encode();native=json.loads(subprocess.check_output([str(out/'validator')],input=input))
js=json.loads(subprocess.check_output(['node','-e',"const C=require('./assets/walkthrough-checklist.js');let s='';process.stdin.on('data',x=>s+=x);process.stdin.on('end',()=>console.log(JSON.stringify(JSON.parse(s).map(x=>C.missing(C.source(x.template),x.result.completedStepIds)))));"],input=input,cwd=root))
assert js==native
proof={'cases':len(cases),'method':'Execute unchanged native checklist compactMap clause from TemplateSubmissionValidator.issues; compare all completion subsets of native Nature and EOD generated schemas.','sourceSHA256':hashlib.sha256(source.read_bytes()).hexdigest(),'clauseSHA256':hashlib.sha256(clause.encode()).hexdigest()}
(root/'docs/checklist-validator-proof.json').write_text(json.dumps(proof,indent=2)+'\n');print(proof)
