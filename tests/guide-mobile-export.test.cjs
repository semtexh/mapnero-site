const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

test('mobile export guidance is localized once per mobile platform', () => {
  const context = { window: {} };
  context.window.window = context.window;
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  for (const file of [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)]
    .map((match) => match[1]).filter((file) => file !== 'assets/guides.js')) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  for (const { id } of context.window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = context.window.MAPNERO_GUIDES[id].platforms[platform].topics
        .filter((topic) => topic.id === 'mobile-export');
      assert.equal(matches.length, 1, `${id}:${platform}`);
      assert.equal(matches[0].steps.length, 3, `${id}:${platform}:steps`);
      assert.equal(matches[0].tips.length, 1, `${id}:${platform}:tip`);
      assert.ok(matches[0].access.includes('Geo'), `${id}:${platform}:tier-boundary`);
    }
  }
});
