# docs/features/temas.feature
Feature: Temas (Light e Dark Mode)
  Como um usuário
  Quero alternar entre os temas claro e escuro
  Para melhor visualização conforme minha preferência ou ambiente

  Background:
    Given que estou no portal

  Scenario: Alternar para Modo Escuro
    When clico no botão "Tema" na toolbar de acessibilidade
    Then a classe "dark" deve ser aplicada ao elemento "html"
    And as cores de fundo devem mudar para tons escuros

  Scenario: Persistência do Tema
    Given que selecionei o "Modo Escuro"
    When eu fechar e abrir o navegador (ou recarregar)
    Then o portal deve carregar automaticamente no "Modo Escuro"

  Scenario: Respeitar Preferência do Sistema
    Given que não tenho preferência salva no portal
    And meu sistema está configurado para "Modo Escuro"
    When acesso o portal pela primeira vez
    Then o portal deve carregar no "Modo Escuro"
