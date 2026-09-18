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
    .map((match) => match[1])
    .filter((file) => file !== 'assets/guides.js');
  for (const file of scripts) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  return context.window;
}

test('map layout guide is localized and keeps platform entitlement distinct', () => {
  const guides = loadGuides();
  for (const { id } of guides.MAPNERO_GUIDE_LOCALES) {
    const apple = guides.MAPNERO_GUIDES[id].platforms.apple.topics
      .filter((topic) => topic.id === 'map-layout-export');
    const android = guides.MAPNERO_GUIDES[id].platforms.android.topics
      .filter((topic) => topic.id === 'map-layout-export');
    assert.equal(apple.length, 1, `${id}:apple`);
    assert.equal(android.length, 1, `${id}:android`);
    assert.equal(apple[0].steps.length, 3, `${id}:apple steps`);
    assert.equal(android[0].steps.length, 3, `${id}:android steps`);
    assert.match(apple[0].access, /Pro/);
    assert.match(android[0].access, /Pro/);
    assert.match(apple[0].steps[2].body, /MBTiles/);
    assert.match(android[0].steps[2].body, /MBTiles/);
  }
});
