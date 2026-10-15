const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../assets/walkthrough-community.js');
const feature={type:'Feature',geometry:{type:'LineString',coordinates:[[-.12,51.5],[-.121,51.501,0]]},properties:{media:['private-photo.jpg'],secret:'private',layer_name:'private-layer',device_id:'private-device'}};
const meta={name:'Own route',author:'Me',region:'London',description:'Practice',license:C.licenses[0]};
test('community public projection excludes private fields and retains unknown versus zero altitude',()=>{
  const p=C.publicTrack(feature,meta);
  assert.deepEqual(p.geometry.coordinates,feature.geometry.coordinates);
  assert.deepEqual(Object.keys(p.properties).sort(),['name','author','region','description','license','demo','device_gps'].sort());
  p.geometry.coordinates[0][0]=100;assert.equal(feature.geometry.coordinates[0][0],-.12);
  assert.throws(()=>C.publicTrack({...feature,geometry:{type:'LineString',coordinates:[[0,0],[0,NaN]]}},meta));
});
test('downloaded copies survive author blocking and removal of the original publication',()=>{
  const m=C.createModel();const id=m.publish(feature,meta,{eligible:true,safety:true});
  const first=m.download(id),reference=JSON.stringify(m.downloaded());first.geometry.coordinates[0][0]=100;
  m.remove(id);assert.equal(m.list('Own route').length,0);assert.equal(JSON.stringify(m.downloaded()),reference);
  const foreign=m.list()[0];m.download(foreign.id);const saved=m.downloaded();m.block(foreign.id);assert.equal(m.list().some(x=>x.id===foreign.id),false);assert.deepEqual(m.downloaded(),saved);
});
test('publishing eligibility, ownership and ratings enforce independent catalogue boundaries',()=>{
  const m=C.createModel(),id=m.list()[0].id;
  assert.throws(()=>m.publish(feature,meta,{eligible:true,safety:false}));assert.throws(()=>m.publish(feature,meta,{eligible:false,safety:true}));
  assert.throws(()=>m.remove(id));assert.throws(()=>m.rate(id,0));m.rate(id,5);m.rate(id,3);
  assert.equal(m.list('', 'rating')[0].rating,3);assert.equal(m.list('South Bank').length,1);
  m.report(id);assert.equal(m.reportCount(),1);
});
