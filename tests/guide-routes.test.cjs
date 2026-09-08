const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('the route guide loads after translations for all 12 Apple locales', () => {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s]+\.js)"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  assert.equal(scripts.at(-1), 'assets/guides-routes.js');
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  const titles = new Set();
  for (const {id} of context.window.MAPNERO_GUIDE_LOCALES) {
    const platforms = context.window.MAPNERO_GUIDES[id].platforms;
    const topics = platforms.apple.topics.filter(topic => topic.id === 'route-builder');
    assert.equal(topics.length, 1, id);
    const topic = topics[0];
    titles.add(topic.title);
    assert.ok(topic.summary && topic.access && topic.note, id);
    assert.equal(topic.steps.length, 4);
    assert.equal(topic.tips.length, 1);
    for (const step of topic.steps) assert.ok(step.title && step.body, id);
    assert.ok(topic.tips[0].q && topic.tips[0].a, id);
    for (const platform of ['android', 'web']) {
      assert.ok(!platforms[platform].topics.some(topic => topic.id === 'route-builder'),
        'Apple instructions must not leak to ' + platform);
    }
  }
  assert.equal(titles.size, 12);
});
