const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const S=require('../assets/walkthrough-store.js'),data=require('../assets/app-walkthrough/store-catalog.json');
test('captured catalogue combines category and case-insensitive name or author search',()=>{
 assert.equal(S.filter(data,'Nature','wildLIFE')[0].name,'Wildlife Observation Log');
 assert.deepEqual(S.filter(data,'EOD','wildlife'),[]);
 assert.equal(S.filter(data,'Survey','mapnero').length,S.filter(data,'Survey','').length);
 assert.equal(S.filter(data,'All','   wildlife  ').length,1);
 assert.deepEqual(S.filter(data,'All','<script>'),[]);
});
test('every captured category has real image bytes and unambiguous catalogue records',()=>{
 const names=new Set();for(const t of data.templates){assert.equal(t.author,'MapNero');assert.ok(data.categories.includes(t.category));assert.ok(!names.has(t.name));names.add(t.name);}
 for(const c of data.categories){const file=path.join(__dirname,'../assets/app-walkthrough',`store-category-${c.toLowerCase()}.jpg`);const b=fs.readFileSync(file);assert.ok(b.length>10000);assert.ok((b[0]===255&&b[1]===216)||(b[0]===137&&b[1]===80));assert.ok(S.filter(data,c,'').length>0);}
});

test('all captured store schemas retain field labels, limits, choices and required flags in practice forms',()=>{
 const snapshot=require('../assets/app-walkthrough/store-schemas.json'),I=require('../assets/walkthrough-template-import.js');
 assert.equal(snapshot.templates.length,data.templates.length);
 for(const captured of data.templates){const source=snapshot.templates.find(t=>t.name===captured.name);assert.ok(source,captured.name);assert.equal(source.category,captured.category);assert.ok(source.schema.fields?.length||source.schema.steps?.length);
 if(source.schema.fields?.length){const imported=I.finish(source.name,source.schema.fields,'store');assert.equal(imported.fields.length,source.schema.fields.length);source.schema.fields.forEach((field,i)=>{assert.equal(imported.fields[i].label,field.label);assert.equal(imported.fields[i].type,field.type);assert.equal(imported.fields[i].required,!!field.required);assert.deepEqual(imported.fields[i].options,field.options||[]);for(const key of ['min','max'])assert.equal(imported.fields[i][key],String(field[key]??''));});}}
});
test('checklist requires exact source signoffs and exports independent recorded values',()=>{
 const source=require('../assets/app-walkthrough/store-schemas.json').templates.find(t=>t.name==='Vehicle Pre-Op Inspection'),values={};
 assert.throws(()=>S.checklistResult(source,values,''),/7 required/);for(const step of source.schema.steps)if(step.requiresSignoff)values[step.id]=true;
 const result=S.checklistResult(source,values,'sample');assert.equal(result.steps.length,12);assert.equal(result.notes,'sample');assert.equal(result.steps.filter(s=>s.signedOff).length,7);values[source.schema.steps[0].id]=false;assert.equal(result.steps[0].signedOff,true);assert.throws(()=>S.checklistResult(source,values,''),/1 required/);
});
