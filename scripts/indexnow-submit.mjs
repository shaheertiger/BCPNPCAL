#!/usr/bin/env node
// One-off IndexNow submission for bcpnpcalculator.ca
// Submits every URL in the generated sitemap to Bing's IndexNow endpoint.
//
// Reads the auto-generated sitemap (dist/sitemap-0.xml) so the submitted URLs
// always match what Astro actually built. Run `npm run build` first.
//
// Usage:
//   node scripts/indexnow-submit.mjs            # submit all sitemap URLs
//   node scripts/indexnow-submit.mjs <url> ...  # submit only the given URLs
//
// Prerequisite: the key file public/<KEY>.txt must already be deployed at
//   https://bcpnpcalculator.ca/<KEY>.txt
// otherwise the IndexNow endpoint will reject the request with HTTP 403.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HOST = 'bcpnpcalculator.ca';
const KEY = '9b8e65475513416389b3e69bffd3a987';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 100;

function readSitemapUrls() {
  // Prefer the freshly-built sitemap; fall back to any other generated shards.
  const candidates = [
    path.join(ROOT, 'dist', 'sitemap-0.xml'),
    path.join(ROOT, 'dist', 'sitemap-index.xml'),
  ];
  const sitemapPath = candidates.find((p) => fs.existsSync(p));
  if (!sitemapPath) {
    console.error(
      'No generated sitemap found in dist/. Run `npm run build` before submitting.'
    );
    process.exit(1);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    // sitemap-index.xml lists child sitemaps, not pages — drop those.
    .filter((u) => !/sitemap[-\w]*\.xml$/.test(u));
}

async function submitBatch(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text().catch(() => '');
  return { status: res.status, text };
}

async function main() {
  const cliUrls = process.argv.slice(2);
  const urls = cliUrls.length ? cliUrls : readSitemapUrls();

  if (!urls.length) {
    console.error('No URLs to submit.');
    process.exit(1);
  }

  console.log(`Submitting ${urls.length} URL(s) to ${ENDPOINT}`);
  console.log(`Key location: ${KEY_LOCATION}`);

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    try {
      const { status, text } = await submitBatch(batch);
      const label = `Batch ${i / BATCH_SIZE + 1} (${batch.length} URLs)`;
      if (status >= 200 && status < 300) {
        console.log(`${label}: ${status} OK`);
        ok += batch.length;
      } else {
        console.warn(`${label}: ${status} ${text}`);
        fail += batch.length;
      }
    } catch (err) {
      console.error(`Batch starting at ${i} failed:`, err.message);
      fail += batch.length;
    }
  }

  console.log(`\nDone. ${ok} accepted, ${fail} failed.`);
  process.exit(fail ? 1 : 0);
}

main();
