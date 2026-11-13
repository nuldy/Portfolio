// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Where the site is deployed.
 *
 * - GitHub Pages (default): https://nuldy.github.io/Portfolio/
 * - Vercel: detected automatically through the `VERCEL` env var; the site is
 *   served from the root of the production domain.
 * - Anything else: set SITE_URL and BASE_PATH.
 *
 * Every internal link goes through `src/lib/url.ts`, so changing host never
 * means editing pages.
 */
const onVercel = Boolean(process.env.VERCEL);
const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const site =
  process.env.SITE_URL ??
  (onVercel && vercelDomain ? `https://${vercelDomain}` : 'https://nuldy.github.io');
const base = process.env.BASE_PATH ?? (onVercel ? '/' : '/Portfolio');

// Latin subset only. Same range Fontsource uses for its "latin" files.
const latin = /** @type {[string, ...string[]]} */ ([
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+0304',
  'U+0308',
  'U+0329',
  'U+2000-206F',
  'U+20AC',
  'U+2122',
  'U+2191',
  'U+2193',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
]);

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // The whole stylesheet is small; inlining it removes a render-blocking request.
    inlineStylesheets: 'always',
  },
  fonts: [
    {
      // Variable font with weight (200–800) and width (75–100%) axes. 78 KB.
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-sans',
      fallbacks: ['Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2',
            ],
            weight: '200 800',
            stretch: '75% 100%',
            style: 'normal',
            unicodeRange: latin,
          },
        ],
      },
    },
    {
      // Variable font with weight axis. 40 KB.
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['Courier New', 'monospace'],
      options: {
        variants: [
          {
            src: [
              '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2',
            ],
            weight: '100 800',
            style: 'normal',
            unicodeRange: latin,
          },
        ],
      },
    },
  ],
});
