/**
 * Theme toggle. The saved theme is already applied before first paint by the
 * inline script in Base.astro; this file only keeps the button and the
 * browser UI colour in sync, and saves new choices.
 */
import { THEME_COLORS, THEME_KEY, type Theme } from '../lib/theme';

const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function activeTheme(): Theme {
  const set = root.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return systemDark.matches ? 'dark' : 'light';
}

function sync(): void {
  const theme = activeTheme();
  for (const button of document.querySelectorAll('[data-theme-toggle]')) {
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  // With an explicit choice, the browser UI follows it rather than the system.
  if (root.dataset.theme) {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute('content', THEME_COLORS[theme]);
    }
  }
}

function setTheme(theme: Theme): void {
  root.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked (private mode, settings): the choice lasts for this page only.
  }
  sync();
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest('[data-theme-toggle]')) {
    setTheme(activeTheme() === 'dark' ? 'light' : 'dark');
  }
});

systemDark.addEventListener('change', sync);
sync();
