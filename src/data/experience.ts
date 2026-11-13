/**
 * Experience and education, newest first. One sentence per row.
 */

export interface ExperienceItem {
  role: string;
  place: string;
  /** Display string, e.g. "2024–2025" or "2026–Present". */
  period: string;
  summary: string;
  tools?: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: 'IT Developer and Finance, Accounting & Tax Specialist',
    place: 'PT Indo Graha Pratama',
    period: '2026–Present',
    // TODO(content): replace with one sentence from Arnold about what each role covers.
    summary: 'Two roles at the same company: IT development, and finance, accounting and tax.',
  },
  {
    role: 'Website Developer',
    place: 'Freelance',
    period: '2025–Present',
    summary:
      'Developing responsive web applications and translating designs into functional code.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    role: 'Full-Stack Developer',
    place: 'PT TEMAS Tbk',
    period: '2024–2025',
    summary:
      'Contributed to internal web applications that support business operations, covering system design, API integration, testing and deployment.',
    tools: ['Vue', 'Go'],
  },
  {
    role: 'UI/UX Designer',
    place: 'Freelance',
    // TODO(content): confirm the end year with Arnold.
    period: '2024–2025',
    summary: 'Designed mobile apps, web platforms and design systems.',
    tools: ['Figma'],
  },
  {
    role: 'S.Kom., Computer Science',
    place: 'Bina Nusantara University',
    period: '2021–2025',
    summary: 'Studied computer science with a focus on software engineering and design.',
  },
];
