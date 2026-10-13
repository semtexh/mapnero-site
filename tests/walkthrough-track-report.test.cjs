const test=require('node:test');const assert=require('node:assert/strict');
const R=require('../assets/walkthrough-track-report.js');
test('captured track statistics retain all displayed rows without reconstructing a track',()=>{
 const rows=Object.fromEntries(R.rows());assert.equal(Object.keys(rows).length,20);
 assert.equal(rows['Start location'],'29.10300, 48.07300');assert.equal(rows['End location'],'29.10349, 48.07400');
 assert.equal(rows['Total distance'],'255 m');assert.equal(rows['GPS points'],'34');assert.equal(rows['Average pace'],'7:14 /km');
 assert.equal(rows['Min speed (moving)'],'14.4 km/h');assert.equal(rows['Start elevation'],'0 m');
});
test('imperial conversion preserves coordinates and durations and rejects unknown units',()=>{
 const rows=Object.fromEntries(R.rows('imperial'));assert.equal(rows['Total distance'],'836.6 ft');
 assert.equal(rows['Average speed'],'5.2 mph');assert.equal(rows['Max speed'],'8.9 mph');assert.equal(rows['Average pace'],'11:38 /mi');
 assert.equal(rows['Total duration'],'1m 51s');assert.equal(rows['Start location'],'29.10300, 48.07300');
 assert.throws(()=>R.rows('yards'),/units/);
});
test('PDF offsets address every object and the cross-reference table in either unit system',()=>{
 for(const units of ['metric','imperial']){const pdf=R.createPDF(units);assert.match(pdf,/Elevation zeros are copied from the capture/);assert.match(pdf,/WEBSITE PRACTICE/);
 const xref=Number(pdf.match(/startxref\n(\d+)/)[1]);assert.equal(pdf.slice(xref,xref+4),'xref');
 const offsets=pdf.match(/\d{10} 00000 n/g).map(v=>Number(v.slice(0,10)));offsets.forEach((offset,i)=>assert.equal(pdf.slice(offset,offset+7),`${i+1} 0 obj`));
 assert.equal(Buffer.byteLength(pdf,'utf8'),pdf.length);
 }
});
