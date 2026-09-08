const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('cluster navigation and limitations load once per mobile platform in all 12 languages', () => {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map(m => m[1]).filter(file => file !== 'assets/guides.js');
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  assert.equal(context.window.MAPNERO_GUIDE_LOCALES.length, 12);
  const titles = new Set();
  for (const {id} of context.window.MAPNERO_GUIDE_LOCALES) {
    const platforms = context.window.MAPNERO_GUIDES[id].platforms;
    for (const platform of ['apple', 'android']) {
      const matches = platforms[platform].topics.filter(t => t.id === 'cluster-analysis');
      assert.equal(matches.length, 1, id + ':' + platform);
      const topic = matches[0];
      titles.add(topic.title);
      assert.equal(topic.access, 'Pro+');
      assert.ok(topic.summary && topic.note);
      assert.equal(topic.steps.length, 2);
      assert.match(topic.steps[0].body, /8/);
      assert.match(topic.steps[1].body, /Pro/);
      assert.match(topic.note, /DBSCAN/);
      assert.match(topic.note, /EOD/);
      assert.equal(topic.tips[0].a, topic.note);
      for (const step of topic.steps) assert.ok(step.title && step.body);
    }
    assert.ok(!platforms.web.topics.some(t => t.id === 'cluster-analysis'));
    assert.notStrictEqual(platforms.apple.topics.at(-1).steps, platforms.android.topics.at(-1).steps);
  }
  assert.equal(titles.size, 12);
});
