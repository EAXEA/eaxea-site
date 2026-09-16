import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { work, getCaseStudy, adjacentWork } from '../../src/data/work.ts';
import { services } from '../../src/data/services.ts';

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
      assert.equal(item.status, 'Yayında');
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
    assert.ok(path === '/studio' || getCaseStudy(path.replace('/work/', '')), service.id);
  }
});

test('public portfolio copy preserves anonymity and editorial rules', () => {
  const copy = JSON.stringify({ work, services });
  assert.doesNotMatch(copy, /—|vibe coding|Meta Medikal|metamedikal\.com/i);
  const config = readFileSync(new URL('../../src/lib/site.ts', import.meta.url), 'utf8');
  assert.match(config, /https:\/\/eaxea-site\.vercel\.app/);
});
