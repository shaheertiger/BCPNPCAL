#!/usr/bin/env node
// Extract title, meta description, H1 and first sentence of the main content
// for every built page in a dist/ folder. Used for before/after SEO reports.
// Usage: node scripts/seo/page-snapshot.mjs <distDir> > snapshot.json
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const out = {};

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') {
      const rel = '/' + path.relative(dist, path.dirname(p)).split(path.sep).join('/');
      out[rel === '/' ? '/' : rel.replace(/\/$/, '')] = snap(fs.readFileSync(p, 'utf8'));
    }
  }
}

const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'")
  .replace(/&quot;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/\s+/g, ' ').trim();

// First sentence, without splitting on abbreviations such as "B.C." or "e.g.".
function firstSentence(t) {
  const re = /[.!?](?=\s+["(\[]?[A-Z0-9]|$)/g;
  let m;
  while ((m = re.exec(t))) {
    const before = t.slice(0, m.index + 1);
    if (/(\b[A-Z]\.[A-Z]\.|\b(e\.g|i\.e|vs|approx|No|St|Mr|Ms|Dr)\.)$/.test(before)) continue;
    return before.trim();
  }
  return t;
}

function snap(html) {
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const meta = (html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || '';
  const h1m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1m ? strip(h1m[1]) : '';
  let first = '';
  if (h1m) {
    const after = html.slice(h1m.index + h1m[0].length);
    const ps = after.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const p of ps) {
      const t = strip(p[1]);
      if (t.length > 40) { first = firstSentence(t); break; }
    }
  }
  return { title: strip(title), meta: strip(meta), h1, first };
}

walk(dist);
process.stdout.write(JSON.stringify(out, null, 2));
