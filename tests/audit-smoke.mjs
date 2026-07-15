import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

assert.ok(html.startsWith('<!DOCTYPE html>'), 'Document must have a doctype');
assert.match(html, /<html lang="(?:en|ru)">/, 'Document language must be declared');
assert.ok(script, 'Inline script must exist');
assert.doesNotThrow(() => new Function(script), 'Inline JavaScript must parse');

assert.match(html, /data-language="en"/);
assert.match(html, /data-language="ru"/);
assert.match(html, /https:\/\/www\.instagram\.com\/aloverofcinema/);
assert.match(html, /https:\/\/t\.me\/xamcod/);
assert.doesNotMatch(html, /href="#"[^>]+aria-label="Behance"/);

assert.match(html, /role="dialog" aria-modal="true"/);
assert.match(script, /function getFocusable\(/);
assert.match(script, /function trapFocus\(/);
assert.match(script, /function setDialogBackground\(/);
assert.match(script, /clearTimeout\(closeTimer\)/);
assert.doesNotMatch(html, /<video\b/);
assert.doesNotMatch(html, /39FF14|Loopstack|Book a demo/);

console.log('Audit smoke tests: OK');
