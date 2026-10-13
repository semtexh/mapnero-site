const test=require('node:test');const assert=require('node:assert/strict');
const I=require('../assets/walkthrough-map-import.js'),R=require('../assets/raster-lab-engine.js');
test('GeoTIFF import reads actual pixels and geographic corners from the file',()=>{
 const rgba=new Uint8ClampedArray([255,0,0,255,0,255,0,255,0,0,255,255,255,255,255,255]);
 const data=I.inspect(R.encode(2,2,rgba,[-.14,51.495,-.085,51.515]));assert.equal(data.kind,'GeoTIFF');assert.equal(data.width,2);assert.deepEqual(data.rgba,rgba);
 assert.deepEqual(data.coordinates,[[-.14,51.515],[-.085,51.515],[-.085,51.495],[-.14,51.495]]);
});
test('ordinary images do not acquire an invented georeference',()=>{
 for(const bytes of [[137,80,78,71,13,10,26,10],[255,216,255,0,0,0,0,0],[82,73,70,70,0,0,0,0,87,69,66,80]])assert.equal(I.inspect(new Uint8Array(bytes).buffer).coordinates,null);
});
test('unsupported and oversized inputs fail instead of creating a map',()=>{
 assert.throws(()=>I.inspect(new ArrayBuffer(12000001)),/12 MB/);assert.throws(()=>I.inspect(new TextEncoder().encode('%PDF-1.7 fake').buffer),/PDF, KMZ/);
 assert.throws(()=>I.inspect(new Uint8Array([73,73,42,0,255,255,255,255]).buffer));
});
