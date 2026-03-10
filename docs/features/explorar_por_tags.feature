Feature: Explorar Editais por Tags
  Como um usuário do portal
  Quero poder visualizar e explorar os editais agrupados por tags extraídas dinamicamente
  Para que eu possa encontrar rapidamente oportunidades relevantes para o meu perfil e interesses

  Background:
    Given que existem editais publicados no sistema com as tags reais extraídas dos JSONs
    And eu estou navegando para a página "/tags"

  Scenario: Visualizar a página de tags com os agrupamentos
    When a página carregar
    Then devo ver as tags reais (como "oceanos", "biodiversidade", "sustentabilidade", "pesquisa transdisciplinar", "governança ambiental") sendo usadas no agrupamento
    And essas tags devem estar visíveis como opções de filtro na tela

  Scenario Outline: Filtrar os editais por uma tag específica do JSON
    When eu clico na tag "<tag_alvo>" na área de filtros
    Then apenas os editais que contém a tag "<tag_alvo>" devem permanecer visíveis
    And os editais que não possuem a tag "<tag_alvo>" devem ser ocultados

    Examples:
      | tag_alvo               |
      | oceanos                |
      | biodiversidade         |
      | pesquisa transdisciplinar |

  Scenario: Limpar seleção de tag e voltar à visualização completa
    Given que a tag "biodiversidade" está selecionada
    When eu clico no botão ou na própria tag para remover o filtro
    Then todos os editais retornam a ficar visíveis novamente

  Scenario: Buscar editais por texto
    When eu clico no campo de busca textual e digito "nature"
    Then apenas os editais que contenham "nature" no título ou descrição devem aparecer

  Scenario: Interseção entre filtro de tag real e busca por texto
    Given que a tag "sustentabilidade" está selecionada como filtro
    When eu digito "well-being" no campo de busca textual
    Then devo ver apenas os editais que contêm a palavra "well-being" AND a tag "sustentabilidade"

  Scenario: Busca sem resultados
    When eu digito "termoinexistente123" no campo de busca textual
    Then devo ver a mensagem "Nenhum edital encontrado" ou indicação visual equivalente
