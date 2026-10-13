const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../assets/walkthrough-clusters.js');
test('five golden results from the actual native Swift engine preserve numerical parity',()=>{
 const golden=require('./fixtures/cluster-native.json');assert.match(golden.source_sha256,/^[a-f0-9]{64}$/);
 for(const {points,expected} of golden.fixtures){const actual=C.analyze(points);
  for(const key of ['point_count','area_ha','density_per_ha','mean_neighbor_m','expected_neighbor_m','nni_r','nni_z','elongation','bearing_degrees','lambda1','lambda2','standard_distance_m'])assert.ok(Math.abs(actual[key]-expected[key])<=1e-7*Math.max(1,Math.abs(expected[key])),key);
  assert.equal(actual.gaps.length,expected.gap_count);assert.deepEqual(actual.groups.map(g=>g.indices.length),expected.group_counts);assert.equal(actual.heuristic_label,expected.risk);assert.equal(actual.pattern,expected.pattern);assert.equal(actual.shape,expected.shape);assert.equal(actual.imas_pattern_key,expected.imas_pattern_key);
 }
});
test('two regional point groups use native DBSCAN parameters without changing input',()=>{
 const points=C.london.map(p=>({...p})),before=JSON.stringify(points),r=C.analyze(points);
 assert.equal(r.point_count,10);assert.equal(r.raw_cluster_count,2);assert.deepEqual(r.groups.map(g=>g.indices.length),[5,5]);assert.equal(r.dbscan_min_points,3);assert.equal(r.dbscan_eps_m,Math.max(2*r.mean_neighbor_m,1));assert.equal(r.display_fallback,false);assert.equal(JSON.stringify(points),before);
 assert.ok(r.groups[0].centroid.lon<r.groups[1].centroid.lon);assert.ok(r.gaps.length>0);
});
test('native display fallback stays distinct from raw clusters and noise',()=>{
 const points=Array.from({length:8},()=>({lat:51.5,lon:-.1}));const r=C.analyze(points);
 assert.equal(r.area_ha,.0001);assert.equal(r.mean_neighbor_m,0);assert.equal(r.raw_cluster_count,1);assert.equal(r.display_fallback,true);assert.equal(r.groups[0].indices.length,8);assert.equal(r.standard_distance_m,0);
 const raw=C.dbscan([{x:0,y:0},{x:.1,y:0},{x:.2,y:0},{x:100,y:100}],1);
 assert.deepEqual(raw.groups,[[0,1,2]]);assert.deepEqual(raw.noise,[3]);
});
test('regular square grid gives known area, principal-axis symmetry and density',()=>{
 const pts=Array.from({length:16},(_,i)=>({lat:51.5+Math.floor(i/4)*.001,lon:-.1+(i%4)*.001}));const r=C.analyze(pts);
 const area=(3*.001*Math.PI/180*6371000)**2*Math.cos((51.5015)*Math.PI/180);
 assert.ok(Math.abs(r.area_ha-area/10000)<1e-7);assert.equal(r.pattern,'regular');assert.ok(r.nni_r>1.1);assert.ok(r.density_per_ha>0);assert.equal(r.heuristic_label,'high');
});
test('invalid or oversized records fail before producing a plausible analysis',()=>{
 assert.throws(()=>C.analyze(C.london.slice(0,7)),/8–250/);assert.throws(()=>C.read(Array(251).fill(C.london[0])),/8–250/);
 for(const invalid of [{lat:null,lon:0},{lat:NaN,lon:0},{lat:86,lon:0},{lat:0,lon:181}])assert.throws(()=>C.read([invalid,...C.london.slice(1)]),/finite/);
 assert.throws(()=>C.read([{lat:51,lon:179.9},{lat:51,lon:-179.9},...C.london.slice(2)]),/at most 1/);
 assert.throws(()=>C.read({type:'FeatureCollection',features:Array(8).fill({geometry:{type:'LineString',coordinates:[]}})}),/point-only/);
 assert.throws(()=>C.analyze(Array.from({length:8},(_,i)=>({lat:51.5,lon:-.1+i*.125}))),/gap grid/);
});
test('GeoJSON type counts do not allow object prototype keys to corrupt the result',()=>{
 const features=C.london.map((p,i)=>({type:'Feature',geometry:{type:'Point',coordinates:[p.lon,p.lat]},properties:{eodType:i<5?'__proto__':'constructor'}}));
 const r=C.analyze({type:'FeatureCollection',features});assert.equal(r.types.__proto__,5);assert.equal(r.types.constructor,5);assert.equal(Object.getPrototypeOf(r.types),null);
});
