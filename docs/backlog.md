# Backlog do Projeto — Portal de Editais

Este backlog organiza as próximas evoluções do portal em níveis de Epics, User Stories e Tasks.

## 🚀 [Epic 1: Infraestrutura e Design Base](https://github.com/ifesserra-lab/portal_edital/issues/5) (Concluído ✅)
*Foco em configurar o ambiente, stack técnica e design responsivo.*

- **[US1: Configurar Projeto Astro](https://github.com/ifesserra-lab/portal_edital/issues/8)**
  - [x] [Task: Inicializar Astro com TypeScript](https://github.com/ifesserra-lab/portal_edital/issues/15).
  - [x] [Task: Integrar Tailwind CSS v4](https://github.com/ifesserra-lab/portal_edital/issues/16).
  - [x] [Task: Configurar Content Collections para ler JSON de `data/`](https://github.com/ifesserra-lab/portal_edital/issues/18).
- **[US2: Design System Moderno](https://github.com/ifesserra-lab/portal_edital/issues/9)**
  - [x] [Task: Criar layout base responsivo](https://github.com/ifesserra-lab/portal_edital/issues/20).
  - [x] [Task: Implementar Dark Mode e Alto Contraste](https://github.com/ifesserra-lab/portal_edital/issues/22).
  - [x] [Task: Criar a Toolbar de Acessibilidade](https://github.com/ifesserra-lab/portal_edital/issues/24).

## 📋 [Epic 2: Visualização e Consulta de Editais](https://github.com/ifesserra-lab/portal_edital/issues/6) (Concluído ✅)
*Foco na experiência do usuário ao encontrar e ler editais.*

- **[US3: Busca de Editais](https://github.com/ifesserra-lab/portal_edital/issues/10)**
  - [x] [Task: Integrar Pagefind para busca estática](https://github.com/ifesserra-lab/portal_edital/issues/17).
  - [x] [Task: Criar componente visual de Search Bar](https://github.com/ifesserra-lab/portal_edital/issues/26).
  - [x] [Task: Testar busca por título e tags](https://github.com/ifesserra-lab/portal_edital/issues/27).
- **[US4: Filtros Avançados](https://github.com/ifesserra-lab/portal_edital/issues/11)**
  - [x] [Task: Implementar filtros por categoria (Pesquisa, Extensão, etc)](https://github.com/ifesserra-lab/portal_edital/issues/28).
  - [x] [Task: Implementar filtros por status (Aberto, Encerrado)](https://github.com/ifesserra-lab/portal_edital/issues/29).
  - [x] [Task: Garantir que filtros reflitam na URL (Query Params)](https://github.com/ifesserra-lab/portal_edital/issues/30).
- **[US9: Busca livre por palavra-chave combinada com filtros de categoria](https://github.com/ifesserra-lab/portal_edital/issues/39)** (Concluído ✅)
  - [x] [Task: Criar input de busca visual integrado ao FilterBar](https://github.com/ifesserra-lab/portal_edital/issues/40).
  - [x] [Task: Implementar lógica de busca livre combinada na listagem de editais](https://github.com/ifesserra-lab/portal_edital/issues/41).
  - [x] [Task: Sincronizar nomenclaturas E2E com BDD (Listar Editais)](https://github.com/ifesserra-lab/portal_edital/issues/42).
- **[US10: Página de listagem de editais agrupados por categoria e ordem alfabética](https://github.com/ifesserra-lab/portal_edital/issues/44)** (Concluído ✅)
  - [x] [Task: Documentar cenários BDD para listagem hierárquica por categoria](https://github.com/ifesserra-lab/portal_edital/issues/45).
  - [x] [Task: Construir interface Astro para agrupar e ordenar editais](https://github.com/ifesserra-lab/portal_edital/issues/46).
  - [x] [Task: Implementar testes automatizados E2E (Playwright) para organização por categoria](https://github.com/ifesserra-lab/portal_edital/issues/47).
- **US11: Explorar Editais por Tags** (Concluído ✅)
  - [x] Task: Criar componente de filtro e busca `TagFilterSearch.astro` em Vanilla JS.
  - [x] Task: Criar a página estática `/tags` agregando edital por tag.
  - [x] Task: Implementar os testes E2E correspondentes da suíte BDD explorando tags e busca.

## 🛠️ [Epic 3: Automação e DevOps](https://github.com/ifesserra-lab/portal_edital/issues/7) (Concluído ✅)
*Foco na qualidade e entrega contínua.*

- **[US5: Pipeline de CI/CD](https://github.com/ifesserra-lab/portal_edital/issues/12)**
  - [x] [Task: Configurar GitHub Actions para deploy no GitHub Pages](https://github.com/ifesserra-lab/portal_edital/issues/19).
  - [x] [Task: Adicionar step de execução de testes Playwright no CI](https://github.com/ifesserra-lab/portal_edital/issues/21).
  - [x] [Task: Adicionar step de execução de testes unitários de Scripts no CI].
  - [x] [Task: Configurar linting automático no commit](https://github.com/ifesserra-lab/portal_edital/issues/31).
- **[US6: Gestão de Projeto](https://github.com/ifesserra-lab/portal_edital/issues/13)**
  - [x] [Task: Integrar skill de Gitflow e GitHub Issues](https://github.com/ifesserra-lab/portal_edital/issues/32).
  - [x] [Task: Criar labels padrão no repositório (epic, user-story, task)](https://github.com/ifesserra-lab/portal_edital/issues/33).

## ♿ [Epic 4: Acessibilidade Avançada](https://github.com/ifesserra-lab/portal_edital/issues/1) (Concluído ✅)
*Foco em atingir conformidade WCAG máxima.*

- **[US7: Auditoria de Baixa Visão](https://github.com/ifesserra-lab/portal_edital/issues/14)**
  - [x] [Task: Revisar tamanhos de fonte relativos (rem)](https://github.com/ifesserra-lab/portal_edital/issues/23).
  - [x] [Task: Validar navegação completa por teclado em todas as páginas](https://github.com/ifesserra-lab/portal_edital/issues/25).
  - [x] [Task: Adicionar Skip Links para conteúdo principal](https://github.com/ifesserra-lab/portal_edital/issues/34).

## 🔄 [Epic 5: Publicação Orientada a Dados](https://github.com/ifesserra-lab/portal_edital/issues/35) (Concluído ✅)
*Foco em automatizar o deploy sempre que houver novos editais ou atualizações.*

- **[US8: Trigger de Deploy Automático por Dados](https://github.com/ifesserra-lab/portal_edital/issues/36)**
  - [x] [Task: Configurar disparador do GitHub Actions para a pasta `data/`](https://github.com/ifesserra-lab/portal_edital/issues/37).
  - [x] [Task: Validar integridade dos arquivos JSON antes do deploy](https://github.com/ifesserra-lab/portal_edital/issues/38).

## 🔔 [Epic 6: Comunicação e Engajamento](https://github.com/ifesserra-lab/portal_edital/issues/53) (Concluído ✅)
*Foco em manter os usuários informados sobre novos editais.*

- **[US12: Notificações via Telegram](https://github.com/ifesserra-lab/portal_edital/issues/53)** (Concluído ✅)
  - [x] [Task: Criar script de integração com Telegram Bot API](https://github.com/ifesserra-lab/portal_edital/issues/54).
  - [x] [Task: Implementar lógica de registro de downloads/novos editais](https://github.com/ifesserra-lab/portal_edital/issues/55).
  - [x] [Task: Desenvolver Robô de Lembretes do Cronograma (Daily Reminders)].
  - [x] [Task: Implementar suíte de testes unitários para scripts do Telegram].
  - [x] [Task: Adicionar CTA de inscrição na Home Page](https://github.com/ifesserra-lab/portal_edital/issues/56).
