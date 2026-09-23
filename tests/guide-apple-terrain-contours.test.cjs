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
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map(match => match[1])
    .filter(file => file !== 'assets/guides.js');
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return context.window;
}

test('Apple elevation GeoTIFF contour guidance is localized and does not promise an unverified capture', () => {
  const guides = loadGuides();
  const translations = new Set();
  for (const { id } of guides.MAPNERO_GUIDE_LOCALES) {
    const matches = guides.MAPNERO_GUIDES[id].platforms.apple.topics
      .filter(topic => topic.id === 'terrain-contours');
    assert.equal(matches.length, 1, `${id}: one Apple terrain-contours topic`);
    const topic = matches[0];
    assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}: complete copy`);
    assert.equal(topic.steps.length, 4, `${id}: safe workflow steps`);
    assert.equal(topic.tips.length, 1, `${id}: recovery tip`);
    assert.equal(topic.capture, false, `${id}: no unverified device screenshot`);
    for (const step of topic.steps) assert.ok(step.title && step.body.length > 30, `${id}: useful step`);
    translations.add(JSON.stringify(topic.steps));
  }
  assert.equal(translations.size, 12, 'each locale has its own terrain-contour guidance');
});
