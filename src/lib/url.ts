/**
 * The one place internal URLs are built. `base` differs per host
 * ("/Portfolio/" on GitHub Pages, "/" on Vercel), so pages never hard-code it.
 *
 *   url()                -> "/Portfolio/"
 *   url('work/nutr/')    -> "/Portfolio/work/nutr/"
 *   url('#contact')      -> "/Portfolio/#contact"
 */
const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function url(path = ''): string {
  return base + path.replace(/^\/+/, '');
}

/** Case study URL for a project id (the Markdown file name). */
export function workUrl(id: string): string {
  return url(`work/${id}/`);
}
