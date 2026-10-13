const test=require('node:test');
const assert=require('node:assert/strict');
const Zip=require('../assets/vendor/jszip.min.js');
const E=require('../assets/walkthrough-export.js');
const point=(props={},coords=[-.1195,51.5033])=>({type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:coords},properties:props}]});

test('KMZ contains a readable KML document with escaped UTF-8 metadata',async()=>{
 const file=await E.create(point({name:'İğde & <oak>',count:0}),'KMZ');
 assert.equal(file.extension,'kmz');
 const archive=await Zip.loadAsync(file.bytes,{checkCRC32:true});
 const kml=await archive.file('doc.kml').async('string');
 assert.match(kml,/<name>İğde &amp; &lt;oak&gt;<\/name>/);
 assert.match(kml,/<coordinates>-0.1195,51.5033<\/coordinates>/);
 assert.match(kml,/&quot;count&quot;:0/);
});

test('SHP package includes the complete original dataset and unambiguous field names',async()=>{
 const input=point({'long_attribute_name':false,'another_long_attribute_name':0});
 const file=await E.create(input,'SHP'),archive=await Zip.loadAsync(file.bytes,{checkCRC32:true});
 for(const extension of ['shp','shx','dbf','prj','cpg'])assert.ok(archive.file('points.'+extension));
 assert.deepEqual(JSON.parse(await archive.file('original.geojson').async('string')),input);
 const mapping=JSON.parse(await archive.file('points-fields.json').async('string'));
 assert.equal(new Set(Object.keys(mapping.fields)).size,2);
 assert.deepEqual(Object.values(mapping.fields),['long_attribute_name','another_long_attribute_name']);
});

test('SHP refuses oversized UTF-8 attributes and measured coordinates rather than losing them',async()=>{
 await assert.rejects(E.create(point({text:'ğ'.repeat(130)}),'SHP'),/254 UTF-8 bytes/);
 await assert.rejects(E.create(point({},[-.1195,51.5033,0]),'SHP'),/retain altitude/);
});

test('polygon export preserves the source and GPX cannot masquerade as an area',async()=>{
 const input={type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}}]},before=JSON.stringify(input);
 await E.create(input,'SHP');assert.equal(JSON.stringify(input),before);
 await assert.rejects(E.create(input,'GPX'),/does not keep polygon areas/);
});

test('media ZIP contains exactly the selected attachment bytes and its manifest',async()=>{
 const data=await E.create(point(),'GeoJSON'),bytes=new Uint8Array([137,80,78,71,1,2,3]);
 const file={name:'sample.png',type:'image/png',size:bytes.length,arrayBuffer:async()=>bytes.buffer};
 const output=await E.withMedia(data,[file]),archive=await Zip.loadAsync(output.bytes,{checkCRC32:true});
 const manifest=JSON.parse(await archive.file('media-manifest.json').async('string'));
 assert.equal(manifest.attachments.length,1);
 assert.deepEqual(await archive.file(manifest.attachments[0].path).async('uint8array'),bytes);
 assert.deepEqual(JSON.parse(await archive.file('data.geojson').async('string')),point());
});

test('non-image attachments and oversized packages fail before any download',async()=>{
 const file=await E.create(point(),'GeoJSON');
 await assert.rejects(E.withMedia(file,[{type:'text/plain',size:1}]),/image attachments/);
 await assert.rejects(E.withMedia(file,[{type:'image/png',size:21*1024*1024}]),/20 MB/);
});
