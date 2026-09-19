const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadGuides() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1])
    .filter((file) => file !== 'assets/guides.js');
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  return context.window;
}

test('map layout guide is localized and keeps platform entitlement distinct', () => {
  const guides = loadGuides();
  for (const { id } of guides.MAPNERO_GUIDE_LOCALES) {
    const apple = guides.MAPNERO_GUIDES[id].platforms.apple.topics
      .filter((topic) => topic.id === 'map-layout-export');
    const android = guides.MAPNERO_GUIDES[id].platforms.android.topics
      .filter((topic) => topic.id === 'map-layout-export');
    assert.equal(apple.length, 1, `${id}:apple`);
    assert.equal(android.length, 1, `${id}:android`);
    assert.equal(apple[0].steps.length, 3, `${id}:apple steps`);
    assert.equal(android[0].steps.length, 3, `${id}:android steps`);
    assert.match(apple[0].access, /Pro/);
    assert.match(android[0].access, /Pro/);
    assert.match(apple[0].steps[2].body, /MBTiles/);
    assert.match(android[0].steps[2].body, /MBTiles/);
    assert.ok(
      fs.existsSync(path.join(
        root,
        'assets',
        'guides',
        'screenshots',
        'android',
        id,
        'map-layout-export.png',
      )),
      `${id}: Android Create Map screenshot`,
    );
  }
});

test('all twelve Android Create Map captures are distinct full-resolution PNG files', () => {
  const guides = loadGuides();
  const fingerprints = new Set();
  for (const { id } of guides.MAPNERO_GUIDE_LOCALES) {
    const file = path.join(
      root,
      'assets',
      'guides',
      'screenshots',
      'android',
      id,
      'map-layout-export.png',
    );
    const data = fs.readFileSync(file);
    assert.ok(data.length > 100000, `${id}: non-trivial PNG`);
    assert.match(data.subarray(0, 24).toString('hex'), /^89504e470d0a1a0a/);
    assert.equal(data.readUInt32BE(16), 1080, `${id}: PNG width`);
    assert.equal(data.readUInt32BE(20), 2340, `${id}: PNG height`);
    fingerprints.add(crypto.createHash('sha256').update(data).digest('hex'));
  }
  assert.equal(fingerprints.size, 12, 'localized captures must not reuse one image');
});

test('verified English Apple PDF Map Export capture is a full-device PNG', () => {
  const file = path.join(
    root,
    'assets',
    'guides',
    'screenshots',
    'apple',
    'en',
    'map-layout-export.png',
  );
  const data = fs.readFileSync(file);
  assert.ok(data.length > 100000, 'English Apple PDF Map Export PNG is non-trivial');
  assert.match(data.subarray(0, 24).toString('hex'), /^89504e470d0a1a0a/);
  assert.equal(data.readUInt32BE(16), 1206, 'English Apple PDF Map Export width');
  assert.equal(data.readUInt32BE(20), 2622, 'English Apple PDF Map Export height');
});
