const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadGuides() {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  assert.ok(scripts.includes('assets/guides-community.js'));
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return context.window;
}

test('Community Trails guidance is complete and localized on both mobile platforms', () => {
  const window = loadGuides();
  assert.equal(window.MAPNERO_GUIDE_LOCALES.length, 12);
  const titles = new Set();
  for (const {id} of window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter(topic => topic.id === 'community-trails');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      const topic = matches[0];
      titles.add(topic.title);
      assert.ok(topic.title && topic.summary && topic.access && topic.note);
      assert.equal(topic.steps.length, 4);
      assert.equal(topic.tips.length, 1);
      for (const step of topic.steps) assert.ok(step.title && step.body);
      assert.ok(topic.tips[0].q && topic.tips[0].a);
    }
    assert.ok(!window.MAPNERO_GUIDES[id].platforms.web.topics
      .some(topic => topic.id === 'community-trails'));
  }
  assert.equal(titles.size, 12);
});

test('Community Trails guide states the privacy and safety boundaries', () => {
  const topic = loadGuides().MAPNERO_GUIDES.en.platforms.apple.topics
    .find(item => item.id === 'community-trails');
  const allText = [topic.summary, topic.access, topic.note,
    ...topic.steps.flatMap(step => [step.title, step.body]),
    ...topic.tips.flatMap(tip => [tip.q, tip.a])].join(' ');
  assert.match(allText, /confirmed Core/);
  assert.match(allText, /independent copy/);
  assert.match(allText, /photos and private feature fields are not included/);
  assert.match(allText, /inaccurate, outdated or unsafe/);
  assert.match(allText, /CC BY-SA/);
});

test('Community Trails has a distinct localized Apple capture for every guide language', () => {
  const window = loadGuides();
  const hashes = new Set();
  for (const {id} of window.MAPNERO_GUIDE_LOCALES) {
    const image = path.join(root, 'assets', 'guides', 'screenshots', 'apple', id,
      'community-trails.png');
    assert.ok(fs.existsSync(image), `Missing Apple Community Trails capture: ${id}`);
    const bytes = fs.readFileSync(image);
    assert.ok(bytes.length > 10_000, `Unexpectedly small Apple Community Trails capture: ${id}`);
    assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10],
      `Invalid PNG header: ${id}`);
    hashes.add(require('node:crypto').createHash('sha256').update(bytes).digest('hex'));
  }
  assert.equal(hashes.size, window.MAPNERO_GUIDE_LOCALES.length,
    'Each locale needs its own capture; do not reuse a different language image');
});
