const test = require('node:test');
const assert = require('node:assert/strict');
const { rewriteHref, campaigns } = require('../assets/campaign-links.js');
const page = 'https://www.mapnero.com/?mn_campaign=youtube_profile';
const apple = 'https://apps.apple.com/app/apple-store/id6758651027?pt=128311453&ct=website_home&mt=8';
const play = 'https://play.google.com/store/apps/details?id=com.thenerolabs.mapnero&utm_source=mapnero_website&utm_campaign=website_home';
test('untagged or unrecognized traffic keeps the original links exactly', () => {
  for (const p of ['https://www.mapnero.com/', 'https://www.mapnero.com/?mn_campaign=constructor', 'https://www.mapnero.com/?mn_campaign=not_a_campaign', 'https://evil.test/?mn_campaign=youtube_profile']) {
    for (const link of [apple, play, 'guides.html?lang=fr#apple/import-map']) assert.equal(rewriteHref(link,p),link);
  }
});
test('campaign crosses homepage, localized guide and store without losing language or anchor', () => {
  const guide = rewriteHref('guides.html?lang=fr#apple/import-map', page);
  const url = new URL(guide);
  assert.equal(url.searchParams.get('lang'),'fr');
  assert.equal(url.hash,'#apple/import-map');
  assert.equal(url.searchParams.get('mn_campaign'),'youtube_profile');
  const a = new URL(rewriteHref(apple,guide));
  assert.equal(a.searchParams.get('pt'),'128311453');
  assert.equal(a.searchParams.get('mt'),'8');
  assert.equal(a.searchParams.get('ct'),'youtube_profile');
  const g = new URL(rewriteHref(play,guide));
  assert.equal(g.searchParams.get('id'),'com.thenerolabs.mapnero');
  assert.equal(g.searchParams.get('utm_source'),'youtube');
  assert.equal(g.searchParams.get('utm_campaign'),'youtube_profile');
});
test('downloads, apps, other stores and unrelated sites stay unchanged', () => {
  for (const link of ['downloads/mapnero-practice-map.pdf','assets/test.png','https://app.mapnero.com/','https://example.org/','https://apps.apple.com/app/id999','https://play.google.com/store/apps/details?id=other.app','mailto:support@thenerolabs.com','#practice-map','javascript:alert(1)']) assert.equal(rewriteHref(link,page),link);
});
test('known campaigns are short, fixed labels and mapping is idempotent', () => {
  for (const [campaign, source] of Object.entries(campaigns)) {
    assert.match(campaign,/^[a-z0-9_]{1,30}$/);
    const p = 'https://www.mapnero.com/geopdf-maps-fr.html?mn_campaign='+campaign;
    const updated=rewriteHref(play,p);
    assert.equal(new URL(updated).searchParams.get('utm_source'),source);
    assert.equal(rewriteHref(updated,p),updated);
  }
});

test('social source survives the route and Indonesian point guides before store handoff', () => {
  for (const path of ['route-builder.html', 'route-builder-es.html', 'route-builder-pt-br.html', 'save-field-point-id.html']) {
    const fromHub = rewriteHref(path, 'https://www.mapnero.com/guides.html?mn_campaign=youtube_profile');
    assert.equal(new URL(fromHub).searchParams.get('mn_campaign'), 'youtube_profile');
    const store = new URL(rewriteHref(play, fromHub));
    assert.equal(store.searchParams.get('id'), 'com.thenerolabs.mapnero');
    assert.equal(store.searchParams.get('utm_source'), 'youtube');
    assert.equal(store.searchParams.get('utm_campaign'), 'youtube_profile');
    assert.equal(new URL(rewriteHref(apple, fromHub)).searchParams.get('ct'), 'youtube_profile');
  }
});
