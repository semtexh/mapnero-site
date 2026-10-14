(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./spot-report-engine.js'));else root.MapNeroSpotReportPractice=factory(root.MapNeroSpotReport);})(typeof window==='undefined'?globalThis:window,function(E){
'use strict';
let state=E.draft(new Date().toISOString()),records=[],selected=null,marked=false;
function mount(parent,{onRecords,onNavigate,mode='form'}={}){
 const box=document.createElement('fieldset');box.className='app-field-trial';
 const make=(tag,text)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;return x;};
 box.append(make('legend','Spot Report - local practice'),make('p','The real app capture above is a fixed reference. Your live practice record appears below. Use synthetic observations only; nothing is sent to an authority or the app cloud.'));
 const status=make('p');status.setAttribute('role','status');box.append(status);parent.append(box);const inputs={};
 const button=(label,fn,target=box)=>{const b=make('button',label);b.type='button';b.className='app-record-download';b.onclick=()=>{try{fn();}catch(e){status.textContent=e.message;}};target.append(b);return b;};
 const download=(data,name,type)=>{const u=URL.createObjectURL(new Blob([data],{type})),a=make('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
 const current=()=>{const r=records.find(r=>r.id===selected);if(!r)throw Error('Open a saved local report first. The captured example is not your practice record.');return r;};
 const open=(r)=>{selected=r.id;onNavigate?.('detail');};
 const openLast=()=>{if(!records.length)throw Error('Save a local practice report first.');open(records.at(-1));};
 const xml=()=>download(E.xml(current()),'mapnero-DEMO-spot-report.xml','application/xml');
 const showMap=()=>{current();onNavigate?.('map');};
 const fresh=()=>{state=E.draft(new Date().toISOString());marked=false;onNavigate?.('form');};
 const save=()=>{if(records.length>=20)throw Error('Twenty local reports already exist. Use Start again to reset.');const r=E.save(state,crypto.randomUUID(),new Date().toISOString());records.push(r);selected=r.id;onRecords?.({type:'FeatureCollection',features:records.map(E.feature)});onNavigate?.('list');status.textContent='Saved immutable local DEMO report. Its map point uses your entered location, not device GPS.';};
 const pick=()=>{marked=false;onNavigate?.('picker');};
 const mark=()=>{marked=true;onNavigate?.('marked');};
 const confirm=()=>{if(!marked)throw Error('Place the captured London sample first.');state.latitude=51.5074;state.longitude=-.1278;marked=false;onNavigate?.('form');};
 const focus=(key='activityWhenFound')=>{if(inputs[key])inputs[key].focus();else{status.textContent='Open the editable form to change this field.';}};
 const safe=fn=>(...args)=>{try{fn(...args);}catch(e){status.textContent=e.message;box.scrollIntoView({block:'center',behavior:'smooth'});}};
 function field(key,label,type='text'){
  const row=make('label',label+' '),i=make(type==='textarea'?'textarea':'input');if(type!=='textarea')i.type=type;i.value=state[key]??'';if(type==='checkbox')i.checked=state[key];if(type==='number')i.step='any';if(type==='text'||type==='textarea')i.maxLength=5000;
  i.oninput=()=>{state[key]=type==='checkbox'?i.checked:type==='number'?(i.value.trim()===''?null:Number(i.value)):i.value;};row.append(i);box.append(row);inputs[key]=i;return i;
 }
 if(mode==='form'){
  field('dtg','Line 1 - Observation time (ISO 8601)');field('latitude','Line 2 - Latitude','number');field('longitude','Line 2 - Longitude','number');button('Pick captured London sample on map',pick);field('locationDescription','Location description');field('activityWhenFound','Line 3 - Activity when found');field('saedaConfirmed','Line 4 - Safety drill confirmation (practice only)','checkbox');field('uxoDescription','Line 5 - Observation description','textarea');const q=field('quantity','Line 6 - Quantity','number');q.min=1;q.max=999;q.step=1;
  const n=field('nbcContamination','Line 7 - Suspected NBC contamination','checkbox'),notes=field('nbcNotes','NBC notes');const toggle=()=>{notes.parentElement.style.display=n.checked?'':'none';};n.addEventListener('change',toggle);toggle();field('protectiveMeasures','Line 8 - Recorded protective measures');
  const priority=make('label','Line 9 - Priority '),select=make('select');E.priorities.forEach(p=>{const o=make('option',p);o.value=p;select.append(o);});select.value=state.priority;select.onchange=()=>{state.priority=select.value;};priority.append(select);box.append(priority);
  for(const [k,l] of [['reporterName','Reporter name'],['reporterRole','Reporter role'],['reporterOrganization','Organization'],['reportingTo','Reporting to'],['missionRef','Mission reference']])field(k,l);
  button('Save local DEMO spot report',save);button('Review report and MGRS',()=>{const r=E.validate(state);status.textContent=`Ready to save: ${r.priority}, quantity ${r.quantity}, ${r.locationMGRS}. Coordinates are entered, not measured.`;});button('Browse saved local reports',()=>onNavigate?.('list'));
 }else if(mode==='picker'||mode==='marked'){
  box.append(make('p','Captured sample: London 51.5074, -0.1278. This selects the recorded example coordinate, not your device location. The reference map cannot be panned; the working map is available after saving.'));
  button('Place captured London sample',mark);button('Confirm captured London sample',confirm);button('Cancel location selection',()=>{marked=false;onNavigate?.('form');});
 }else if(mode==='detail'){
  try{
   const r=current();box.append(make('h4','Your saved local report'));
   for(const [k,l] of [['dtg','Observation time'],['locationMGRS','MGRS'],['activityWhenFound','Activity'],['saedaConfirmed','Safety confirmation'],['uxoDescription','Description'],['quantity','Quantity'],['nbcContamination','NBC'],['nbcNotes','NBC notes'],['protectiveMeasures','Protective measures'],['priority','Priority'],['reporterName','Reporter name'],['reporterRole','Reporter role'],['reporterOrganization','Organization'],['reportingTo','Reporting to'],['missionRef','Mission reference']])box.append(make('p',`${l}: ${r[k]===true?'Yes':r[k]===false?'No':r[k]||'—'}`));
   button('Download selected DEMO XML',xml);button('Download selected saved DEMO JSON',()=>download(JSON.stringify(r,null,2),'mapnero-DEMO-spot-report.json','application/json'));button('Show saved local reports on map',showMap);
  }catch(e){status.textContent=e.message;}
  button('Back to saved local reports',()=>onNavigate?.('list'));
 }else if(mode==='map'){
  box.append(make('p','The captured native map shows the fixed DEMO example. Open the working map below to see all reports you have saved in this browser.'));button('Open working map with saved reports',()=>{current();onNavigate?.('workingMap');});button('Return to selected local report',()=>onNavigate?.('detail'));
 }else{
  box.append(make('p',`${records.length} saved local practice reports. Native screenshot counts remain fixed.`));
  records.forEach((r,i)=>{const item=make('section');item.append(make('h4',`Saved DEMO report ${i+1} - ${r.priority}`),make('p',`${r.locationMGRS} / Quantity ${r.quantity}`),make('p',r.uxoDescription));button('Open saved DEMO report '+(i+1),()=>open(r),item);button('Download DEMO XML '+(i+1),()=>download(E.xml(r),'mapnero-DEMO-spot-report.xml','application/xml'),item);box.append(item);});
  button('New local practice report',fresh);
 }
 return {newRecord:safe(fresh),save:safe(save),focus,openLast:safe(openLast),download:safe(xml),showMap:safe(showMap),pick:safe(pick),mark:safe(mark),confirm:safe(confirm),cleanup:()=>{}};
}
return {mount,hasRecords:()=>records.length>0,reset:()=>{state=E.draft(new Date().toISOString());records=[];selected=null;marked=false;}};
});
