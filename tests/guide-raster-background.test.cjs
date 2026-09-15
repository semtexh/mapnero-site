const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('actual guide entry point supplies localized raster workflow on both platforms', () => {
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const context = vm.createContext({ window: {} });
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"?]*\.js)(?:\?[^\"]*)?"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  for (const file of scripts) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  const translations = new Set();
  for (const { id } of context.window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const matches = context.window.MAPNERO_GUIDES[id].platforms[platform].topics.filter(t => t.id === 'raster-background');
      assert.equal(matches.length, 1, `${id}/${platform}`);
      const entry = matches[0];
      assert.equal(entry.steps.length, 4);
      for (const step of entry.steps) assert.ok(step.title && step.body.length > 30);
      assert.ok(entry.note.length > 100);
      assert.equal(entry.motion, undefined, 'No unrecorded demo video');
      translations.add(JSON.stringify(entry.steps));
    }
  }
  assert.equal(translations.size, 12, 'No English translation fallback');
});
