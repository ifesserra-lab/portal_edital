# Scripts e Registry — Portal de Editais

Este documento descreve os scripts de automação, o formato do registry e como configurar e executar as notificações via Telegram (local e CI).

## 📂 Registry

O diretório `registry/` contém dois arquivos JSON versionados:

| Arquivo | Descrição |
|--------|-----------|
| `downloads_registry.json` | Um objeto cuja chave é o nome do arquivo do edital (ex.: `edital_fapes_052026__visita_técnico-científica.json`). Cada valor contém: `data_entrada`, `categoria`, `cronograma` e `notificacoes_enviadas` (lista de chaves de lembretes já enviados). |
| `topics_registry.json` | Mapeamento da categoria normalizada (minúscula) para o ID numérico do tópico no fórum do grupo Telegram. Ex.: `"chamadas": 12345`. Valores `null` indicam que o tópico ainda será criado na próxima execução. |

Os scripts **notify-telegram.js** e **schedule-reminders.js** leem e atualizam esses arquivos. O **build-registry.js** apenas (re)constrói o `downloads_registry` e cria `topics_registry` vazio ou com categorias em `null`, sem enviar mensagens.

## 🔧 Scripts

Todos os scripts estão em `scripts/` e são executados com Node.js (ESM).

### Carregamento do `.env` (`load-env.js`)

- **Uso:** Importado por `notify-telegram.js` e `schedule-reminders.js`; não é executado sozinho.
- **Função:** Lê o arquivo `.env` na raiz do projeto e preenche `process.env` (ex.: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). Assim, as credenciais funcionam ao rodar os scripts localmente sem exportar variáveis manualmente.

### Build do Registry (`build-registry.js`)

- **Uso:** `node scripts/build-registry.js`
- **Função:** Percorre todos os `.json` em `data/` (exceto nomes que contenham `downloads_registry` ou `backup`) e gera/atualiza `registry/downloads_registry.json`. Se `registry/topics_registry.json` não existir, cria um objeto vazio `{}`. Não envia mensagens no Telegram e não exige credenciais.
- **Quando usar:** Para (re)criar o registry após clonar o repositório ou após alterações manuais em `data/`.

### Notificação de Novos Editais (`notify-telegram.js`)

- **Uso:** `node scripts/notify-telegram.js`
- **Função:** Para cada arquivo em `data/` que **não** está em `downloads_registry.json`, monta uma mensagem de “Novo Edital Detectado!” e envia no Telegram. Usa o tópico da categoria (cria o tópico via API se ainda não existir em `topics_registry.json`). Após enviar, atualiza o registry.
- **Requisitos:** `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` no `.env` (local) ou nas variáveis de ambiente (CI).

### Lembretes de Cronograma (`schedule-reminders.js`)

- **Uso:** `node scripts/schedule-reminders.js`
- **Função:** Para cada edital, verifica se algum evento do `cronograma` tem data igual a **hoje**. Se sim e se esse lembrete ainda não estiver em `notificacoes_enviadas`, envia uma mensagem de lembrete no Telegram (no tópico da categoria) e registra o envio no registry.
- **Requisitos:** Mesmas credenciais do notify-telegram.

### Validação de Dados (`validate-data.js`)

- **Uso:** Executado no CI; pode ser rodado localmente com `node scripts/validate-data.js`.
- **Função:** Valida a integridade dos arquivos JSON em `data/` antes do build e deploy.

## ⚙️ Configuração local (Telegram)

1. Crie um bot com [@BotFather](https://t.me/BotFather) e anote o token.
2. Crie um grupo (ou use um existente), adicione o bot e torne-o administrador se for usar fórum (tópicos).
3. Obtenha o ID do grupo (ex.: com [@userinfobot](https://t.me/userinfobot) ou via API `getUpdates`).
4. Na raiz do projeto, crie `.env` (o arquivo está no `.gitignore`):

```env
TELEGRAM_BOT_TOKEN=seu_token_aqui
TELEGRAM_CHAT_ID=-1001234567890
```

5. Execute os scripts a partir da raiz: `node scripts/notify-telegram.js` e/ou `node scripts/schedule-reminders.js`.

## 🔄 Uso no CI (GitHub Actions)

O workflow **Daily Data Sync and Deploy** define `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` via secrets e executa em sequência:

1. Sync dos dados do repositório externo para `data/`.
2. `node scripts/notify-telegram.js` e `node scripts/schedule-reminders.js`.
3. Commit e push de `data/` e `registry/` se houver alterações.
4. Build do site (Astro + Pagefind) e deploy no GitHub Pages.

Assim, o site e o registry permanecem alinhados e as notificações são enviadas automaticamente no pipeline.

## 📖 Referências

- [README principal](../README.md) — visão geral e comandos rápidos.
- [Arquitetura](architecture.md) — estrutura de diretórios e ADRs.
