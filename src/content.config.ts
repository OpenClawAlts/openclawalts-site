import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const toolSchema = z.object({
  key: z.string(),
  name: z.string(),
  label: z.string(),                          // e.g. "Best for self-hosting"
  description: z.string(),
  cta: z.string(),                             // button text
  href: z.string().default('#'),               // affiliate link (placeholder for now)
  accent: z.boolean().default(false),          // highlight this tool?
  image_query: z.string().optional(),          // Unsplash search term for build-time image
});

const topPickSchema = z.object({
  tool_key: z.string(),                        // references a tool by key
  headline: z.string(),                        // e.g. "Lindy — Best for AI-First Automation"
  summary: z.string(),
  cta: z.string(),
  href: z.string().default('#'),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().optional(),
    keywords: z.array(z.string()).optional(),
    hero_image: z.string().optional(),         // optional override URL
    tools: z.array(toolSchema).optional(),     // per-article tool CTA cards
    top_pick: topPickSchema.optional(),        // per-article Editor's Top Pick
  })
});

export const collections = { articles };
