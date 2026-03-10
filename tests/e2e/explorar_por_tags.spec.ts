import { test, expect } from '@playwright/test';

test.describe('Explorar Editais por Tags', () => {

    // Scenario: Visualizar a página de tags com os agrupamentos
    test('Visualizar a página de tags com os agrupamentos', async ({ page }) => {
        await page.goto('tags');

        // As seções agrupando as strings devem aparecer
        const sections = page.locator('.tag-section');
        await expect(sections).not.toHaveCount(0);

        // Os botões de filtros devem estar visíveis
        const tagFilters = page.locator('.tag-filter-btn');
        await expect(tagFilters).not.toHaveCount(0);
    });

    // Scenario Outline: Filtrar os editais por uma tag específica do JSON
    test('Filtrar os editais por uma tag específica', async ({ page }) => {
        await page.goto('tags');

        // Pegando a primeira tag do primeiro botão disponível
        const firstTagBtn = page.locator('.tag-filter-btn').first();
        const tagName = await firstTagBtn.getAttribute('data-tag');

        // Pega o número de seções originais
        const allSections = page.locator('.tag-section');
        const initialSectionsCount = await allSections.count();

        // Clica para filtrar
        await firstTagBtn.click();

        // Apenas a seção correspondente deve ficar visível (as outras display: none)
        // Uma seção visível para a tag que acabamos de selecionar
        const visibleSections = page.locator('.tag-section:visible');
        await expect(visibleSections).toHaveCount(1);

        const visibleSectionTag = await visibleSections.first().getAttribute('data-tag');
        expect(visibleSectionTag).toBe(tagName);
    });

    // Scenario: Limpar seleção de tag e voltar à visualização completa
    test('Limpar seleção de tag e voltar à visualização completa', async ({ page }) => {
        await page.goto('tags');

        const firstTagBtn = page.locator('.tag-filter-btn').first();
        await firstTagBtn.click();

        const clearBtn = page.locator('#clear-filters-btn');
        await expect(clearBtn).toBeVisible();

        await clearBtn.click();

        // Múltiplas seções devem voltar a ser renderizadas / visíveis
        const visibleSections = page.locator('.tag-section:visible');
        const count = await visibleSections.count();
        expect(count).toBeGreaterThan(1);

        // E o botão de limpar some
        await expect(clearBtn).toBeHidden();
    });

    // Scenario: Buscar editais por texto
    test('Buscar editais por texto no campo de busca textual', async ({ page }) => {
        await page.goto('tags');
        const searchInput = page.locator('#search-input');

        // Preenchendo com uma letra que sempre tem resultado ("a")
        await searchInput.fill('a');

        const visibleCards = page.locator('.tag-edital-card:visible');
        await expect(visibleCards).not.toHaveCount(0);

        const clearBtn = page.locator('#clear-filters-btn');
        await expect(clearBtn).toBeVisible();
    });

    // Scenario: Busca sem resultados
    test('Busca sem resultados exibe mensagem correspondente', async ({ page }) => {
        await page.goto('tags');
        const searchInput = page.locator('#search-input');

        await searchInput.fill('termoinexistente123456');

        const noResults = page.locator('#no-results-message');
        await expect(noResults).toBeVisible();
    });

});
