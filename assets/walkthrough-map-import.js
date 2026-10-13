(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./raster-lab-engine.js'));else root.MapNeroMapImport=factory(root.MapNeroRasterLab);})(typeof window==='undefined'?globalThis:window,function(Raster){
 'use strict';
 const maxBytes=12000000;let state={name:'',record:null,saved:null},revision=0;
 function inspect(buffer){
  if(!(buffer instanceof ArrayBuffer)||buffer.byteLength<8||buffer.byteLength>maxBytes)throw Error('Choose an image, PDF or GeoTIFF under 12 MB.');
  const b=new Uint8Array(buffer),starts=(values)=>values.every((value,i)=>b[i]===value);
  if(starts([80,75,3,4]))return{kind:'KMZ',mime:'application/vnd.google-earth.kmz'};
  if(starts([0x49,0x49,42,0])||starts([0x4d,0x4d,0,42]))return{kind:'GeoTIFF',mime:'image/tiff',...Raster.decode(buffer)};
  if(starts([37,80,68,70,45]))return{kind:'PDF',mime:'application/pdf',coordinates:null};
  if(starts([137,80,78,71,13,10,26,10]))return{kind:'PNG',mime:'image/png',coordinates:null};
  if(starts([255,216,255]))return{kind:'JPEG',mime:'image/jpeg',coordinates:null};
  if(starts([82,73,70,70])&&b.length>=12&&[87,69,66,80].every((value,i)=>b[8+i]===value))return{kind:'WebP',mime:'image/webp',coordinates:null};
  throw Error('This practice importer supports PNG, JPEG, WebP, PDF and the supported GeoTIFF subset. KMZ raster overlays are supported; links and QR imports are not connected yet.');
 }
 function reset(){revision++;state={name:'',record:null,saved:null};}
 function mount(status){
  const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent='Practice map import';group.append(legend);
  const note=document.createElement('p');note.textContent='Choose a local image, KMZ raster overlay, PDF (up to 100 pages) or GeoTIFF under 12 MB. Images are limited to 4 million pixels. PDF pages are rendered locally; PDF map coordinates are not extracted. Supported GeoTIFF: classic, uncompressed, top-left 8-bit RGB/RGBA or grayscale, EPSG:4326 or EPSG:3857. Files stay in this page; nothing is uploaded or added to your app account. The app capture above remains fixed.';group.append(note);
  const nameLabel=document.createElement('label');nameLabel.textContent='Map name';const name=document.createElement('input');name.type='text';name.maxLength=120;name.setAttribute('aria-label','Practice imported map name');name.value=state.name;nameLabel.append(name);group.append(nameLabel);
  const fileLabel=document.createElement('label');fileLabel.textContent='Local map file';const input=document.createElement('input');input.type='file';input.accept='.png,.jpg,.jpeg,.webp,.tif,.tiff,.pdf,.kmz';input.setAttribute('aria-label','Local practice map file');fileLabel.append(input);group.append(fileLabel);
  const summary=document.createElement('p');summary.dataset.importSummary='';group.append(summary);
  const preview=document.createElement('div');preview.className='app-import-preview';group.append(preview);
  const feedback=document.createElement('p');feedback.setAttribute('role','status');feedback.dataset.importFeedback='';group.append(feedback);
  const save=document.createElement('button');save.type='button';save.className='app-record-download';save.textContent='Save practice map';group.append(save);
  const download=document.createElement('button');download.type='button';download.className='app-record-download';download.textContent='Download original selected file';group.append(download);
  let pending=false,previewURL=null,alive=true,pdfDocument=null,pdfLoading=null,pdfRender=null,pdfTurn=0;
  const stopPDF=()=>{pdfTurn++;if(pdfRender)pdfRender.cancel();pdfRender=null;if(pdfLoading)pdfLoading.destroy().catch(()=>{});pdfLoading=null;pdfDocument=null;};
  const releasePreview=()=>{if(previewURL)URL.revokeObjectURL(previewURL);previewURL=null;stopPDF();preview.replaceChildren();};
  const update=()=>{save.disabled=pending||!state.record||!state.name.trim();download.disabled=!state.record||pending;};
  const showPDF=async(record)=>{
   const turn=pdfTurn;pending=true;update();
   const pageStatus=document.createElement('p');pageStatus.setAttribute('role','status');pageStatus.textContent='Opening PDF…';preview.append(pageStatus);
   const canvas=document.createElement('canvas');canvas.setAttribute('role','img');preview.append(canvas);
   const previous=document.createElement('button'),next=document.createElement('button');
   for(const button of [previous,next]){button.type='button';button.className='app-record-download';preview.append(button);}
   previous.textContent='Previous PDF page';next.textContent='Next PDF page';previous.disabled=next.disabled=true;
   let drawing=false;
   const current=()=>alive&&turn===pdfTurn&&state.record===record;
   const draw=async(pageNumber)=>{
    if(drawing||!current())return;drawing=true;previous.disabled=next.disabled=true;
    try{
     const page=await pdfDocument.getPage(pageNumber);if(!current())return;
     const base=page.getViewport({scale:1});const scale=Math.min(900/base.width,Math.sqrt(4000000/(base.width*base.height)),2);
     const viewport=page.getViewport({scale});canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);canvas.setAttribute('aria-label',`Actual PDF page ${pageNumber}`);
     pdfRender=page.render({canvasContext:canvas.getContext('2d'),viewport});await pdfRender.promise;if(!current())return;
     record.page=pageNumber;record.pages=pdfDocument.numPages;record.width=canvas.width;record.height=canvas.height;
     pageStatus.textContent=`Page ${pageNumber} of ${record.pages}`;summary.textContent=`${record.file.name}: PDF, ${record.pages} pages. No verified map placement: PDF coordinates are not extracted.`;
     pending=false;update();
    }catch(error){if(current()){pageStatus.textContent='PDF page could not be rendered.';feedback.textContent=error.message;pending=true;update();}}
    finally{drawing=false;if(current()){previous.disabled=pending||record.page<=1;next.disabled=pending||record.page>=record.pages;}if(current())pdfRender=null;}
   };
   previous.onclick=()=>draw(record.page-1);next.onclick=()=>draw(record.page+1);
   try{
    const pdf=await import('./vendor/pdfjs/legacy/build/pdf.min.mjs');if(!current())return;
    const base=new URL('./vendor/pdfjs/',document.currentScript?.src||new URL('assets/walkthrough-map-import.js',document.baseURI));
    pdf.GlobalWorkerOptions.workerSrc=new URL('legacy/build/pdf.worker.min.mjs',base).href;
    pdfLoading=pdf.getDocument({data:new Uint8Array(record.bytes.slice(0)),cMapUrl:new URL('cmaps/',base).href,cMapPacked:true,standardFontDataUrl:new URL('standard_fonts/',base).href,wasmUrl:new URL('wasm/',base).href,isEvalSupported:false});
    const doc=await pdfLoading.promise;if(!current()){await doc.loadingTask.destroy();return;}pdfDocument=doc;
    if(doc.numPages>100)throw Error('Choose a PDF with at most 100 pages.');await draw(record.page||1);
   }catch(error){if(current()){pending=false;state.record=null;state.saved=null;stopPDF();preview.replaceChildren();summary.textContent='File not imported.';feedback.textContent=error.name==='PasswordException'?'Password-protected PDFs are not supported in this walkthrough.':error.message||'Unable to open this PDF.';update();}}
  };
  const render=()=>{
   releasePreview();const record=state.record;if(!record){summary.textContent='No file imported yet.';update();return;}
   summary.textContent=record.kind==='PDF'?`${record.file.name}: Opening PDF…`:`${record.file.name}: ${record.kind}, ${record.width} × ${record.height} pixels. ${record.coordinates?'Georeference read from the file (WGS84 longitude, latitude).':'No verified georeference: this image is not positioned on a map.'}`;
   if(record.kind==='KMZ'){const annotation=document.createElement('p');annotation.textContent=`Bundled image: ${record.imagePath}. Coordinates use ${record.coordinateSource}.${record.multiple?' Multiple overlays found; preview shows the first.':''}${record.geoPayloadPresent?' A MapNero custom transform is also present; this preview reads the KML bounds only, not that transform.':''}`;preview.append(annotation);}if(record.coordinates){const list=document.createElement('dl');['Top left','Top right','Bottom right','Bottom left'].forEach((label,i)=>{const dt=document.createElement('dt');dt.textContent=label;const dd=document.createElement('dd');dd.textContent=record.coordinates[i].map(v=>v.toFixed(6)).join(', ');list.append(dt,dd);});preview.append(list);}
   if(record.kind==='PDF'){showPDF(record);}
   else if(record.rgba){const canvas=document.createElement('canvas');canvas.width=record.width;canvas.height=record.height;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Actual imported GeoTIFF pixels');canvas.getContext('2d').putImageData(new ImageData(record.rgba,record.width,record.height),0,0);preview.append(canvas);}
   else{previewURL=URL.createObjectURL(new Blob([record.previewBytes||record.bytes],{type:record.previewMime||record.mime}));const image=document.createElement('img');image.src=previewURL;image.width=record.width;image.height=record.height;image.alt='Actual selected local image';preview.append(image);if(record.kind==='KMZ'){
    const help=document.createElement('p');help.textContent='Tap the imported image to read a coordinate from its KML bounds. This is an image point, not device GPS.';const readout=document.createElement('p');readout.setAttribute('role','status');const pin=document.createElement('button');pin.type='button';pin.className='app-record-download';pin.textContent='Download selected overlay point';pin.disabled=!record.selectedPoint;const drawPoint=()=>{readout.textContent=record.selectedPoint?`Selected image point: ${record.selectedPoint.map(v=>v.toFixed(6)).join(', ')} (longitude, latitude).`:'No image point selected.';pin.disabled=!record.selectedPoint;};let down=null;image.onpointerdown=event=>{down=[event.clientX,event.clientY];};image.onpointerup=event=>{if(!down||Math.hypot(event.clientX-down[0],event.clientY-down[1])>12)return;down=null;const bounds=image.getBoundingClientRect(),x=(event.clientX-bounds.left)/bounds.width,y=(event.clientY-bounds.top)/bounds.height;try{record.selectedPoint=MapNeroKMZ.coordinateAt(record.coordinates,x,y);drawPoint();}catch(error){readout.textContent=error.message;}};image.onpointercancel=()=>{down=null;};pin.onclick=()=>{if(!record.selectedPoint)return;const data={type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:record.selectedPoint},properties:{demo:true,map_name:state.name,coordinate_source:record.coordinateSource,device_gps:false}}]},url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/geo+json'})),link=document.createElement('a');link.href=url;link.download='mapnero-overlay-point.geojson';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};preview.append(help,readout,pin);drawPoint();}
   }
   if(state.saved)feedback.textContent=`Saved in this walkthrough: ${state.saved.name}. This does not add a map to your app account.`;update();
  };
  name.oninput=()=>{state.name=name.value;state.saved=null;feedback.textContent='';update();};
  input.onchange=async()=>{
   const file=input.files?.[0];if(!file)return;const token=++revision;state.record=null;state.saved=null;pending=true;releasePreview();summary.textContent='Reading selected file…';feedback.textContent='';update();
   let decodeURL=null;
   try{
    if(file.size>maxBytes)throw Error('Choose a file under 12 MB.');const bytes=await file.arrayBuffer();let details=inspect(bytes);if(details.kind==='KMZ'){const overlay=await MapNeroKMZ.parse(bytes,DOMParser),imageDetails=inspect(overlay.imageBytes.buffer);if(!['PNG','JPEG','WebP'].includes(imageDetails.kind))throw Error('KMZ overlay must contain a PNG, JPEG or WebP image.');details={...imageDetails,...overlay,kind:'KMZ',mime:'application/vnd.google-earth.kmz',previewMime:imageDetails.mime,previewBytes:overlay.imageBytes};}
    if(!alive||token!==revision)return;
    if(!details.rgba&&details.kind!=='PDF'){decodeURL=URL.createObjectURL(new Blob([details.previewBytes||bytes],{type:details.previewMime||details.mime}));const image=new Image();image.src=decodeURL;await image.decode();details.width=image.naturalWidth;details.height=image.naturalHeight;if(details.width<1||details.height<1||details.width*details.height>4000000)throw Error('Choose an image with at most 4 million pixels.');}
    if(!alive||token!==revision)return;
    state.record={...details,file,bytes};state.name=state.name.trim()||file.name.replace(/\.[^.]+$/,'').slice(0,120);name.value=state.name;pending=false;render();
   }catch(error){if(alive&&token===revision){pending=false;state.record=null;summary.textContent='File not imported.';feedback.textContent=error.message||'Unable to read this file.';update();}}
   finally{if(decodeURL)URL.revokeObjectURL(decodeURL);input.value='';}
  };
  const saveMap=()=>{if(pending){feedback.textContent='Please wait for the selected file to finish loading.';return;}if(!state.record){feedback.textContent='Choose a supported local file before saving.';return;}if(!state.name.trim()){feedback.textContent='Enter a map name before saving.';return;}state.saved={name:state.name.trim(),file:state.record.file.name,width:state.record.width,height:state.record.height,coordinates:state.record.coordinates};feedback.textContent=`Saved in this walkthrough: ${state.saved.name}. This does not add a map to your app account.`;};
  save.onclick=saveMap;
  download.onclick=()=>{if(!state.record||pending)return;const record=state.record,url=URL.createObjectURL(new Blob([record.bytes],{type:record.mime})),link=document.createElement('a');link.href=url;link.download=record.file.name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='Original selected file downloaded without changing its bytes.';};
  render();status.append(group);
  return{chooseFiles:()=>{input.accept='.png,.jpg,.jpeg,.webp,.tif,.tiff,.pdf,.kmz';input.click();},choosePhoto:()=>{input.accept='image/png,image/jpeg,image/webp';input.click();},save:saveMap,cleanup:()=>{alive=false;revision++;releasePreview();}};
 }
 async function offlineRecord(){if(!state.saved||!state.record)throw Error('Import and Save practice map first.');const r=state.record,name=state.saved.name,token=revision;if(r.kind==='PDF')throw Error('Offline PDF pages are not connected yet. Choose an image, KMZ raster or supported GeoTIFF.');let preview;if(r.rgba){const canvas=document.createElement('canvas');canvas.width=r.width;canvas.height=r.height;canvas.getContext('2d').putImageData(new ImageData(r.rgba,r.width,r.height),0,0);preview=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));}else preview=new Blob([r.previewBytes||r.bytes],{type:r.previewMime||r.mime});if(!preview||revision!==token)throw Error('Imported map changed; save it again before preparing offline use.');return{name,fileName:r.file.name,width:r.width,height:r.height,coordinates:r.coordinates||null,preview,original:new Blob([r.bytes],{type:r.mime}),savedAt:new Date().toISOString()};}
 return{inspect,mount,reset,offlineRecord};
});
