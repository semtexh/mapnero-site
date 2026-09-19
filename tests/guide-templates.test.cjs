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
      if (platform === 'android' && ['en', 'tr', 'ar', 'ru', 'uk', 'ur'].includes(id)) {
        assert.equal(topic.secondaryCapture?.suffix, '-fields', `${id}:${platform}:field-picker`);
      } else {
        assert.equal(topic.secondaryCapture, undefined, `${id}:${platform}:no borrowed field-picker`);
      }
    }
  }
});

test('template-builder captures are full-device PNG assets', () => {
  const captures = [
    'assets/guides/screenshots/apple/tr/create-edit-templates.png',
    'assets/guides/screenshots/android/en/create-edit-templates.png',
    'assets/guides/screenshots/android/tr/create-edit-templates.png',
    'assets/guides/screenshots/android/ar/create-edit-templates.png',
    'assets/guides/screenshots/android/ru/create-edit-templates.png',
    'assets/guides/screenshots/android/uk/create-edit-templates.png',
    'assets/guides/screenshots/android/ur/create-edit-templates.png',
    'assets/guides/screenshots/android/en/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/tr/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ar/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ru/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/uk/create-edit-templates-fields.png',
    'assets/guides/screenshots/android/ur/create-edit-templates-fields.png'
  ];
  for (const capture of captures) {
    const file = path.join(root, capture);
    assert.ok(fs.existsSync(file), `missing ${capture}`);
    assert.ok(fs.statSync(file).size > 100000, `unexpectedly small ${capture}`);
  }
});
