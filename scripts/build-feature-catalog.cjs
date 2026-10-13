const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ctx = vm.createContext({window:{}});
const html = fs.readFileSync(path.join(root,'guides.html'),'utf8');
for (const m of html.matchAll(/<script src="(assets\/guides[^"?]+)(?:\?[^\"]*)?"/g)) {
 if(m[1] === 'assets/guides.js') continue;
 vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),ctx);
}
const catalog=[];
for(const [platform,data] of Object.entries(ctx.window.MAPNERO_GUIDES.en.platforms)) {
 for(const t of data.topics) {
 const candidates=[t.id, ...(t.secondaryCapture ? [t.id+t.secondaryCapture.suffix] : [])];
 const images=candidates.map(id=>`assets/guides/screenshots/${platform}/en/${id}.png`).filter(p=>fs.existsSync(path.join(root,p)));
 catalog.push({platform,platformLabel:data.label,id:t.id,title:t.title,summary:t.summary,access:t.access,note:t.note,steps:t.steps,images});
 }
}
catalog.unshift({platform:'apple',platformLabel:'iPhone · iPad · Mac',id:'template-store',title:'Template Store',summary:'Browse reusable templates by category, preview their fields and add them to your library.',access:'Availability depends on template access and workspace permissions.',note:'The website uses sample templates. It does not download from the live store.',steps:[{title:'Browse',body:'Choose Community or Organization and browse categories or search.'},{title:'Preview',body:'Open a template to review its fields before downloading.'},{title:'Use',body:'Download to your library, then use the template to collect records.'}],images:[]});
catalog.splice(1,0,{...catalog[0],platform:'android',platformLabel:'Android'});
fs.writeFileSync(path.join(root,'assets/feature-catalog.json'),JSON.stringify(catalog,null,2)+'\n');
console.log(`${catalog.length} platform-specific feature guides`);
