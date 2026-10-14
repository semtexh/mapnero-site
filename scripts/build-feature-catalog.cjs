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
const retainedCatalog=JSON.parse(fs.readFileSync(path.join(root,'assets/feature-catalog.json'),'utf8'));
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
const extras=[
 ['coordinate-formats','Convert coordinates','Convert WGS84 positions to UTM and MGRS.','Coordinate/UTMConverter.swift'],
 ['cogo-construction','Construct a point by grid bearing','Create a local survey point from distance and grid bearing.','Geo/COGO.swift'],
 ['military-symbols','Choose map symbols','Preview sample identity frames and place a symbol on the map.','UI/Map/MilSymbolPickerView.swift'],
 ['apple-watch','Try the Watch field controls','Start a simulated Watch track, advance a position and save a pin.','MapNeroWatch/Views/TrackView.swift'],
 ['template-import','Import a template field list','Turn a sample CSV header into editable form fields.','UI/Templates/TemplateLibraryView.swift'],
 ['team-chat','Use a sample team chat','Exchange sample messages inside an illustrated team session.','UI/Map/TeamLibraryView.swift']
];
for(const [id,title,summary,source]of extras)catalog.push({platform:'apple',platformLabel:'Apple workflow preview',id,title,summary,access:'Website sample; app access depends on tool and plan.',note:'This is a local workflow demo. It does not claim hardware connection, live communication or every app option.',steps:[{title:'Try the tool',body:summary},{title:'Inspect the result',body:'Change the sample input and run the tool again.'}],images:[],extra:true,source});
const spotReport=catalog.find(t=>t.platform==='apple'&&t.id==='eod-safety');
spotReport.images.push('assets/guides/screenshots/apple/en/spot-report-form-lower.png');
spotReport.images.push(...["assets/guides/screenshots/apple/en/spot-report-empty.png", "assets/guides/screenshots/apple/en/spot-report-form.png", "assets/guides/screenshots/apple/en/spot-report-form-filled.png", "assets/guides/screenshots/apple/en/spot-report-list.png", "assets/guides/screenshots/apple/en/spot-report-detail.png", "assets/guides/screenshots/apple/en/spot-report-picker.png", "assets/guides/screenshots/apple/en/spot-report-picker-marked.png", "assets/guides/screenshots/apple/en/spot-report-map.png"]);
spotReport.note="Real native Spot Report captures plus local synthetic record practice: location selection, immutable save, reopen, XML export and map. The capture text/count stays fixed; live values appear below. Certificate and Land Release are not yet interactive.";
spotReport.images.push(...["assets/guides/screenshots/apple/en/mine-action-home.png", "assets/guides/screenshots/apple/en/certificate-empty.png", "assets/guides/screenshots/apple/en/evidence-empty.png", "assets/guides/screenshots/apple/en/programme-rollup.png", "assets/guides/screenshots/apple/en/land-release-empty.png", "assets/guides/screenshots/apple/en/certificate-project.png", "assets/guides/screenshots/apple/en/certificate-area.png", "assets/guides/screenshots/apple/en/certificate-signatories.png", "assets/guides/screenshots/apple/en/certificate-declaration.png"]);
spotReport.note="Real native Mine Action, Spot Report and Certificate captures. Local synthetic Spot Report XML and Certificate form/archive/JSON work; Certificate PDF/map association, Land Release, cloud and official acceptance remain incomplete.";
spotReport.note="Real native Mine Action, Spot Report and Certificate captures. Local synthetic Spot Report XML and Certificate form/archive/reopen/PDF/JSON work; native PDF comparison, map association, Land Release, cloud and official acceptance remain incomplete.";
// Keep authored capture lists and acceptance notes across guide regeneration.
for(const item of catalog){const prior=retainedCatalog.find(t=>t.platform===item.platform&&t.id===item.id);if(prior){item.images=prior.images;item.note=prior.note;}}
const androidExport=catalog.find(t=>t.platform==='android'&&t.id==='mobile-export');androidExport.note='Actual Android layer selection capture plus local All/None/Next and selected-layer downloads. GPX/KML/KMZ/CSV/GeoJSON and 2D SHP work; GPKG/DXF/QGIS, native format/delivery captures, sharing and physical-device acceptance remain pending.';
const webReports=catalog.find(t=>t.platform==='web'&&t.id==='reports');webReports.images=['reports','areas','certificates'].flatMap(kind=>['desktop','mobile'].map(view=>`assets/guides/screenshots/web/en/${kind}-${view}.jpg`));webReports.note='Actual Web list privacy crops and local synthetic review: search, date/status, selection, detail readback and CSV/GeoJSON. Native Web create/edit, populated detail/attachments, audit and authorization acceptance remain pending.';
for(const id of ['layers-features','import-export']){const item=catalog.find(t=>t.platform==='web'&&t.id===id);item.images=[`assets/guides/screenshots/web/en/${id}.jpg`,`assets/guides/screenshots/web/en/${id}-mobile.jpg`];}
spotReport.images.push(...['certificate-saved-list.png','certificate-saved-detail.png','certificate-native-pdf-preview.png'].map(name=>'assets/guides/screenshots/apple/en/'+name).filter(p=>!spotReport.images.includes(p)));
spotReport.images.push(...['evidence-form','evidence-list-sample','evidence-detail','evidence-handover','evidence-history'].map(id=>`assets/guides/screenshots/apple/en/${id}.png`).filter(p=>!spotReport.images.includes(p)));
spotReport.note='Actual native Mine Action, Spot Report, Certificate and Evidence captures with local synthetic record practice. Native classified Land Release, durable storage, cloud, export parity and physical touch remain separate acceptance gates.';
spotReport.images.push(...['land-release-classification','land-release-products','land-release-released','land-release-progression'].map(id=>`assets/guides/screenshots/apple/en/${id}.png`).filter(p=>!spotReport.images.includes(p)));
spotReport.note='Real native Mine Action, Spot Report, Certificate, Evidence and classified Land Release editor/list/progression references with local synthetic record practice. Durable storage, cloud, export parity and physical touch remain separate acceptance gates.';
fs.writeFileSync(path.join(root,'assets/feature-catalog.json'),JSON.stringify(catalog,null,2)+'\n');
console.log(`${catalog.length} platform-specific feature guides`);
