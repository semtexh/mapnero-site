'use strict';
const CACHE='mapnero-real-region-shell-v3';
const FILES=['./index.html','./viewer.css','./viewer.mjs','../assets/real-region-engine.js','../assets/vendor/maplibre/maplibre-gl.mjs','../assets/vendor/maplibre/maplibre-gl-worker.mjs','../assets/vendor/maplibre/maplibre-gl-shared.mjs','../assets/vendor/maplibre/maplibre-gl.css','../assets/vendor/maplibre/LICENSE.txt'].map(p=>new URL(p,self.location).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
// Every request from this controlled viewer is cache-only, including its renderer.
// Installation above is the only network preparation step; no runtime fallback.
self.addEventListener('fetch',event=>event.respondWith((async()=>{
 if(event.request.method!=='GET')return new Response('Cache-only viewer: method unavailable',{status:405});
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return new Response('Cache-only viewer: external network unavailable',{status:503});
 const cache=await caches.open(CACHE);const saved=event.request.mode==='navigate'?await cache.match(new URL('./index.html',self.location).href):await cache.match(event.request,{ignoreSearch:true});
 return saved||new Response('Cache-only viewer: file not prepared',{status:503});
})()));
