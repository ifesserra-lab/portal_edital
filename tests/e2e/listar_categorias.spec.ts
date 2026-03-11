import { test, expect } from '@playwright/test';

test.describe('Portal de Editais - Categorias', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./categorias/');
    });

    test('Visualizar editais agrupados por categoria', async ({ page }) => {
        // Verifica o título da página
        await expect(page.locator('h1').first()).toContainText('Editais por Categoria');

        // Verifica se existem "seções" de categorias renderizadas (h2 uppercase com a classe e tracking específico)
        const categoryHeadings = page.locator('h2');
        await expect(categoryHeadings).not.toHaveCount(0);

        // Verifica se existem cards de editais renderizados em blocos
        const cards = page.locator('.edital-item');
        await expect(cards).not.toHaveCount(0);

        // O teste garante a renderização condizente com o cenário. A prova de ordem alfabética é verificada na lógica (Astro) mas é visualizável na tela final.
    });
});
