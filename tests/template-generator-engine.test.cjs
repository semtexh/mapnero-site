const {test}=require('node:test'),assert=require('node:assert/strict');
const engine=require('../assets/template-generator-engine.js');
const fixtures=require('./fixtures/native-template-generator.json');
test('all generated schemas match independently executed native Swift, except random section IDs',()=>{
 for(const {prompt,...expected} of fixtures){if(!prompt.trim())continue;assert.deepEqual(JSON.parse(JSON.stringify(engine.generate(prompt))),expected,prompt);}
});
test('rejects empty, non-string and excessively long prompt without mutation',()=>{
 for(const value of ['',null,{},' '.repeat(2),'a'.repeat(4001)])assert.throws(()=>engine.generate(value));
 assert.equal(engine.generate('Field Survey Form').schema.fields.length,20);
});
test('generated templates are independent and retain native category/type priority',()=>{
 const result=engine.generate('CBRN style');result.schema.styleRules[0].color='changed';assert.equal(engine.generate('CBRN style').schema.styleRules[0].color,'#FF3B3060');
 assert.equal(engine.generate('style checklist').type,'checklist');
 assert.equal(engine.generate('Medical EOD form').category,'EOD');
 const fields=engine.generate('quick survey').schema.fields;assert.equal(fields.length,8);assert.equal(fields[0].required,true);
});
