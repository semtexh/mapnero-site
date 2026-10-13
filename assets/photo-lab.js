(() => {
 'use strict';
 window.renderMapNeroPhotoLab=({intro,controls,surface,say,input,select,action})=>{
 intro.textContent='Choose a photo and burn your labels into a downloadable image. Photos stay in this browser. Coordinates, heading and time are manually entered demo values; no GPS, EXIF extraction or network-time verification is performed.';
 const file=input('Choose JPEG, PNG or WebP','','file');file.accept='image/jpeg,image/png,image/webp';
 const caption=input('Project / caption','London field survey'),place=input('Place name','Westminster'),coords=input('Coordinates (manual)','51.50070, -0.12460'),time=input('Time label (manual)','Demo — time not verified'),note=input('Note','Sample observation'),heading=input('Heading (manual degrees)','0','number');heading.min='0';heading.max='359';
 const opacity=input('Panel opacity (%)','65','number');opacity.min='10';opacity.max='100';
 const compass=select('Compass',['Show sample compass','Hide compass']);
 const canvas=document.createElement('canvas');canvas.setAttribute('aria-label','Photo with a MapNero watermark');surface.append(canvas);
 let image=null,sourceName='',version=0;
 const apply=action('Apply watermark',()=>draw()),exportButton=action('Download watermarked PNG',()=>{if(!draw())return;canvas.toBlob(blob=>{if(!blob){say('Could not export this image.');return;}const a=document.createElement('a'),url=URL.createObjectURL(blob);a.href=url;a.download='mapnero-watermarked-photo.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);say(`Watermarked PNG downloaded (${canvas.width} × ${canvas.height}). Labels are burned into the pixels.`);},'image/png');});
 apply.disabled=true;exportButton.disabled=true;
 action('Show original photo',()=>{if(!image){say('Choose a photo first.');return;}canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);say('Original photo preview. Apply the watermark to restore your labels.');});
 function draw(){
  if(!image){say('Choose a photo first.');return false;}
  const alpha=Number(opacity.value)/100,angle=Number(heading.value);if(!opacity.value.trim()||!heading.value.trim()||!Number.isFinite(alpha)||alpha<.1||alpha>1||!Number.isFinite(angle)||angle<0||angle>=360){say('Use opacity 10–100% and heading 0–359 degrees.');return false;}
  const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,font=Math.max(10,Math.round(Math.min(w,h)*.029)),margin=Math.max(8,font),line=font*1.5;
  ctx.drawImage(image,0,0,w,h);ctx.font=`${font}px sans-serif`;
  const rows=['MAPNERO',caption.value,place.value,coords.value,time.value,`Heading: ${angle}° (manual)`,note.value].map(s=>s.trim()).filter(Boolean);
  const pw=Math.min(w-margin*2,Math.max(...rows.map(s=>ctx.measureText(s).width))+margin*2),ph=rows.length*line+margin*2,x=w-margin-pw,y=h-margin-ph;
  ctx.fillStyle=`rgba(16,31,26,${alpha})`;ctx.fillRect(x,y,pw,ph);ctx.fillStyle='#fff';ctx.textBaseline='top';rows.forEach((row,i)=>ctx.fillText(row,x+margin,y+margin+i*line,pw-margin*2));
  if(compass.selectedIndex===0){const r=font*1.5,cx=margin+r,cy=margin+r;ctx.save();ctx.translate(cx,cy);ctx.fillStyle='rgba(16,31,26,.7)';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.rotate(-angle*Math.PI/180);ctx.fillStyle='#e7bb59';ctx.beginPath();ctx.moveTo(0,-r*.75);ctx.lineTo(r*.3,r*.4);ctx.lineTo(0,r*.15);ctx.lineTo(-r*.3,r*.4);ctx.closePath();ctx.fill();ctx.restore();}
  say(`${sourceName}: watermark applied (${w} × ${h}). Location, time and heading are your labels, not verified photo evidence.`);return true;
 }
 file.onchange=async()=>{
  const id=++version,f=file.files[0];if(!f)return;if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>12000000){say('Choose JPEG, PNG or WebP under 12 MB.');return;}
  let decoded;try{decoded=await createImageBitmap(f);if(id!==version||!surface.isConnected){decoded.close();return;}if(decoded.width<240||decoded.height<240||decoded.width*decoded.height>40000000){decoded.close();say('Use a photo at least 240 × 240 and under 40 megapixels.');return;}if(image)image.close();image=decoded;sourceName=f.name;const scale=Math.min(1,2400/Math.max(image.width,image.height));canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);apply.disabled=false;exportButton.disabled=false;draw();}catch{if(decoded)decoded.close();say('This image could not be decoded. Try a JPEG, PNG or WebP.');}
 };
 new MutationObserver((_,observer)=>{if(!surface.isConnected){version++;if(image){image.close();image=null;}observer.disconnect();}}).observe(document.body,{childList:true,subtree:true});
 say('Choose a photo to start. Images above 2400 pixels are resized for this preview.');
 };
})();
