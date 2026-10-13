(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./vendor/team-qr/qrcode.js'));else root.MapNeroTeamInvite=factory(root.qrcode);})(typeof window==='undefined'?globalThis:window,function(qrcode){
'use strict';
function parse(text,now=Date.now()){
 if(typeof text!=='string'||text.length>1024)throw Error('Use a local demo team QR invite.');
 let v;try{v=JSON.parse(text);}catch{throw Error('This is not a local demo team invite.');}
 if(!v||Array.isArray(v)||v.kind!=='mapnero-local-team-invite'||v.version!==1||!/^[A-F0-9]{8}$/.test(v.code)||!Number.isSafeInteger(v.expires)||!Number.isFinite(now)||v.expires<=now||v.expires>now+86400000||Object.keys(v).sort().join(',')!=='code,expires,kind,version')throw Error('Invite is invalid, expired or belongs to a different workflow.');
 return{kind:v.kind,version:1,code:v.code,expires:v.expires};
}
function encode(session,now=Date.now()){return JSON.stringify(parse(JSON.stringify({kind:'mapnero-local-team-invite',version:1,code:session?.code,expires:session?.expires}),now));}
function matrix(text,now=Date.now()){parse(text,now);const qr=qrcode(0,'M');qr.addData(text,'Byte');qr.make();const count=qr.getModuleCount();return{count,modules:Array.from({length:count},(_,r)=>Array.from({length:count},(_,c)=>qr.isDark(r,c)))};}
function pngDimensions(bytes){if(!(bytes instanceof Uint8Array)||bytes.length<33||bytes.length>4000000||![137,80,78,71,13,10,26,10].every((v,i)=>bytes[i]===v)||String.fromCharCode(...bytes.slice(12,16))!=='IHDR')throw Error('Choose a PNG QR image under 4 MB.');const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),width=v.getUint32(16),height=v.getUint32(20);if(!width||!height||width*height>4000000)throw Error('Choose a PNG with at most 4 million pixels.');return{width,height};}
return{parse,encode,matrix,pngDimensions};});
