import test from 'node:test';
import assert from 'node:assert/strict';
import { work, listedWork } from '../../src/data/work.ts';
import { site } from '../../src/lib/site.ts';

const base = process.env.TEST_BASE_URL;
const pages = ['/', '/hakkimda', '/work', '/contact', ...listedWork.map(item => `/work/${item.slug}`)];

// React escapes quotes and apostrophes inside attributes, so a brand such as
// "MAIA'S WORKS" never appears literally in the markup. Decode before comparing.
const decode = value => (value ?? '')
  .replace(/&(?:#x27|#39|apos);/g, "'")
  .replace(/&(?:quot|#34);/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

const canonicalFor = path => new URL(path, site.url).href.replace(/\/$/, '');

test(`rendered branding uses ${site.name} while preserving the EAXEA GitHub identity`, { skip: !base }, async () => {
  for (const path of pages) {
    const response = await fetch(new URL(path, base), { headers: { 'user-agent': 'Twitterbot' } });
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1]);
    assert.ok(title.includes(site.name), `${path}: page brand (got ${title})`);
    const ogSiteName = decode(html.match(/property="og:site_name" content="([^"]*)"/)?.[1]);
    assert.equal(ogSiteName, site.name, `${path}: social brand`);
    assert.match(html, /href="https:\/\/github\.com\/EAXEA"/, `${path}: original GitHub account`);
    // EAXEA stays hard-coded here on purpose. It is the retired brand, so this
    // guards against it resurfacing in metadata whatever site.name becomes.
    assert.doesNotMatch(html, /<meta[^>]*content="EAXEA[^"]*"/, `${path}: stale brand metadata`);
    if (path === '/') {
      const json = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
      assert.ok(json, 'structured data');
      const data = JSON.parse(json[1]);
      assert.equal(data.name, site.name);
      assert.ok(data.sameAs.includes('https://github.com/EAXEA'));
    }
  }
});

test('production routes, canonical URLs, social metadata and security headers', { skip: !base }, async () => {
  for (const path of pages) {
    const response = await fetch(new URL(path, base), { headers: { 'user-agent': 'Twitterbot' } });
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('x-frame-options'), 'DENY');
    assert.equal(response.headers.get('x-powered-by'), null);
    // The dev server adds 'unsafe-eval' for React's debugging build. A production
    // response carrying it would mean the development branch leaked into the
    // deployed policy, so this suite -- which only ever runs against a built
    // server -- is the right place to pin that down.
    const csp = response.headers.get('content-security-policy') ?? '';
    assert.ok(csp.includes("default-src 'self'"), `${path}: CSP must pin default-src`);
    assert.ok(!csp.includes('unsafe-eval'), `${path}: production CSP must not allow eval`);
    const html = await response.text();
    if (path === '/contact') {
      // The form never posted anywhere useful: a mailto action with method=post
      // is not reliably supported, so it contradicted its own noscript notice.
      assert.ok(!html.includes(`action="mailto:`), 'form must not claim a mailto action');
      assert.match(html, /<noscript>/);
      assert.ok(html.includes(`mailto:${site.email}`), 'noscript still offers a direct address');
    }
    assert.match(html, /<html[^>]+lang="tr"/);
    assert.match(html, /id="main-content"/);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: one h1`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.equal(canonical?.[1].replace(/\/$/, ''), canonicalFor(path), path);
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/);
    assert.equal(ogUrl?.[1].replace(/\/$/, ''), canonicalFor(path), `${path}: og url`);
    assert.match(html, /property="og:image"/);
    for (const match of html.matchAll(/href="(\/[^"?#]*)[^"]*"/g)) {
      const target = match[1];
      if (target.startsWith('/_next/') || target.includes('.')) continue;
      assert.ok(pages.includes(target), `${path}: unknown internal link ${target}`);
    }
  }
});

test('sitemap, social image and unknown routes', { skip: !base }, async () => {
  const sitemap = await fetch(new URL('/sitemap.xml', base));
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.equal((xml.match(/<loc>/g) || []).length, pages.length);
  for (const path of ['/missing-page-check', '/work/missing-case-check', '/work/meta-medikal']) {
    assert.equal((await fetch(new URL(path, base))).status, 404, path);
  }
  for (const item of listedWork) {
    const path = `/work/${item.slug}`;
    const card = await fetch(new URL(`${path}/opengraph-image`, base));
    assert.equal(card.status, 200, `${path}: own share card`);
    assert.match(card.headers.get('content-type'), /^image\//, `${path}: share card type`);
    assert.ok((await card.arrayBuffer()).byteLength > 1000, `${path}: share card is not empty`);
    const html = await (await fetch(new URL(path, base), { headers: { "user-agent": "Twitterbot" } })).text();
    const og = html.match(/<meta property="og:image" content="([^"]+)"/);
    assert.ok(og?.[1].includes(`${path}/opengraph-image`), `${path}: points at its own card, got ${og?.[1]}`);
  }
  const image = await fetch(new URL('/opengraph-image', base));
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type'), /^image\//);
  assert.ok((await image.arrayBuffer()).byteLength > 1000);
});

test('unlisted cases stay reachable but are kept out of search and the sitemap', { skip: !base }, async () => {
  const unlisted = work.filter(item => item.listed === false);
  assert.ok(unlisted.length > 0, 'expected at least one unlisted case');
  const xml = await (await fetch(new URL('/sitemap.xml', base))).text();
  for (const item of unlisted) {
    const path = `/work/${item.slug}`;
    const response = await fetch(new URL(path, base), { headers: { 'user-agent': 'Twitterbot' } });
    assert.equal(response.status, 200, `${path}: still reachable`);
    const html = await response.text();
    assert.match(html, /<meta name="robots" content="[^"]*noindex/, `${path}: noindex`);
    assert.ok(!xml.includes(`${path}<`), `${path}: must not be in the sitemap`);
    assert.ok(!pages.includes(path), `${path}: must not be in the showcase`);
  }
});

test('structured data covers the business, the founder and case breadcrumbs', { skip: !base }, async () => {
  const blocks = async path => {
    const response = await fetch(new URL(path, base), { headers: { 'user-agent': 'Twitterbot' } });
    const html = await response.text();
    return [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)]
      .map(match => JSON.parse(match[1]));
  };

  const business = (await blocks('/')).find(item => item['@type'] === 'ProfessionalService');
  assert.ok(business, 'home: ProfessionalService node');
  assert.equal(business.founder['@id'], `${site.url}/hakkimda#person`, 'founder points at the Person node');

  const person = (await blocks('/hakkimda')).find(item => item['@type'] === 'Person');
  assert.ok(person, '/hakkimda: Person node');
  assert.equal(person['@id'], business.founder['@id'], 'the reference from the home page resolves here');
  assert.equal(person.name, site.founder);
  assert.equal(person.worksFor['@id'], business['@id'], 'Person links back to the business');
  assert.ok(person.sameAs.includes('https://github.com/EAXEA'), 'Person keeps the verifiable profile link');

  for (const item of listedWork) {
    const path = `/work/${item.slug}`;
    const crumbs = (await blocks(path)).find(node => node['@type'] === 'BreadcrumbList');
    assert.ok(crumbs, `${path}: BreadcrumbList node`);
    assert.deepEqual(crumbs.itemListElement.map(entry => entry.position), [1, 2, 3], `${path}: trail depth`);
    assert.equal(crumbs.itemListElement.at(-1).name, item.title, `${path}: leaf name`);
    assert.equal(crumbs.itemListElement.at(-1).item, new URL(path, site.url).href, `${path}: leaf url`);
  }
});
