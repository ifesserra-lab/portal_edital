# Portal de Editais 🚀

Plataforma unificada para publicação, consulta e acompanhamento de editais de fomento à pesquisa, extensão e inovação.

🔗 **Acesse o portal:** [https://ifesserra-lab.github.io/portal_edital/](https://ifesserra-lab.github.io/portal_edital/)

## ✨ Funcionalidades

| Funcionalidade | Descrição | Status |
| :--- | :--- | :--- |
| **Acessibilidade WCAG** | Menu flutuante com alto contraste, fontes para dislexia e escala de texto. | ✅ Concluído |
| **Modo Escuro** | Suporte nativo a temas Dark/Light com persistência em `localStorage`. | ✅ Concluído |
| **Notificações Telegram** | Alertas automáticos e **Lembretes Diários** de cronograma via bot. | ✅ Concluído |
| **Busca e Filtros** | Busca por texto e filtragem reativa por categorias e tags. | ✅ Concluído |
| **Automação de Dados** | Sync diário via GitHub Actions com fontes externas (FAPES). | ✅ Concluído |
| **Mobile Responsive** | Design otimizado para celulares, tablets e desktops. | ✅ Concluído |
| **Histórico de Downloads** | Registro em JSON (`registry/`) para auditoria de novas postagens. | ✅ Concluído |


## 🛠️ Stack Tecnológica

- **Framework**: [Astro](https://astro.build/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testes**: [Playwright](https://playwright.dev/) (E2E) e Node.js Test Runner (Unitário).
- **Notificações**: Telegram Bot API com Robô de Lembretes inteligente.
- **Gestão de Dados**: JSON + Registro de Auditoria (`registry/`).

## 📂 Organização do Projeto

| Pasta | Descrição |
|---|---|
| `data/` | Fonte da verdade dos editais (arquivos JSON). |
| `registry/` | Registro de editais (`downloads_registry.json`) e tópicos Telegram (`topics_registry.json`). |
| `docs/` | Documentação técnica, arquitetura, backlog e guia de scripts. |
| `scripts/` | Build do registry, carregamento de `.env`, notificações e lembretes Telegram, validação de dados. |
| `src/components/` | Componentes Astro de UI e Acessibilidade. |
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

# 4. Rodar testes unitários dos scripts
npm run test:scripts
```

## 🔔 Scripts e Notificações Telegram

Os scripts de notificação usam variáveis de ambiente. Para rodar localmente, crie um arquivo `.env` na raiz (não versionado):

```env
TELEGRAM_BOT_TOKEN=seu_token_do_bot
TELEGRAM_CHAT_ID=id_do_grupo_ou_canal
```

| Script | Descrição |
|--------|-----------|
| `node scripts/load-env.js` | Carregado automaticamente pelos outros scripts; lê `.env` e preenche `process.env`. |
| `node scripts/build-registry.js` | (Re)cria `registry/downloads_registry.json` e `registry/topics_registry.json` a partir dos JSON em `data/`. Não envia mensagens. |
| `node scripts/notify-telegram.js` | Envia no Telegram notificação de **novos editais** (arquivos ainda não presentes no registry). |
| `node scripts/schedule-reminders.js` | Envia **lembretes** no Telegram para eventos do cronograma cuja data é hoje. |

Detalhes: [Scripts e Registry](docs/scripts-and-registry.md).

## 📖 Documentação Adicional

- [Arquitetura](docs/architecture.md)
- [Backlog do Projeto](docs/backlog.md)
- [Funcionalidades e Features](docs/funcionalidades.md)
- [Scripts e Registry (Telegram)](docs/scripts-and-registry.md)
