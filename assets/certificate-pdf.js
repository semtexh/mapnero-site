(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./certificate-engine.js'),require('./vendor/pdf-lib/pdf-lib.min.js'),require('./pdf-fonts.js'));else root.MapNeroCertificatePDF=factory(root.MapNeroCertificate,root.PDFLib,root.MapNeroPDFFonts);})(typeof window==='undefined'?globalThis:window,function(E,P,F){
'use strict';
function validate(input){if(input?.demo!==true||input.legalSignature!==false||input.fieldClearanceProof!==false)throw Error('Use a local DEMO certificate snapshot.');const r=E.save(input,input.id,input.createdAt);if(r.certNumber!==input.certNumber)throw Error('Invalid practice certificate number.');return r;}
async function create(input){
 const r=validate(input),doc=await P.PDFDocument.create(),fonts=await F.forDocument(doc,E.fields.map(([key])=>r[key])),font=fonts.font,bold=fonts.bold,rows=[];
 const add=(text,size=10,isBold=false,reserve=0)=>{const f=isBold?bold:font;for(const paragraph of String(text).replace(/\t/g,'    ').split(/\r?\n/)){
  f.encodeText(paragraph);let line='';for(const token of paragraph.split(/(\s+)/)){if(!token)continue;if(f.widthOfTextAtSize(line+token,size)<=491){line+=token;continue;}if(line.trim()){rows.push({text:line.trimEnd(),size,isBold,reserve});reserve=0;line='';}for(const ch of token){if(f.widthOfTextAtSize(line+ch,size)>491&&line){rows.push({text:line.trimEnd(),size,isBold,reserve});reserve=0;line='';}line+=ch;} }
  rows.push({text:line.trimEnd(),size,isBold,reserve});reserve=0;
 }};
 const heading=title=>{rows.push({text:'',size:7});add(title,12,true,60);};const row=(label,value)=>{add(label,9,true,35);add(value===''?'[not entered]':String(value),10);rows.push({text:'',size:4});};
 try{
  add('MapNero - Certificate practice',17,true,65);add('DEMO - NOT A CLEARANCE CERTIFICATE',11,true);add(r.certType,13,true);row('Practice number',r.certNumber);row('Saved snapshot',r.createdAt);
  heading('PROJECT');for(const [k,l]of E.fields.filter(([k])=>['projectName','projectRef','country','operatorOrg','authorityOrg','clientOrg'].includes(k)))row(l,r[k]);
  heading('AREA');for(const [k,l]of E.fields.filter(([k])=>['areaName','areaRef','locationMGRS'].includes(k)))row(l,r[k]);row('Entered area size (m2)',r.areaSize_m2);
  heading('CLEARANCE RECORD PRACTICE');row('Date',r.clearanceDate);row('Methodology',r.methodology);row('Depth',r.clearanceDepth);row('Devices found',r.deviceFound);row('Devices destroyed',r.deviceDestroyed);row('Remarks',r.remarks);
  heading('EDITABLE EXAMPLE STATEMENTS');row('Declaration',r.formalDeclaration.trim()?r.formalDeclaration:E.draft(r.clearanceDate).formalDeclaration);row('Residual risk',r.residualRiskStatement.trim()?r.residualRiskStatement:E.draft(r.clearanceDate).residualRiskStatement);
  heading('SYNTHETIC SIGNATORIES');for(const [k,l]of E.fields.filter(([k])=>['teamLeaderName','teamLeaderRole','authorityRepName','authorityRepRole','handoverRecipientName','handoverRecipientRole'].includes(k)))row(l,r[k]);row('Simulated signed-status flag',r.isSigned?'YES - simulation only':'NO');row('Legal signature / field clearance proof','NONE');
 }catch(e){throw Error('This PDF font cannot represent a saved character. Download JSON to preserve the exact text.');}
 let page,y;const next=()=>{page=doc.addPage([595,842]);y=780;page.drawText('DEMO - NOT A CLEARANCE CERTIFICATE',{x:52,y:815,size:9,font:bold,color:P.rgb(.6,.18,.12)});};next();
 for(const row of rows){const height=row.size+5;if(y-Math.max(height,row.reserve||0)<60)next();if(row.text)page.drawText(row.text,{x:52,y,size:row.size,font:row.isBold?bold:font,color:P.rgb(.12,.17,.2)});y-=height;}
 const pages=doc.getPages();pages.forEach((p,i)=>p.drawText(`Synthetic practice only - No legal signature - Page ${i+1} / ${pages.length}`,{x:52,y:30,size:8,font,color:P.rgb(.35,.4,.43)}));doc.setTitle('DEMO Certificate - '+r.certNumber);doc.setSubject('Synthetic MapNero practice; no legal signature, clearance proof, cloud record or map attachment');doc.setProducer('MapNero website demo');return doc.save();
}
return {validate,create};
});
