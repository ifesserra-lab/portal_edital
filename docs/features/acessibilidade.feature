# docs/features/acessibilidade.feature
Feature: Acessibilidade do Portal
  Como um usuário com necessidades específicas
  Quero ferramentas de acessibilidade
  Para navegar no portal com autonomia e conforto

  Background:
    Given que estou na página inicial do portal

  Scenario: Alternar Alto Contraste
    When clico no botão "Alto Contraste" na toolbar
    Then a classe "contrast" deve ser aplicada ao elemento "html"
    And as cores da página devem mudar para alto contraste (preto e branco/amarelo)

  Scenario: Alternar Baixa Visão (Aumento de Fonte)
    When clico no botão "Baixa Visão" na toolbar
    Then a classe "large-text" deve ser aplicada ao elemento "html"
    And o tamanho da fonte base deve aumentar para 125%

  Scenario: Persistência de Acessibilidade
    Given que ativei o "Alto Contraste"
    When eu recarregar a página
    Then o "Alto Contraste" deve permanecer ativo

  Scenario: Responsividade Mobile-First
    When acesso o portal em um dispositivo móvel (375x667)
    Then a interface deve se adaptar corretamente
    And o menu de acessibilidade deve estar acessível via botão flutuante
    And a grade de editais deve exibir apenas 1 coluna
