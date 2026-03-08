# Arquitetura do Sistema — Portal de Editais

Este documento descreve a arquitetura técnica, decisões de design e a stack tecnológica do Portal de Editais.

## 🏗️ Visão Geral

O Portal de Editais é um site estático (SSG - Static Site Generation) construído com **Astro.build**, focado em performance, acessibilidade (WCAG) e facilidade de manutenção de conteúdo via arquivos de dados (JSON).

## 🚀 Stack Tecnológica

### Core
- **Framework**: [Astro v5+](https://astro.build/) - Framework web para sites rápidos com foco em conteúdo.
- **Linguagem**: TypeScript.
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) - Framework CSS utilitário para design moderno e responsivo.

### Conteúdo e Dados
- **Content Collections**: API nativa do Astro para gerenciar conteúdo com validação de schema (Zod).
- **Dados**: Arquivos JSON individuais localizados na pasta `data/` na raiz do projeto.
- **Imagens**: Otimizadas automaticamente via componente `<Image />` do Astro.

### UX & Acessibilidade
- **Temas**: Suporte nativo a Light e Dark Mode via classes CSS e persistência em `localStorage`.
- **Acessibilidade (a11y)**: Conformidade com WCAG 2.1, incluindo Toolbar de Acessibilidade (Alto Contraste e Escononamento de Fonte).
- **Tipografia**: Família Inter (Google Fonts) para máxima legibilidade.

### Infraestrutura
- **Build**: Estático (SSG).
- **Deploy**: GitHub Pages.
- **Busca**: Pagefind (estática, indexada no momento do build).

## 📂 Estrutura de Diretórios

```bash
edital_portal/
├── data/                 # Fonte da verdade: Editais em JSON
├── docs/                 # Documentação técnica e de funcionalidades (Features)
│   ├── features/         # Especificações Gherkin (BDD)
│   └── architecture.md
├── src/
│   ├── components/       # UI Components (Header, Footer, EditalCard, a11y)
│   ├── content/          # Configuração das Content Collections
│   ├── layouts/          # Templates base (Header+Footer+a11y)
│   ├── styles/           # Tailwind e CSS Global
│   └── pages/            # Rotas e Páginas dinâmicas
└── tests/
    └── e2e/              # Testes Playwright baseados em BDD
```

## 🛠️ Decisões de Design (ADRs)

### 1. Dados em JSON na Raiz
Optamos por manter os editais na pasta `data/` fora de `src/` para facilitar o acesso de editores de conteúdo que não precisam mexer no código fonte. A Content Collection Tool do Astro carrega esses dados via loader customizado.

### 2. BDD (Behavior Driven Development)
O desenvolvimento segue obrigatoriamente o fluxo:
1. Escrita do `.feature` (Gherkin).
2. Implementação do código.
3. Escrita do teste `.spec.ts` (Playwright).

### 3. Acessibilidade Toolbar
Implementamos um componente customizado `AccessibilityToolbar.astro` que injeta classes no `<html>` para Alto Contraste e Dark Mode, com script anti-FOUC (Flash of Unstyled Content) no `head`.
