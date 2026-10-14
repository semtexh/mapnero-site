const {test}=require('node:test'),a=require('node:assert/strict'),E=require('../assets/spot-report-engine.js');
const id='12345678-1234-1234-1234-123456789abc',now='2026-10-14T08:00:00Z';
const input=()=>({...E.draft(now),latitude:51.5074,longitude:-.1278,activityWhenFound:'Synthetic training observation',uxoDescription:'DEMO inert object <test> & sample',saedaConfirmed:true});
test('native required fields, quantity bounds, known coordinates and priority gate save',()=>{for(const p of [{activityWhenFound:''},{uxoDescription:''},{saedaConfirmed:false},{latitude:null},{longitude:null},{quantity:0},{quantity:1000},{quantity:1.5},{priority:'UNKNOWN'},{dtg:'bad'},{nbcContamination:'false'}])a.throws(()=>E.save({...input(),...p},id,now));a.equal(E.save({...input(),quantity:999},id,now).quantity,999);});
test('snapshot remains immutable; exact known zero coordinates are valid and unknown never becomes zero',()=>{const d=input(),r=E.save(d,id,now);d.uxoDescription='changed';a.match(r.uxoDescription,/inert/);a.deepEqual(E.feature(r).geometry.coordinates,[-.1278,51.5074]);const zero=E.save({...input(),latitude:0,longitude:0},id,now);a.deepEqual(E.feature(zero).geometry.coordinates,[0,0]);a.equal(E.draft(now).latitude,null);});
test('XML escapes text, preserves false and optional notes, and labels source as local demo',()=>{const r=E.save({...input(),nbcNotes:'Retained when hidden'},id,now),x=E.xml(r);a.match(x,/&lt;test&gt; &amp; sample/);a.match(x,/<NBCContamination>false<\/NBCContamination>/);a.match(x,/<NBCNotes>Retained when hidden<\/NBCNotes>/);a.match(x,/MapNero website DEMO/);a.match(x,/<Quantity>1<\/Quantity>/);a.throws(()=>E.save(input(),'bad',now));});

test('rejects XML-invalid controls and lone surrogate text while retaining valid Unicode',()=>{for(const t of ['bad\x00text','bad\ud800','bad\uffff'])a.throws(()=>E.save({...input(),reporterName:t},id,now));a.match(E.xml(E.save({...input(),reporterName:'Şerhan 🌍'},id,now)),/Şerhan 🌍/);});

test('list search matches only native description, MGRS or mission reference and combines priority',()=>{
 const one=E.save({...input(),activityWhenFound:'Not searchable activity',uxoDescription:'ALPHA synthetic object',missionRef:'CASE-42',priority:'IMMEDIATE'},id,now);
 const two=E.save({...input(),uxoDescription:'Beta synthetic object',missionRef:'CASE-43'},'22345678-1234-1234-1234-123456789abc','2026-10-14T09:00:00Z');
 a.deepEqual(E.filterRecords([one,two],{query:'alpha',priority:'ALL'}),[one]);
 a.deepEqual(E.filterRecords([one,two],{query:'case-',priority:'ROUTINE'}),[two]);
 a.deepEqual(E.filterRecords([one,two],{query:'Not searchable activity'}),[]);
 a.deepEqual(E.filterRecords([one,two],{query:'XC 99316'}),[two,one]);
 a.deepEqual(E.filterRecords([one,two],{query:'alpha',priority:'ROUTINE'}),[]);
});
test('native newest-first listing preserves stored order and hides retracted records',()=>{
 const old=E.save(input(),id,now),recent=E.save(input(),'22345678-1234-1234-1234-123456789abc','2026-10-14T09:00:00Z'),tombstone={...recent,isTombstone:true};
 const rows=[old,recent];a.deepEqual(E.filterRecords(rows),[recent,old]);a.deepEqual(rows,[old,recent]);a.deepEqual(E.filterRecords([old,tombstone]),[old]);
 a.throws(()=>E.filterRecords(rows,{priority:'INVALID'}));a.throws(()=>E.filterRecords(rows,{query:'x'.repeat(5001)}));
});
test('report search normalizes canonically equivalent text without trimming meaningful spaces',()=>{
 const r=E.save({...input(),uxoDescription:'Cafe\u0301 DEMO'},id,now);
 a.equal(E.filterRecords([r],{query:'CAFÉ'}).length,1);a.equal(E.filterRecords([r],{query:'missing'}).length,0);a.equal(E.filterRecords([r],{query:' DEMO'}).length,1);a.equal(E.filterRecords([r],{query:'DEMO '}).length,0);
});
