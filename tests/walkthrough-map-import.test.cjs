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
 assert.throws(()=>I.inspect(new ArrayBuffer(12000001)),/12 MB/);assert.throws(()=>I.inspect(new TextEncoder().encode('unsupported file').buffer),/KMZ/);
 assert.throws(()=>I.inspect(new Uint8Array([73,73,42,0,255,255,255,255]).buffer));
});

test('PDF recognition keeps map coordinates unknown until verified',()=>{const result=I.inspect(new TextEncoder().encode('%PDF-1.7\n').buffer);assert.equal(result.mime,'application/pdf');assert.equal(result.coordinates,null);});

test('specific Android PDF, KMZ and photo pickers reject mismatched detected formats',()=>{const I=require('../assets/walkthrough-map-import.js');assert.equal(I.allowedKind('PDF','PDF'),true);assert.equal(I.allowedKind('PNG','PDF'),false);assert.equal(I.allowedKind('KMZ','KMZ'),true);assert.equal(I.allowedKind('JPEG','KMZ'),false);for(const kind of ['PNG','JPEG','WebP'])assert.equal(I.allowedKind(kind,'photo'),true);assert.equal(I.allowedKind('GeoTIFF','photo'),false);assert.equal(I.allowedKind('PDF',null),true);assert.throws(()=>I.allowedKind('PDF','unknown'));});
