# docs/features/listar_editais.feature
Feature: Listagem de Editais
  Como um cidadão
  Quero visualizar os editais disponíveis
  Para encontrar oportunidades de financiamento

  Background:
    Given que estou na página inicial do portal

  Scenario: Visualizar editais em aberto
    When a página for carregada
    Then devo ver uma lista com os editais com status "aberto"
    And cada edital deve exibir título, órgão e data de encerramento

  Scenario: Detalhes do edital
    When clico no título de um edital
    Then devo ser redirecionado para a página de detalhes do edital
    And devo ver a descrição completa e o cronograma

  Scenario: Buscar edital por palavra-chave
    When digito "pesquisa" na barra de busca
    Then a lista de editais deve ser atualizada para mostrar apenas os resultados que contêm "pesquisa" no título, descrição ou órgão
    And a URL deve ser atualizada para conter o parâmetro de busca correspondente
