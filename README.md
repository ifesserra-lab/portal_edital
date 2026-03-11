# Portal de Editais 🚀

Plataforma unificada para publicação, consulta e acompanhamento de editais de fomento à pesquisa, extensão e inovação.

🔗 **Acesse o portal:** [https://ifesserra-lab.github.io/portal_edital/](https://ifesserra-lab.github.io/portal_edital/)

## ✨ Características

- **Design Inovador**: Interface moderna com Tailwind CSS v4 e animações premium.
- **Acessibilidade Universal**: Menu flutuante com suporte a Alto Contraste, Fontes para Dislexia, Escalonamento de Fonte e Destaque de Links.
- **Modo Escuro Inteligente**: Toggle de tema com persistência local e prevenção de *flash* visual.
- **Notificações em Tempo Real**: Alertas automáticos via Telegram sempre que um novo edital é publicado.
- **Busca e Filtros Avançados**: Filtragem reativa por tags e termos de busca unificada.
- **Automação de Dados**: Sincronização diária automática com fontes externas e registro de histórico.

## 🛠️ Stack Tecnológica

- **Framework**: [Astro](https://astro.build/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testes**: [Playwright](https://playwright.dev/)
- **Notificações**: Telegram Bot API via Node.js scripts.
- **Gestão de Dados**: JSON + Registro de Auditoria (`registry/`).

## 📂 Organização do Projeto

| Pasta | Descrição |
|---|---|
| `data/` | Fonte da verdade dos editais (Arquivos JSON). |
| `registry/` | Registro de histórico e auditoria de downloads. |
| `docs/` | Documentação técnica, arquitetura e backlog. |
| `scripts/` | Utilitários de validação e automação (Notificações, etc). |
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
```

## 📖 Documentação Adicional

- [Arquitetura](docs/architecture.md)
- [Backlog do Projeto](docs/backlog.md)
- [Funcionalidades e Features](docs/funcionalidades.md)
