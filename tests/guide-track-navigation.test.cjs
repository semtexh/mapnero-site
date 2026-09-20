const assert = require('node:assert/strict');
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
  const files = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1])
    .filter((file) => file !== 'assets/guides.js');
  for (const file of files) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return context.window;
}

test('Track Navigation guide documents the real cross-platform corridor workflow in every locale', () => {
  const guides = loadGuides();
  for (const { id } of guides.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = guides.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'track-navigation');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      const topic = matches[0];
      assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}:${platform}:copy`);
      assert.equal(topic.steps.length, 3, `${id}:${platform}:steps`);
      assert.equal(topic.tips.length, 1, `${id}:${platform}:tips`);
      for (const step of topic.steps) assert.ok(step.title && step.body, `${id}:${platform}:step`);
    }
  }
});
