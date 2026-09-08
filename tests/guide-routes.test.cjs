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
  assert.ok(scripts.includes('assets/guides-data.js'));
  assert.ok(scripts.indexOf('assets/guides-routes.js') > scripts.indexOf('assets/guides-rtl.js'));
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

test('3D and report topics have complete localized Apple instructions without platform leakage', () => {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s]+\.js)"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  assert.equal(scripts.at(-1), 'assets/guides-track-tools.js');
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  for (const [topicId, stepCount] of [['track-3d', 3], ['track-report', 4]]) {
    const titles = new Set();
    for (const {id} of context.window.MAPNERO_GUIDE_LOCALES) {
      const platforms = context.window.MAPNERO_GUIDES[id].platforms;
      const matches = platforms.apple.topics.filter(t => t.id === topicId);
      assert.equal(matches.length, 1, id + ':' + topicId);
      const topic = matches[0];
      titles.add(topic.title);
      assert.ok(topic.summary && topic.access && topic.note);
      assert.equal(topic.steps.length, stepCount);
      for (const step of topic.steps) assert.ok(step.title && step.body);
      assert.equal(topic.tips.length, 1);
      assert.ok(topic.tips[0].q && topic.tips[0].a);
      if (topicId === 'track-report') assert.match(topic.access, /Core/);
      for (const p of ['android','web']) assert.ok(!platforms[p].topics.some(t => t.id === topicId));
    }
    assert.equal(titles.size, 12);
  }
});
