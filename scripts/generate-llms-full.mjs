#!/usr/bin/env node
// Builds dist/llms-full.txt for bcpnpcalculator.ca.
//
// Runs after `astro build` (see the "build" script in package.json):
//   1. reads the hand-written intro from src/data/llms-full-intro.md,
//   2. checks that every https://bcpnpcalculator.ca/... link in the intro is a
//      page in the built sitemap (or a file in dist/), failing the build if not,
//   3. appends a "Complete URL Index" generated from the built sitemap, with
//      each page's <title> read from its built HTML.
//
// Edit the intro in src/data/llms-full-intro.md. Edit the index categories
// in CATEGORIES below.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const INTRO = path.join(ROOT, 'src', 'data', 'llms-full-intro.md');
const OUT = path.join(DIST, 'llms-full.txt');

const DOMAIN = 'bcpnpcalculator.ca';
const ORIGIN = `https://${DOMAIN}`;
const SITE_NAME = 'BC PNP Calculator';

// Ordered: the first category whose test matches a pathname wins.
const CATEGORIES = [
  {
    name: 'Tools & Core Pages',
    test: (p) => ['/', '/bc-pnp-calculator', '/bc-pnp-draws', '/bc-pnp-guide', '/guides', '/news'].includes(p),
  },
  {
    name: 'Localized Pages',
    test: (p) => /^\/(zh|hi|pa|ar)(\/|$)/.test(p),
  },
  {
    name: 'Calculator & Scoring Guides',
    test: (p) => /^\/articles\/.*(calculator|score|points)/.test(p),
  },
  {
    name: 'Draws, Allocations & News',
    test: (p) =>
      /^\/articles\/.*(-draws?-(results|recap|immigration|2027)|allocation|outlook|statistical-report|levels-plan|pnp-news|temporary-resident-cap|category-changes|look-west)/.test(p),
  },
  {
    name: 'Comparisons',
    test: (p) => /^\/articles\/.*(-vs-|best-provinces)/.test(p),
  },
  {
    name: 'Canadian PR & Federal Pathways',
    test: (p) =>
      /^\/articles\/(canada-|express-entry-|how-to-become-|how-to-get-provincial-|how-to-immigrate-|how-long-to-get-pr|how-to-move-|rcip-|what-is-pnp|tech-layoffs)/.test(p),
  },
  {
    name: 'BC PNP Streams & Application Guides',
    test: (p) => p.startsWith('/articles/'),
  },
  {
    name: 'About & Legal',
    test: (p) => ['/about', '/contact', '/privacy-policy', '/terms', '/sitemap'].includes(p),
  },
  { name: 'Other Pages', test: () => true },
];

function fail(msg) {
  console.error(`\n[llms-full] ERROR: ${msg}\n`);
  process.exit(1);
}

// --- Sitemap -----------------------------------------------------------------

function readLocs(file) {
  const xml = fs.readFileSync(file, 'utf8');
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => decodeEntities(m[1]));
}

function readSitemapUrls() {
  const indexFile = path.join(DIST, 'sitemap-index.xml');
  let shards;
  if (fs.existsSync(indexFile)) {
    shards = readLocs(indexFile).map((u) => path.join(DIST, new URL(u).pathname));
  } else {
    shards = fs
      .readdirSync(DIST)
      .filter((f) => /^sitemap-\d+\.xml$/.test(f))
      .map((f) => path.join(DIST, f));
  }
  if (shards.length === 0) fail('No sitemap found in dist/. Run `astro build` first.');
  const urls = [];
  for (const shard of shards) {
    if (!fs.existsSync(shard)) fail(`Sitemap shard missing: ${shard}`);
    urls.push(...readLocs(shard));
  }
  return [...new Set(urls)];
}

// Sitemap convention: no trailing slash, except the bare root "/".
function normalize(url) {
  const u = new URL(url);
  let p = u.pathname;
  if (p !== '/') p = p.replace(/\/+$/, '');
  return `${u.origin}${p}`;
}

// --- Titles ------------------------------------------------------------------

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function htmlFileFor(url) {
  const p = new URL(url).pathname.replace(/\/+$/, '');
  const candidates = [path.join(DIST, p, 'index.html'), path.join(DIST, `${p}.html`)];
  return candidates.find((f) => fs.existsSync(f));
}

function cleanTitle(raw) {
  let t = decodeEntities(raw.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
  const suffix = new RegExp(`\\s+[|\\-–—]\\s+${SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  t = t.replace(suffix, '').trim();
  return t;
}

function titleFor(url) {
  const file = htmlFileFor(url);
  if (!file) return null;
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title && cleanTitle(title[1])) return cleanTitle(title[1]);
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1 && cleanTitle(h1[1])) return cleanTitle(h1[1]);
  return null;
}

function escapeMd(s) {
  return s.replace(/([\[\]\\])/g, '\\$1');
}

// --- Intro link validation ---------------------------------------------------

function validateIntro(intro, sitemapSet) {
  const re = new RegExp(`https?://(?:www\\.)?${DOMAIN.replace(/\./g, '\\.')}[^\\s\`)\\]>"'*]*`, 'g');
  const bad = [];
  for (const m of intro.matchAll(re)) {
    const raw = m[0].replace(/[.,;:!?]+$/, '');
    const u = new URL(raw);
    if (u.hostname !== DOMAIN || u.protocol !== 'https:') {
      bad.push(`${raw} (use ${ORIGIN})`);
      continue;
    }
    if (u.search || u.hash) {
      bad.push(`${raw} (no query strings or fragments)`);
      continue;
    }
    // Static files (llms.txt, sitemap-index.xml, ...) only need to exist in dist/.
    if (/\.[a-z0-9]+$/i.test(u.pathname)) {
      const own = u.pathname === '/llms-full.txt';
      if (!own && !fs.existsSync(path.join(DIST, u.pathname))) bad.push(`${raw} (file not in dist/)`);
      continue;
    }
    if (u.pathname !== '/' && u.pathname.endsWith('/')) {
      bad.push(`${raw} (remove the trailing slash)`);
      continue;
    }
    if (!sitemapSet.has(normalize(raw))) bad.push(`${raw} (not in the built sitemap)`);
  }
  if (bad.length) {
    fail(
      `src/data/llms-full-intro.md links to URLs that are not pages on ${DOMAIN}:\n` +
        bad.map((b) => `  - ${b}`).join('\n') +
        '\nFix or remove these links.'
    );
  }
}

// --- Main --------------------------------------------------------------------

if (!fs.existsSync(DIST)) fail('dist/ not found. Run `astro build` first.');
if (!fs.existsSync(INTRO)) fail(`Intro not found: ${INTRO}`);

const intro = fs.readFileSync(INTRO, 'utf8').replace(/\s+$/, '');
const urls = readSitemapUrls();
const sitemapSet = new Set(urls.map(normalize));

validateIntro(intro, sitemapSet);

const groups = new Map(CATEGORIES.map((c) => [c.name, []]));
for (const url of urls) {
  const p = new URL(url).pathname.replace(/(.)\/+$/, '$1');
  const cat = CATEGORIES.find((c) => c.test(p));
  const title = titleFor(url);
  groups.get(cat.name).push({ url, title });
}

const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
const lines = [
  '<!-- GENERATED:URL-INDEX — do not edit by hand, see scripts/generate-llms-full.mjs -->',
  '',
  '## Complete URL Index',
  '',
  `Every indexable page on ${DOMAIN} (${urls.length} URLs), generated from the sitemap.`,
];
let written = 0;
for (const [name, items] of groups) {
  if (items.length === 0) continue;
  items.sort((a, b) => collator.compare(a.title ?? a.url, b.title ?? b.url));
  lines.push('', `### ${name} (${items.length})`, '');
  for (const { url, title } of items) {
    lines.push(title ? `- [${escapeMd(title)}](${url})` : `- ${url}`);
    written++;
  }
}
lines.push('', '<!-- /GENERATED:URL-INDEX -->', '');

if (written !== urls.length) fail(`Index has ${written} entries but the sitemap has ${urls.length} URLs.`);

fs.writeFileSync(OUT, `${intro}\n\n${lines.join('\n')}`, 'utf8');

const summary = [...groups].filter(([, v]) => v.length).map(([k, v]) => `${k}: ${v.length}`).join(', ');
console.log(`[llms-full] Wrote dist/llms-full.txt with ${urls.length} URLs (${summary}).`);
