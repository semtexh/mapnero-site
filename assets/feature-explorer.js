(() => {
 'use strict';
 const host=document.querySelector('#explore');
 if(!host)return;
 const list=host.querySelector('[data-feature-list]'), detail=host.querySelector('[data-feature-detail]');
 const search=host.querySelector('[data-feature-search]'), platform=host.querySelector('[data-feature-platform]');
 let catalog=[],selected='template-store';
 const playable={web:{'reports':'webReports','layers-features':'webGIS','import-export':'webImportMenu'},android:{'terrain-settings':'androidTerrain','raster-background':'androidBackground','map-layout-export':'androidMapLayout','collections-atlas':'androidCollections','measure-cogo-buffer':'androidMeasure','quick-start':'androidUsageMode','settings-workspace':'androidSettings','buffer-workflow':'androidBuffer','route-builder':'androidRoute','location-track':'androidMap','pins-layers':'androidLayers','mobile-export':'androidExport','create-edit-templates':'androidTemplateBuilder','import-map':'androidImportMap','cluster-analysis':'androidClusters','track-3d':'androidTrack3D','geofences':'androidGeofence','attribute-forms':'androidWildlife'},apple:{'eod-safety':'eodRecords','personal-workspace-sync':'personalWorkspace','track-navigation':'trackFollowOptions','terrain-contours':'terrainContours','attribute-forms':'layerAttributes','military-symbols':'symbols','watermarked-photos':'photoWatermark','map-layout-export':'mapLayout','raster-background':'rasterBackground','team-chat':'team','cluster-analysis':'androidClusters','track-3d':'track3D','collections-atlas':'collections','geofences':'geofence','team-gnss':'gnss','photo-georeference':'manualReference','coordinate-formats':'cogo','cogo-construction':'cogo','template-import':'templateImport','import-map':'importMap','quick-start':'usageMode','template-store':'store','location-track':'londonTrack','pins-layers':'layers','field-templates':'record','create-edit-templates':'templateGenerate','measure-cogo-buffer':'measure','buffer-workflow':'buffer','mobile-export':'export','route-builder':'route','offline-maps':'offline','team-session':'team','track-report':'report','settings-workspace':'settings'}};
 const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 function renderList(){
 const shown=catalog.filter(t=>t.platform===platform.value&&`${t.title} ${t.summary}`.toLowerCase().includes(search.value.toLowerCase()));
 list.replaceChildren();host.querySelector('[data-feature-count]').textContent=`${shown.length} features`;
 if(!shown.length){list.append(el('p','No matching features. Try “map” or “template”.'));detail.replaceChildren();return;}
 if(!shown.some(t=>t.id===selected))selected=shown[0].id;
 shown.forEach(t=>{const b=el('button',t.title);b.type='button';b.dataset.featureId=t.id;b.setAttribute('aria-pressed',String(t.id===selected));b.onclick=()=>{selected=t.id;renderList();};list.append(b);});
 renderDetail(shown.find(t=>t.id===selected));
 }
 function renderDetail(t){
 detail.replaceChildren(el('span',t.platformLabel,'explorer-eyebrow'),el('h3',t.title),el('p',t.summary),el('p',t.access,'explorer-access'));
 if(t.images.length){const gallery=el('div',null,'explorer-captures');t.images.forEach(src=>{const img=el('img');img.src=src;img.alt=`${t.platformLabel}: ${t.title}`;img.loading='lazy';gallery.append(img);});detail.append(gallery,el('p','Actual MapNero app screens','explorer-caption'));}
 else detail.append(el('p','This feature is awaiting its app screen capture.','explorer-caption'));
 const screen=playable[t.platform]?.[t.id];if(screen){const tryScreen=el('button','Try this app screen →','explorer-try-screen');tryScreen.type='button';tryScreen.onclick=()=>document.dispatchEvent(new CustomEvent('mapnero:open-screen',{detail:screen}));detail.append(tryScreen);}
 const steps=el('ol',null,'explorer-steps');t.steps.forEach(s=>{const li=el('li');li.append(el('strong',s.title),el('p',s.body));steps.append(li);});detail.append(steps);
 if(t.note)detail.append(el('p',t.note,'explorer-note'));
 if(t.id!=='template-store'&&!t.extra){const a=el('a','Open the full guide →');a.href=`guides.html?lang=en#${t.platform}/${t.id}`;detail.append(a);}
 }
 function renderStore(){
 const box=el('div',null,'sample-store');box.append(el('span','INTERACTIVE PREVIEW · SAMPLE TEMPLATES','explorer-eyebrow'));
 const input=el('input');input.type='search';input.placeholder='Search sample templates';input.setAttribute('aria-label','Search sample templates');
 const select=el('select');select.setAttribute('aria-label','Template category');['All','Nature','Infrastructure','Survey'].forEach(c=>{const o=el('option',c);o.value=c;select.append(o);});
 const controls=el('div',null,'sample-controls');controls.append(input,select);box.append(controls);
 const results=el('div',null,'sample-results'),preview=el('div',null,'sample-template-detail');preview.setAttribute('aria-live','polite');box.append(results,preview);detail.append(box);
 const examples=[['Trail observation','Nature',['Name','Surface condition','Notes']],['Asset inspection','Infrastructure',['Asset name','Condition','Notes']],['Survey observation','Survey',['Point name','Description','Notes']]];
 function draw(){results.replaceChildren();const matches=examples.filter(t=>(select.value==='All'||t[1]===select.value)&&t[0].toLowerCase().includes(input.value.toLowerCase()));matches.forEach(t=>{const b=el('button',`${t[0]} · ${t[1]} →`);b.type='button';b.onclick=()=>{preview.replaceChildren(el('h4',t[0]),el('p',`Sample fields: ${t[2].join(', ')}`));const use=el('button','Try this sample form');use.type='button';use.onclick=()=>{const form=el('form');t[2].forEach((name,i)=>{const label=el('label',name),field=el('input');field.name=`field${i}`;field.required=i===0;label.append(field);form.append(label);});const save=el('button','Save sample record');save.type='submit';form.append(save);form.onsubmit=e=>{e.preventDefault();preview.replaceChildren(el('h4','Sample record saved'),el('p','This preview keeps no account data. Your record disappears when you switch features or reload.'));};preview.replaceChildren(el('h4',t[0]),form);};preview.append(use);};results.append(b);});if(!matches.length)results.append(el('p','No sample templates match.'));}
 input.oninput=()=>{preview.replaceChildren();draw();};select.onchange=()=>{preview.replaceChildren();draw();};draw();
 }
 function renderMap(){
 const box=el('div',null,'sample-map-demo');box.append(el('span','INTERACTIVE PREVIEW · ILLUSTRATIVE MAP','explorer-eyebrow'));
 const map=el('button',null,'sample-map');map.type='button';map.setAttribute('aria-label','Place a sample pin on the map');
 const marker=el('span','●','sample-pin');marker.hidden=true;map.append(el('span','FIELD OBSERVATIONS','sample-map-label'),marker);
 const tools=el('div',null,'sample-map-tools'),pin=el('button','⌖ Add pin'),layers=el('button','▱ Layers'),reset=el('button','Reset');[pin,layers,reset].forEach(b=>{b.type='button';tools.append(b);});
 const panel=el('div',null,'sample-map-panel'),status=el('p','Choose Add pin, then select a place on the map.','explorer-caption');status.setAttribute('role','status');box.append(map,tools,panel,status);detail.append(box);
 let armed=false,visible=true,saved=false;
 const showMarker=()=>{marker.hidden=!saved||!visible;};
 pin.onclick=()=>{panel.replaceChildren();if(!visible){status.textContent='Open Layers and show Field observations before adding a pin.';return;}armed=true;pin.setAttribute('aria-pressed','true');status.textContent='Select a place on the map. Keyboard: focus the map and press Enter.';};
 map.onclick=e=>{if(!armed||!visible)return;armed=false;pin.setAttribute('aria-pressed','false');const r=map.getBoundingClientRect();marker.style.left=`${e.detail===0?50:Math.max(5,Math.min(95,(e.clientX-r.left)/r.width*100))}%`;marker.style.top=`${e.detail===0?50:Math.max(5,Math.min(90,(e.clientY-r.top)/r.height*100))}%`;const form=el('form'),label=el('label','Pin name'),name=el('input');name.required=true;name.maxLength=80;name.value='Field observation';label.append(name);const save=el('button','Save pin');save.type='submit';form.append(label,save);form.onsubmit=ev=>{ev.preventDefault();if(!visible||!name.value.trim())return;saved=true;showMarker();status.textContent=`“${name.value.trim()}” saved in the sample layer. Try hiding it with Layers.`;panel.replaceChildren();};panel.replaceChildren(form);name.focus();};
 layers.onclick=()=>{armed=false;pin.setAttribute('aria-pressed','false');const toggle=el('button');toggle.type='button';function update(){toggle.textContent=`Field observations · ${visible?'Visible':'Hidden'} · ${saved?'1 pin':'0 pins'}`;toggle.setAttribute('aria-pressed',String(visible));}toggle.onclick=()=>{visible=!visible;showMarker();update();status.textContent=visible?(saved?'Layer visible. Its saved pin is shown.':'Layer visible. You can add a pin.'):'Layer hidden. Its pins are hidden too.';};update();panel.replaceChildren(toggle);};
 reset.onclick=()=>{armed=false;visible=true;saved=false;showMarker();panel.replaceChildren();pin.setAttribute('aria-pressed','false');status.textContent='Choose Add pin, then select a place on the map.';};
 }
 search.oninput=renderList;platform.onchange=()=>{selected='';renderList();};
 fetch('assets/feature-catalog.json').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(data=>{catalog=data;renderList();}).catch(()=>{list.textContent='The feature explorer could not load. Please reload or open our guides.';});
})();
