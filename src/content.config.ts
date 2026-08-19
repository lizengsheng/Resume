import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: () =>
    z.object({
      slug: z.string().optional(),
      title: z.string(),
      summary: z.string(),
      period: z.string().optional(),
      tags: z.array(z.string()).default([]),
      metrics: z.array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      ).default([]),
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(true),
      draft: z.boolean().default(false),
      order: z.number().int().optional(),
      externalUrl: z.url().optional(),
    }),
});

export const collections = { projects };
