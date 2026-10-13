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
