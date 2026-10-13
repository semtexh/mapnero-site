(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroFieldGame=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const bounds={west:-.14,east:-.085,south:51.495,north:51.515};
 const sites=[{id:'westminster',name:'Westminster',x:252,y:399},{id:'eye',name:'South Bank',x:335,y:328},{id:'tate',name:'Bankside',x:657,y:204}];
 const templates=[{id:'survey',name:'Riverside observation',category:'Survey',fields:['Name','Condition','Notes']},{id:'nature',name:'Green space check',category:'Nature',fields:['Name','Condition','Notes']},{id:'asset',name:'Asset inspection',category:'Infrastructure',fields:['Name','Condition','Notes']}];
 function initial(){return{started:false,template:null,player:{x:180,y:440},records:[],visible:true,layerHiddenOnce:false,layerReviewed:false,recording:false,track:[],trackFinished:false,exported:false};}
 function clamp(p){return{x:Math.max(20,Math.min(880,p.x)),y:Math.max(20,Math.min(540,p.y))};}
 function coordinate(p){return[bounds.west+p.x/900*(bounds.east-bounds.west),bounds.north-p.y/560*(bounds.north-bounds.south)];}
 function distance(a,b){const [lon1,lat1]=coordinate(a),[lon2,lat2]=coordinate(b),r=Math.PI/180;const h=Math.sin((lat2-lat1)*r/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin((lon2-lon1)*r/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
 function trackLength(s){return s.track.slice(1).reduce((n,p,i)=>n+distance(s.track[i],p),0);}
 function nearest(s){return sites.find(p=>Math.hypot(p.x-s.player.x,p.y-s.player.y)<=42)||null;}
 function move(s,p){if(!s.started||!Number.isFinite(p.x)||!Number.isFinite(p.y))return s;const next=clamp(p);return{...s,player:next,track:s.recording?[...s.track,next]:s.track};}
 function choose(s,id){return s.started&&templates.some(t=>t.id===id)?{...s,template:id}:s;}
 function save(s,name,condition,notes){const site=nearest(s);if(!s.started||!s.template||!s.visible||!site||!name.trim()||!['Good','Needs attention','Not assessed'].includes(condition))return s;const record={site:site.id,name:name.trim().slice(0,80),condition,notes:notes.slice(0,400),template:s.template,position:{...s.player}};return{...s,records:[...s.records.filter(r=>r.site!==site.id),record],exported:false};}
 function toggle(s){if(!s.started)return s;return{...s,visible:!s.visible,layerHiddenOnce:s.layerHiddenOnce||s.visible,layerReviewed:s.layerReviewed||(s.layerHiddenOnce&&!s.visible&&s.records.length>0)};}
 function startTrack(s){return s.started?{...s,recording:true,track:[{...s.player}],trackFinished:false,exported:false}:s;}
 function stopTrack(s){return{...s,recording:false,trackFinished:s.track.length>1&&trackLength(s)>=100};}
 function objectives(s){return[{id:'template',title:'Choose a field template',done:!!s.template},{id:'observations',title:'Survey two checkpoints',done:s.records.length>=2},{id:'track',title:'Record a 100 m sample track',done:s.trackFinished},{id:'layers',title:'Hide and restore your layer',done:s.layerReviewed},{id:'export',title:'Export your fieldwork',done:s.exported}];}
 function ready(s){return objectives(s).filter(o=>o.id!=='export').every(o=>o.done)&&!s.recording;}
 function geojson(s){const features=s.records.map(r=>({type:'Feature',properties:{name:r.name,condition:r.condition,notes:r.notes,template:r.template,sample:true},geometry:{type:'Point',coordinates:coordinate(r.position)}}));if(s.trackFinished)features.push({type:'Feature',properties:{name:'Sample London field track',sample:true,distance_m:Math.round(trackLength(s))},geometry:{type:'LineString',coordinates:s.track.map(coordinate)}});return{type:'FeatureCollection',name:'MapNero illustrative London game',features};}
 return{bounds,sites,templates,initial,coordinate,distance,trackLength,nearest,move,choose,save,toggle,startTrack,stopTrack,objectives,ready,geojson};
});
