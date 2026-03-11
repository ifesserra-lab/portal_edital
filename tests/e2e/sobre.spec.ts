import { test, expect } from '@playwright/test';

test.describe('Portal de Editais - Sobre', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./sobre/');
    });

    test('Visualizar informações institucionais e missão do portal', async ({ page }) => {
        // Verifica o H1 principal declarando a página
        await expect(page.locator('h1').first()).toContainText('Sobre o Portal de Editais', { ignoreCase: true });

        // Verifica a presença e visibilidade das 3 seções explicativas conforme Gherkin
        await expect(page.locator('[data-testid="sobre-missao"]')).toBeVisible();
        await expect(page.locator('[data-testid="sobre-como-funciona"]')).toBeVisible();
        await expect(page.locator('[data-testid="sobre-impacto"]')).toBeVisible();

        // O cabeçalho (Header) contendo o "Portal de Editais" deve estar visível validando retenção de layout
        await expect(page.locator('header').first()).toBeVisible();
    });
});
