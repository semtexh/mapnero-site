(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./vendor/spatial-buffer/buffer.js'));else root.MapNeroSpatialBuffer=factory(root.MapNeroSpatialVendor);})(typeof window==='undefined'?globalThis:window,function(V){
 'use strict';
 const colors={Orange:'#ff8000',Gold:'#ffc800',Red:'#ff3838',Yellow:'#ffdf00',Green:'#2cc45a',Cyan:'#00aec0',Blue:'#087cff',Purple:'#ad4bd5',Brown:'#a48559',Gray:'#8e949d',Black:'#000000',White:'#ffffff'};
 const clone=value=>JSON.parse(JSON.stringify(value));
 function geometry(g){
  if(!g||!['Point','MultiPoint','LineString','MultiLineString','Polygon','MultiPolygon'].includes(g.type))throw Error('Use points, lines or polygons for this buffer.');
  let count=0;const all=[];
  const pos=p=>{if(!Array.isArray(p)||p.length<2||p.length>3||p.some(x=>typeof x!=='number'||!Number.isFinite(x))||Math.abs(p[0])>179||Math.abs(p[1])>70)throw Error('Use finite coordinates between 70°S and 70°N, away from the date line.');if(++count>2000)throw Error('Use at most 2,000 positions per source.');all.push(p);return[p[0],p[1]];};
  const line=(a,ring=false)=>{if(!Array.isArray(a)||a.length<(ring?4:2))throw Error('A line needs two positions; a ring needs four.');const r=a.map(pos);if(ring&&(r[0][0]!==r.at(-1)[0]||r[0][1]!==r.at(-1)[1]))throw Error('Close every polygon ring before buffering.');return r;};
  const polygon=a=>{if(!Array.isArray(a)||!a.length)throw Error('Use a nonempty polygon.');return a.map(r=>line(r,true));};
  const many=(a,fn)=>{if(!Array.isArray(a)||!a.length||a.length>100)throw Error('Use one to 100 geometry parts.');return a.map(fn);};
  const c=g.type==='Point'?pos(g.coordinates):g.type==='MultiPoint'?many(g.coordinates,pos):g.type==='LineString'?line(g.coordinates):g.type==='MultiLineString'?many(g.coordinates,x=>line(x)):g.type==='Polygon'?polygon(g.coordinates):many(g.coordinates,polygon);
  if(Math.max(...all.map(p=>p[0]))-Math.min(...all.map(p=>p[0]))>2||Math.max(...all.map(p=>p[1]))-Math.min(...all.map(p=>p[1]))>2)throw Error('Use a local source spanning at most two degrees per axis.');
  const clean={type:g.type,coordinates:c};if(!V.valid(clean))throw Error('The source geometry is invalid. Repair it before buffering.');return clean;
 }
 function build(sources,{distance,unit='m',name='',color='Gold',opacity=.22}={}){
  if(typeof distance!=='number'||!Number.isFinite(distance)||!['m','ft'].includes(unit))throw Error('Enter a finite distance and meters or feet.');const meters=distance*(unit==='ft'?.3048:1);if(meters<=0||meters>10000)throw Error('Use a positive buffer distance up to 10,000 meters.');
  if(typeof name!=='string'||name.trim().length>80||/[\x00-\x1f\x7f]/.test(name))throw Error('Use a buffer name up to 80 characters without control characters.');
  if(!Object.hasOwn(colors,color)||!Number.isFinite(opacity)||opacity<.08||opacity>.8)throw Error('Choose a listed color and opacity from 8% to 80%.');
  if(!Array.isArray(sources)||!sources.length||sources.length>50)throw Error('Select one to 50 source features.');
  if(JSON.stringify(sources).length>1000000)throw Error('Use source records under 1 MB.');
  const originals=clone(sources);let total=0;const inputs=originals.map(source=>{if(source?.type!=='Feature')throw Error('Select GeoJSON features.');const input=geometry(source.geometry);const count=x=>{if(typeof x[0]==='number')total++;else x.forEach(count);};count(input.coordinates);if(total>4000)throw Error('Use at most 4,000 positions across the selected sources.');return input;});const features=originals.map((source,index)=>{
   const input=inputs[index],buffered=V.buffer({type:'Feature',geometry:input,properties:{}},meters,{units:'meters',steps:16});
   if(!buffered||!['Polygon','MultiPolygon'].includes(buffered.geometry?.type)||!V.valid(buffered.geometry))throw Error('This source could not produce a valid buffer.');
   return{type:'Feature',geometry:buffered.geometry,properties:{name:name.trim()||(String(source.properties?.name||'Source '+(index+1))+' buffer'),radius_m:meters,input_unit:unit,fill:colors[color],'fill-opacity':opacity,demo:true,device_gps:false,source_feature:source,source_geometry_dimension:'XY; original coordinates retained in source_feature',geometry_method:'Turf 7.4.0 AEQD spherical projection + JSTS planar buffer; 16 segments per quadrant'}};
  });
  return{type:'FeatureCollection',features};
 }
 return{build,geometry,colors};
});
