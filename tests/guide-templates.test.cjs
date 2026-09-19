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

test('field template guide is available once on both mobile platforms in every locale', () => {
  const window = loadGuideData();
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'field-templates');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      const topic = matches[0];
      assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}:${platform}:copy`);
      assert.equal(topic.steps.length, 3, `${id}:${platform}:steps`);
      assert.equal(topic.tips.length, 1, `${id}:${platform}:tips`);
      for (const step of topic.steps) assert.ok(step.title && step.body, `${id}:${platform}:step`);
      if ((platform === 'android' && id === 'pt') || platform === 'apple') {
        assert.equal(topic.secondaryCapture?.suffix, '-selection', `${id}:${platform}:template-selection`);
      } else {
        assert.equal(topic.secondaryCapture, undefined, `${id}:${platform}:no borrowed template-selection`);
      }
    }
  }
});

test('template creation and editing guide is available once on both mobile platforms in every locale', () => {
  const window = loadGuideData();
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'create-edit-templates');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      const topic = matches[0];
      assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}:${platform}:copy`);
      assert.equal(topic.steps.length, 4, `${id}:${platform}:steps`);
      assert.equal(topic.tips.length, 1, `${id}:${platform}:tips`);
      for (const step of topic.steps) assert.ok(step.title && step.body, `${id}:${platform}:step`);
      if (platform === 'apple' || (platform === 'android' && ['en', 'tr', 'ar', 'ru', 'uk', 'ur'].includes(id))) {
        assert.equal(topic.secondaryCapture?.suffix, '-fields', `${id}:${platform}:field-picker`);
      } else {
        assert.equal(topic.secondaryCapture, undefined, `${id}:${platform}:no borrowed field-picker`);
      }
    }
  }
});

test('template-builder captures are full-device PNG assets', () => {
  const captures = [];
  for (const locale of ['ar', 'de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'uk', 'ur']) {
    captures.push(
      `assets/guides/screenshots/apple/${locale}/create-edit-templates.png`,
      `assets/guides/screenshots/apple/${locale}/create-edit-templates-fields.png`
    );
  }
  captures.push(
    'assets/guides/screenshots/android/en/create-edit-templates.png',
    'assets/guides/screenshots/android/tr/create-edit-templates.png',
    'assets/guides/screenshots/android/ar/create-edit-templates.png',
    'assets/guides/screenshots/android/de/create-edit-templates.png',
    'assets/guides/screenshots/android/es/create-edit-templates.png',
    'assets/guides/screenshots/android/fr/create-edit-templates.png',
    'assets/guides/screenshots/android/hi/create-edit-templates.png',
    'assets/guides/screenshots/android/it/create-edit-templates.png',
    'assets/guides/screenshots/android/pt/create-edit-templates.png',
    'assets/guides/screenshots/android/ru/create-edit-templates.png',
    'assets/guides/screenshots/android/uk/create-edit-templates.png',
    'assets/guides/screenshots/android/ur/create-edit-templates.png',
    'assets/guides/screenshots/android/en/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/tr/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ar/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ru/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/uk/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ur/create-edit-templates-fields.png'
  );
  for (const capture of captures) {
    const file = path.join(root, capture);
    assert.ok(fs.existsSync(file), `missing ${capture}`);
    assert.ok(fs.statSync(file).size > 100000, `unexpectedly small ${capture}`);
    if (capture.startsWith('assets/guides/screenshots/apple/')) {
      const png = fs.readFileSync(file);
      assert.equal(png.readUInt32BE(16), 1206, `unexpected width ${capture}`);
      assert.equal(png.readUInt32BE(20), 2622, `unexpected height ${capture}`);
    }
  }
  const selection = path.join(root, 'assets/guides/screenshots/android/pt/field-templates-selection.png');
  assert.ok(fs.existsSync(selection), 'missing Portuguese template selection capture');
  assert.ok(fs.statSync(selection).size > 100000, 'unexpectedly small Portuguese template selection capture');
  for (const locale of ['ar', 'de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'uk', 'ur']) {
    const appleSelection = path.join(root, `assets/guides/screenshots/apple/${locale}/field-templates-selection.png`);
    assert.ok(fs.existsSync(appleSelection), `missing ${locale} Apple template selection capture`);
    assert.ok(fs.statSync(appleSelection).size > 100000, `unexpectedly small ${locale} Apple template selection capture`);
    const appleSelectionPng = fs.readFileSync(appleSelection);
    assert.equal(appleSelectionPng.readUInt32BE(16), 1206, `unexpected ${locale} Apple selection width`);
    assert.equal(appleSelectionPng.readUInt32BE(20), 2622, `unexpected ${locale} Apple selection height`);
  }
});

test('verified Android field-template captures are full-device PNG assets', () => {
  for (const capture of [
    'assets/guides/screenshots/android/ar/field-templates.png',
    'assets/guides/screenshots/android/de/field-templates.png',
    'assets/guides/screenshots/android/en/field-templates.png',
    'assets/guides/screenshots/android/es/field-templates.png',
    'assets/guides/screenshots/android/fr/field-templates.png',
    'assets/guides/screenshots/android/hi/field-templates.png',
    'assets/guides/screenshots/android/it/field-templates.png',
    'assets/guides/screenshots/android/pt/field-templates-selection.png',
    'assets/guides/screenshots/android/pt/field-templates.png',
    'assets/guides/screenshots/android/ru/field-templates.png',
    'assets/guides/screenshots/android/tr/field-templates.png',
    'assets/guides/screenshots/android/uk/field-templates.png',
    'assets/guides/screenshots/android/ur/field-templates.png'
  ]) {
    const file = path.join(root, capture);
    assert.ok(fs.existsSync(file), `missing ${capture}`);
    assert.ok(fs.statSync(file).size > 50000, `unexpectedly small ${capture}`);
    const png = fs.readFileSync(file);
    assert.equal(png.readUInt32BE(16), 1080, `unexpected width ${capture}`);
    assert.equal(png.readUInt32BE(20), 2340, `unexpected height ${capture}`);
  }
});

test('verified localized Apple field-template captures are full-device PNG assets', () => {
  const captures = [];
  for (const locale of ['ar', 'de', 'en', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'tr', 'uk', 'ur']) {
    captures.push(
      `assets/guides/screenshots/apple/${locale}/field-templates.png`,
      `assets/guides/screenshots/apple/${locale}/field-templates-selection.png`
    );
  }
  for (const capture of captures) {
    const file = path.join(root, capture);
    assert.ok(fs.existsSync(file), `missing ${capture}`);
    assert.ok(fs.statSync(file).size > 100000, `unexpectedly small ${capture}`);
    const png = fs.readFileSync(file);
    assert.equal(png.readUInt32BE(16), 1206, `unexpected width ${capture}`);
    assert.equal(png.readUInt32BE(20), 2622, `unexpected height ${capture}`);
  }
});
