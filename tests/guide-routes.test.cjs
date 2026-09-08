const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

test('route guides load for 12 locales with separate Apple and Android flows', () => {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s]+\.js)"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  assert.ok(scripts.includes('assets/guides-data.js'));
  assert.ok(scripts.indexOf('assets/guides-routes.js') > scripts.indexOf('assets/guides-rtl.js'));
  assert.ok(scripts.indexOf('assets/guides-android-routes.js') > scripts.indexOf('assets/guides-routes.js'));
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
    for (const platform of ['web']) {
      assert.ok(!platforms[platform].topics.some(topic => topic.id === 'route-builder'),
        'Apple instructions must not leak to ' + platform);
    }
    const android = platforms.android.topics.filter(t => t.id === 'route-builder');
    assert.equal(android.length, 1, id + ':android');
    assert.equal(android[0].steps.length, 4);
    assert.notEqual(android[0].steps[0].body, topic.steps[0].body);
    assert.notEqual(android[0].steps[3].body, topic.steps[3].body);
    assert.match(android[0].steps[3].body, /Save/);
    assert.notEqual(android[0].tips[0].a, topic.tips[0].a);
    assert.notStrictEqual(android[0].steps, topic.steps);
  }
  assert.equal(titles.size, 12);
});

test('3D and report topics have complete localized platform-specific instructions', () => {
  const context = {window: {}};
  vm.createContext(context);
  const html = fs.readFileSync(path.join(root, 'guides.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="(assets\/guides[^"\s]+\.js)"><\/script>/g)]
    .map(match => match[1]).filter(file => file !== 'assets/guides.js');
  assert.ok(scripts.indexOf('assets/guides-track-tools.js') < scripts.indexOf('assets/guides-android-reports.js'));
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
      assert.ok(!platforms.web.topics.some(t => t.id === topicId));
      if (topicId === 'track-3d') {
        if (id === 'ar') assert.ok(!topic.steps[2].body.includes('أعلى اليمين'));
        if (id === 'ur') assert.ok(!topic.steps[2].body.includes('اوپر دائیں'));
        const android = platforms.android.topics.filter(t => t.id === topicId);
        assert.equal(android.length, 1, id + ':android-3d');
        assert.equal(android[0].steps.length, 3);
        assert.notEqual(android[0].title, topic.title);
        assert.match(android[0].steps[2].body, /Core/);
        assert.ok(android[0].note && android[0].summary && android[0].access);
        for (const step of android[0].steps) assert.ok(step.title && step.body);
      }
      if (topicId === 'track-report') {
        const android = platforms.android.topics.filter(t => t.id === topicId);
        assert.equal(android.length, 1, id + ':android-report');
        assert.equal(android[0].steps.length, 4);
        assert.match(android[0].access, /Core/);
        assert.match(android[0].steps[1].body, /2D|2D’|ثنائي|двумер|двовимір/);
        assert.match(android[0].steps[3].body, /GPX/);
        assert.ok(android[0].tips[0].q && android[0].tips[0].a);
        for (let i = 0; i < 4; i++) {
          assert.ok(android[0].steps[i].title && android[0].steps[i].body);
          assert.notEqual(android[0].steps[i].body, topic.steps[i].body);
        }
      }
    }
    assert.equal(titles.size, 12);
  }
});
