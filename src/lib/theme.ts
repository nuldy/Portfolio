/**
 * Shared by the inline <head> script (applies a saved theme before first paint)
 * and src/scripts/theme.ts (the toggle). Keep the key: the old site used it,
 * so returning visitors keep their choice.
 */
export const THEME_KEY = 'portfolio-theme';

export type Theme = 'light' | 'dark';

/** Browser UI colour per theme. Must match --paper in src/styles/tokens.css. */
export const THEME_COLORS: Record<Theme, string> = {
  light: '#F5EFE4',
  dark: '#14120F',
};
