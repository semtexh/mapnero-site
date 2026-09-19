const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

test('mobile export guidance is localized once per mobile platform', () => {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  for (const file of [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1]).filter((file) => file !== 'assets/guides.js')) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  for (const { id } of context.window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = context.window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'mobile-export');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      assert.equal(matches[0].steps.length, 3, `${id}:${platform}:steps`);
      assert.equal(matches[0].tips.length, 1, `${id}:${platform}:tip`);
      assert.ok(matches[0].access.includes('Geo'), `${id}:${platform}:tier-boundary`);
    }
  }
});

test('Android mobile export screenshots are real, full-size, and locale-specific', () => {
  const expectedLocales = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'uk', 'ur'];
  const hashes = new Set();

  for (const locale of expectedLocales) {
    const file = path.join(
      root,
      'assets',
      'guides',
      'screenshots',
      'android',
      locale,
      'mobile-export.png',
    );
    const bytes = fs.readFileSync(file);
    assert.ok(bytes.length > 100000, `${locale}: substantial PNG`);
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], `${locale}: PNG`);
    assert.equal(bytes.readUInt32BE(16), 1080, `${locale}: width`);
    assert.equal(bytes.readUInt32BE(20), 2340, `${locale}: height`);
    hashes.add(crypto.createHash('sha256').update(bytes).digest('hex'));
  }

  assert.equal(hashes.size, expectedLocales.length, 'each locale has its own capture');
});

test('verified English Apple Export & Share capture is a full-device PNG', () => {
  const file = path.join(
    root,
    'assets',
    'guides',
    'screenshots',
    'apple',
    'en',
    'mobile-export.png',
  );
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length > 100000, 'English Apple Export & Share PNG is substantial');
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(bytes.readUInt32BE(16), 1206, 'English Apple Export & Share width');
  assert.equal(bytes.readUInt32BE(20), 2622, 'English Apple Export & Share height');
});
