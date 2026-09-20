const assert = require('node:assert/strict');
const crypto = require('node:crypto');
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

test('Team Session host guidance says that MapNero generates the session code', () => {
  const window = loadGuideData();
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const topic = window.MAPNERO_GUIDES[id].platforms[platform].topics
        .find((candidate) => candidate.id === 'team-session');
      const accessStep = topic.steps[1].body;
      assert.ok(accessStep.length > 80, id + ':' + platform + ':host guidance');
      assert.doesNotMatch(
        accessStep,
        /choose a code or password/i,
        id + ':' + platform + ':stale host rule'
      );
    }
  }
  const english = window.MAPNERO_GUIDES.en.platforms.apple.topics
    .find((candidate) => candidate.id === 'team-session');
  assert.match(english.steps[1].body, /generates the session code after creation/i);
});

test('verified Apple Team Session entry captures are localized full-device PNGs', () => {
  const window = loadGuideData();
  const hashes = new Set();
  for (const locale of window.MAPNERO_GUIDE_LOCALES.map(({ id }) => id)) {
    const capture = path.join(root, `assets/guides/screenshots/apple/${locale}/team-session.png`);
    assert.ok(fs.existsSync(capture), `missing ${locale} Apple Team Session capture`);
    assert.ok(fs.statSync(capture).size > 100000, `unexpectedly small ${locale} Apple Team Session capture`);
    const png = fs.readFileSync(capture);
    assert.equal(png.readUInt32BE(16), 1206, `unexpected ${locale} Apple Team Session width`);
    assert.equal(png.readUInt32BE(20), 2622, `unexpected ${locale} Apple Team Session height`);
    hashes.add(crypto.createHash('sha256').update(png).digest('hex'));
  }
  assert.equal(hashes.size, window.MAPNERO_GUIDE_LOCALES.length, 'localized captures must remain distinct');
});

test('verified Android Team Session captures are full-device PNGs', () => {
  const capturedLocales = ['en', 'tr', 'ar', 'de', 'ru'];
  const window = loadGuideData();
  for (const locale of capturedLocales) {
    const capture = path.join(root, `assets/guides/screenshots/android/${locale}/team-session.png`);
    assert.ok(fs.existsSync(capture), `missing ${locale} Android Team Session capture`);
    assert.ok(fs.statSync(capture).size > 100000, `unexpectedly small ${locale} Android Team Session capture`);
    const png = fs.readFileSync(capture);
    assert.equal(png.readUInt32BE(16), 1080, `unexpected ${locale} Android Team Session width`);
    assert.equal(png.readUInt32BE(20), 2340, `unexpected ${locale} Android Team Session height`);
    const topic = window.MAPNERO_GUIDES[locale].platforms.android.topics
      .find((candidate) => candidate.id === 'team-session');
    assert.notEqual(topic.capture, false, `${locale} should show its verified capture`);
  }

  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    if (capturedLocales.includes(id)) continue;
    const topic = window.MAPNERO_GUIDES[id].platforms.android.topics
      .find((candidate) => candidate.id === 'team-session');
    assert.equal(topic.capture, false, `${id} must not request a missing Android capture`);
  }
});
