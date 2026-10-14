from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
catalog=json.loads((root/'assets/feature-catalog.json').read_text()); explorer=(root/'assets/feature-explorer.js').read_text();player=(root/'assets/app-screen-player.js').read_text()
raw=explorer.split('const playable=',1)[1].split(';',1)[0];links={}
for platform in ['apple','android','web']:
 match=re.search(platform+r':\{([^}]*)\}',raw);links[platform]=dict(re.findall(r"'([^']+)':'([^']+)'",match[1])) if match else {}
frames=set(re.findall(r'^\s*(\w+):\{image:',player,re.M));items=[]
for item in catalog:
 screen=links[item['platform']].get(item['id']); row={'platform':item['platform'],'id':item['id'],'title':item['title'],'entryScreen':screen,'entryExists':screen in frames if screen else False,'captures':[{'path':p,'exists':(root/p).is_file()} for p in item['images']],'requiredGuideSteps':[{**step,'acceptance':'unverified individual workflow step'} for step in item['steps']], 'runtimeAcceptance':'not established by this source inventory'};items.append(row)
report={'scope':'Every feature currently advertised in the site catalog: 74 platform entries and 46 distinct topics. A link or screenshot is not functional acceptance. Existing tests do not establish whole-goal completion.','entries':items}
(root/'docs/demo-coverage-inventory.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
lines=['# Interactive demo acceptance inventory','',report['scope'],'','Source inventory only. Every guide step remains listed in the JSON; none is silently dropped. Reuse a platform workflow only after inspecting its actual native behavior.','', '| Platform | Feature | Entry | Captures | Workflow acceptance |','| --- | --- | --- | --- | --- |']
for item in items:lines.append(f"| {item['platform']} | {item['id']} | {item['entryScreen'] or 'MISSING'} | {len(item['captures'])} | requires individual verification |")
lines+=['','## Concrete remaining gates','']
for platform in ['apple','android','web']:
 missing=[i['id'] for i in items if i['platform']==platform and not i['entryExists']]
 lines.append(f"- {platform}: {len(missing)} unconnected entries: {', '.join(missing) or 'none'}. Connected entries still require every individual guide step to be verified.")
lines+=['- Watch is deferred at the user request. Community/cloud authorization, durable restart, native map/PDF attachment, native Web editing, full export/import parity and physical Safari touch remain separate gates.', '- EOD local record save/reopen/export and native reference captures are documented in certificate-practice.md, evidence-practice.md and web-reports-practice.md; the inventory does not replace those runtime proofs.', '- Encrypted offline snapshot: current live GIS UI did not expose the panel in the 2026-10-14 inspection. Native setup/capture/acceptance remains pending.', '- Style templates have generated/downloadable rule schemas; native stylePreview application is a separate open gate.', '- Preview and publication are separate; no publication is established by this inventory.','', '## Geometry scope', '', f'{len(frames)} source player frames are enumerated. A frame count, a 44px target or a browser viewport does not prove workflow completeness or physical touch acceptance.']
(root/'docs/demo-acceptance-inventory.md').write_text('\n'.join(lines))
for p in links:
 rows=[i for i in items if i['platform']==p];print(p,len(rows),'entries',sum(i['entryExists'] for i in rows),'linked',sum(not i['entryExists'] for i in rows),'unlinked')
