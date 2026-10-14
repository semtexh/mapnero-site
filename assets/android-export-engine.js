(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroAndroidExport=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';const copy=x=>JSON.parse(JSON.stringify(x));
function guideLayers(){
 const date='2026-09-12T12:00:00Z',point=(lon,lat)=>({type:'Point',coordinates:[lon,lat]});
 const observations=Array.from({length:10},(_,i)=>({type:'Feature',id:'guide-point-'+i,geometry:point(-71.0640+Math.floor(i/5)*.0017+(i%2)*.0003,42.3592+(i%5)*.0011),properties:{name:'Survey Point '+(i+1),notes:'Synthetic guide data',demo:true,source:'Android guide_capture_fixture.dart'}}));
 observations.push({type:'Feature',id:'guide-area',geometry:{type:'Polygon',coordinates:[[[-71.0670,42.3550],[-71.0630,42.3580],[-71.0580,42.3560],[-71.0610,42.3525],[-71.0670,42.3550]]]},properties:{name:'Survey Area',notes:'Synthetic guide data',demo:true,fieldClearanceProof:false}});
 const coords=Array.from({length:18},(_,i)=>[-71.0710+i*.00078,42.3540+i*.00062,8+(i<9?i:17-i)*4]);
 return [{id:'guide-observations',name:'Guide Observations',data:{type:'FeatureCollection',features:observations}},{id:'guide-tracks',name:'Track Records',data:{type:'FeatureCollection',features:[{type:'Feature',id:'guide-track',geometry:{type:'LineString',coordinates:coords},properties:{name:'Boston Field Walk',notes:'Synthetic guide data',demo:true,startDate:date,endDate:'2026-09-12T12:34:00Z',timestamps:coords.map((_,i)=>new Date(Date.parse(date)+i*120000).toISOString()),speeds:coords.map((_,i)=>2.4+i%4*.35)}}]}}];
}
function layers(datasets){return Object.entries(datasets).filter(([,d])=>d?.type==='FeatureCollection'&&d.features?.length).map(([id,data])=>({id,name:id,data:copy(data)}));}
function select(layers,ids){if(!Array.isArray(ids)||!ids.length)throw Error('Select at least one local layer.');const requested=new Set(ids),found=layers.filter(l=>requested.has(l.id));if(found.length!==requested.size)throw Error('A selected local layer is no longer available. Choose the layers again.');const features=found.flatMap(l=>l.data.features.map(f=>({...copy(f),properties:{...copy(f.properties||{}),export_layer_id:l.id,export_layer_name:l.name,demo:true}})));if(!features.length)throw Error('Selected local layers contain no records.');return {type:'FeatureCollection',features};}
return {guideLayers,layers,select};
});
