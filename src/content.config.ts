import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    keywords: z.array(z.string()).optional(),
    hero_image: z.string().optional(),
    top_pick: z.object({
      name: z.string(),
      label: z.string(),
      description: z.string(),
      href: z.string().default('#'),
    }).optional(),
    tools: z.array(z.object({
      key: z.string(),
      label: z.string(),
      name: z.string(),
      description: z.string(),
      cta: z.string(),
      href: z.string().default('#'),
      accent: z.boolean().default(false),
      image_query: z.string().optional(),
    })).optional(),
  })
});

export const collections = { articles };
