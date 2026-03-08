# Funcionalidades do Portal de Editais (Features)

Este documento centraliza e descreve todas as funcionalidades (User Stories) implementadas no Portal de Editais, fornecendo um guia rápido sobre as capacidades do sistema.

## 🔍 Busca e Filtragem

*   **Busca Livre Integrada (US9)**: Pesquisa instantânea no lado do cliente por palavras-chave (título, descrição, instituição), combinada com filtros de categoria e status. Os resultados são atualizados em tempo real na interface sem necessidade de recarregar a página.
*   **Filtros de Categoria (US2)**: Permite refinar a lista de oportunidades selecionando categorias temáticas específicas (ex: Pesquisa, Extensão, Inovação, Bolsas).
*   **Filtros de Status (US8)**: Exibição segmentada de editais baseada no seu período de vigência (Abertos vs. Encerrados), facilitando a localização de oportunidades ativas.
*   **Sincronização com URL (US8/US9)**: Todos os filtros (categoria, status e texto de busca) são automaticamente refletidos nos parâmetros da URL (ex: `?categoria=pesquisa&q=fapes`), permitindo o compartilhamento de buscas específicas.

## 🗂️ Navegação e Organização

*   **Página Inicial Focada**: A listagem primária (`/`) exibe por padrão apenas os editais que possuem o status `"aberto"`, priorizando as oportunidades que realmente importam.
*   **Catálogo por Categoria (US10)**: Nova visão (`/categorias`) que agrupa hierarquicamente todos os editais (abertos e encerrados) pelas suas respectivas categorias. Dentro de cada bloco, os editais são ordenados alfabeticamente (A-Z) para facilitar a leitura sistemática.
*   **Página Institucional "Sobre" (US11)**: Seção dedicada para explicar a missão do Portal de Editais, como ele consolida os dados de fomento e seu impacto na transparência e pesquisa no estado.

## 📄 Detalhamento de Oportunidades

*   **Páginas de Edital Dinâmicas (US6)**: Cada edital possui uma página dedicada (slug gerado automaticamente) contendo todas as informações relevantes lidas diretamente de um arquivo JSON padronizado.
*   **Apresentação Clara de Metadados (US7)**: O Layout do documento exibe claramente dados críticos como o **Órgão de Fomento**, **Valor Financiado** e o **Prazo de Submissão** em formato amigável e focado na conversão (Inscrição).

## ♿ Acessibilidade e Estilo

*   **Acessibilidade Nativa (US4/US5)**: Suporte profundo a padrões WCAG. O usuário possui uma "Toolbar de Acessibilidade" discreta que permite a inversão de cores (Alto Contraste) e ajuste de tamanho das fontes (Escalonamento Dinâmico).
*   **Dark Mode Nativo (US3)**: Alternância nativa e manual entre modo claro (Light Mode) e modo escuro (Dark Mode) baseada em Tailwind v4 e preservada localmente no navegador (`localStorage`), sem "Flashes" indesejados ao carregar a página.

---
> **Nota de Arquitetura**: Todas as funcionalidades são pensadas priorizando uma abordagem **estática** (SSG) via Astro e TailwindCSS, resultando em carregamentos sub-segundo, economia de banda e facilidade de deploy serverless (como o GitHub Pages).
