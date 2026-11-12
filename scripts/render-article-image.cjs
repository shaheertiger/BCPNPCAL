#!/usr/bin/env node
// Renders an article hero image (1200x630 PNG) from an HTML design file.
//
//   node scripts/render-article-image.cjs content-plan/images/<slug>.html
//
// Writes public/images/articles/<slug>.png. The same file is used as the
// in-article hero image and as the page's og:image / twitter:image.
// Uses the preinstalled Playwright Chromium (no install step needed).
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require('playwright');

(async () => {
  const src = process.argv[2];
  if (!src || !fs.existsSync(src)) {
    console.error('Usage: node scripts/render-article-image.cjs content-plan/images/<slug>.html');
    process.exit(1);
  }
  const slug = path.basename(src, '.html');
  const outDir = path.join(__dirname, '..', 'public', 'images', 'articles');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${slug}.png`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  const kb = Math.round(fs.statSync(out).size / 1024);
  console.log(`Wrote ${path.relative(process.cwd(), out)} (${kb} KB)`);
  if (kb > 400) console.warn('Warning: image is over 400 KB; simplify gradients/photos in the design.');
})().catch((e) => { console.error(e); process.exit(1); });
