# docs/features/visualizar_anexos_edital.feature
Feature: Visualizar Anexos do Edital
  Como um cidadão
  Quero visualizar os anexos de um edital na página de detalhes
  Para acessar documentos complementares e formulários

  Background:
    Given que existe um edital com o ID "chamada_confap__biodiversa_biodivconnect_2025-2026_-_diretrizes_específicas_da_fapes"
    And este edital possui um anexo com título "CHAMADA BIODIVERSA+ CALL TEXT"

  Scenario: Visualizar lista de anexos
    When eu acesso a página do edital "chamada_confap__biodiversa_biodivconnect_2025-2026_-_diretrizes_específicas_da_fapes"
    Then eu devo ver uma seção "Documentos e Anexos"
    And eu devo ver o link para "CHAMADA BIODIVERSA+ CALL TEXT" na lista de anexos

  Scenario: Edital sem anexos
    Given que existe um edital sem anexos
    When eu acesso a página desse edital
    Then eu não devo ver a seção "Documentos e Anexos"
