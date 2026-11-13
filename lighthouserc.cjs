// `npm run audit`: builds nothing, so run `npm run build` first.
// Serves dist/ through `astro preview` (which honours `base`) and runs
// Lighthouse with its default mobile preset against the budgets in
// docs/REDESIGN-PLAN.md, section 9.
const base = process.env.BASE_PATH ?? '/Portfolio';
const origin = 'http://localhost:4330';
const page = (path) => `${origin}${base.replace(/\/$/, '')}/${path}`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx astro preview --port 4330',
      startServerReadyPattern: 'localhost:4330',
      url: [page(''), page('work/cosmion/')],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['error', { maxNumericValue: 150 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
