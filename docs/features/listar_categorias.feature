# docs/features/listar_categorias.feature
Feature: Listagem de Editais por Categoria
  Como um cidadão ou pesquisador
  Quero visualizar todos os editais agrupados hierarquicamente por categoria e ordenados alfabeticamente
  Para encontrar rapidamente oportunidades em blocos específicos de minha preferência

  Background:
    Given que estou na página de categorias do portal

  Scenario: Visualizar editais agrupados por categoria
    When a página for carregada
    Then devo ver todos os editais agrupados visualmente pelas categorias disponíveis
    And dentro de cada categoria, os editais devem estar listados em ordem alfabética pelo título
