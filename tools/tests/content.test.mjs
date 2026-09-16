import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { work, getCaseStudy, adjacentWork } from '../../src/data/work.ts';
import { services } from '../../src/data/services.ts';
import { site } from '../../src/lib/site.ts';

test('portfolio routes are unique and all declared showcase assets exist', () => {
  assert.equal(new Set(work.map(item => item.slug)).size, work.length);
  for (const item of work) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.equal(getCaseStudy(item.slug), item);
    assert.ok(work.includes(adjacentWork(item.slug).next));
    if (item.media) for (const ext of ['webp', 'webm']) {
      assert.ok(existsSync(new URL(`../../public/showcase/${item.slug}.${ext}`, import.meta.url)), `${item.slug}.${ext}`);
    }
    if (item.mediaWide) assert.ok(existsSync(new URL(`../../public/showcase/${item.slug}-wide.webp`, import.meta.url)));
    if (item.url) {
      assert.equal(new URL(item.url).protocol, 'https:');
      assert.match(item.status, /yayın|canlı/i, `${item.slug}: has a url but is not marked live`);
    }
    // The reverse direction matters just as much: a case may not advertise a
    // live site without linking to one a visitor can check.
    if (/yayın|canlı/i.test(item.status)) {
      assert.ok(item.url, `${item.slug}: claims to be live but has no url`);
    }
  }
  assert.equal(getCaseStudy('not-a-project'), undefined);
});

test('closed and paused projects cannot be represented as active delivery', () => {
  const medical = getCaseStudy('medikal-katalog');
  assert.equal(medical.phase, 'archived');
  assert.equal(medical.url, undefined);
  assert.match(medical.intro, /müşteri teslimatı veya canlı lansman yapılmadı/);
  assert.equal(getCaseStudy('bass-assistant').phase, 'paused');
  assert.equal(getCaseStudy('fixgo').url, 'https://fixgo.vip');
});

test('every service proof resolves to an existing page or case', () => {
  for (const service of services) {
    const path = service.proof.href.split('#')[0];
    assert.ok(path === '/hakkimda' || getCaseStudy(path.replace('/work/', '')), service.id);
  }
});

const FORBIDDEN = /—|vibe coding|Meta Medikal|metamedikal\.com/i;

/** Drops comments so an em-dash in a code note is not mistaken for copy. */
const renderedText = source => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split(String.fromCharCode(10))
  .filter(line => !/^\s*(\/\/|\*|\{\s*\/\*)/.test(line))
  .map(line => (line.includes('http') ? line : line.replace(/\/\/.*$/, '')))
  .join(String.fromCharCode(10));

const filesUnder = (dir, ext) => {
  const out = [];
  for (const entry of readdirSync(new URL(dir, import.meta.url), { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(...filesUnder(`${dir}${entry.name}/`, ext));
    else if (entry.name.endsWith(ext)) out.push(`${dir}${entry.name}`);
  }
  return out;
};

test('public portfolio copy preserves anonymity and editorial rules', () => {
  const copy = JSON.stringify({ work, services });
  assert.doesNotMatch(copy, FORBIDDEN);
  assert.ok(site.name.trim().length > 0, 'site.name must not be empty');
  assert.match(site.url, /^https:\/\//, 'site.url must be absolute and https');
  assert.doesNotMatch(site.url, /\/$/, 'site.url must not end with a slash');
});

test('every copy source obeys the same editorial rules, not just work data', () => {
  const sources = [
    ...filesUnder('../../src/data/', '.ts'),
    '../../src/lib/site.ts',
    ...filesUnder('../../src/app/', '.tsx'),
    ...filesUnder('../../src/components/', '.tsx'),
  ];
  assert.ok(sources.length > 20, 'expected the scan to reach the whole copy surface');
  for (const rel of sources) {
    const text = renderedText(readFileSync(new URL(rel, import.meta.url), 'utf8'));
    assert.doesNotMatch(text, FORBIDDEN, rel);
  }
});
