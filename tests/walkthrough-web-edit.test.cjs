const {test}=require('node:test');const assert=require('node:assert/strict');const E=require('../assets/walkthrough-web-edit.js');
const point={type:'Feature',geometry:{type:'Point',coordinates:[-.12,51.5]},properties:{name:'New point'}};
test('web edit rejects writes to service/read-only layers and keeps the draft unchanged',()=>{
  const m=E.create(),before=m.snapshot().local.dataset;assert.throws(()=>m.add(point));m.setMode(true);
  for(const target of ['wms','readonly']){m.setTarget(target);assert.throws(()=>m.add(point));assert.throws(()=>m.save());assert.deepEqual(m.snapshot().local.dataset,before);}
  m.setTarget('normal');m.add(point);assert.equal(m.snapshot().local.dataset.features.length,2);
});
test('stale shared revision blocks overwrite while preserving all local geometry and attributes',()=>{
  const m=E.create();m.setMode(true);m.add(point);const id=m.snapshot().local.dataset.features[0].id;
  m.update(id,'Local change','Draft status',{type:'Point',coordinates:[-.13,51.51,0]});const draft=m.snapshot().local.dataset;
  m.otherEdit();const shared=m.snapshot().shared;assert.throws(()=>m.save(),/other practice device changed/);assert.deepEqual(m.snapshot().local.dataset,draft);assert.deepEqual(m.snapshot().shared,shared);
  assert.throws(()=>m.receive(),/unsynced edits/);m.receive(true);assert.deepEqual(m.snapshot().local.dataset,shared.dataset);
});
test('offline save retains valid line and polygon drafts; malformed geometry never replaces them',()=>{
  const m=E.create();m.setMode(true);m.add({type:'Feature',geometry:{type:'LineString',coordinates:[[0,0],[.01,.01]]},properties:{name:'Line'}});
  m.add({type:'Feature',geometry:{type:'Polygon',coordinates:[[[0,0],[.01,0],[.01,.01],[0,0]]]},properties:{name:'Area'}});const saved=m.snapshot().local.dataset;
  assert.throws(()=>m.update(saved.features[0].id,'Bad','Bad',{type:'Point',coordinates:[NaN,1]}));assert.deepEqual(m.snapshot().local.dataset,saved);
  m.setOnline(false);assert.throws(()=>m.save(),/offline/);assert.deepEqual(m.snapshot().local.dataset,saved);m.setOnline(true);assert.deepEqual(m.save().dataset,saved);
});
