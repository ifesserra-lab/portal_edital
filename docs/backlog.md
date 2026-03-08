# Backlog do Projeto — Portal de Editais

Este backlog organiza as próximas evoluções do portal em níveis de Epics, User Stories e Tasks.

## 🚀 Epic 1: Infraestrutura e Design Base (Concluído ✅)
*Foco em configurar o ambiente, stack técnica e design responsivo.*

- **US1: Configurar Projeto Astro**
  - [x] Task: Inicializar Astro com TypeScript.
  - [x] Task: Integrar Tailwind CSS v4.
  - [x] Task: Configurar Content Collections para ler JSON de `data/`.
- **US2: Design System Moderno**
  - [x] Task: Criar layout base responsivo.
  - [x] Task: Implementar Dark Mode e Alto Contraste.
  - [x] Task: Criar a Toolbar de Acessibilidade.

## 📋 Epic 2: Visualização e Consulta de Editais
*Foco na experiência do usuário ao encontrar e ler editais.*

- **US3: Busca de Editais (Pendente)**
  - [ ] Task: Integrar Pagefind para busca estática.
  - [ ] Task: Criar componente visual de Search Bar.
  - [ ] Task: Testar busca por título e tags.
- **US4: Filtros Avançados (Pendente)**
  - [ ] Task: Implementar filtros por categoria (Pesquisa, Extensão, etc).
  - [ ] Task: Implementar filtros por status (Aberto, Encerrado).
  - [ ] Task: Garantir que filtros reflitam na URL (Query Params).

## 🛠️ Epic 3: Automação e DevOps
*Foco na qualidade e entrega contínua.*

- **US5: Pipeline de CI/CD (Pendente)**
  - [ ] Task: Configurar GitHub Actions para deploy no GitHub Pages.
  - [ ] Task: Adicionar step de execução de testes Playwright no CI.
  - [ ] Task: Configurar linting automático no commit.
- **US6: Gestão de Projeto (Em Andamento)**
  - [/] Task: Integrar skill de Gitflow e GitHub Issues.
  - [ ] Task: Criar labels padrão no repositório (epic, user-story, task).

## ♿ Epic 4: Acessibilidade Avançada
*Foco em atingir conformidade WCAG máxima.*

- **US7: Auditoria de Baixa Visão**
  - [ ] Task: Revisar tamanhos de fonte relativos (rem).
  - [ ] Task: Validar navegação completa por teclado em todas as páginas.
  - [ ] Task: Adicionar Skip Links para conteúdo principal.
