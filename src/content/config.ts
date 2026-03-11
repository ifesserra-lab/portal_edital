import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const editais = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./data" }),
  schema: z.object({
    nome: z.string(),
    descrição: z.string(),
    orgão_fomento: z.string(),
    categoria: z.enum(['pesquisa', 'extensão', 'inovação', 'bolsa', 'outro', 'outros', 'chamadas', 'divulgação de conhecimento', 'arranjo administrativo']),
    status: z.enum(['aberto', 'encerrado', 'suspenso', 'resultado']),
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
