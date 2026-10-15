import * as M from '../assets/vendor/maplibre/maplibre-gl.mjs';
const E=window.MapNeroRealRegion,status=document.querySelector('#status'),summary=document.querySelector('#summary'),receipt=document.querySelector('#receipt');let loaded=0,missing=0,map;const levels=new Set();
try{
 if(!navigator.serviceWorker.controller)throw Error('Open this viewer from the prepared region in the MapNero preview first.');
 const record=await E.saved({verifyAll:true});if(!record)throw Error('No real-map region has been saved in this browser. Prepare one while online first.');
 summary.textContent=record.name+' · zoom 12–'+record.maxzoom+' · '+record.plan.tiles.length+' verified tiles · '+record.plan.bytes.toLocaleString()+' bytes · saved '+record.createdAt;
 const count=()=>{receipt.textContent='View zoom '+(map?map.getZoom().toFixed(1):'loading')+' · saved levels read: '+([...levels].sort((a,b)=>a-b).join(', ')||'none')+' · cache-only tile reads: '+loaded+' · missing/rejected: '+missing+'. No tile-network fallback.';};
 M.addProtocol('regioncache',async({url})=>{try{const match=/^regioncache:\/\/(\d+)\/(\d+)\/(\d+)\.pbf$/.exec(url);if(!match)throw Error('Unsupported saved tile URL.');const [,z,x,y]=match.map(Number),tile=record.plan.tiles.find(t=>t.z===z&&t.x===x&&t.y===y);if(!tile)throw Error('This tile is outside the saved region.');const data=await E.verify(record.cache,tile,new URL(tile.path,record.baseURL).href);loaded++;levels.add(z);count();return{data};}catch(error){missing++;count();throw error;}});
 M.setWorkerUrl(new URL('../assets/vendor/maplibre/maplibre-gl-worker.mjs',import.meta.url).href);
 map=new M.Map({container:'map',bounds:[[record.bounds[0],record.bounds[1]],[record.bounds[2],record.bounds[3]]],fitBoundsOptions:{padding:30},minZoom:12,maxZoom:18,renderWorldCopies:false,scrollZoom:false,style:E.style({url:'regioncache://{z}/{x}/{y}.pbf',b:record.bounds,maxzoom:record.maxzoom})});
 const fit=()=>map.fitBounds([[record.bounds[0],record.bounds[1]],[record.bounds[2],record.bounds[3]]],{padding:30});
 document.querySelector('#fit').onclick=fit;document.querySelector('#in').onclick=()=>map.jumpTo({zoom:Math.min(18,map.getZoom()+1)});document.querySelector('#out').onclick=()=>map.jumpTo({zoom:Math.max(12,map.getZoom()-1)});
 map.on('load',()=>{document.querySelectorAll('button').forEach(b=>b.disabled=false);status.textContent='Saved real map opened. Pan and pinch to zoom; outside saved tile coverage stays blank. Detail above the saved maximum is enlarged, not newly downloaded.';count();});
 map.on('moveend',count);
 map.on('error',event=>{status.textContent='Saved map: '+event.error.message;});
}catch(error){status.textContent=error.message;summary.textContent='Saved region unavailable; nothing was fetched from a tile provider.';}
