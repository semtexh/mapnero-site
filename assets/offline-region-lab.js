(() => {
 'use strict';
 window.renderMapNeroOfflineRegionLab=({controls,surface,say,select,action})=>{
 const regions=[{name:'Westminster',lon:-.1246,lat:51.5007},{name:'South Bank',lon:-.1195,lat:51.5033},{name:'Bankside',lon:-.0994,lat:51.5076}],region=select('Offline region',regions.map(r=>r.name)),zoom=select('Sample detail',['Overview · 4 tiles','Detail · 9 tiles']);
 let busy=false;
 const status=document.createElement('p');status.textContent='Region cache: illustrative PNG tiles saved in this browser, separately from the encrypted point snapshot. These map tiles are not encrypted. Browser storage may be cleared or evicted.';controls.after(status);
 const key=(id,level,tile)=>new URL(`__mapnero_demo_cache__/v1/${id}/${level}/${tile}`,location.href).href;
 async function read(){
  if(busy)return;busy=true;const id=region.selectedIndex,level=zoom.selectedIndex,n=level?3:2,images=[];try{if(!window.caches)throw Error('Browser map caching is unavailable.');const cache=await caches.open('mapnero-illustrative-regions-v1');for(let i=0;i<n*n;i++){const saved=await cache.match(key(id,level,i));if(!saved)throw Error('This region and detail level are not cached yet. Prepare them first.');images.push(URL.createObjectURL(await saved.blob()));}
   if(!surface.isConnected)return;surface.replaceChildren();const grid=document.createElement('div');grid.className='lab-tile-grid';grid.style.gridTemplateColumns=`repeat(${n},1fr)`;images.forEach((url,i)=>{const img=document.createElement('img');img.src=url;img.alt=`${regions[id].name} sample tile ${i+1}`;img.onload=img.onerror=()=>URL.revokeObjectURL(url);grid.append(img);});surface.append(grid);say(`${regions[id].name}: ${n*n} cached PNG tiles read back without a network request. This demonstrates region storage, not real provider maps or full-page offline loading.`);
  }catch(e){images.forEach(url=>URL.revokeObjectURL(url));say(e.message);}finally{busy=false;}
 }
 const prepare=action('Prepare selected offline region',async()=>{
  if(busy)return;busy=true;prepare.disabled=true;const id=region.selectedIndex,level=zoom.selectedIndex,n=level?3:2,r=regions[id];try{if(!window.caches)throw Error('Browser map caching is unavailable.');const cache=await caches.open('mapnero-illustrative-regions-v1');let bytes=0;
   for(let i=0;i<n*n;i++){const tile=document.createElement('canvas');tile.width=256;tile.height=256;const c=tile.getContext('2d'),x=i%n,y=Math.floor(i/n);c.fillStyle='#e7ecdd';c.fillRect(0,0,256,256);c.strokeStyle='#cbd5bf';c.lineWidth=3;for(let k=0;k<4;k++){c.beginPath();c.moveTo(k*80-x*20,0);c.lineTo(k*80+80-x*20,256);c.stroke();c.beginPath();c.moveTo(0,k*80-y*20);c.lineTo(256,k*80+30-y*20);c.stroke();}c.strokeStyle='#b7d2da';c.lineWidth=42;c.beginPath();c.moveTo(-20,180+(x-y)*20);c.lineTo(280,80+(x-y)*20);c.stroke();c.fillStyle='#294934';c.font='14px sans-serif';c.fillText(r.name,12,24);c.font='11px sans-serif';c.fillText(`${r.lat.toFixed(4)}, ${r.lon.toFixed(4)}`,12,43);c.fillText(`ILLUSTRATION · ${x+1}/${y+1} · detail ${level+1}`,12,240);const blob=await new Promise(resolve=>tile.toBlob(resolve,'image/png'));if(!blob)throw Error('Tile generation failed.');bytes+=blob.size;await cache.put(key(id,level,i),new Response(blob,{headers:{'Content-Type':'image/png'}}));}
   say(`${r.name}: ${n*n} illustrative tiles cached (${bytes.toLocaleString()} bytes). Open the saved region to verify readback; it can be opened again after page reload.`);
  }catch(e){say(`Region preparation failed: ${e.message}`);}finally{busy=false;prepare.disabled=false;}
 });
 action('Open cached region (no network)',read);
 };
})();
