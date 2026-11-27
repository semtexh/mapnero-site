const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const pricing = html.slice(html.indexOf('<div id="pricing"'), html.indexOf('<!-- CTA -->'));
const cards = [...pricing.matchAll(/<div class="tier-card[^\"]*">([\s\S]*?)<\/ul>/g)].map(m => m[1]);
const text = markup => markup.replace(/<[^>]+>/g, '').trim();

test('pricing uses canonical Free, Core, Pro and Team names', () => {
  assert.equal(cards.length, 4);
  const names = cards.map(card => card.match(/<div class="tier-name">([^<]+)<\/div>/)[1]);
  assert.deepEqual(names, ['Free', 'Core', 'Pro', 'Team']);
  assert.doesNotMatch(pricing, /\bPlus\b|\bTeam Solo\b/);
});

test('higher tiers refer to the canonical preceding tier', () => {
  assert.match(cards[2], /<li>Everything in Core<\/li>/);
  assert.match(cards[3], /<li>Everything in Pro<\/li>/);
});

test('pricing labels U.S. App Store reference prices and points to in-app offers', () => {
  assert.deepEqual(cards.map(card => text(card.match(/<div class="tier-price">([\s\S]*?)<\/div>/)[1])),
    ['$0', '$34.99/yr', '$79.99/yr', '$99.99/yr']);
  assert.match(pricing, /Annual subscription prices shown in USD are from the U\.S\. App Store\./);
  assert.match(pricing, /Check MapNero for prices and offers in your region/);
  assert.doesNotMatch(pricing, /All plans billed yearly through Apple\./);
});

test('Free reflects basic export, UTM and the limited offline region', () => {
  assert.match(cards[0], /Decimal degrees & UTM coordinates/);
  assert.match(cards[0], /1 offline region \(up to zoom 14\)/);
  assert.match(cards[0], /KML, KMZ, GPX & CSV export/);
  assert.doesNotMatch(cards[0], /No offline tiles|No export/);
});

test('Core conversion is distinct from Pro map layout creation', () => {
  assert.match(cards[1], /GeoTIFF & GeoPDF export of existing maps/);
  assert.match(cards[1], /25 active geofences/);
  assert.match(cards[2], /Create new GeoPDF map layouts/);
  assert.doesNotMatch(pricing, /Unlimited everything/);
});

test('pricing separates unlimited personal map imports from offline region limits', () => {
  assert.match(cards[0], /Unlimited imports of your own GeoPDF and supported GeoTIFF maps/);
  assert.match(cards[0], /1 offline region/);
});

test('supported File Geodatabase and forestry features appear under Pro', () => {
  assert.match(cards[2], /Esri File Geodatabase \(\.gdb\.zip\) import and export/);
  assert.match(cards[2], /Forestry calculations and field reports/);
  assert.match(pricing, /Features vary by device and platform/);
  assert.doesNotMatch(cards[0] + cards[1], /\.gdb\.zip/);
  for (const file of ['start.html', 'start-id.html', 'start-pt-br.html']) {
    const download = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.match(download, /<h3>Pro<\/h3><p>[^<]*Esri File Geodatabase \(\.gdb\.zip\)/, file);
  }
});
