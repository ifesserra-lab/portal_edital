# docs/features/sobre.feature
Feature: Sobre o Portal de Editais
  Como um cidadão, pesquisador ou membro da instituição
  Quero acessar uma página explicativa sobre o portal
  Para entender o objetivo da plataforma, como ela funciona e o impacto no Estado do Espírito Santo

  Background:
    Given que acesso a rota "/sobre" do portal de editais

  Scenario: Visualizar informações institucionais e missão do portal
    When a página for carregada
    Then devo ver um cabeçalho indicando que estou na seção "Sobre"
    And devo visualizar seções explicativas sobre "Missão", "Como Funciona" e "Impacto"
    And a página deve manter o padrão visual e de navegação (cabeçalho e rodapé) do resto do site
