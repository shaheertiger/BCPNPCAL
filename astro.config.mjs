import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bcpnpcalculator.ca',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // Build-time timestamp used as lastmod for every page. A static site's
      // representation of each page is regenerated on every deploy, so the
      // build date is an honest "last modified" signal (the only sitemap hint
      // Google actually uses) and never goes stale like a hardcoded date.
      lastmod: new Date(),
      serialize(item) {
        // Ensure sitemap URLs never have trailing slashes (except bare root /)
        if (item.url !== 'https://bcpnpcalculator.ca/') {
          item.url = item.url.replace(/\/$/, '');
        }

        const path = new URL(item.url).pathname;

        // Pattern-based priority + changefreq (mirrors the previous curated
        // sitemap, but auto-generated so coverage can never drift out of sync).
        let priority = 0.7;
        let changefreq = 'monthly';

        if (path === '/') {
          priority = 1.0;
          changefreq = 'monthly';
        } else if (path === '/bc-pnp-calculator') {
          priority = 1.0;
          changefreq = 'daily';
        } else if (path === '/bc-pnp-draws') {
          priority = 0.9;
          changefreq = 'daily';
        } else if (path === '/bc-pnp-guide') {
          priority = 0.9;
          changefreq = 'weekly';
        } else if (path === '/news') {
          priority = 0.8;
          changefreq = 'daily';
        } else if (path === '/privacy-policy' || path === '/terms') {
          priority = 0.3;
          changefreq = 'yearly';
        } else if (['/about', '/contact', '/sitemap', '/guides'].includes(path)) {
          priority = 0.5;
          changefreq = 'monthly';
        } else if (path.startsWith('/articles/')) {
          priority = 0.8;
          changefreq = 'monthly';
        } else if (/^\/(zh|hi|pa|ar)(\/.*)?$/.test(path)) {
          // Localized pages: lang home and localized calculator rank highest.
          priority = /^\/(zh|hi|pa|ar)$/.test(path) || path.endsWith('/bc-pnp-calculator')
            ? 0.9
            : 0.7;
          changefreq = 'weekly';
        }

        item.priority = priority;
        item.changefreq = changefreq;
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "pa", "hi", "ar"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: 'static',
  build: {
    inlineStylesheets: 'always', // Inline all CSS for better FCP
    assets: '_astro',
  },
  vite: {
    build: {
      cssCodeSplit: false, // Single CSS bundle for better caching
      minify: 'esbuild', // Use esbuild for faster minification
      rollupOptions: {
        output: {
          manualChunks: undefined, // Prevent chunk splitting for better initial load
        },
      },
    },
  },
});
