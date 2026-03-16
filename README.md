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
| **Listagem por Órgão de Fomento** | Página `/orgaos-fomento/` agrupando editais por instituição (FAPES, FINEP, etc.). | ✅ Concluído |
| **Status "Fechando"** | Badge dinâmico no cliente quando o prazo de encerramento já foi ultrapassado. | ✅ Concluído |
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

## 🔔 Configurar Telegram (variáveis de ambiente)

As notificações de novos editais e os lembretes de cronograma usam a **Telegram Bot API**. É necessário configurar duas variáveis de ambiente.

### Variáveis obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `TELEGRAM_BOT_TOKEN` | Token do bot gerado pelo [@BotFather](https://t.me/BotFather). | `7123456789:AAH...` |
| `TELEGRAM_CHAT_ID` | ID do grupo ou canal onde o bot envia as mensagens (número, pode ser negativo). | `-1001234567890` |

### Passo a passo (uso local)

1. **Criar o bot**
   - Abra [@BotFather](https://t.me/BotFather) no Telegram.
   - Envie `/newbot`, defina nome e username do bot.
   - Copie o **token** que o BotFather devolver (ex.: `7123456789:AAHxxxxxxxxxxxx`).

2. **Criar um grupo (ou canal) e adicionar o bot**
   - Crie um grupo no Telegram ou use um existente.
   - Adicione o bot como membro e torne-o **administrador** (necessário para enviar mensagens e, se for usar fórum, criar tópicos).

3. **Obter o Chat ID**
   - **Opção A:** Adicione [@userinfobot](https://t.me/userinfobot) ao grupo, envie qualquer mensagem e o bot responderá com o ID do grupo (ex.: `-1001234567890`). Depois pode remover o userinfobot.
   - **Opção B:** Envie uma mensagem no grupo, abra no navegador `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates` e procure `"chat":{"id":-100...}` na resposta.

4. **Criar o arquivo `.env` na raiz do projeto**
   - O arquivo `.env` **não é versionado** (está no `.gitignore`). Nunca commite o token.
   - Crie na raiz do repositório (mesmo nível de `package.json`):

```env
TELEGRAM_BOT_TOKEN=7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=-1001234567890
```

   - Substitua pelos seus valores (sem aspas).

5. **Testar**
   - Notificar novos editais: `node scripts/notify-telegram.js`
   - Enviar lembretes de cronograma (eventos de hoje): `node scripts/schedule-reminders.js`

### Uso no CI (GitHub Actions)

No repositório: **Settings → Secrets and variables → Actions**. Cadastre os secrets:

- `TELEGRAM_BOT_TOKEN` — mesmo token do bot.
- `TELEGRAM_CHAT_ID` — mesmo ID do grupo/canal.

O workflow **Daily Data Sync and Deploy** usa esses secrets para rodar `notify-telegram.js` e `schedule-reminders.js` no pipeline.

---

### Scripts disponíveis

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
