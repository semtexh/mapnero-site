const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const locales = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'uk', 'ur'];

function loadGuideData() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1])
    .filter((file) => file !== 'assets/guides.js');
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return context.window;
}

test('settings guide is available once on both mobile platforms in every locale', () => {
  const window = loadGuideData();
  for (const locale of locales) {
    for (const platform of ['apple', 'android']) {
      const matches = window.MAPNERO_GUIDES[locale].platforms[platform].topics
        .filter((topic) => topic.id === 'settings-workspace');
      assert.equal(matches.length, 1, `${locale}:${platform}`);
      const topic = matches[0];
      assert.ok(topic.title && topic.summary && topic.access && topic.note, `${locale}:${platform}:copy`);
      assert.equal(topic.steps.length, 3, `${locale}:${platform}:steps`);
      assert.equal(topic.tips.length, 1, `${locale}:${platform}:tips`);
      for (const step of topic.steps) assert.ok(step.title && step.body, `${locale}:${platform}:step`);
    }
  }
});

test('localized Apple settings captures are full-device PNG assets', () => {
  for (const locale of locales) {
    const capture = `assets/guides/screenshots/apple/${locale}/settings-workspace.png`;
    const file = path.join(root, capture);
    assert.ok(fs.existsSync(file), `missing ${capture}`);
    assert.ok(fs.statSync(file).size > 100000, `unexpectedly small ${capture}`);
    const png = fs.readFileSync(file);
    assert.equal(png.readUInt32BE(16), 1206, `unexpected width ${capture}`);
    assert.equal(png.readUInt32BE(20), 2622, `unexpected height ${capture}`);
  }
});

test('localized Android settings captures are distinct full-device PNG assets', () => {
  const hashes = new Set();
  for (const locale of locales) {
    const capture = `assets/guides/screenshots/android/${locale}/settings-workspace.png`;
    const png = fs.readFileSync(path.join(root, capture));
    assert.equal(png.subarray(1, 4).toString(), 'PNG', `invalid ${capture}`);
    assert.equal(png.readUInt32BE(16), 1080, `unexpected width ${capture}`);
    assert.equal(png.readUInt32BE(20), 2340, `unexpected height ${capture}`);
    assert.ok(png.length > 100000, `unexpectedly small ${capture}`);
    hashes.add(require('node:crypto').createHash('sha256').update(png).digest('hex'));
  }
  assert.equal(hashes.size, locales.length, 'each locale needs its own physical-device capture');
});
