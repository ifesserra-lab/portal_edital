import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_VALUES, normalizeCategory } from '../utils/category.js';
import { STATUS_VALUES, normalizeStatus } from '../utils/status.js';

const editais = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./data" }),
  schema: z.object({
    nome: z.string(),
    descrição: z.string(),
    orgão_fomento: z.string(),
    categoria: z.preprocess((value) => normalizeCategory(value), z.enum(CATEGORY_VALUES)),
    status: z.preprocess((value) => normalizeStatus(value), z.enum(STATUS_VALUES)),
    data_abertura: z.string().or(z.literal("")),
    data_encerramento: z.string().or(z.literal("")),
    link: z.string().url(),
    cronograma: z.array(z.object({
      evento: z.string(),
      data: z.string()
    })).optional().default([]),
    tags: z.array(z.string()).optional(),
  })
});

export const collections = {
  'editais': editais,
};
