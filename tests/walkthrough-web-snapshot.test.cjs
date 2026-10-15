const {test}=require('node:test');const assert=require('node:assert/strict');const S=require('../assets/walkthrough-web-snapshot.js');
const data={type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:[-.12,51.5,0]},properties:{name:'Private test observation'}}]};const pass='London practice compass 926!';
test('encrypted snapshot hides plaintext, round-trips and uses fresh random salt/nonce',async()=>{
  const a=await S.encrypt(data,pass),b=await S.encrypt(data,pass);assert.notEqual(a.salt,b.salt);assert.notEqual(a.iv,b.iv);assert.notEqual(a.ciphertext,b.ciphertext);assert.equal(JSON.stringify(a).includes('Private test'),false);assert.deepEqual(await S.decrypt(a,pass),data);
  const html=S.viewerHTML(a);assert.equal(html.includes('Private test'),false);assert.equal(html.includes(pass),false);new (require('node:vm').Script)(html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>')));assert.equal(html.match(/<\/script>/g).length,1);assert.equal(/<(?:script|link|img)[^>]+(?:src|href)=/i.test(html),false);
});
test('wrong passphrase, changed metadata/ciphertext and expired envelopes never return data',async()=>{
  const a=await S.encrypt(data,pass);await assert.rejects(S.decrypt(a,'Another unrelated passphrase!'),/wrong passphrase/);
  const time={...a,createdAt:a.createdAt-1000,expiresAt:a.expiresAt-1000};await assert.rejects(S.decrypt(time,pass),/changed snapshot/);
  const bytes=Buffer.from(a.ciphertext,'base64');bytes[0]^=1;await assert.rejects(S.decrypt({...a,ciphertext:bytes.toString('base64')},pass),/changed snapshot/);
  await assert.rejects(S.decrypt(a,pass,a.expiresAt),/expired/);await assert.rejects(S.encrypt(data,'aaaaaaaaaaaaaaaa'),/varied passphrase/);
  await assert.rejects(S.decrypt({...a,iterations:1},pass),/supported practice/);
});
