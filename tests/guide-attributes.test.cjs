const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const scripts = [
  'assets/guides-data.js', 'assets/guides-tr.js', 'assets/guides-es.js',
  'assets/guides-eu.js', 'assets/guides-eurasia.js', 'assets/guides-rtl.js',
  'assets/guides-routes.js', 'assets/guides-android-routes.js',
  'assets/guides-track-tools.js', 'assets/guides-android-reports.js',
  'assets/guides-android-3d.js', 'assets/guides-cluster.js',
  'assets/guides-community.js', 'assets/guides-attributes.js'
];

function loadGuides() {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  for (const relative of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });
  }
  return context.window;
}

test('attribute form guide is complete for every locale and both mobile platforms', () => {
  const window = loadGuides();
  for (const locale of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const topics = window.MAPNERO_GUIDES[locale.id].platforms[platform].topics;
      const matches = topics.filter((topic) => topic.id === 'attribute-forms');
      assert.equal(matches.length, 1, `${locale.id}:${platform}`);
      assert.equal(matches[0].steps.length, 4, `${locale.id}:${platform}:steps`);
      assert.equal(matches[0].tips.length, 1, `${locale.id}:${platform}:tips`);
      assert.ok(matches[0].note, `${locale.id}:${platform}:note`);
    }
  }
});

test('German Android attribute forms capture is a full device PNG', () => {
  const imagePath = path.join(root, 'assets/guides/screenshots/android/de/attribute-forms.png');
  const image = fs.readFileSync(imagePath);
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.readUInt32BE(16), 1080);
  assert.equal(image.readUInt32BE(20), 2340);
});
