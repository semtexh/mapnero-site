(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./raster-lab-engine.js'));else root.MapNeroMapImport=factory(root.MapNeroRasterLab);})(typeof window==='undefined'?globalThis:window,function(Raster){
 'use strict';
 const maxBytes=12000000;let state={name:'',record:null,saved:null},revision=0;
 function inspect(buffer){
  if(!(buffer instanceof ArrayBuffer)||buffer.byteLength<8||buffer.byteLength>maxBytes)throw Error('Choose an image or GeoTIFF under 12 MB.');
  const b=new Uint8Array(buffer),starts=(values)=>values.every((value,i)=>b[i]===value);
  if(starts([0x49,0x49,42,0])||starts([0x4d,0x4d,0,42]))return{kind:'GeoTIFF',mime:'image/tiff',...Raster.decode(buffer)};
  if(starts([137,80,78,71,13,10,26,10]))return{kind:'PNG',mime:'image/png',coordinates:null};
  if(starts([255,216,255]))return{kind:'JPEG',mime:'image/jpeg',coordinates:null};
  if(starts([82,73,70,70])&&b.length>=12&&[87,69,66,80].every((value,i)=>b[8+i]===value))return{kind:'WebP',mime:'image/webp',coordinates:null};
  throw Error('This practice importer supports PNG, JPEG, WebP and the supported GeoTIFF subset. PDF, KMZ, links and QR imports are not connected yet.');
 }
 function reset(){revision++;state={name:'',record:null,saved:null};}
 function mount(status){
  const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent='Practice map import';group.append(legend);
  const note=document.createElement('p');note.textContent='Choose a local image or GeoTIFF under 12 MB and 4 million pixels. Supported GeoTIFF: classic, uncompressed, top-left 8-bit RGB/RGBA or grayscale, EPSG:4326 or EPSG:3857. Files stay in this page; nothing is uploaded or added to your app account. The app capture above remains fixed.';group.append(note);
  const nameLabel=document.createElement('label');nameLabel.textContent='Map name';const name=document.createElement('input');name.type='text';name.maxLength=120;name.setAttribute('aria-label','Practice imported map name');name.value=state.name;nameLabel.append(name);group.append(nameLabel);
  const fileLabel=document.createElement('label');fileLabel.textContent='Local map file';const input=document.createElement('input');input.type='file';input.accept='.png,.jpg,.jpeg,.webp,.tif,.tiff';input.setAttribute('aria-label','Local practice map file');fileLabel.append(input);group.append(fileLabel);
  const summary=document.createElement('p');summary.dataset.importSummary='';group.append(summary);
  const preview=document.createElement('div');preview.className='app-import-preview';group.append(preview);
  const feedback=document.createElement('p');feedback.setAttribute('role','status');feedback.dataset.importFeedback='';group.append(feedback);
  const save=document.createElement('button');save.type='button';save.className='app-record-download';save.textContent='Save practice map';group.append(save);
  const download=document.createElement('button');download.type='button';download.className='app-record-download';download.textContent='Download original selected file';group.append(download);
  let pending=false,previewURL=null,alive=true;
  const releasePreview=()=>{if(previewURL)URL.revokeObjectURL(previewURL);previewURL=null;preview.replaceChildren();};
  const update=()=>{save.disabled=pending||!state.record||!state.name.trim();download.disabled=!state.record||pending;};
  const render=()=>{
   releasePreview();const record=state.record;if(!record){summary.textContent='No file imported yet.';update();return;}
   summary.textContent=`${record.file.name}: ${record.kind}, ${record.width} × ${record.height} pixels. ${record.coordinates?'Georeference read from the file (WGS84 longitude, latitude).':'No verified georeference: this image is not positioned on a map.'}`;
   if(record.coordinates){const list=document.createElement('dl');['Top left','Top right','Bottom right','Bottom left'].forEach((label,i)=>{const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=record.coordinates[i].map(v=>v.toFixed(6)).join(', ');list.append(dt,dd);});preview.append(list);}
   if(record.rgba){const canvas=document.createElement('canvas');canvas.width=record.width;canvas.height=record.height;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Actual imported GeoTIFF pixels');canvas.getContext('2d').putImageData(new ImageData(record.rgba,record.width,record.height),0,0);preview.append(canvas);}
   else{previewURL=URL.createObjectURL(new Blob([record.bytes],{type:record.mime}));const image=document.createElement('img');image.src=previewURL;image.width=record.width;image.height=record.height;image.alt='Actual selected local image';preview.append(image);}
   if(state.saved)feedback.textContent=`Saved in this walkthrough: ${state.saved.name}. This does not add a map to your app account.`;update();
  };
  name.oninput=()=>{state.name=name.value;state.saved=null;feedback.textContent='';update();};
  input.onchange=async()=>{
   const file=input.files?.[0];if(!file)return;const token=++revision;state.record=null;state.saved=null;pending=true;releasePreview();summary.textContent='Reading selected file…';feedback.textContent='';update();
   let decodeURL=null;
   try{
    if(file.size>maxBytes)throw Error('Choose a file under 12 MB.');const bytes=await file.arrayBuffer();const details=inspect(bytes);
    if(!alive||token!==revision)return;
    if(!details.rgba){decodeURL=URL.createObjectURL(new Blob([bytes],{type:details.mime}));const image=new Image();image.src=decodeURL;await image.decode();details.width=image.naturalWidth;details.height=image.naturalHeight;if(details.width<1||details.height<1||details.width*details.height>4000000)throw Error('Choose an image with at most 4 million pixels.');}
    if(!alive||token!==revision)return;
    state.record={...details,file,bytes};state.name=state.name.trim()||file.name.replace(/\.[^.]+$/,'').slice(0,120);name.value=state.name;pending=false;render();
   }catch(error){if(alive&&token===revision){pending=false;state.record=null;summary.textContent='File not imported.';feedback.textContent=error.message||'Unable to read this file.';update();}}
   finally{if(decodeURL)URL.revokeObjectURL(decodeURL);input.value='';}
  };
  const saveMap=()=>{if(pending){feedback.textContent='Please wait for the selected file to finish loading.';return;}if(!state.record){feedback.textContent='Choose a supported local file before saving.';return;}if(!state.name.trim()){feedback.textContent='Enter a map name before saving.';return;}state.saved={name:state.name.trim(),file:state.record.file.name,width:state.record.width,height:state.record.height,coordinates:state.record.coordinates};feedback.textContent=`Saved in this walkthrough: ${state.saved.name}. This does not add a map to your app account.`;};
  save.onclick=saveMap;
  download.onclick=()=>{if(!state.record||pending)return;const record=state.record,url=URL.createObjectURL(new Blob([record.bytes],{type:record.mime})),link=document.createElement('a');link.href=url;link.download=record.file.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='Original selected file downloaded without changing its bytes.';};
  render();status.append(group);
  return{chooseFiles:()=>{input.accept='.png,.jpg,.jpeg,.webp,.tif,.tiff';input.click();},choosePhoto:()=>{input.accept='image/png,image/jpeg,image/webp';input.click();},save:saveMap,cleanup:()=>{alive=false;revision++;releasePreview();}};
 }
 return{inspect,mount,reset};
});
