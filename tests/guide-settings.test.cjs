const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
function loadGuideData() {
  const context = { window: {} }; context.window.window = context.window;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1]).filter((file) => file !== 'assets/guides.js');
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  return context.window;
}
test('settings workspace guide is available once on both mobile platforms in every locale', () => {
  const window = loadGuideData();
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) for (const platform of ['apple', 'android']) {
    const matches = window.MAPNERO_GUIDES[id].platforms[platform].topics.filter((topic) => topic.id === 'settings-workspace');
    assert.equal(matches.length, 1, `${id}:${platform}`);
    assert.equal(matches[0].steps.length, 3, `${id}:${platform}:steps`);
    assert.ok(matches[0].title && matches[0].summary && matches[0].note, `${id}:${platform}:copy`);
  }
});
