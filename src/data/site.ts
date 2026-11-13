/**
 * Profile, contact details and page-level copy.
 *
 * TODO(copy): every sentence marked below is a draft written for the
 * developer + finance/accounting/tax positioning (Nov 2026). Arnold approves
 * or rewrites it in Phase 2, after the concept in docs/REDESIGN-PLAN.md is
 * revised for that positioning.
 */

export interface SocialLink {
  label: string;
  url: string;
}

export const site = {
  name: 'Arnold Pramudita',
  /** Short role line for titles and structured data. */
  role: 'IT Developer and Finance, Accounting & Tax Specialist',
  location: 'Jakarta, Indonesia',
  email: 'arnoldprmdt@gmail.com',
  whatsapp: {
    label: '+62 851 1120 5788',
    url: 'https://wa.me/6285111205788',
  },
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arnoldpramudita/' },
    { label: 'GitHub', url: 'https://github.com/nuldy' },
    { label: 'Behance', url: 'https://www.behance.net/arnoldpramudita' },
  ] satisfies SocialLink[],

  /** Set `open` to false to hide the availability line everywhere. */
  availability: {
    open: true,
    text: 'Open to work in tech, especially software engineer and developer roles.',
  },

  /** Default meta description for the home page. */
  description:
    'Arnold Pramudita is an IT developer and finance, accounting and tax specialist in Jakarta. Selected work, experience and contact details.',

  hero: {
    // TODO(copy)
    title: 'I write software and I work in finance. Fintech is where the two meet.',
    // TODO(copy)
    intro:
      "I'm Arnold Pramudita, based in Jakarta. At PT Indo Graha Pratama I work as an IT developer and as a finance, accounting and tax specialist. Before that I built internal web applications with Vue and Go at PT TEMAS Tbk.",
  },

  about: {
    // TODO(copy)
    paragraphs: [
      'I have a Computer Science degree (S.Kom.) from Bina Nusantara University. Since then I have built internal web applications with Vue and Go at PT TEMAS Tbk, websites for freelance clients, and Cosmion, an interactive tour of the solar system made with Three.js.',
      'Today my work is split between code and the books: IT development on one side, finance, accounting and tax on the other. Knowing how a transaction is recorded and taxed shapes how I build the software that handles it, and that is why I am heading towards fintech.',
      'Earlier I designed interfaces in Figma, including OtoBids and Nutr. My focus has since moved to development and finance.',
    ],
  },

  contact: {
    // TODO(copy)
    lead: 'Have a role or a project in mind? Write to me.',
  },
} as const;
