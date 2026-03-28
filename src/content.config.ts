import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    keywords: z.array(z.string()).optional(),
    hero_image: z.string().optional(), // optional override URL
  })
});

export const collections = { articles };
