#!/usr/bin/env node
// Internal link report for a built dist/ folder.
//  - contentIn: links INTO each page from OTHER pages' content (<main>, minus
//    the article author-bio boilerplate), counted once per linking page.
//  - depth: click depth from the homepage, following every internal link
//    (menu, footer and content), i.e. what a crawler sees.
//  - contentDepth: click depth following content links only.
// Usage: node scripts/seo/link-report.mjs <distDir> > report.json
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve(process.argv[2] || 'dist');
const pages = {};

function norm(href) {
  if (!href) return null;
  let u = href.trim();
  if (/^(mailto:|tel:|javascript:|#)/.test(u)) return null;
  u = u.replace(/^https?:\/\/(www\.)?bcpnpcalculator\.ca/, '');
  if (/^https?:/.test(u)) return null;
  if (!u.startsWith('/')) return null;
  u = u.split('#')[0].split('?')[0];
  if (/\.(txt|xml|png|jpg|svg|ico|json|webmanifest|pdf)$/.test(u)) return null;
  if (u.length > 1) u = u.replace(/\/$/, '');
  return u || '/';
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') {
      let rel = '/' + path.relative(dist, path.dirname(p)).split(path.sep).join('/');
      rel = rel === '/' ? '/' : rel.replace(/\/$/, '');
      const html = fs.readFileSync(p, 'utf8');
      const all = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => norm(m[1])).filter(Boolean);
      const mm = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      let main = mm ? mm[1] : '';
      const bio = main.indexOf('About the Author');
      if (bio > -1) main = main.slice(0, bio);
      const content = [...main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => norm(m[1])).filter(Boolean);
      const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
      pages[rel] = { all: [...new Set(all)], content: [...new Set(content)], noindex };
    }
  }
}
walk(dist);

const contentIn = {};
for (const k of Object.keys(pages)) contentIn[k] = 0;
for (const [src, { content }] of Object.entries(pages)) {
  for (const t of content) if (t !== src && t in contentIn) contentIn[t]++;
}

function bfs(key) {
  const d = { '/': 0 };
  const q = ['/'];
  while (q.length) {
    const c = q.shift();
    for (const t of pages[c]?.[key] || []) {
      if (!(t in d) && t in pages) { d[t] = d[c] + 1; q.push(t); }
    }
  }
  return d;
}
const depth = bfs('all');
const contentDepth = bfs('content');

const report = {};
for (const k of Object.keys(pages).sort()) {
  report[k] = { contentIn: contentIn[k], depth: depth[k] ?? null, contentDepth: contentDepth[k] ?? null, noindex: pages[k].noindex };
}
process.stdout.write(JSON.stringify(report, null, 2));
