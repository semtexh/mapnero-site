const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

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

test('Team Session guide keeps host and participant access explicit in every locale', () => {
  const window = loadGuideData();
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'team-session');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      const topic = matches[0];
      assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}:${platform}:copy`);
      assert.equal(topic.steps.length, 3, `${id}:${platform}:steps`);
      assert.equal(topic.tips.length, 1, `${id}:${platform}:tips`);
    }
  }
});

test('verified English Apple Team Session entry capture is a full-device PNG', () => {
  const capture = path.join(root, 'assets/guides/screenshots/apple/en/team-session.png');
  assert.ok(fs.existsSync(capture), 'missing English Apple Team Session capture');
  assert.ok(fs.statSync(capture).size > 100000, 'unexpectedly small English Apple Team Session capture');
  const png = fs.readFileSync(capture);
  assert.equal(png.readUInt32BE(16), 1206, 'unexpected English Apple Team Session width');
  assert.equal(png.readUInt32BE(20), 2622, 'unexpected English Apple Team Session height');
});

test('verified Android Team Session captures are full-device PNGs', () => {
  for (const locale of ['en', 'tr', 'ar', 'de', 'ru']) {
    const capture = path.join(root, `assets/guides/screenshots/android/${locale}/team-session.png`);
    assert.ok(fs.existsSync(capture), `missing ${locale} Android Team Session capture`);
    assert.ok(fs.statSync(capture).size > 100000, `unexpectedly small ${locale} Android Team Session capture`);
    const png = fs.readFileSync(capture);
    assert.equal(png.readUInt32BE(16), 1080, `unexpected ${locale} Android Team Session width`);
    assert.equal(png.readUInt32BE(20), 2340, `unexpected ${locale} Android Team Session height`);
  }
});
