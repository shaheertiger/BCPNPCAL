import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://bcpnpcalculator.ca',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
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
