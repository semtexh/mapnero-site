const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/guides.js'), 'utf8');
const renderer = source.slice(source.indexOf('  function renderScreenshot(topic)'), source.indexOf('  function showToast(message)'));
function harness() {
  const requests = [];
  const context = {
    screenshotRequest: 0, locale: 'tr', platform: 'apple',
    currentPlatform: () => ({label: 'Apple'}),
    elements: {screenshot: {hidden: false}, screenshotImage: {src: 'old.png', alt: 'old', removeAttribute(key) { delete this[key]; }}},
    Image: class { constructor() { requests.push(this); } }
  };
  vm.createContext(context);
  vm.runInContext(renderer, context);
  return {context, requests};
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
for (const topic of ['quick-start', 'import-map', 'team-gnss', 'measure-cogo-buffer', 'location-track', 'route-builder', 'track-3d', 'track-report']) test(`all twelve ${topic} captures are distinct full-resolution PNG files`, () => {
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
