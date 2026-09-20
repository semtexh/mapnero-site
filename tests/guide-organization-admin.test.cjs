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

test('organization administration gives each supported locale a complete first-access flow', () => {
  const window = loadGuideData();
  const firstAccessBodies = new Set();

  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    const matches = window.MAPNERO_GUIDES[id].platforms.web.topics
      .filter((topic) => topic.id === 'organization-admin');
    assert.equal(matches.length, 1, `${id}: exactly one administration topic`);

    const topic = matches[0];
    assert.ok(topic.title && topic.summary && topic.access && topic.note, `${id}: explanatory copy`);
    assert.equal(topic.capture, false, `${id}: no missing administration screenshot request`);
    assert.equal(topic.steps.length, 4, `${id}: safe administration sequence`);
    assert.ok(topic.steps[2].title && topic.steps[2].body, `${id}: first-access guidance`);
    firstAccessBodies.add(topic.steps[2].body);
  }

  assert.equal(firstAccessBodies.size, window.MAPNERO_GUIDE_LOCALES.length,
    'first-access instructions must use each locale’s own text');

  const english = window.MAPNERO_GUIDES.en.platforms.web.topics
    .find((topic) => topic.id === 'organization-admin');
  assert.match(english.steps[2].body, /6-digit code/i);
  assert.match(english.steps[2].body, /password/i);
  assert.match(english.steps[2].body, /web workspace/i);
});
