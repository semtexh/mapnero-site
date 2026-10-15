(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroCommunityPractice=factory();})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  const copy=value=>JSON.parse(JSON.stringify(value));
  const licenses=['CC BY 4.0','CC BY-SA 4.0','CC0 1.0'];
  function publicTrack(feature,metadata){
    const c=feature?.geometry?.coordinates;
    if(feature?.geometry?.type!=='LineString'||!Array.isArray(c)||c.length<2||c.length>10000)throw Error('Choose a line track with 2–10,000 positions.');
    const coordinates=c.map(p=>{if(!Array.isArray(p)||p.length<2||p.length>3||!p.slice(0,2).every(Number.isFinite)||Math.abs(p[0])>180||Math.abs(p[1])>90||p[2]!=null&&!Number.isFinite(p[2]))throw Error('The track contains invalid coordinates.');return p[2]==null?p.slice(0,2):p.slice(0,3);});
    const text=(key,max,required=false)=>{const v=String(metadata[key]??'').trim();if((required&&!v)||v.length>max)throw Error(`Enter ${key}${required?' (required)':''}, up to ${max} characters.`);return v;};
    if(!licenses.includes(metadata.license))throw Error('Choose a supported licence.');
    return {type:'Feature',geometry:{type:'LineString',coordinates},properties:{name:text('name',100,true),author:text('author',80,true),description:text('description',500),region:text('region',100),license:metadata.license,demo:true,device_gps:false}};
  }
  function createModel(){
    let sequence=0,items=[],saved=[],reports=[],blocked=new Set();
    function add(feature,metadata,own=false){const track=publicTrack(feature,metadata),id='trail-'+(++sequence);items.push({id,track,own,order:sequence,rating:0});return id;}
    const line=coordinates=>({geometry:{type:'LineString',coordinates}});
    add(line([[-.1246,51.5007],[-.1238,51.5013],[-.1227,51.502],[-.1217,51.5027]]),{name:'DEMO Westminster practice',author:'Sample contributor A',description:'Synthetic practice geometry. Not a verified walking route.',region:'London · Westminster',license:licenses[0]});
    add(line([[-.1195,51.5033],[-.1158,51.5041],[-.111,51.5053]]),{name:'DEMO South Bank practice',author:'Sample contributor B',description:'Synthetic geometry for catalogue search and independent copies.',region:'London · South Bank',license:licenses[1]});
    const get=id=>{const item=items.find(t=>t.id===id);if(!item)throw Error('This catalogue item is no longer available.');return item;};
    return {
      list(query='',sort='newest'){if(!['newest','rating'].includes(sort))throw Error('Choose Newest or Rating.');const q=query.trim().toLowerCase();return copy(items.filter(t=>!blocked.has(t.track.properties.author)&&['name','description','region'].some(k=>t.track.properties[k].toLowerCase().includes(q))).sort((a,b)=>(sort==='rating'?b.rating-a.rating:0)||b.order-a.order));},
      publish(feature,metadata,{eligible=false,safety=false}={}){if(!eligible||!safety)throw Error('Select the eligible demo account and acknowledge the sharing notice first.');return add(feature,metadata,true);},
      download(id){const item=get(id),record=copy(item.track);record.properties={...record.properties,community_trail_id:id,local_copy_id:'copy-'+(saved.length+1)};saved.push(record);return copy(record);},
      downloaded:()=>({type:'FeatureCollection',features:copy(saved)}),
      rate(id,stars){if(!Number.isInteger(stars)||stars<1||stars>5)throw Error('Choose 1–5 stars.');get(id).rating=stars;},
      report(id){if(get(id).own)throw Error('Use Remove for your own demo publication.');reports.push(id);},
      block(id){const item=get(id);if(item.own)throw Error('Use Remove for your own demo publication.');blocked.add(item.track.properties.author);},
      remove(id){if(!get(id).own)throw Error('Only your own demo publications can be removed.');items=items.filter(t=>t.id!==id);},
      reportCount:()=>reports.length
    };
  }
  let model=createModel();
  function reset(){model=createModel();}
  function mount(parent,{getSources=()=>[],onChange=()=>{}}={}){
    const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent='Try Community Trails locally';group.append(legend);
    const note=document.createElement('p');note.textContent='Search two synthetic London routes, preview, rate and save independent copies. Publish only into this page’s sample catalogue. Reports, author blocking and removal affect this demo only; nothing is sent to the live community. The real app capture stays fixed. All sample routes are unverified.';group.append(note);
    function field(text,type='text',container=group){const label=document.createElement('label');label.textContent=text;const input=document.createElement('input');input.type=type;input.setAttribute('aria-label',text);label.append(input);container.append(label);return input;}
    function select(text,values,container=group){const label=document.createElement('label');label.textContent=text;const s=document.createElement('select');s.setAttribute('aria-label',text);for(const [value,name] of values){const o=document.createElement('option');o.value=value;o.textContent=name;s.append(o);}label.append(s);container.append(label);return s;}
    function button(text,action,container=group){const b=document.createElement('button');b.type='button';b.className='app-record-download';b.textContent=text;b.onclick=()=>{try{action();}catch(e){feedback.textContent=e.message;}};container.append(b);return b;}
    const search=field('Search local community routes','search'),sort=select('Sort local community routes',[['newest','Newest'],['rating','Rating']]);const feedback=document.createElement('p');feedback.setAttribute('role','status');group.append(feedback);const list=document.createElement('div');group.append(list);
    let selected=null,map=null;
    function downloadFile(feature){const blob=new Blob([JSON.stringify(feature,null,2)],{type:'application/geo+json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='mapnero-community-local-copy.geojson';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    function show(item){selected=copy(item.track);map.refresh();if(selected.geometry.coordinates.length<=2000&&selected.geometry.coordinates.every(c=>Math.abs(c[1])<=85.05112878))map.fitCoordinates(selected.geometry.coordinates);feedback.textContent='Previewing '+item.track.properties.name+' · '+item.track.geometry.coordinates.length+' positions · '+item.track.properties.license+'.';}
    function render(){list.replaceChildren();const items=model.list(search.value,sort.value);const count=document.createElement('p');count.textContent=items.length+' local catalogue route(s)';list.append(count);for(const item of items){const card=document.createElement('fieldset'),title=document.createElement('legend');title.textContent=item.track.properties.name;card.append(title);const p=document.createElement('p');p.textContent=[item.track.properties.region,item.track.properties.author,item.track.properties.license,item.track.properties.description,'Your sample rating: '+(item.rating||'unrated')].join(' · ');card.append(p);button('Preview '+item.track.properties.name,()=>show(item),card);button('Save independent copy of '+item.track.properties.name,()=>{const f=model.download(item.id);onChange(model.downloaded());downloadFile(f);feedback.textContent='Independent local copy saved and GeoJSON downloaded. Catalogue changes cannot change this copy.';renderSaved();},card);
      const stars=select('Rate '+item.track.properties.name,[['','Choose stars'],...[1,2,3,4,5].map(n=>[String(n),n+' stars'])],card);stars.value=item.rating?String(item.rating):'';stars.onchange=()=>{try{model.rate(item.id,Number(stars.value));feedback.textContent='Sample rating saved locally.';render();}catch(e){feedback.textContent=e.message;}};
      if(item.own)button('Remove own demo route '+item.track.properties.name,()=>{model.remove(item.id);feedback.textContent='Removed from the sample catalogue. Independent copies remain.';render();},card);
      else {button('Report demo route '+item.track.properties.name,()=>{model.report(item.id);feedback.textContent='Report recorded locally; nothing sent to moderators.';},card);button('Block sample author of '+item.track.properties.name,()=>{model.block(item.id);feedback.textContent='Sample author hidden in this catalogue. Saved copies remain.';render();},card);}list.append(card);}}
    const publish=document.createElement('fieldset'),pl=document.createElement('legend');pl.textContent='Publish to the sample catalogue';publish.append(pl);group.append(publish);
    let sources=[];const source=select('Practice track to publish',[],publish);
    function refreshSources(){sources=getSources();source.replaceChildren();for(const [i,s] of sources.entries()){const o=document.createElement('option');o.value=String(i);o.textContent=s.label;source.append(o);}if(!sources.length){const o=document.createElement('option');o.textContent='Record or build a practice track first';o.value='';source.append(o);}}
    button('Refresh available practice tracks',refreshSources,publish);const name=field('Public demo route name','text',publish),author=field('Public demo author','text',publish),region=field('Public demo region','text',publish),description=field('Public demo description','text',publish),license=select('Public demo licence',licenses.map(x=>[x,x]),publish);name.maxLength=100;author.maxLength=80;region.maxLength=100;description.maxLength=500;author.value='Demo contributor';
    const eligible=field('Use confirmed Core+ demo account','checkbox',publish),safety=field('I can share this geometry and understand routes may be unsafe','checkbox',publish);const disclosure=document.createElement('p');disclosure.textContent='Only geometry, name, author, description, general region and licence enter the local catalogue. Photos, private fields, layer names and device identifiers are excluded. The account selector demonstrates eligibility; it does not verify your real subscription.';publish.append(disclosure);
    button('Publish route to local sample catalogue',()=>{const f=sources[Number(source.value)]?.feature;if(!f)throw Error('Choose an available practice track first.');model.publish(f,{name:name.value,author:author.value,region:region.value,description:description.value,license:license.value},{eligible:eligible.checked,safety:safety.checked});search.value='';feedback.textContent='Published into this page’s sample catalogue only.';render();},publish);
    const saved=document.createElement('div');group.append(saved);function renderSaved(){saved.replaceChildren();const title=document.createElement('h4');title.textContent='Independent saved copies';saved.append(title);for(const f of model.downloaded().features){const p=document.createElement('p');p.textContent=f.properties.local_copy_id+' · '+f.properties.name;saved.append(p);button('Download '+f.properties.local_copy_id,()=>downloadFile(f),saved);}}
    parent.append(group);map=MapNeroLiveMapPractice.mount(group,{getDataset:()=>({type:'FeatureCollection',features:selected?[selected]:[]}),readOnly:true,allowDrawing:false,selectionText:{legend:'Preview community route geometry',note:'The selected sample appears on the real London map. Routes are synthetic and unverified. No GPS or live catalogue is connected.',ready:'Choose Preview beside a local route.'}});
    search.oninput=render;sort.onchange=render;refreshSources();render();renderSaved();
    return{focus:()=>{search.focus();search.scrollIntoView({block:'center'});},first:()=>{const item=model.list(search.value,sort.value)[0];if(item)show(item);},cleanup:()=>{map.cleanup();group.remove();}};
  }
  return {licenses,publicTrack,createModel,reset,mount};
});
