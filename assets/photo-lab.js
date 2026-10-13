(() => {
 'use strict';
 window.renderMapNeroPhotoLab=({intro,controls,surface,say,input,select,action})=>{
 intro.textContent='Choose a photo and burn your labels into a downloadable image. Photos stay in this browser. JPEG, PNG and WebP EXIF can fill coordinates, capture wall time and heading. Missing metadata stays blank. These are reported file values, not authenticated evidence; edited labels are marked manual. No device GPS, geocoding or network-time verification is performed.';
 const file=input('Choose JPEG, PNG or WebP','','file');file.accept='image/jpeg,image/png,image/webp';
 const caption=input('Project / caption','London field survey'),place=input('Place name',''),coords=input('Coordinates (photo or manual)',''),time=input('Time label (photo or manual)',''),note=input('Note','Sample observation'),heading=input('Heading (photo or manual degrees)','','number');heading.min='0';heading.max='359';
 const opacity=input('Panel opacity (%)','65','number');opacity.min='10';opacity.max='100';
 const headingRef=select('Heading north reference',['Unknown north reference','True north','Magnetic north']);
 const compass=select('Compass',['Show sample compass','Hide compass']);
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-label','Photo with a MapNero watermark');surface.append(canvas);
 let image=null,sourceName='',version=0,evidence=null,metadataNotice='';
 function metadataLabels(){coords.value=evidence?.coordinate?`${evidence.coordinate.lat.toFixed(6)}, ${evidence.coordinate.lon.toFixed(6)}`:'';time.value=evidence?.wallTime?evidence.wallTime+(evidence.offset?' GMT'+evidence.offset:' (timezone unknown)'):'';heading.value=evidence?.heading===null||evidence?.heading===undefined?'':String(evidence.heading);headingRef.selectedIndex=evidence?.headingReference==='T'?1:evidence?.headingReference==='M'?2:0;place.value='';return {coords:coords.value,time:time.value,heading:heading.value,reference:headingRef.selectedIndex};}
 let reported={};
 action('Use photo metadata',()=>{if(!image){say('Choose a photo first.');return;}reported=metadataLabels();draw();});
 const apply=action('Apply watermark',()=>draw()),exportButton=action('Download watermarked PNG',()=>{if(!draw())return;const exportVersion=version;canvas.toBlob(blob=>{if(exportVersion!==version||!surface.isConnected)return;if(!blob){say('Could not export this image.');return;}const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='mapnero-watermarked-photo.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);say(`Watermarked PNG downloaded (${canvas.width} × ${canvas.height}). Labels are burned into the pixels.`);},'image/png');});
 apply.disabled=true;exportButton.disabled=true;
 action('Show original photo',()=>{if(!image){say('Choose a photo first.');return;}canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);say('Original photo preview. Apply the watermark to restore your labels.');});
 function draw(){
  if(!image){say('Choose a photo first.');return false;}
  const alpha=Number(opacity.value)/100,angle=heading.value.trim()===''?null:Number(heading.value);if(!opacity.value.trim()||!Number.isFinite(alpha)||alpha<.1||alpha>1||(angle!==null&&(!Number.isFinite(angle)||angle<0||angle>=360))){say('Use opacity 10–100%; leave unknown heading blank or enter 0–359 degrees.');return false;}
  const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,font=Math.max(10,Math.round(Math.min(w,h)*.029)),margin=Math.max(8,font),line=font*1.5;
  ctx.drawImage(image,0,0,w,h);ctx.font=`${font}px sans-serif`;
  const from=(key,value)=>value&&(value===reported[key]?'photo EXIF (reported)':'manual label');
  const rows=['MAPNERO',caption.value,place.value,coords.value?coords.value+' · '+from('coords',coords.value):'',time.value?time.value+' · '+from('time',time.value):'',angle===null?'':`Heading: ${angle}° · ${headingRef.options[headingRef.selectedIndex].text} · ${heading.value===reported.heading&&headingRef.selectedIndex===reported.reference?'photo EXIF (reported)':'manual label'}`,note.value].map(s=>s.trim()).filter(Boolean);
  const pw=Math.min(w-margin*2,Math.max(...rows.map(s=>ctx.measureText(s).width))+margin*2),ph=rows.length*line+margin*2,x=w-margin-pw,y=h-margin-ph;
  ctx.fillStyle=`rgba(16,31,26,${alpha})`;ctx.fillRect(x,y,pw,ph);ctx.fillStyle='#fff';ctx.textBaseline='top';rows.forEach((row,i)=>ctx.fillText(row,x+margin,y+margin+i*line,pw-margin*2));
  if(compass.selectedIndex===0&&angle!==null){const r=font*1.5,cx=margin+r,cy=margin+r;ctx.save();ctx.translate(cx,cy);ctx.fillStyle='rgba(16,31,26,.7)';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.rotate(-angle*Math.PI/180);ctx.fillStyle='#e7bb59';ctx.beginPath();ctx.moveTo(0,-r*.75);ctx.lineTo(r*.3,r*.4);ctx.lineTo(0,r*.15);ctx.lineTo(-r*.3,r*.4);ctx.closePath();ctx.fill();ctx.restore();}
  say(`${sourceName}: watermark applied (${w} × ${h}). ${metadataNotice} Labels distinguish reported EXIF from manual edits; no metadata is independently authenticated.`);return true;
 }
 file.onchange=async()=>{
  const id=++version,f=file.files[0];if(!f)return;if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>12000000){say('Choose JPEG, PNG or WebP under 12 MB.');return;}
  apply.disabled=exportButton.disabled=true;say('Reading photo and its metadata…');let decoded;try{decoded=await createImageBitmap(f);if(id!==version||!surface.isConnected){decoded.close();return;}if(decoded.width<240||decoded.height<240||decoded.width*decoded.height>40000000){decoded.close();say('Use a photo at least 240 × 240 and under 40 megapixels.');return;}let parsed;try{parsed=MapNeroPhotoEXIF.read(await f.arrayBuffer());metadataNotice=parsed.found?'Photo EXIF read.':'No supported photo EXIF found.';}catch(e){parsed=null;metadataNotice='Photo EXIF rejected: '+e.message;}if(id!==version||!surface.isConnected){decoded.close();return;}if(image)image.close();image=decoded;evidence=parsed;reported=metadataLabels();sourceName=f.name;const scale=Math.min(1,2400/Math.max(image.width,image.height));canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);apply.disabled=false;exportButton.disabled=false;draw();}catch{if(decoded)decoded.close();say('This image could not be decoded. Try a JPEG, PNG or WebP.');}finally{if(id===version&&surface.isConnected)apply.disabled=exportButton.disabled=!image;}
 };
 new MutationObserver((_,observer)=>{if(!surface.isConnected){version++;if(image){image.close();image=null;}observer.disconnect();}}).observe(document.body,{childList:true,subtree:true});
 say('Choose a photo to start. Images above 2400 pixels are resized for this preview.');
 };
})();
