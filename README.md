# Portal de Editais 🚀

Plataforma unificada para publicação, consulta e acompanhamento de editais de fomento à pesquisa, extensão e inovação.

## ✨ Características

- **Design Inovador**: Interface moderna com Tailwind CSS v4 e animações premium.
- **Acessibilidade de Ponta**: Modos Light/Dark e Alto Contraste integrados.
- **Alta Performance**: Site estático (SSG) construído com Astro.build.
- **Mobile-First**: Experiência fluida em qualquer dispositivo.

## 🛠️ Stack Tecnológica

- **Framework**: [Astro](https://astro.build/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testes**: [Playwright](https://playwright.dev/)
- **Dados**: JSON via Astro Content Collections.

## 📂 Organização do Projeto

| Pasta | Descrição |
|---|---|
| `data/` | Fonte da verdade dos editais (Arquivos JSON). |
| `docs/` | Documentação técnica, arquitetura e backlog. |
| `docs/features/` | Especificações Gherkin (BDD). |
| `src/content/` | Configurações de dados do Astro. |
| `tests/e2e/` | Testes automatizados de ponta a ponta. |

## 🛡️ Fluxo de Desenvolvimento (Obrigatório)

Este projeto segue um rigoroso fluxo de Desenvolvimento Orientado a Comportamento (BDD):

1. **Planejamento**: Proposição de mudanças ao usuário.
2. **Gherkin**: Escrita dos cenários em `docs/features/`.
3. **Código**: Implementação da funcionalidade (Tailwind v4).
4. **Testes**: Validação via Playwright.

## 🚀 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Rodar testes E2E
npx playwright test
```

## 📖 Documentação Adicional

- [Arquitetura](docs/architecture.md)
- [Backlog do Projeto](docs/backlog.md)
- [Funcionalidades (Features)](docs/features/)
