import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/guides' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase slug made of words and hyphens.'),
    date: z.coerce.date(),
    category: z.string().min(1),
    summary: z.string().min(1),
    draft: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const collections = { guides, pages };
