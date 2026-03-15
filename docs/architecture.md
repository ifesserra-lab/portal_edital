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
- **Busca e Filtros**: Filtragem instantânea híbrida (Client-side JS + atributos DOM) sincronizada com Query Params da URL. Evita requisições de servidor e bibliotecas pesadas de terceiros.

## 📂 Estrutura de Diretórios

```bash
edital_portal/
├── data/                 # Fonte da verdade: Editais em JSON (um arquivo por edital)
├── registry/             # Estado das notificações e tópicos Telegram
│   ├── downloads_registry.json   # Histórico: edital → data_entrada, categoria, orgão_fomento, cronograma, notificacoes_enviadas
│   └── topics_registry.json     # Categoria → ID do tópico no fórum do grupo Telegram
├── docs/                 # Documentação técnica e de funcionalidades (Features)
│   ├── features/         # Especificações Gherkin (BDD)
│   ├── architecture.md
│   └── scripts-and-registry.md  # Guia dos scripts e do registry
├── scripts/              # Automação e notificações
│   ├── load-env.js       # Carrega .env na raiz para TELEGRAM_* (usado pelos outros scripts)
│   ├── build-registry.js # (Re)cria o registry a partir de data/ (sem enviar mensagens)
│   ├── notify-telegram.js# Notifica novos editais no Telegram
│   ├── schedule-reminders.js  # Lembretes diários de eventos do cronograma
│   └── validate-data.js  # Validação de integridade dos JSON em data/
├── src/
│   ├── components/       # UI Components (Header, Footer, EditalCard, a11y)
│   ├── content/          # Configuração das Content Collections
│   ├── layouts/          # Templates base (Header+Footer+a11y)
│   ├── styles/           # Tailwind e CSS Global
│   └── pages/            # Rotas e Páginas dinâmicas
└── tests/
    ├── e2e/              # Testes Playwright baseados em BDD
    └── scripts/          # Testes unitários dos scripts (notify-telegram, schedule-reminders)
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

### 4. Registry e Notificações Telegram
O diretório `registry/` mantém o estado das notificações: quais editais já foram anunciados e quais eventos de cronograma já tiveram lembrete enviado. O `topics_registry.json` mapeia cada categoria para o ID do tópico no fórum do grupo Telegram, evitando criar tópicos duplicados. Os scripts em `scripts/` carregam credenciais via `.env` (local) ou variáveis de ambiente (CI). Ver [Scripts e Registry](scripts-and-registry.md).
