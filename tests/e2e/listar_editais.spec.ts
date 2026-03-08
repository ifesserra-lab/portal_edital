import { test, expect } from '@playwright/test';

test.describe('Portal de Editais - Listagem', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./');
    });

    test('Deve exibir a lista de editais em aberto', async ({ page }) => {
        const cards = page.locator('[data-testid="edital-card"]');
        await expect(cards).not.toHaveCount(0);

        // Verifica se o primeiro card tem as informações básicas
        const firstCard = cards.first();
        await expect(firstCard.locator('[data-testid="edital-titulo"]')).toBeVisible();
        await expect(firstCard.locator('[data-testid="edital-status"]')).toContainText('aberto', { ignoreCase: true });
    });

    test('Deve navegar para os detalhes do edital', async ({ page }) => {
        const firstTitle = page.locator('[data-testid="edital-titulo"] a').first();
        const titleText = await firstTitle.innerText();

        await firstTitle.click();

        await expect(page).toHaveURL(/\/editais\/.+/);
        await expect(page.locator('h1')).toContainText(titleText.trim());
    });
});
