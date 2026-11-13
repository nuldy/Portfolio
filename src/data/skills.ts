/**
 * What Arnold works on, grouped by field, each pointing at evidence on the
 * site. Replaces the old Expert/Intermediate skill list.
 *
 * Note: docs/REDESIGN-PLAN.md planned a "layers.ts" (Structure / Surface /
 * Code of a screen). That concept assumed a UI/UX positioning, which Arnold
 * dropped in Nov 2026, so this neutral grouping stands in until the plan is
 * revised.
 */
import { url, workUrl } from '../lib/url';

export interface Evidence {
  label: string;
  href: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  summary: string;
  tools: string[];
  evidence: Evidence[];
}

export const skills: SkillGroup[] = [
  {
    id: 'development',
    name: 'Software development',
    summary: 'Front-end and back-end web applications, APIs and 3D on the web.',
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Go', 'Three.js', 'Git'],
    evidence: [
      { label: 'PT Indo Graha Pratama', href: url('#experience') },
      { label: 'PT TEMAS Tbk', href: url('#experience') },
      { label: 'Cosmion', href: workUrl('cosmion') },
    ],
  },
  {
    id: 'finance',
    name: 'Finance, accounting and tax',
    summary: 'Finance, accounting and tax work as part of my current role.',
    // TODO(content): tools Arnold uses here (accounting software, tax filing systems, spreadsheets).
    tools: [],
    evidence: [{ label: 'PT Indo Graha Pratama', href: url('#experience') }],
  },
  {
    id: 'design',
    name: 'Interface design (earlier work)',
    summary: 'User research, wireframes, UI and prototypes.',
    tools: ['Figma'],
    evidence: [
      { label: 'OtoBids', href: workUrl('otobids') },
      { label: 'Nutr', href: workUrl('nutr') },
    ],
  },
];
