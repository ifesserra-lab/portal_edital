# AGENTS.MD — Portal de Editais

## Persona e Objetivo

Você é um especialista em **Astro.build** e está desenvolvendo o **Portal de Editais** — um site público para publicação, consulta e acompanhamento de editais de fomento (bolsas, pesquisas, projetos de extensão, etc.).

O objetivo principal é entregar um site estático rápido, acessível e com excelente experiência do usuário, utilizando Astro como framework principal.

---

## Stack Tecnológica

| Camada | Tecnologia | Notas |
|---|---|---|
| Framework | **Astro** (última versão estável) | SSG + SSR parcial quando necessário |
| Estilização | **Tailwind CSS v4** | Design System moderno, mobile-first e acessível |
| Tipografia | **Inter** (Google Fonts) | Moderna e legível |
| Ícones | **Astro Icon** (`@astrojs/icon`) | |
| Conteúdo | **Content Collections** (Astro) | Editais em **JSON** na pasta `data/` |
| Busca | **Pagefind** | Busca estática no lado do cliente |
| Deploy | **GitHub Pages** | Saída estática com `astro build` |
| Lint / Format | **ESLint + Prettier** | Com plugin oficial do Astro |

> Só adicionar React/Vue/Svelte se houver necessidade explícita de interatividade complexa que não possa ser resolvida com Astro Islands ou Web Components nativos.

---

## Estrutura de Projeto

```
edital_portal/
├── .agent/
│   └── AGENTS.MD
├── data/                 # Pasta raiz para dados dos editais
│   ├── edital-001.json   # Um JSON por edital
│   └── edital-002.json
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/           # Imagens, logos
│   ├── components/       # Componentes Astro reutilizáveis
│   │   ├── EditalCard.astro
│   │   ├── EditalFilter.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── SearchBar.astro
│   ├── content/
│   │   └── config.ts     # Configuração para ler de ../../data/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── EditalLayout.astro
│   └── pages/
│       ├── index.astro          # Home — lista de editais em aberto
│       ├── editais/
│       │   └── [slug].astro     # Página de detalhe de cada edital
│       ├── categorias/
│       │   └── [categoria].astro
│       └── sobre.astro
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Content Collection — Edital (JSON)

Cada edital é um arquivo `.json` na pasta `data/` na raiz do projeto, com a seguinte estrutura:

```json
{
  "nome": "Edital FAPES Nº 001/2026 — Bolsas de Pesquisa",
  "descrição": "O edital visa apoiar projetos de pesquisa científica em diversas áreas do conhecimento.",
  "orgão_fomento": "FAPES",
  "categoria": "pesquisa",
  "status": "aberto",
  "data_abertura": "2026-01-10",
  "data_encerramento": "2026-03-31",
  "link": "https://fapes.es.gov.br/editais/001-2026",
  "cronograma": [
    { "evento": "Abertura das inscrições", "data": "2026-01-10" },
    { "evento": "Encerramento das inscrições", "data": "2026-03-31" },
    { "evento": "Divulgação dos resultados", "data": "2026-05-15" }
  ],
  "tags": ["bolsa", "pesquisa", "graduação"]
}
```

O Astro é configurado para ler esses arquivos JSON da pasta `data/` usando o `loader` appropriado nas Content Collections.

---

## Convenções de Código

### Componentes Astro
- Nomes em **PascalCase**: `EditalCard.astro`, `Header.astro`.
- Props tipadas com TypeScript na frontmatter.
- Lógica de fetch/processamento de dados **somente** no script do componente (não no template).
- Usar `Astro.props` desestruturado.

### CSS
- Usar **Tailwind CSS v4** para toda a estilização.
- Estilos globais em `src/styles/global.css` (importando Tailwind e configurando o tema).
- Evitar CSS customizado fora do Tailwind, a menos que estritamente necessário para animações complexas.

### Páginas Dinâmicas
- Sempre usar `getStaticPaths()` para rotas dinâmicas em modo SSG.
- Nunca buscar dados externos em runtime a menos que o modo `output: 'server'` esteja ativado explicitamente no `astro.config.mjs`.

### Acessibilidade (a11y)
- Todo `<img>` deve ter `alt` descritivo.
- Links e botões devem ter labels acessíveis.
- Contraste mínimo WCAG AA (4.5:1 para texto normal).
- Uso semântico de heading hierarchy (`h1` → `h2` → `h3`).

---

## Design System

### Paleta de Cores (variáveis CSS)

```css
:root {
  /* Primária */
  --color-primary-500: #1a6cff;
  --color-primary-600: #1458d4;
  --color-primary-700: #0e44aa;

  /* Neutros */
  --color-neutral-50:  #f8f9fb;
  --color-neutral-100: #eef0f5;
  --color-neutral-700: #374151;
  --color-neutral-900: #111827;

  /* Semânticas */
  --color-success: #16a34a;
  --color-warning: #ca8a04;
  --color-danger:  #dc2626;

  /* Status dos editais */
  --status-aberto:    #16a34a;
  --status-encerrado: #6b7280;
  --status-suspenso:  #ca8a04;
  --status-resultado: #2563eb;

  /* Superfícies */
  --surface-bg:      #ffffff;
  --surface-card:    #f8f9fb;
  --surface-border:  #e5e7eb;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-sm:  0.875rem;
  --font-size-md:  1rem;
  --font-size-lg:  1.125rem;
  --font-size-xl:  1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  /* Espaçamento */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Bordas */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Modo Escuro

Suportar dark mode via `prefers-color-scheme` e toggle manual com `data-theme="dark"` no `<html>`.

---

## Funcionalidades Principais

### Home (`/`)
- Banner com chamada principal e status geral dos editais.
- Lista de **editais em aberto** com cards (`EditalCard.astro`).
- Filtros por categoria e status.
- Barra de busca integrada ao Pagefind.
- Seção de "Editais Encerrados Recentemente".

### Detalhe do Edital (`/editais/[slug]`)
- Título, número, órgão, status (badge colorido), datas.
- Corpo completo do edital em markdown renderizado.
- Botão de download do PDF (link externo).
- Breadcrumb de navegação.
- Card lateral com informações rápidas.

### Listagem por Categoria (`/categorias/[categoria]`)
- Filtrada automaticamente pela categoria do frontmatter.

### Página Sobre (`/sobre`)
- Explicação do portal, como funciona, contato.

---

## Fluxo de Atualização de Editais

1. Criar novo arquivo `.json` na pasta `data/` com os dados do novo edital.
2. Atualizar o `status` no JSON quando necessário (`aberto` → `encerrado`).
3. Commit e Push dispara o deploy automático para GitHub Pages.

---

## Comando de Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Documentação de Casos de Uso — Gherkin (BDD)

Todos os casos de uso do portal **devem ser documentados em Gherkin** antes de qualquer implementação. Os arquivos `.feature` ficam em `docs/features/` e são a **fonte da verdade** para os testes E2E.

### Estrutura dos Arquivos Feature

```
docs/
└── features/
    ├── listar_editais.feature
    ├── filtrar_editais.feature
    ├── buscar_editais.feature
    ├── visualizar_edital.feature
    └── download_edital.feature
```

### Exemplo de Arquivo `.feature`

```gherkin
# docs/features/listar_editais.feature
Feature: Listagem de Editais
  Como um cidadão
  Quero visualizar os editais disponíveis
  Para encontrar oportunidades de financiamento

  Background:
    Given que estou na página inicial do portal

  Scenario: Visualizar editais em aberto
    When a página for carregada
    Then devo ver uma lista com os editais com status "aberto"
    And cada edital deve exibir título, órgão e data de encerramento

  Scenario: Nenhum edital em aberto
    Given que não há editais com status "aberto"
    When a página for carregada
    Then devo ver a mensagem "Nenhum edital em aberto no momento"

  Scenario Outline: Filtrar editais por categoria
    When seleciono a categoria "<categoria>"
    Then devo ver apenas editais da categoria "<categoria>"

    Examples:
      | categoria  |
      | pesquisa   |
      | extensao   |
      | inovacao   |
      | bolsa      |
```

### Convenções Gherkin

- **Feature**: Nome da funcionalidade em português, estilo substantivo.
- **Scenario**: Descreve um comportamento específico e isolado.
- **Given**: Pré-condição / estado inicial do sistema.
- **When**: Ação do usuário ou evento.
- **Then**: Resultado esperado / asserção.
- **And / But**: Continuação do passo anterior (mesmo tipo).
- **Scenario Outline + Examples**: Para cenários parametrizados.
- Um `.feature` por funcionalidade. Máximo de 10 cenários por arquivo.
- Escrever em **português do Brasil**.

---

## Estratégia de Testes — Playwright + BDD

Os testes E2E usam **Playwright** com a sintaxe BDD vinda dos arquivos `.feature`. Cada cenário Gherkin deve ter um teste correspondente.

### Estrutura de Testes

```
tests/
├── e2e/
│   ├── listar_editais.spec.ts
│   ├── filtrar_editais.spec.ts
│   ├── buscar_editais.spec.ts
│   ├── visualizar_edital.spec.ts
│   └── download_edital.spec.ts
└── fixtures/
    └── editais.json      # dados mock para testes
```

### Mapeamento Feature → Teste

Cada `Scenario` no `.feature` deve ter um `test()` correspondente no `.spec.ts` com o **mesmo nome**:

```typescript
// tests/e2e/listar_editais.spec.ts
import { test, expect } from '@playwright/test';

// Scenario: Visualizar editais em aberto
test('Visualizar editais em aberto', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('[data-testid="edital-card"]');
  await expect(cards).not.toHaveCount(0);
  await expect(cards.first()).toContainText('aberto');
});

// Scenario: Nenhum edital em aberto
test('Nenhum edital em aberto', async ({ page }) => {
  // usar fixture de dados vazios
  await page.goto('/');
  await expect(page.getByText('Nenhum edital em aberto no momento')).toBeVisible();
});
```

### Atributos `data-testid`

Todo elemento interativo ou relevante para teste **deve ter** `data-testid`:

```astro
<!-- EditalCard.astro -->
<article data-testid="edital-card" data-status={edital.data.status}>
  <h2 data-testid="edital-titulo">{edital.data.titulo}</h2>
  <span data-testid="edital-status">{edital.data.status}</span>
</article>
```

### Comandos de Teste

```bash
# Rodar todos os testes E2E
npx playwright test

# Rodar um arquivo específico
npx playwright test tests/e2e/listar_editais.spec.ts

# Modo visual (UI mode)
npx playwright test --ui

# Gerar relatório HTML
npx playwright test --reporter=html
```

### Fluxo Obrigatório e Inegociável

```
1. Planejamento Detalhado: Apresentar o plano de ação ao usuário.
       ↓
2. Gherkin primeiro: Escrever os cenários em docs/features/*.feature.
       ↓
3. GitHub Issues: Criar as issues correspondentes no GitHub (usando a skill de gestão de projeto).
       ↓
4. Implementação: Codificar componentes/páginas no Astro (Tailwind v4).
       ↓
5. Testes Automatizados: Criar os testes Playwright (.spec.ts) e validar.
```

---

## Documentação Técnica

- **README.md**: Visão geral do projeto, stack, como rodar localmente, como adicionar editais.
- **docs/features/**: Casos de uso em Gherkin (source of truth).
- **docs/architecture.md**: Decisões de arquitetura e estrutura do projeto.
- **docs/contributing.md**: Guia para contribuidores — como criar editais, padrões de commit.
- **Componentes**: Props documentadas com JSDoc no script Astro.
- **CHANGELOG.md**: Histórico de mudanças por versão (semver).

---

## Regras do Agente

1. **Gherkin primeiro**: Todo novo caso de uso deve ter um `.feature` escrito em `docs/features/` antes de qualquer código.
2. **GitHub Issues antes de tudo**: Sempre criar as issues no GitHub (Epic, User Story, Task) antes de começar a implementação, utilizando a skill `github-project-management`.
3. **Testes baseados nos cenários**: Cada `Scenario` Gherkin deve ter um `test()` correspondente em Playwright.
4. **`data-testid` obrigatório**: Todo elemento relevante para teste deve ter atributo `data-testid`.
5. **Dados em JSON**: Todos os editais devem ser mantidos como arquivos JSON individuais na pasta `data/`. Nunca hardcodar conteúdo de edital em componentes.
6. **Priorizar SSG** (geração estática). Só ativar SSR se houver funcionalidade imperativa que não possa ser estática.
7. **Sem dependências desnecessárias**. Antes de instalar um pacote, verificar se o Astro já oferece a funcionalidade nativamente.
8. **Acessibilidade é obrigatória**, não opcional.
9. **Performance first**: lazy loading de imagens, fontes com `display=swap`, CSS crítico inline quando possível.
10. **Commits semânticos**: `feat:`, `fix:`, `content:`, `style:`, `docs:`, `test:`, `chore:`.
11. Ao criar novos componentes, **documentar props** com comentários JSDoc no script Astro.
12. **Nunca expor** chaves de API ou dados sensíveis no bundle estático.
