const {test}=require('node:test');const assert=require('node:assert/strict');const R=require('../assets/walkthrough-recorded-report.js');
const base=()=>({type:'Feature',geometry:{type:'LineString',coordinates:[[0,0,0],[.001,0,.4],[.002,0,1.4]]},properties:{name:'İz örneği',demo:true,distance_m:999,active_duration_ms:15000,points:[{timestamp:'2026-10-15T09:00:00Z',speed_mps:0},{timestamp:'2026-10-15T09:00:10Z',speed_mps:.3},{timestamp:'2026-10-15T09:00:20Z',speed_mps:2}]}});
test('report keeps geometric WGS84 distance, stored practice total and time evidence separate',()=>{
  const f=base(),r=R.read(f);assert.ok(Math.abs(r.distance_m-222.6389815865)<1e-5);assert.equal(r.stored_practice_distance_m,999);assert.equal(r.total_s,20);assert.equal(r.active_s,15);assert.equal(r.paused_s,null);assert.ok(Math.abs(r.gain_m-1)<1e-12);assert.equal(r.loss_m,0);assert.equal(r.start_alt_m,0);assert.equal(r.median_moving_mps,1.15);
  f.properties.recording_start='2026-10-15T09:00:00Z';f.properties.recording_end='2026-10-15T09:00:30Z';assert.equal(R.read(f).paused_s,15);
});
test('unknown altitude/time/speed and derived route times are not manufactured',()=>{
  const f=base();delete f.geometry.coordinates[2][2];f.geometry.coordinates[2].length=2;delete f.properties.points;delete f.properties.active_duration_ms;const r=R.read(f);assert.equal(r.start_alt_m,0);assert.equal(r.end_alt_m,null);assert.equal(r.gain_m,null);assert.equal(r.total_s,null);assert.equal(r.max_mps,null);
  const route=base();route.properties.route_method='planned';assert.equal(R.read(route).total_s,null);assert.equal(R.read(route).average_mps,null);
  const invalid=base();invalid.properties.points[0].lat=1;assert.throws(()=>R.read(invalid),/do not match/);
});
test('out-of-order timestamps and mixed altitude references stay unknown',()=>{
  const f=base();f.properties.points[1].timestamp='2026-10-15T08:59:00Z';assert.equal(R.read(f).point_window_s,null);f.properties.points[1].timestamp='2026-02-30T09:00:10Z';assert.equal(R.read(f).point_window_s,null);f.properties.points[0].altitude_reference='ellipsoid';f.properties.points[1].altitude_reference='orthometric';assert.equal(R.read(f).gain_m,null);
});
test('calculated report PDF supports a saved Turkish title and one readable A4 page',async()=>{
  const bytes=await R.createPDF(base(),'imperial'),doc=await require('../assets/vendor/pdf-lib/pdf-lib.min.js').PDFDocument.load(bytes);assert.equal(doc.getPageCount(),1);assert.deepEqual(doc.getPage(0).getSize(),{width:595,height:842});assert.ok(bytes.length>3000);
});
