import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seo = {
  title: z.string(),
  description: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
};

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    ...seo,
  }),
});

const oferta = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/oferta' }),
  schema: z.object({
    ...seo,
    cardTitle: z.string(),
    image: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const aktualnosci = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktualnosci' }),
  schema: z.object({
    ...seo,
    date: z.coerce.date(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

const realizacje = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realizacje' }),
  schema: z.object({
    ...seo,
    date: z.coerce.date(),
    city: z.string(),
    eventType: z.string(),
    services: z.array(z.string()),
    excerpt: z.string(),
    image: z.string(),
    relatedOffer: z.string().optional(),
  }),
});

export const collections = { pages, oferta, aktualnosci, realizacje };
