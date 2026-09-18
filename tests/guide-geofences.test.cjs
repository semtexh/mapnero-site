const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), test = require('node:test'), vm = require('node:vm');
const root = path.resolve(__dirname, '..');
test('geofence guide is localized once on both mobile platforms', () => {
  const c = { window: {} }; c.window.window = c.window; vm.createContext(c);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  for (const f of [...html.matchAll(/<script src="(assets\/guides[^"\s?]+\.js)(?:\?[^"\s]*)?"><\/script>/g)].map(m => m[1]).filter(f => f !== 'assets/guides.js')) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), c);
  for (const { id } of c.window.MAPNERO_GUIDE_LOCALES) for (const platform of ['apple', 'android']) {
    const t = c.window.MAPNERO_GUIDES[id].platforms[platform].topics.filter(x => x.id === 'geofences');
    assert.equal(t.length, 1, `${id}:${platform}`); assert.equal(t[0].steps.length, 3, `${id}:${platform}:steps`); assert.match(t[0].note, /20|20/);
  }
});
