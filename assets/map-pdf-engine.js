// Vector sample-map PDF with the same VP / Measure / GPTS contract as NeroGeoPDFWriter.swift.
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroSamplePDF=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const bounds={west:-.14,east:-.085,south:51.495,north:51.515};
 const escape=s=>String(s).replace(/[^\x20-\x7e]/g,' ').replace(/[\\()]/g,c=>'\\'+c).slice(0,100);
 function create(title,points){
 const b=bounds;let content='0.91 0.94 0.88 rg 30 60 780 425 re f\n0.73 0.83 0.86 RG 44 w 45 70 m 220 120 330 130 278 255 c 235 380 385 355 472 295 c 595 220 670 440 810 415 c S\n';
 content+='0.98 0.98 0.94 RG 8 w 60 225 m 200 230 l 215 405 l S 340 165 m 480 225 l 640 290 l 760 325 l S\n';
 const text=(x,y,size,t)=>`0.13 0.24 0.18 rg BT /F1 ${size} Tf ${x} ${y} Td (${escape(t)}) Tj ET\n`;
 content+=text(30,545,23,title||'London sample field map')+text(30,520,11,'MAPNERO WORKING DEMO - ILLUSTRATIVE MAP')+text(30,32,10,'WGS84 / EPSG:4326 | Sample data, not for navigation or survey decisions.');
 points.forEach(p=>{if(!Number.isFinite(p.lon)||!Number.isFinite(p.lat))return;const x=30+(p.lon-b.west)/(b.east-b.west)*780,y=60+(p.lat-b.south)/(b.north-b.south)*425;if(x<30||x>810||y<60||y>485)return;content+=`0.76 0.40 0.27 rg ${x.toFixed(2)} ${y.toFixed(2)} 6 6 re f\n`+text(x+10,y+4,9,p.name||'Sample point');});
 const geo=`/VP [<< /Type /Viewport /BBox [30 60 810 485] /Name (MapNeroSample) /Measure << /Type /Measure /Subtype /GEO /GPTS [${b.north} ${b.west} ${b.north} ${b.east} ${b.south} ${b.east} ${b.south} ${b.west}] /LPTS [0 1 1 1 1 0 0 0] /Bounds [0 1 1 1 1 0 0 0] /GCS << /Type /GEOGCS /EPSG 4326 >> >> >>]`;
 const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>',`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 840 595] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> ${geo} >>`,`<< /Length ${content.length} >>\nstream\n${content}endstream`,'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
 let pdf='%PDF-1.7\n',offsets=[0];objects.forEach((o,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${o}\nendobj\n`;});const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;offsets.slice(1).forEach(o=>{pdf+=`${String(o).padStart(10,'0')} 00000 n \n`;});pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;return pdf;
 }
 function extract(text){if(!text.startsWith('%PDF-'))throw Error('Not a PDF file.');const g=text.match(/\/GPTS\s*\[([^\]]+)\]/);if(!g)throw Error('No readable georeference in this demo. Preview is possible, but map placement is not verified.');const values=g[1].trim().split(/\s+/).map(Number);if(values.length!==8||!values.every(Number.isFinite))throw Error('Invalid sample georeference.');return values.reduce((p,v,i)=>{if(i%2===0)p.push({lat:v,lon:values[i+1],name:['NW corner','NE corner','SE corner','SW corner'][i/2]});return p;},[]);}
 return{create,extract,bounds};
});
