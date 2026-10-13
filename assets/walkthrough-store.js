(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./app-walkthrough/store-catalog.json'));else root.MapNeroStorePractice=factory(null);})(typeof window==='undefined'?globalThis:window,function(initial){
 'use strict';
 let catalog=initial,state={category:'All',query:''};
 function filter(data,category,query){const term=String(query).trim().toLocaleLowerCase();return data.templates.filter(t=>(category==='All'||t.category===category)&&(!term||t.name.toLocaleLowerCase().includes(term)||t.author.toLocaleLowerCase().includes(term)));}
 function reset(){state={category:'All',query:''};}
 function mount(status,{initialCategory,onCapture,onWildlife}){
  if(initialCategory)state.category=initialCategory;
  const group=document.createElement('fieldset');group.className='app-buffer-settings';const legend=document.createElement('legend');legend.textContent='Explore the captured Template Store';group.append(legend);
  const note=document.createElement('p');note.textContent='Browse MapNero-authored public templates captured on 13 October 2026. Categories use real app screenshots. Search filters the captured catalogue below; the screenshot stays fixed unless a matching real search capture is available. Downloads, ratings and your account are not changed.';group.append(note);
  const searchLabel=document.createElement('label');searchLabel.textContent='Search by name or author';const search=document.createElement('input');search.type='search';search.maxLength=120;search.setAttribute('aria-label','Search captured store templates');search.value=state.query;searchLabel.append(search);group.append(searchLabel);
  const categoryLabel=document.createElement('label');categoryLabel.textContent='Category';const category=document.createElement('select');category.setAttribute('aria-label','Captured store category');categoryLabel.append(category);group.append(categoryLabel);
  const summary=document.createElement('p');summary.setAttribute('role','status');summary.dataset.storeResults='';group.append(summary);
  const list=document.createElement('ul');list.className='app-store-results';group.append(list);
  const clear=document.createElement('button');clear.type='button';clear.className='app-record-download';clear.textContent='Clear store filters';group.append(clear);
  let alive=true;
  const render=()=>{
   if(!catalog||!alive)return;
   category.value=state.category;search.value=state.query;
   const results=filter(catalog,state.category,state.query);
   summary.textContent=`${results.length} captured template${results.length===1?'':'s'} · ${state.category}${state.query.trim()?` · “${state.query.trim()}”`:''}`;
   list.replaceChildren();
   for(const template of results){const item=document.createElement('li'),name=document.createElement('strong'),meta=document.createElement('span');name.textContent=template.name;meta.textContent=`${template.author} · ${template.category}`;item.append(name,meta);
    if(template.name==='Wildlife Observation Log'){const open=document.createElement('button');open.type='button';open.className='app-record-download';open.textContent='Open Wildlife Observation Log';open.onclick=onWildlife;item.append(open);}
    list.append(item);
   }
   if(!results.length){const item=document.createElement('li');item.textContent='No matching templates in the captured catalogue.';list.append(item);}
   const exactWildlife=state.query.trim().toLowerCase()==='wildlife'&&state.category==='All';
   onCapture(exactWildlife?'assets/app-walkthrough/store-search-wildlife.jpg':`assets/app-walkthrough/store-category-${state.category.toLowerCase()}.jpg`,state.category);
  };
  search.oninput=()=>{state.query=search.value;render();};category.onchange=()=>{state.category=category.value;render();};clear.onclick=()=>{reset();render();};
  status.append(group);summary.textContent='Loading captured catalogue…';search.disabled=category.disabled=clear.disabled=true;
  const ready=data=>{if(!alive)return;catalog=data;for(const label of catalog.categories){const option=document.createElement('option');option.value=option.textContent=label;category.append(option);}search.disabled=category.disabled=clear.disabled=false;render();};
  if(catalog)ready(catalog);else fetch('assets/app-walkthrough/store-catalog.json').then(r=>{if(!r.ok)throw Error('Catalogue unavailable.');return r.json();}).then(ready).catch(error=>{if(alive)summary.textContent=error.message;});
  return{chooseCategory:value=>{if(catalog?.categories.includes(value)){state.category=value;render();group.scrollIntoView({behavior:'smooth',block:'nearest'});}},focusSearch:()=>{search.focus();group.scrollIntoView({behavior:'smooth',block:'nearest'});},cleanup:()=>{alive=false;}};
 }
 return{filter,mount,reset};
});
