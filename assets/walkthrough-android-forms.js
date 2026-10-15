(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory();
 else root.MapNeroAndroidForms=factory();
})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const template={id:'demo-vegetation',name:'Vegetation Survey',category:'Nature',fields:['Species','Cover class','Observation date','Location']};
 const covers=['Sparse','Moderate','Dense'];
 const categories=['All','EOD','Survey','Nature','Infrastructure','Agriculture','SAR','Environment','Health','Heritage','Humanitarian','CBRN','Safety','Navigation','Medical','General'];
 const clone=value=>JSON.parse(JSON.stringify(value));
 function date(value){if(!value)return null;if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value+'T00:00:00Z'))||new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value)throw Error('Choose a valid observation date.');return value;}
 function validate(input){
  const species=String(input.species||'').trim();if(!species)throw Error('Species is required.');if(species.length>200)throw Error('Species must be 200 characters or fewer.');
  const cover=String(input.cover||'');if(cover&&!covers.includes(cover))throw Error('Choose a listed practice cover class.');
  const location=input.location==null?null:clone(input.location);
  if(location&&(!Array.isArray(location)||location.length!==2||!location.every(Number.isFinite)||Math.abs(location[0])>180||Math.abs(location[1])>90))throw Error('Use a valid longitude and latitude.');
  return{species,cover:cover||null,date:date(input.date),location};
 }
 function create(){
  let query='',category='All',draft={species:'',cover:'',date:'',location:null},records=[],selected=null;
  return{
   filters(q,c){if(!categories.includes(c))throw Error('Choose a listed category.');query=String(q).slice(0,120);category=c;},
   snapshot(){return clone({query,category,draft,records,selected});},
   templates(){return(category==='All'||category===template.category)&&template.name.toLowerCase().includes(query.trim().toLowerCase())?[clone(template)]:[];},
   change(key,value){if(!['species','cover','date'].includes(key))throw Error('Unknown form field.');draft[key]=String(value);},
   capture(){draft.location=[-.1278,51.5074];},clearLocation(){draft.location=null;},
   save(now){const values=validate(draft);if(!Number.isFinite(now)||!Number.isFinite(new Date(now).getTime()))throw Error('Invalid result timestamp.');const record={id:'practice-form-'+(records.length+1),demo:true,templateId:template.id,templateName:template.name,templateType:'form',createdAt:new Date(now).toISOString(),values,coordinateSource:values.location?'predefined London sample; not device GPS':null};records.push(clone(record));selected=record.id;draft={species:'',cover:'',date:'',location:null};return clone(record);},
   select(id){if(!records.some(r=>r.id===id))throw Error('Choose a saved practice result.');selected=id;},
   selected(){return clone(records.find(r=>r.id===selected)||null);},
   geojson(){const r=this.selected();if(!r)throw Error('Save or choose a practice result first.');const {location,...values}=r.values;return{type:'FeatureCollection',features:[{type:'Feature',id:r.id,geometry:location?{type:'Point',coordinates:[...location]}:null,properties:{...r,values}}]};}
  };
 }
 let model=create();function reset(){model=create();}
 function mount(parent,{stage='library',onStage,onBuilder,onStore,onSaved}={}){
  const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent=stage==='form'?'Fill a local field form':stage==='results'?'Saved local field results':'Try the Android template library';group.append(legend);
  const note=document.createElement('p');note.textContent='The real Android reference image stays fixed. These separate practice controls save only in this tab. The Vegetation Survey labels match the captured form; cover choices are illustrative. No account, live GPS, camera or cloud request is made.';group.append(note);
  const body=document.createElement('div'),feedback=document.createElement('p');feedback.setAttribute('role','status');group.append(body,feedback);parent.append(group);
  const button=(name,fn,target=body)=>{const b=document.createElement('button');b.type='button';b.className='app-record-download';b.textContent=name;b.onclick=fn;target.append(b);return b;};
  const input=(label,type,value,target=body)=>{const l=document.createElement('label'),i=document.createElement('input');l.textContent=label;i.type=type;i.value=value;i.setAttribute('aria-label',label);l.append(i);target.append(l);return i;};
  const select=(label,options,value,target=body)=>{const l=document.createElement('label'),i=document.createElement('select');l.textContent=label;i.setAttribute('aria-label',label);for(const [v,title] of options){const o=document.createElement('option');o.value=v;o.textContent=title;i.append(o);}i.value=value;l.append(i);target.append(l);return i;};
  const download=(name,value)=>{const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  let focus=()=>{},submit=()=>{},first=()=>{};
  if(stage==='library'){
   const state=model.snapshot(),search=input('Search local Android templates','search',state.query);search.maxLength=120;
   const category=select('Local Android template category',categories.map(v=>[v,v]),state.category),list=document.createElement('ul');body.append(list);
   const render=()=>{model.filters(search.value,category.value);const found=model.templates();list.replaceChildren();for(const t of found){const li=document.createElement('li'),title=document.createElement('strong'),meta=document.createElement('p');title.textContent=t.name;meta.textContent=t.category+' · 4 fields · separate practice form';li.append(title,meta);button('Run '+t.name,()=>onStage('androidFieldForm'),li);list.append(li);}feedback.textContent=found.length+' matching local template'+(found.length===1?'':'s');};
   search.oninput=category.onchange=render;render();button('Clear local template filters',()=>{search.value='';category.value='All';render();});
   button('Open local field results',()=>onStage('androidFieldResults'));button('Open Android manual builder',onBuilder);button('Browse captured macOS Template Store',onStore);
   focus=()=>search.focus();first=()=>{if(model.templates().length)onStage('androidFieldForm');else feedback.textContent='No matching local template. Clear filters to run the example.';};
  }else if(stage==='form'){
   const state=model.snapshot(),species=input('Practice Species','text',state.draft.species);species.maxLength=200;
   const cover=select('Practice Cover class',[['','Not selected'],...covers.map(v=>[v,v])],state.draft.cover),observed=input('Practice Observation date','date',state.draft.date),coordinate=document.createElement('p');body.append(coordinate);
   const showCoordinate=()=>{const p=model.snapshot().draft.location;coordinate.textContent=p?'Sample location: '+p[1].toFixed(6)+', '+p[0].toFixed(6):'Location not recorded.';};
   species.oninput=()=>model.change('species',species.value);cover.onchange=()=>model.change('cover',cover.value);observed.onchange=()=>model.change('date',observed.value);
   const capture=()=>{model.capture();showCoordinate();feedback.textContent='London sample added. This is not a device location fix.';};
   button('Use London sample for field form',capture);button('Clear field form location',()=>{model.clearLocation();showCoordinate();});showCoordinate();
   submit=()=>{try{const record=model.save(Date.now());onSaved?.(model.geojson(),record);onStage('androidFieldResults');}catch(error){feedback.textContent=error.message;}};
   button('Submit local field form',submit);button('Return to local template library',()=>onStage('androidFieldLibrary'));focus=()=>species.focus();first=capture;
  }else{
   const records=model.snapshot().records,list=document.createElement('ul'),detail=document.createElement('div');body.append(list,detail);
   const render=()=>{detail.replaceChildren();const r=model.selected();if(!r)return;const heading=document.createElement('h4');heading.textContent=r.templateName+' · '+r.id;const values=document.createElement('dl');for(const [key,value] of Object.entries(r.values)){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=value==null?'Not recorded':Array.isArray(value)?value.join(', '):value;values.append(dt,dd);}const stamp=document.createElement('p');stamp.textContent='Saved in this tab: '+r.createdAt;detail.append(heading,stamp,values);button('Download selected field result JSON',()=>download('mapnero-field-result.json',model.selected()),detail);button('Download selected field result GeoJSON',()=>download('mapnero-field-result.geojson',model.geojson()),detail);};
   for(const r of records){const li=document.createElement('li');button('Reopen '+r.id+' · '+r.values.species,()=>{model.select(r.id);render();},li);list.append(li);}
   feedback.textContent=records.length+' saved local result'+(records.length===1?'':'s')+'; page reload or Reset clears them.';render();button('Fill another local field form',()=>onStage('androidFieldForm'));button('Return to local template library',()=>onStage('androidFieldLibrary'));first=()=>{if(records.length){model.select(records[0].id);render();}};
  }
  return{focus,submit,first,cleanup:()=>group.remove()};
 }
 return{create,validate,mount,reset,template,categories,covers};
});
