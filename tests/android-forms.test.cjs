const {test}=require('node:test'),assert=require('node:assert/strict');
const Forms=require('../assets/walkthrough-android-forms.js');
test('field form refuses incomplete or invalid values before creating a result',()=>{
 const f=Forms.create();assert.throws(()=>f.save(0),/Species/);assert.equal(f.snapshot().records.length,0);
 assert.throws(()=>Forms.validate({species:'Oak',cover:'invented'}),/listed/);
 assert.throws(()=>Forms.validate({species:'Oak',date:'2026-02-30'}),/date/);
 assert.throws(()=>Forms.validate({species:'Oak',location:[0,91]}),/longitude/);
 assert.throws(()=>Forms.validate({species:'Oak',location:[Infinity,0]}),/longitude/);
});
test('saved form snapshots keep optional data unknown and resist later edits',()=>{
 const f=Forms.create();f.change('species','  Oak  ');const first=f.save(0);assert.equal(first.values.species,'Oak');assert.equal(first.values.cover,null);assert.equal(first.values.location,null);assert.equal(f.geojson().features[0].geometry,null);
 first.values.species='modified';f.change('species','Pine');f.change('cover','Dense');f.change('date','2024-02-29');f.capture();f.save(1);f.select('practice-form-1');assert.equal(f.selected().values.species,'Oak');f.select('practice-form-2');const data=f.geojson();assert.deepEqual(data.features[0].geometry.coordinates,[-.1278,51.5074]);data.features[0].geometry.coordinates[0]=10;assert.equal(f.selected().values.location[0],-.1278);assert.equal(f.selected().values.date,'2024-02-29');assert.equal(f.snapshot().draft.species,'');assert.equal(f.snapshot().records.length,2);
});
test('library category and text filters combine and resetting does not mutate saved source',()=>{
 const f=Forms.create();f.filters('veGET','Nature');assert.equal(f.templates().length,1);f.filters('veGET','EOD');assert.equal(f.templates().length,0);f.filters('missing','All');assert.equal(f.templates().length,0);assert.throws(()=>f.filters('','fake'),/category/);f.filters('','All');const t=f.templates()[0];t.fields.length=0;assert.equal(f.templates()[0].fields.length,4);
});
