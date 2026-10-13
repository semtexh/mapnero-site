(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroWalkthroughShapefile=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const encoder=new TextEncoder();
 const projection='GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433]]';
 function bounds(points){return[Math.min(...points.map(p=>p[0])),Math.min(...points.map(p=>p[1])),Math.max(...points.map(p=>p[0])),Math.max(...points.map(p=>p[1]))];}
 function header(length,type,box){const out=new Uint8Array(100),v=new DataView(out.buffer);v.setInt32(0,9994);v.setInt32(24,length/2);v.setInt32(28,1000,true);v.setInt32(32,type,true);box.forEach((n,i)=>v.setFloat64(36+i*8,n,true));return out;}
 function polygonParts(rings){return rings.map((ring,i)=>{if(ring.length<4||ring[0][0]!==ring.at(-1)[0]||ring[0][1]!==ring.at(-1)[1])throw Error('SHP needs closed polygon rings.');let area=0;for(let j=0;j<ring.length-1;j++)area+=ring[j][0]*ring[j+1][1]-ring[j+1][0]*ring[j][1];return(area>0)===(i===0)?[...ring].reverse():ring;});}
 function body(geometry,type){
  const parts=type===1?[geometry.coordinates]:type===3?[geometry.coordinates]:polygonParts(geometry.coordinates),points=type===1?parts:parts.flat();
  points.forEach(p=>{if(p.length!==2||!p.every(Number.isFinite)||Math.abs(p[0])>180||Math.abs(p[1])>90)throw Error('SHP practice export needs finite 2D WGS84 coordinates. Use GeoJSON to retain altitude.');});
  if(type===1){const out=new Uint8Array(20),v=new DataView(out.buffer);v.setInt32(0,1,true);v.setFloat64(4,points[0][0],true);v.setFloat64(12,points[0][1],true);return{out,points};}
  if(!parts.length||parts.some(p=>p.length<2))throw Error('A shape needs at least two positions.');
  const out=new Uint8Array(44+parts.length*4+points.length*16),v=new DataView(out.buffer);v.setInt32(0,type,true);bounds(points).forEach((n,i)=>v.setFloat64(4+i*8,n,true));v.setInt32(36,parts.length,true);v.setInt32(40,points.length,true);let start=0;parts.forEach((p,i)=>{v.setInt32(44+i*4,start,true);start+=p.length;});points.forEach((p,i)=>{const pos=44+parts.length*4+i*16;v.setFloat64(pos,p[0],true);v.setFloat64(pos+8,p[1],true);});return{out,points};
 }
 function dbf(features){
  const keys=[...new Set(features.flatMap(f=>Object.keys(f.properties||{})))];if(keys.length>100)throw Error('SHP practice export supports up to 100 attribute fields.');
  const rows=features.map((f,i)=>[String(i+1),...keys.map(key=>JSON.stringify(Object.hasOwn(f.properties||{},key)?f.properties[key]:null))]);
  const widths=[9,...keys.map((_,i)=>Math.max(1,...rows.map(row=>encoder.encode(row[i+1]).length)))];if(widths.some(w=>w>254))throw Error('An SHP attribute exceeds 254 UTF-8 bytes. Choose GeoJSON or CSV to keep its complete value.');
  const names=['FID',...keys.map((_,i)=>'P'+String(i+1).padStart(3,'0'))],headerLength=32+names.length*32+1,recordLength=1+widths.reduce((a,b)=>a+b,0),out=new Uint8Array(headerLength+recordLength*rows.length+1),v=new DataView(out.buffer),date=new Date();out[0]=3;out[1]=date.getUTCFullYear()-1900;out[2]=date.getUTCMonth()+1;out[3]=date.getUTCDate();v.setUint32(4,rows.length,true);v.setUint16(8,headerLength,true);v.setUint16(10,recordLength,true);
  names.forEach((name,i)=>{const p=32+i*32;out.set(encoder.encode(name),p);out[p+11]=i===0?78:67;out[p+16]=widths[i];});out[headerLength-1]=13;
  rows.forEach((row,i)=>{let p=headerLength+i*recordLength;out[p++]=32;row.forEach((value,j)=>{out.fill(32,p,p+widths[j]);const bytes=encoder.encode(value);out.set(bytes,p+(j===0?widths[j]-bytes.length:0));p+=widths[j];});});out[out.length-1]=26;
  return{bytes:out,map:Object.fromEntries(keys.map((key,i)=>[names[i+1],key]))};
 }
 function files(collection){
  const out={};for(const [geometry,type,prefix] of [['Point',1,'points'],['LineString',3,'lines'],['Polygon',5,'polygons']]){
   const features=collection.features.filter(f=>f.geometry?.type===geometry);if(!features.length)continue;const bodies=features.map(f=>body(f.geometry,type)),box=bounds(bodies.flatMap(b=>b.points)),size=100+bodies.reduce((n,b)=>n+8+b.out.length,0),shp=new Uint8Array(size),shx=new Uint8Array(100+features.length*8);shp.set(header(size,type,box));shx.set(header(shx.length,type,box));let offset=100;
   bodies.forEach((b,i)=>{const v=new DataView(shp.buffer);v.setInt32(offset,i+1);v.setInt32(offset+4,b.out.length/2);shp.set(b.out,offset+8);const x=new DataView(shx.buffer);x.setInt32(100+i*8,offset/2);x.setInt32(104+i*8,b.out.length/2);offset+=8+b.out.length;});const table=dbf(features);out[prefix+'.shp']=shp;out[prefix+'.shx']=shx;out[prefix+'.dbf']=table.bytes;out[prefix+'.prj']=projection;out[prefix+'.cpg']='UTF-8';out[prefix+'-fields.json']=JSON.stringify({encoding:'UTF-8',values:'JSON-encoded values preserve their original types; decode each mapped column with JSON.parse.',fields:table.map},null,2);
  }
  if(collection.features.some(f=>!['Point','LineString','Polygon'].includes(f.geometry?.type)))throw Error('SHP practice export supports points, lines and polygons.');out['original.geojson']=JSON.stringify(collection,null,2);out['README.txt']='MapNero website practice export. WGS84, 2D. Each geometry type is a separate shapefile. FID starts at 1 within each file. Attribute columns use JSON-encoded values; consult the matching fields.json for original names. original.geojson preserves the complete dataset. No app account data was accessed.\n';return out;
 }
 return{files};
});
