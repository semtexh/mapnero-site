(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./template-generator-engine.js'));else root.MapNeroTemplateGenerationPractice=factory(root.MapNeroTemplateGenerator);})(typeof window==='undefined'?globalThis:window,function(engine){
 'use strict';
 let prompt='Field Survey Form',result=null;
 function mount(parent,{onForm,onCapture}={}){
  const group=document.createElement('fieldset');group.className='app-field-trial';
  const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  group.append(make('legend','Generate a practice template'),make('p','Describe a template, then generate it locally using MapNero’s native offline rules. Review the result before use. The real app capture stays fixed; your own result appears below. No account, external AI service or phone data is used.'));
  const label=make('label','Template description'),input=make('textarea');input.rows=4;input.maxLength=4000;input.value=prompt;input.setAttribute('aria-label','Template description');label.append(input);group.append(label);
  const feedback=make('p');feedback.setAttribute('role','status');
  const output=make('div');output.dataset.generatedTemplate='';
  const button=(text,action,target=group)=>{const b=make('button',text);b.type='button';b.className='app-record-download';b.onclick=()=>{try{action();}catch(e){feedback.textContent=e.message;}};target.append(b);return b;};
  function render(){output.replaceChildren();if(!result)return;const items=result.schema.fields||result.schema.steps||result.schema.styleRules||[];output.append(make('h4',`${result.type} · ${result.category} · ${items.length} items`));const list=make('ol');for(const item of items){const li=make('li',item.label?`${item.label} · ${item.type}${item.required?' · required':''}`:item.title||`${item.featureType} · ${item.color}`);if(item.options?.length)li.append(make('p',item.options.join(' / ')));if(item.description)li.append(make('p',item.description));if(item.matchKey)li.append(make('p',`${item.matchKey} = ${item.matchValue??'any'}`));list.append(li);}output.append(list);
   button('Download generated template JSON',()=>{const data={name:prompt.trim().slice(0,120),type:result.type,category:result.category,schema:result.schema};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=make('a');a.href=url;a.download='mapnero-generated-template.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='Downloaded the generated schema; no app library changed.';},output);
   if(result.type==='form')button('Edit generated fields in practice builder',()=>{onForm({name:prompt.trim().slice(0,120),fields:result.schema.fields.map(f=>({...f,hint:f.hint||f.placeholder||''}))});},output);
  }
  function generate(){prompt=input.value;const next=engine.generate(prompt);result=next;render();onCapture?.();feedback.textContent='Generated locally. Review the fields and options before using this template.';}
  input.oninput=()=>{prompt=input.value;result=null;output.replaceChildren();feedback.textContent='Description changed. Generate again to review the new result.';};
  for(const sample of ['Field Survey Form','quick survey form','wildlife form','CBRN Hazard Survey','EOD Clearance Checklist','CBRN style'])button(sample,()=>{input.value=sample;prompt=sample;result=null;output.replaceChildren();feedback.textContent='Example selected. Choose Generate Template.';});
  button('Generate Template',generate);group.append(feedback,output);parent.append(group);render();return {generate,cleanup:()=>{}};
 }
 return {mount,reset:()=>{prompt='Field Survey Form';result=null;}};
});
