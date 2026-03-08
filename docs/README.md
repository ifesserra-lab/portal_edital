# 📚 Documentação do Portal de Editais

Bem-vindo ao diretório central de documentação oficial do Portal de Editais. Este espaço é dedicado a manter o conhecimento do projeto organizado, acessível e atualizado para desenvolvedores, arquitetos e stakeholders.

## 🗂️ Índice de Documentos

Aqui você encontra a descrição do que cada arquivo e pasta base neste diretório faz:

*   📘 **[Arquitetura do Sistema (`architecture.md`)](./architecture.md)**
    *   **Descrição:** Detalha as decisões de design (ADRs), a stack tecnológica utilizada (Astro, TailwindCSS v4, etc) e define como a renderização SSG e estrutura de dados JSON funcionam na prática. Ideal para novos desenvolvedores entenderem o "como" e "porquê" debaixo dos panos.
*   📋 **[Backlog do Projeto (`backlog.md`)](./backlog.md)**
    *   **Descrição:** Uma visão viva das prioridades (User Stories e Tasks), seu mapeamento com as issues reais do GitHub, divididos em **Épicos**. Mostra o que já foi entregue e qual o roadmap de futuro do projeto.
*   ✨ **[Índice de Funcionalidades (`funcionalidades.md`)](./funcionalidades.md)**
    *   **Descrição:** Catálogo de todas as features visuais, de filtro, busca e comportamentais disponíveis no portal para os usuários finais, referenciadas nativamente às suas User Stories originais (ex: US9, US10).
*   🧪 **[Testes (BDD) (`features/`)](./features/)**
    *   **Descrição:** Diretório em que as especificações "Behavior-Driven Development" (BDD) são guardadas usando a linguagem Gherkin (`.feature`). Servem tanto de documentação de regras de negócio em português claro, quanto como guia estrito para a implementação dos testes de Interface e Integração no (Playwright).

---
> **Regra de Manutenção:** Ao projetar ou codificar novos escopos, este repertório documental deve crescer sincronamente como "Documentação Viva". Qualquer entrega de Pull Request em features ou mudanças de modelo deve atualizar no processo os documentos impactados aqui (Ex: Ao criar uma US, o BDD em `features/` precisa ser mapeado também).
