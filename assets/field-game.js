(() => {
 'use strict';
 const host=document.querySelector('#field-game');if(!host)return;
 const E=window.MapNeroFieldGame;let state=E.initial(),frame=null,destination=null,lastTime=0;
 const find=s=>host.querySelector(s),map=find('[data-game-map]'),player=find('[data-player]'),track=find('[data-track]'),records=find('[data-records]'),panel=find('[data-game-panel]'),status=find('[data-game-status]');
 const make=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
 const svg=(tag,attrs)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));return n;};
 function message(text){status.textContent=text;}
 function render(){
 player.setAttribute('transform',`translate(${state.player.x} ${state.player.y})`);
 track.setAttribute('points',state.track.map(p=>`${p.x},${p.y}`).join(' '));track.hidden=!state.visible;
 track.style.display=state.visible?'':'none';records.replaceChildren();
 if(state.visible)state.records.forEach(r=>{const g=svg('g',{transform:`translate(${r.position.x} ${r.position.y})`}),circle=svg('circle',{r:9,fill:'#d55341',stroke:'#fff','stroke-width':3});g.append(circle);records.append(g);});
 find('[data-track-readout]').textContent=`${Math.round(E.trackLength(state))} m · ${state.recording?'recording':state.trackFinished?'saved':'sample track'}`;
 const pos=E.coordinate(state.player);find('[data-coordinate]').textContent=`${pos[1].toFixed(5)}° N · ${Math.abs(pos[0]).toFixed(5)}° W`;
 const goals=E.objectives(state);find('[data-game-progress]').textContent=`${goals.filter(o=>o.done).length} / ${goals.length}`;
 const tasks=find('[data-game-tasks]');tasks.replaceChildren();goals.forEach(o=>{const li=make('li');li.className=o.done?'game-task done':'game-task';li.append(make('span',o.done?'✓':'○'),make('span',o.title));tasks.append(li);});
 host.querySelectorAll('[data-visit],[data-step]').forEach(b=>{b.disabled=!state.started;});
 find('[data-game-start]').hidden=state.started;find('[data-game-controls]').hidden=!state.started;
 find('[data-game-export]').disabled=!E.ready(state);
 find('[data-game-inspect]').disabled=!state.started||!E.nearest(state);
 find('[data-game-track]').textContent=state.recording?'■ Finish track':'● Record track';
 find('[data-game-complete]').hidden=!goals.every(o=>o.done);
 find('[data-game-layer]').setAttribute('aria-pressed',String(state.visible));
 find('[data-game-layer]').textContent=state.visible?'◉ Hide layer':'◎ Show layer';
 const near=E.nearest(state);find('[data-checkpoint-readout]').textContent=near?`At ${near.name} · ready to inspect`:'Move to a gold checkpoint';
 }
 function stopMoving(){if(frame!==null)cancelAnimationFrame(frame);frame=null;destination=null;lastTime=0;}
 function travel(target){if(!state.started)return;stopMoving();destination=target;message('Walking through the sample map. Use arrow keys to steer, or select another destination.');
 function tick(time){const dt=lastTime?Math.min((time-lastTime)/1000,.05):.016;lastTime=time;const dx=destination.x-state.player.x,dy=destination.y-state.player.y,d=Math.hypot(dx,dy),step=120*dt;
 if(d<=step){state=E.move(state,destination);stopMoving();render();const near=E.nearest(state);message(near?`You reached ${near.name}. Open Inspect checkpoint to save a field record.`:'Destination reached.');return;}
 state=E.move(state,{x:state.player.x+dx/d*step,y:state.player.y+dy/d*step});render();frame=requestAnimationFrame(tick);}
 frame=requestAnimationFrame(tick);
 }
 find('[data-game-start]').onclick=()=>{state={...state,started:true};render();openStore();message('Mission started. Choose a sample template, then visit two checkpoints.');};
 function openStore(){panel.replaceChildren(make('h3','Template Store'),make('p','Sample templates for this mission. Search and choose one to collect field observations.'));
 const label=make('label','Search templates'),input=make('input');input.type='search';input.placeholder='Survey, nature, asset…';label.append(input);const list=make('div');list.className='game-store-list';panel.append(label,list);
 function draw(){list.replaceChildren();const matched=E.templates.filter(t=>`${t.name} ${t.category}`.toLowerCase().includes(input.value.toLowerCase()));matched.forEach(t=>{const b=make('button',`${t.name} · ${t.category}`);b.type='button';b.setAttribute('aria-pressed',String(state.template===t.id));b.onclick=()=>{state=E.choose(state,t.id);panel.replaceChildren(make('h3',t.name),make('p',`Fields: ${t.fields.join(', ')}.`),make('p','Template ready. Choose a checkpoint on the map, then inspect it.'));render();message(`${t.name} selected. Visit a gold checkpoint.`);};list.append(b);});if(!matched.length)list.append(make('p','No matching sample template.'));}input.oninput=draw;draw();
 }
 find('[data-game-store]').onclick=openStore;
 find('[data-game-inspect]').onclick=()=>{stopMoving();const site=E.nearest(state);if(!site)return;if(!state.template){openStore();message('Choose a template before recording observations.');return;}if(!state.visible){message('Show the observations layer before saving.');return;}
 panel.replaceChildren(make('h3',`Inspect ${site.name}`));const form=make('form'),label=make('label','Observation name'),name=make('input');name.required=true;name.maxLength=80;name.value=`${site.name} observation`;label.append(name);const conditionLabel=make('label','Condition'),condition=make('select');['Good','Needs attention','Not assessed'].forEach(c=>condition.append(make('option',c)));conditionLabel.append(condition);const noteLabel=make('label','Notes'),notes=make('textarea');notes.maxLength=400;noteLabel.append(notes);const save=make('button','Save observation');save.type='submit';form.append(label,conditionLabel,noteLabel,save);form.onsubmit=e=>{e.preventDefault();const next=E.save(state,name.value,condition.value,notes.value);if(next===state){message('Cannot save: use a visible layer, select a template and enter a name at a checkpoint.');return;}state=next;panel.replaceChildren(make('h3','Observation saved'),make('p',`${name.value.trim()} · ${condition.value}`));render();message(`${site.name} recorded. ${state.records.length} of 2 checkpoints surveyed.`);};panel.append(form);name.focus();};
 find('[data-game-track]').onclick=()=>{if(state.recording){state=E.stopTrack(state);message(state.trackFinished?'Sample track saved.':'Track is shorter than 100 m. Start another recording and walk farther.');}else{state=E.startTrack(state);message('Track recording started. Walk to another checkpoint, then finish the track.');}render();};
 find('[data-game-layer]').onclick=()=>{state=E.toggle(state);render();message(state.visible?'Observations and track restored.':'Layer hidden; your saved observations are kept.');};
 find('[data-game-export]').onclick=()=>{if(!E.ready(state))return;const json=JSON.stringify(E.geojson(state),null,2),url=URL.createObjectURL(new Blob([json],{type:'application/geo+json'})),link=make('a');link.href=url;link.download='mapnero-london-sample.geojson';link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);state={...state,exported:true};render();message('Mission complete. Sample fieldwork exported as GeoJSON.');};
 find('[data-game-reset]').onclick=()=>{stopMoving();state=E.initial();panel.replaceChildren(make('h3','Your first field mission'),make('p','Choose a template, explore the riverside and bring back a small field dataset.'));render();message('Mission reset. Start whenever you are ready.');};
 map.addEventListener('click',e=>{if(!state.started)return;const point=map.createSVGPoint();point.x=e.clientX;point.y=e.clientY;const p=point.matrixTransform(map.getScreenCTM().inverse());travel(E.move(state,p).player);map.focus();});
 map.addEventListener('keydown',e=>{const keys={ArrowLeft:[-12,0],a:[-12,0],ArrowRight:[12,0],d:[12,0],ArrowUp:[0,-12],w:[0,-12],ArrowDown:[0,12],s:[0,12]};if(!state.started||!keys[e.key])return;e.preventDefault();stopMoving();const [dx,dy]=keys[e.key];state=E.move(state,{x:state.player.x+dx,y:state.player.y+dy});render();});
 host.querySelectorAll('[data-visit]').forEach(b=>b.onclick=()=>{travel(E.sites.find(s=>s.id===b.dataset.visit));map.focus();});
 host.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{stopMoving();const [dx,dy]=b.dataset.step.split(',').map(Number);state=E.move(state,{x:state.player.x+dx,y:state.player.y+dy});render();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMoving();});render();
})();
