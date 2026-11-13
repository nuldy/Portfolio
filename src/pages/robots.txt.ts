import type { APIRoute } from 'astro';
import { url } from '../lib/url';

/** Generated so the sitemap URL follows `site` and `base` on any host. */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('sitemap-index.xml'), site);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
