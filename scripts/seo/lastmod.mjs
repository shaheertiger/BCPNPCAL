// Real per-page lastmod for the sitemap.
//
// Each page's date comes from its own source file: the `dateModified` prop or
// JSON-LD field (articles), a `DATE_MODIFIED` constant (homepage, guide hub),
// or `DRAWS_LAST_UPDATED_ISO` from src/data/bcpnp-draws.ts for pages built
// from draw data. Pages without a date in their source use PAGE_DATES below
// (update it when you change one of those pages). Pages with no known date
// get no <lastmod>, rather than a misleading build timestamp.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const PAGES = path.join(ROOT, 'src', 'pages');

/** Last substantive content change of pages that don't carry a date in code. */
export const PAGE_DATES = {
  '/about': '2026-06-08',
  '/contact': '2026-06-08',
  '/guides': '2026-11-16',
  '/news': '2026-11-16',
  '/privacy-policy': '2026-10-14',
  '/terms': '2026-02-16',
  '/sitemap': '2026-06-10',
  // Localized pages: content lives in src/i18n (last changed 2026-11-11).
  '/zh': '2026-11-11',
  '/hi': '2026-11-11',
  '/zh/bc-pnp-calculator': '2026-11-11',
  '/hi/bc-pnp-calculator': '2026-11-11',
  '/zh/bc-pnp-guide': '2026-11-11',
  '/hi/bc-pnp-guide': '2026-11-11',
};

const DATE_RE = /(?:dateModified\s*[=:]\s*|DATE_MODIFIED\s*=\s*)["'`](\d{4}-\d{2}-\d{2})/g;

function drawsDate() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'bcpnp-draws.ts'), 'utf8');
  return (src.match(/DRAWS_LAST_UPDATED_ISO\s*=\s*"(\d{4}-\d{2}-\d{2})"/) || [])[1];
}

function sourceFor(pathname) {
  const p = pathname === '/' ? '/index' : pathname.replace(/\/$/, '');
  const candidates = [path.join(PAGES, `${p}.astro`), path.join(PAGES, p, 'index.astro')];
  return candidates.find((c) => fs.existsSync(c));
}

/** @returns {string | undefined} ISO date (YYYY-MM-DD) */
export function lastmodFor(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (PAGE_DATES[clean]) return PAGE_DATES[clean];
  const file = sourceFor(clean);
  if (!file) return undefined;
  const src = fs.readFileSync(file, 'utf8');
  const dates = [...src.matchAll(DATE_RE)].map((m) => m[1]);
  if (/DRAWS_LAST_UPDATED_ISO/.test(src)) dates.push(drawsDate());
  return dates.filter(Boolean).sort().pop();
}
