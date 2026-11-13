import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One Markdown file per project in src/content/projects/. The file name is the
 * URL: cosmion.md -> /work/cosmion/. Adding a project = one file + its cover.
 * The build fails with a clear message if a field is missing or wrong.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      /** One sentence for the work list and the meta description. */
      summary: z.string().min(1).max(160),
      /** Position in the work list, 1 = first. */
      order: z.number().int().positive(),
      year: z.number().int().min(2000).max(2100).optional(),
      role: z.string().min(1),
      disciplines: z.array(z.string().min(1)).min(1),
      tools: z.array(z.string().min(1)).min(1),
      cover: image(),
      coverAlt: z.string().min(1),
      /** Outbound links. The label says where it goes ("Open live site", "View on Behance"). */
      links: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.url({ protocol: /^https$/ }),
          }),
        )
        .default([]),
      /** Drafts are left out of the build. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
