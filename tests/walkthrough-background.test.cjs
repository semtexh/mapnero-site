const test=require('node:test'),assert=require('node:assert/strict'),B=require('../assets/walkthrough-background.js');
test('background settings match native 5–100 percent visibility without clamping invalid input',()=>{assert.deepEqual(B.settings('basemap',.05),{mode:'basemap',opacity:.05});assert.deepEqual(B.settings('blank',1),{mode:'blank',opacity:1});for(const [m,o]of [['bad',1],['basemap',0],['blank',1.01],['basemap',NaN]])assert.throws(()=>B.settings(m,o));});
test('rotated geographic map corners remain immutable and preserve all four positions',()=>{const c=[[10,20],[11,20.1],[11.2,19.1],[10.2,19]],original=structuredClone(c),out=B.coordinates(c);assert.deepEqual(out,c);out[0][0]=12;assert.deepEqual(c,original);});
test('unknown, self-crossing, degenerate and wrapped extents fail explicitly',()=>{for(const c of [null,[[0,0],[1,1]],[[0,0],[1,1],[0,1],[1,0]],[[0,0],[0,0],[0,0],[0,0]],[[179,1],[-179,1],[-179,0],[179,0]],[[0,90],[1,90],[1,89],[0,89]]])assert.throws(()=>B.coordinates(c));});

test('reset restores native Basemap preference at twenty percent visibility',()=>{assert.deepEqual(B.reset(),{mode:'basemap',opacity:.2});});
