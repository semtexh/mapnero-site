const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
for (const topic of ['import-map', 'quick-start']) test(`all twelve Android ${topic} captures are distinct full-resolution PNG files`, () => {
  const hashes = new Set();
  for (const locale of ['en','tr','ar','de','es','fr','hi','it','pt','ru','uk','ur']) {
    const data = fs.readFileSync(path.join(root, `assets/guides/screenshots/android/${locale}/${topic}.png`));
    assert.equal(data.subarray(1,4).toString(), 'PNG');
    assert.equal(data.readUInt32BE(16), 1080);
    assert.equal(data.readUInt32BE(20), 2400);
    hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
  }
  assert.equal(hashes.size, 12);
});
const source = fs.readFileSync(path.join(root, 'assets/guides.js'), 'utf8');
const renderer = source.slice(source.indexOf('  function renderScreenshot(topic)'), source.indexOf('  function showToast(message)'));
function harness() {
  const requests = [];
  const motionLoads = [];
  let motionPlays = 0;
  function createMotionVideo(src) {
    const video = {
      pause() {},
      play() { motionPlays += 1; return Promise.resolve(); },
      load() { motionLoads.push(this); },
      removeAttribute(key) { delete this[key]; },
      cloneNode() { return createMotionVideo(); },
      replaceWith() {}
    };
    if (src) video.src = src;
    return video;
  }
  const context = {
    screenshotRequest: 0, motionRequest: 0, locale: 'tr', platform: 'apple',
    window: { MAPNERO_GUIDE_MOTION: {} },
    currentPlatform: () => ({label: 'Apple'}),
    elements: {
      screenshot: {hidden: false},
      screenshotImage: {src: 'old.png', alt: 'old', removeAttribute(key) { delete this[key]; }},
      motion: {hidden: false},
      motionCaption: {textContent: 'old'},
      motionVideo: createMotionVideo('old.mp4')
    },
    Image: class { constructor() { requests.push(this); } }
  };
  vm.createContext(context);
  vm.runInContext(renderer, context);
  return {context, requests, motionLoads, getMotionPlays: () => motionPlays};
}
test('uses the exact language and hides a missing capture', () => {
  const {context, requests} = harness();
  context.renderScreenshot({id:'import-map',title:'Harita ekle'});
  assert.equal(context.elements.screenshot.hidden, true);
  assert.equal(context.elements.screenshotImage.src, undefined);
  assert.equal(requests[0].src, 'assets/guides/screenshots/apple/tr/import-map.png');
  requests[0].onload();
  assert.equal(context.elements.screenshot.hidden, false);
  assert.equal(context.elements.screenshotImage.alt, 'Apple: Harita ekle');
  context.renderScreenshot({id:'missing',title:'Missing'});
  assert.equal(context.elements.screenshot.hidden, true);
  assert.equal(requests.length, 2); // no English fallback request
});
test('a delayed previous-language image cannot replace the current capture', () => {
  const {context, requests} = harness();
  context.renderScreenshot({id:'import-map',title:'Turkish'});
  context.locale = 'ar';
  context.renderScreenshot({id:'import-map',title:'Arabic'});
  requests[1].onload();
  requests[0].onload();
  assert.equal(context.elements.screenshotImage.src, 'assets/guides/screenshots/apple/ar/import-map.png');
});
test('only shows and autoplays a localized motion clip after that exact clip loads', () => {
  const {context, motionLoads, getMotionPlays} = harness();
  context.renderMotion({id:'photo-georeference', title:'Photo', motion:{caption:'Place known control points'}});
  assert.equal(context.elements.motion.hidden, true);
  assert.equal(context.elements.motionVideo.src, 'assets/guides/videos/apple/tr/photo-georeference.mp4');
  assert.equal(motionLoads.length, 2); // reset, then the requested clip
  motionLoads.at(-1).onloadeddata();
  assert.equal(context.elements.motion.hidden, false);
  assert.equal(context.elements.motionCaption.textContent, 'Place known control points');
  assert.equal(getMotionPlays(), 1);
});
test('a delayed previous-language motion clip cannot appear or autoplay', () => {
  const {context, motionLoads, getMotionPlays} = harness();
  context.renderMotion({id:'import-map', motion:{caption:'Turkish'}});
  context.locale = 'ar';
  context.renderMotion({id:'import-map', motion:{caption:'Arabic'}});
  motionLoads[1].onloadeddata();
  assert.equal(context.elements.motion.hidden, true);
  assert.equal(getMotionPlays(), 0);
  motionLoads[3].onloadeddata();
  assert.equal(context.elements.motionCaption.textContent, 'Arabic');
  assert.equal(getMotionPlays(), 1);
});
test('does not request or expose a motion clip when the topic has none', () => {
  const {context, motionLoads} = harness();
  context.renderMotion({id:'import-map', title:'Import'});
  assert.equal(context.elements.motion.hidden, true);
  assert.equal(context.elements.motionVideo.src, undefined);
  assert.equal(motionLoads.length, 1);
});
test('uses an exact-locale motion registry entry when the translated topic has no inline clip', () => {
  const {context, motionLoads} = harness();
  context.window.MAPNERO_GUIDE_MOTION = { tr: { apple: { 'import-map': { caption: 'Türkçe akış' } } } };
  context.renderMotion({id:'import-map', title:'İçe aktar'});
  assert.equal(context.elements.motionVideo.src, 'assets/guides/videos/apple/tr/import-map.mp4');
  motionLoads.at(-1).onloadeddata();
  assert.equal(context.elements.motionCaption.textContent, 'Türkçe akış');
});
test('the English Apple import workflow clip is a valid local MP4 asset', () => {
  const data = fs.readFileSync(path.join(root, 'assets/guides/videos/apple/en/import-map.mp4'));
  assert.equal(data.subarray(4, 8).toString(), 'ftyp');
  assert.ok(data.length > 100000);
});
test('the English Apple Atlas workflow clip is a valid local MP4 asset', () => {
  const data = fs.readFileSync(path.join(root, 'assets/guides/videos/apple/en/collections-atlas.mp4'));
  assert.equal(data.subarray(4, 8).toString(), 'ftyp');
  assert.notEqual(data.indexOf(Buffer.from('moov')), -1);
  assert.ok(data.length > 1000000);
});
test('all twelve Apple Atlas workflow clips are valid exact-locale MP4 assets', () => {
  const hashes = new Set();
  for (const locale of ['en','tr','ar','de','es','fr','hi','it','pt','ru','uk','ur']) {
    const data = fs.readFileSync(path.join(root, `assets/guides/videos/apple/${locale}/collections-atlas.mp4`));
    assert.equal(data.subarray(4, 8).toString(), 'ftyp', locale);
    assert.notEqual(data.indexOf(Buffer.from('moov')), -1, `${locale} must contain MP4 metadata`);
    assert.ok(data.length > 1000000, locale);
    hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
  }
  assert.equal(hashes.size, 12);
});
test('the Turkish Apple import workflow clip is a valid local MP4 asset', () => {
  const data = fs.readFileSync(path.join(root, 'assets/guides/videos/apple/tr/import-map.mp4'));
  assert.equal(data.subarray(4, 8).toString(), 'ftyp');
  assert.ok(data.length > 500000);
});
test('all twelve Apple import workflow clips are valid exact-locale MP4 assets', () => {
  const hashes = new Set();
  for (const locale of ['en','tr','ar','de','es','fr','hi','it','pt','ru','uk','ur']) {
    const data = fs.readFileSync(path.join(root, `assets/guides/videos/apple/${locale}/import-map.mp4`));
    assert.equal(data.subarray(4, 8).toString(), 'ftyp', locale);
    assert.notEqual(data.indexOf(Buffer.from('moov')), -1, `${locale} must contain MP4 metadata`);
    assert.ok(data.length > 100000, locale);
    hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
  }
  // Every guide language must have its own capture. Do not quietly reuse an
  // English clip in a translated guide just because it is technically valid.
  assert.equal(hashes.size, 12);
});
for (const topic of ['quick-start', 'import-map', 'photo-georeference', 'team-gnss', 'measure-cogo-buffer', 'location-track', 'route-builder', 'track-3d', 'track-report']) test(`all twelve ${topic} captures are distinct full-resolution PNG files`, () => {
  const hashes = new Set();
  for (const locale of ['en','tr','ar','de','es','fr','hi','it','pt','ru','uk','ur']) {
    const data = fs.readFileSync(path.join(root, `assets/guides/screenshots/apple/${locale}/${topic}.png`));
    assert.equal(data.subarray(1,4).toString(), 'PNG');
    assert.equal(data.readUInt32BE(16), 1206);
    assert.equal(data.readUInt32BE(20), 2622);
    hashes.add(require('node:crypto').createHash('sha256').update(data).digest('hex'));
  }
  assert.equal(hashes.size, 12);
});
