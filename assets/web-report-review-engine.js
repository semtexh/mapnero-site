(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroWebReportReview=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
const copy=x=>JSON.parse(JSON.stringify(x));
function rows({spots=[],certificates=[],areas=[]}={}){
 return [...spots.map(r=>({id:'spot:'+r.id,kind:'spot',name:r.uxoDescription||'DEMO report',date:r.dtg||null,status:r.priority||null,reference:r.locationMGRS||null,source:copy(r),geometry:typeof r.latitude==='number'&&Number.isFinite(r.latitude)&&Math.abs(r.latitude)<=90&&typeof r.longitude==='number'&&Number.isFinite(r.longitude)&&Math.abs(r.longitude)<=180?{type:'Point',coordinates:[r.longitude,r.latitude]}:null})),...certificates.map(r=>({id:'certificate:'+r.id,kind:'certificate',name:r.areaName||'DEMO certificate',date:r.clearanceDate||null,status:r.isSigned?'SIMULATED SIGNED':'DRAFT',reference:r.certNumber||null,source:copy(r),geometry:null})),...areas.filter(f=>f.geometry?.type==='Polygon').map((f,i)=>({id:'area:'+(f.id??i),kind:'area',name:f.properties?.name||'DEMO area',date:f.properties?.landClosedDate??f.properties?.landWorkedOnDate??f.properties?.landOpenDate??null,status:f.properties?.landStatus??null,reference:f.properties?.landClassification??null,source:copy(f),geometry:copy(f.geometry)}))];
}
function filter(data,{kind='spot',query='',status='ALL',from='',to=''}={}){
 if(!['spot','certificate','area'].includes(kind)||typeof query!=='string'||query.length>5000)throw Error('Choose a record section and valid search.');
 for(const date of [from,to])if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T00:00:00Z'))||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date))throw Error('Choose a valid calendar date.');
 if(from&&to&&from>to)throw Error('Start date must precede end date.');
 const q=query.normalize('NFC').toLocaleLowerCase('en');
 return data.filter(r=>r.kind===kind&&(status==='ALL'||r.status===status)&&[r.name,r.reference,r.source.reporterName,r.source.country,r.source.certType,r.source.projectName].some(v=>String(v??'').normalize('NFC').toLocaleLowerCase('en').includes(q))&&(!from&&!to||r.date&&Number.isFinite(Date.parse(r.date))&&(!from||new Date(r.date).toISOString().slice(0,10)>=from)&&(!to||new Date(r.date).toISOString().slice(0,10)<=to))).sort((a,b)=>(Number.isFinite(Date.parse(b.date))?Date.parse(b.date):-Infinity)-(Number.isFinite(Date.parse(a.date))?Date.parse(a.date):-Infinity));
}
function csv(data){const cell=v=>{let s=String(v??'');if(/^\s*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';};return [['kind','name','date','status','reference','demo','field_clearance_proof'],...data.map(r=>[r.kind,r.name,r.date,r.status,r.reference,true,false])].map(r=>r.map(cell).join(',')).join('\r\n');}
function geojson(data){return {type:'FeatureCollection',features:data.filter(r=>r.geometry).map(r=>({type:'Feature',geometry:copy(r.geometry),properties:{id:r.id,name:r.name,status:r.status,date:r.date,reference:r.reference,demo:true,fieldClearanceProof:false,deviceGPS:false}}))};}
return {rows,filter,csv,geojson};
});
