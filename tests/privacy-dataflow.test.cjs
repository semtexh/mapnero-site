const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'privacy.html'), 'utf8');
test('submitted diagnostics describe text, metadata and conditional attribution', () => {
 for (const value of ['When you submit an in-app bug or crash report','device identifier and model','app/build and system versions','session/account identifier is included when available','Report text and crash details may contain locations']) assert.ok(html.includes(value), value);
 assert.ok(!html.includes('never your location'));
});
test('regional local sampling and precise remote lookup are separate', () => {
 for (const value of ['AWS Skadi','one-degree geographic region','revealing the approximate area','full route point coordinates are not sent as lookup parameters on this path','Remote elevation lookup where used','precise coordinates you request']) assert.ok(html.includes(value), value);
 assert.ok(!html.includes('Terrain elevation for 3D/route/elevation features'));
 assert.ok(html.includes('AWS Terrarium')); // Other tile path remains disclosed.
});
test('search describes only submitted query and configured provider scope', () => {
 for (const value of ['configured geocoding provider','search language and result limit','typing alone does not start a search']) assert.ok(html.toLowerCase().includes(value.toLowerCase()), value);
 assert.ok(!html.includes('Photon')); // Source default is not deployed-provider proof.
});
test('service and retention tables retain three cells per row and no new scripts', () => {
 assert.equal((html.match(/<table>/g)||[]).length,2);
 const rows=[...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)];
 assert.equal(rows.length,18);
 for (const [,row] of rows) assert.equal((row.match(/<(?:td|th)(?: [^>]*)?>/g)||[]).length,3);
 assert.ok(!html.includes('<script'));
 assert.equal((html.match(/<td data-label=/g)||[]).length,48);
 assert.ok(html.includes('content:attr(data-label)'));
 assert.ok(html.includes('Last updated: October 14, 2026'));
 assert.ok(html.includes('delete-account.html'));
});

test('database project region is qualified separately from edge processing', () => {
 assert.ok(!html.includes('Singapore'));
 assert.ok(!html.includes('ap-southeast-1'));
 assert.equal((html.match(/database project is configured in eu-central-1 \(Frankfurt\)/g)||[]).length,2);
 assert.ok(html.includes('Edge functions and other providers may process requests in other regions.'));
});
