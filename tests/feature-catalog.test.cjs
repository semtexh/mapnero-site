const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'assets/feature-catalog.json')));
test('explorer covers every English platform guide and points only at existing captures',()=>{
 const ctx=vm.createContext({window:{}});
 const html=fs.readFileSync(path.join(root,'guides.html'),'utf8');
 for(const m of html.matchAll(/<script src="(assets\/guides[^"?]+)(?:\?[^\"]*)?"/g))if(m[1]!=='assets/guides.js')vm.runInContext(fs.readFileSync(path.join(root,m[1]),'utf8'),ctx);
 const keys=new Set();
 for(const t of catalog){const key=t.platform+'/'+t.id;assert(!keys.has(key),key);keys.add(key);for(const image of t.images)assert(fs.existsSync(path.join(root,image)),image);assert(t.steps.length>0,key);}
 for(const [p,data] of Object.entries(ctx.window.MAPNERO_GUIDES.en.platforms))for(const t of data.topics){const actual=catalog.find(a=>a.platform===p&&a.id===t.id);assert(actual,p+'/'+t.id);assert.equal(actual.summary,t.summary);assert.equal(JSON.stringify(actual.steps),JSON.stringify(t.steps));}
 assert(keys.has('apple/template-store'));
});
