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

test('label correction preserves the existing price and billing copy', () => {
  assert.deepEqual(cards.map(card => text(card.match(/<div class="tier-price">([\s\S]*?)<\/div>/)[1])),
    ['$0', '$34.99/yr', '$79.99/yr', '$99.99/yr']);
  assert.match(pricing, /All plans billed yearly through Apple\./);
});
