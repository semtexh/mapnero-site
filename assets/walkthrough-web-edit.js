(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./personal-workspace-engine.js'));else root.MapNeroWebEditPractice=factory(root.MapNeroPersonalWorkspace);})(typeof window==='undefined'?globalThis:window,function(P){
  'use strict';
  const copy=v=>JSON.parse(JSON.stringify(v));
  function create(){
    const engine=P.model(),profile='field-observer';let mode=false,target='normal',online=true,next=1;
    const initial={type:'FeatureCollection',features:[{type:'Feature',id:'web-record-1',geometry:{type:'Point',coordinates:[-.1278,51.5074]},properties:{name:'DEMO London observation',Status:'Not reviewed',demo:true,device_gps:false}}]};
    const layer=engine.create(profile,'web','DEMO writable layer',initial),id=layer.id;engine.enable(profile,'web',id,true);engine.upload(profile,'web',id,true);engine.receive(profile,'phone',id,true);
    const local=()=>engine.list(profile,'web')[0];
    function guard(){if(!mode||target!=='normal')throw Error('Enable Edit and choose the writable vector layer. WMS and read-only layers cannot receive edits.');}
    function mutate(fn){guard();const data=local().dataset;fn(data);return engine.edit(profile,'web',id,data);}
    return {
      snapshot:()=>({mode,target,online,local:local(),shared:engine.workspace(profile)[0]}),
      setMode(v){if(typeof v!=='boolean')throw Error('Choose an edit state.');mode=v;},
      setTarget(v){if(!['normal','readonly','wms'].includes(v))throw Error('Choose a practice layer.');target=v;},
      setOnline(v){if(typeof v!=='boolean')throw Error('Choose a connection state.');online=v;},
      guard,
      add(feature){return mutate(data=>{if(data.features.length>=100)throw Error('Use up to 100 local editor records.');const f=copy(feature);f.id='web-record-'+(++next);data.features.push(f);});},
      update(recordID,name,status,geometry){return mutate(data=>{const f=data.features.find(x=>x.id===recordID);if(!f)throw Error('Choose a draft record.');if(!name.trim()||name.trim().length>80||status.length>120)throw Error('Use a name of 1–80 and status up to 120 characters.');f.properties={...f.properties,name:name.trim(),Status:status};f.geometry=copy(geometry);});},
      save(){guard();return engine.upload(profile,'web',id,online);},
      otherEdit(){engine.receive(profile,'phone',id,true,true);const d=engine.list(profile,'phone')[0].dataset;d.features[0].properties.Status='Changed by second editor';engine.edit(profile,'phone',id,d);return engine.upload(profile,'phone',id,true);},
      receive(discard=false){return engine.receive(profile,'web',id,online,discard);}
    };
  }
  let model=create();function reset(){model=create();}
  function mount(parent,{onSaved=()=>{}}={}){
    const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent='Edit a practice Web GIS layer';group.append(legend);const note=document.createElement('p');note.textContent='Draw or edit records in a separate London layer. Saved values and a second editor are simulated in this tab; nothing changes in your account. A newer shared layer revision blocks Save and retains your draft for review.';group.append(note);
    const feedback=document.createElement('p');feedback.setAttribute('role','status');group.append(feedback);
    function field(text,type='text'){const l=document.createElement('label'),i=document.createElement('input');l.textContent=text;i.type=type;i.setAttribute('aria-label',text);l.append(i);group.append(l);return i;}
    function select(text,entries){const l=document.createElement('label'),s=document.createElement('select');l.textContent=text;s.setAttribute('aria-label',text);for(const [value,title]of entries){const o=document.createElement('option');o.value=value;o.textContent=title;s.append(o);}l.append(s);group.append(l);return s;}
    function button(text,fn){const b=document.createElement('button');b.type='button';b.className='app-record-download';b.textContent=text;b.onclick=()=>{try{fn();paint();}catch(e){feedback.textContent=e.message;}};group.append(b);return b;}
    const target=select('Web edit target layer',[['normal','Writable vector layer'],['readonly','Read-only vector layer'],['wms','WMS service layer']]),edit=field('Enable local Web Edit','checkbox'),online=field('Example Web editor online','checkbox');
    const summary=document.createElement('p');summary.setAttribute('role','status');group.append(summary);const record=select('Draft Web record',[]),name=field('Draft Web record name'),status=field('Draft Web record status');name.maxLength=80;status.maxLength=120;
    const label=document.createElement('label'),geometry=document.createElement('textarea');label.textContent='Draft Web record geometry (GeoJSON)';geometry.setAttribute('aria-label',label.textContent);geometry.rows=5;geometry.maxLength=100000;label.append(geometry);group.append(label);
    button('Apply draft Web record edits',()=>{model.update(record.value,name.value,status.value,JSON.parse(geometry.value));feedback.textContent='Draft updated locally; Save has not run.';});
    button('Save practice Web layer',()=>{const saved=model.save();onSaved(saved.dataset);feedback.textContent='Saved local shared revision '+saved.revision+'.';});
    button('Simulate another editor changing this layer',()=>{model.otherEdit();feedback.textContent='Second editor changed the shared copy. Your local draft remains unchanged.';});
    const review=document.createElement('details'),title=document.createElement('summary');title.textContent='Compare draft and latest shared copy';review.append(title);const diff=document.createElement('pre');Object.assign(diff.style,{whiteSpace:'pre-wrap',overflowWrap:'anywhere'});review.append(diff);group.append(review);
    function download(data){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/geo+json'})),a=document.createElement('a');a.href=u;a.download='mapnero-web-edit-draft.geojson';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
    button('Download retained Web draft',()=>download(model.snapshot().local.dataset));const replace=field('Replace my draft with the reviewed newer shared copy','checkbox');button('Load newer shared Web copy',()=>{model.receive(replace.checked);replace.checked=false;feedback.textContent='Latest shared copy loaded; review it before editing again.';});
    let map=null;
    function load(){const f=model.snapshot().local.dataset.features.find(f=>f.id===record.value);name.value=f?.properties?.name||'';status.value=f?.properties?.Status||'';geometry.value=f?JSON.stringify(f.geometry):'';}
    function paint(){const s=model.snapshot(),prior=record.value;target.value=s.target;edit.checked=s.mode;online.checked=s.online;record.replaceChildren();for(const f of s.local.dataset.features){const o=document.createElement('option');o.value=f.id;o.textContent=f.properties.name||f.id;record.append(o);}if(s.local.dataset.features.some(f=>f.id===prior))record.value=prior;load();summary.textContent=`Draft ${s.local.dataset.features.length} records · ${s.local.dirty?'unsaved changes':'saved'} · base revision ${s.local.baseRevision} · shared revision ${s.shared.revision}.`;diff.textContent='YOUR DRAFT\n'+JSON.stringify(s.local.dataset,null,2)+'\nLATEST SHARED\n'+JSON.stringify(s.shared.dataset,null,2);map?.setEditing(s.mode&&s.target==='normal');map?.refresh();}
    target.onchange=()=>{model.setTarget(target.value);paint();};edit.onchange=()=>{model.setMode(edit.checked);paint();};online.onchange=()=>model.setOnline(online.checked);record.onchange=load;parent.append(group);
    map=MapNeroLiveMapPractice.mount(group,{getDataset:()=>model.snapshot().local.dataset,readOnly:true,drawingModel:MapNeroMapDrawing.create(),getPointTarget:()=>{model.guard();return 'normal';},onPoint:(name,lat,lon)=>{model.add({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{name:name.trim()||'Web point',demo:true,device_gps:false}});paint();},onDrawing:data=>{model.add(data.features.at(-1));paint();},selectionText:{legend:'Draw on your practice Web map',note:'Enable Edit on the writable vector layer, then add a point or tap vertices for a line or area. Finish commits it to your local draft. Save checks the shared revision. No GPS or account connection.',ready:'Web editing map ready. Choose the writable layer and enable Edit.'}});paint();
    return{focus:()=>{edit.focus();edit.scrollIntoView({block:'center'});},cleanup:()=>{map.cleanup();group.remove();}};
  }
  return{create,reset,mount};
});
