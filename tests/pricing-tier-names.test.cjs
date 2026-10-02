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

test('pricing preserves existing prices without promising Apple-only billing', () => {
  assert.deepEqual(cards.map(card => text(card.match(/<div class="tier-price">([\s\S]*?)<\/div>/)[1])),
    ['$0', '$34.99/yr', '$79.99/yr', '$99.99/yr']);
  assert.match(pricing, /Check your app store for local prices and subscription terms\./);
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
