// Values transcribed from the public track-report.png app capture.
// No full track geometry or per-point measurements are available in this capture.
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroCapturedReport=factory();})(typeof window==='undefined'?globalThis:window,function(){
 'use strict';
 const title='Track - 8 Eyl 2026 17:27';
 function rows(units='metric'){
  if(!['metric','imperial'].includes(units))throw Error('Choose metric or imperial units.');
  const imperial=units==='imperial';
  const speed=k=>imperial?`${(k/1.609344).toFixed(1)} mph`:`${k.toFixed(1)} km/h`;
  const paceSeconds=Math.round(434*(imperial?1.609344:1));
  return [
   ['Start location','29.10300, 48.07300'],['End location','29.10349, 48.07400'],
   ['Total duration','1m 51s'],['Moving time','1m 51s'],['Paused time','0m 00s'],
   ['Total distance',imperial?`${(255/0.3048).toFixed(1)} ft`:'255 m'],
   ['Average speed',speed(8.3)],['Max speed',speed(14.4)],
   ['Min speed (moving)',speed(14.4)],['Median speed',speed(14.4)],
   ['Average pace',`${Math.floor(paceSeconds/60)}:${String(paceSeconds%60).padStart(2,'0')} /${imperial?'mi':'km'}`],
   ...['Start elevation','End elevation','Elevation gain','Elevation loss','Net elevation','Elevation range','Min elevation','Max elevation'].map(name=>[name,imperial?'0 ft':'0 m']),
   ['GPS points','34']
  ];
 }
 function createPDF(units='metric'){
  const report=rows(units);
  const escape=value=>String(value).replace(/[\\()]/g,c=>'\\'+c);
  const text=(x,y,size,value,font='F1')=>`BT /${font} ${size} Tf ${x} ${y} Td (${escape(value)}) Tj ET\n`;
  let content='0.12 0.25 0.18 rg\n'+text(42,790,22,'MapNero | Track report','F2')+text(42,765,12,title);
  content+=text(42,738,10,'WEBSITE PRACTICE - TRANSCRIBED APP CAPTURE','F2');
  content+=text(42,720,10,`Units: ${units==='imperial'?'Imperial (converted from displayed metric values)':'Metric (as displayed)'}`);
  report.forEach(([label,value],i)=>{
   const y=683-i*24;
   content+='0.82 0.87 0.82 RG 0.5 w 42 '+(y-8)+' m 553 '+(y-8)+' l S\n0.12 0.25 0.18 rg\n';
   content+=text(42,y,11,label)+text(334,y,11,value);
  });
  content+=text(42,158,9,'Source: assets/guides/screenshots/apple/en/track-report.png');
  content+=text(42,140,9,'Coordinates are shown as latitude, longitude. The full 34-point track is unavailable.');
  content+=text(42,122,9,'Elevation zeros are copied from the capture; valid measured altitude is not verified.');
  content+=text(42,104,9,'Statistics are copied as displayed, not recomputed from the two endpoint coordinates.');
  content+=text(42,86,9,'This is a practice report, not a live GPS record, GPX file or account export.');
  content+=text(42,45,9,'MapNero website walkthrough')+text(510,45,9,'1 / 1');
  const objects=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R] /Count 1 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>',`<< /Length ${content.length} >>\nstream\n${content}endstream`,'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'];
  let pdf='%PDF-1.7\n';const offsets=[0];
  objects.forEach((object,i)=>{offsets.push(pdf.length);pdf+=`${i+1} 0 obj\n${object}\nendobj\n`;});
  const xref=pdf.length;pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach(offset=>pdf+=`${String(offset).padStart(10,'0')} 00000 n \n`);
  pdf+=`trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return pdf;
 }
 return{title,rows,createPDF};
});
