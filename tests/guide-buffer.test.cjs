const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');

test('the real guide entry point loads the buffer workflow once per platform and locale', () => {
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const context = vm.createContext({window: {}});
  for (const [, file] of html.matchAll(/<script src="(assets\/guides[^"?]*\.js)(?:\?[^\"]*)?"><\/script>/g)) {
    if (file !== 'assets/guides.js') vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  const translations = new Set();
  for (const {id} of context.window.MAPNERO_GUIDE_LOCALES) {
    for (const platform of ['apple', 'android']) {
      const topics = context.window.MAPNERO_GUIDES[id].platforms[platform].topics;
      const entries = topics.filter(topic => topic.id === 'buffer-workflow');
      assert.equal(entries.length, 1, `${platform}/${id}`);
      const entry = entries[0];
      assert.equal(entry.access, 'Pro / Team');
      assert.equal(entry.steps.length, 5);
      assert.ok(entry.note.length > 80);
      assert.ok(entry.steps.every(step => step.title.length && step.body.length > 30));
      assert.equal(topics.indexOf(entry), topics.findIndex(topic => topic.id === 'measure-cogo-buffer') + 1);
      assert.equal(entry.motion, undefined, 'Do not advertise an unrecorded clip');
      translations.add(JSON.stringify(entry.steps));
    }
  }
  assert.equal(translations.size, 12);
});

test('Buffer has twelve distinct full-resolution Android emulator captures', () => {
  const hashes = new Set();
  for (const locale of ['en', 'tr', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'pt', 'ru', 'uk', 'ur']) {
    const png = fs.readFileSync(path.join(root, 'assets/guides/screenshots/android', locale, 'buffer-workflow.png'));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(png.readUInt32BE(16), 1080);
    assert.equal(png.readUInt32BE(20), 2400);
    hashes.add(crypto.createHash('sha256').update(png).digest('hex'));
  }
  assert.equal(hashes.size, 12, 'No relabeled English capture');
  // File checks complement, never replace, the device integration test and
  // visual review recorded in docs/GUIDE_BUFFER_CAPTURE_2026-09-16.md.
});

test('Apple English Buffer guide has focused workflow and appearance captures', () => {
  for (const name of ['buffer-workflow.png', 'buffer-workflow-appearance.png']) {
    const png = fs.readFileSync(path.join(root, 'assets/guides/screenshots/apple/en', name));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.equal(png.readUInt32BE(16), 1206);
    assert.equal(png.readUInt32BE(20), 2622);
    assert.ok(png.length > 100000, `${name} should be a full-resolution capture`);
  }

  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const context = vm.createContext({window: {}});
  for (const [, file] of html.matchAll(/<script src="(assets\/guides[^"?]*\.js)(?:\?[^\"]*)?"><\/script>/g)) {
    if (file !== 'assets/guides.js') vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  }
  const entry = context.window.MAPNERO_GUIDES.en.platforms.apple.topics
    .find(topic => topic.id === 'buffer-workflow');
  assert.deepEqual(JSON.parse(JSON.stringify(entry.secondaryCapture)), {
    suffix: '-appearance', label: 'Fill color and opacity'
  });
});

test('Apple Spanish Buffer guide has its own localized workflow capture', () => {
  const png = fs.readFileSync(path.join(
    root,
    'assets/guides/screenshots/apple/es/buffer-workflow.png'
  ));
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(png.readUInt32BE(16), 1206);
  assert.equal(png.readUInt32BE(20), 2622);
  assert.ok(png.length > 100000, 'Spanish capture should be full resolution');
});
