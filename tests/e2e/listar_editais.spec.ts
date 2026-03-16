import { test, expect } from '@playwright/test';

test.describe('Portal de Editais - Listagem', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./');
    });

    test('Visualizar editais em aberto', async ({ page }) => {
        const cards = page.locator('[data-testid="edital-card"]');
        await expect(cards).not.toHaveCount(0);

        // Verifica se o primeiro card tem as informações básicas
        const firstCard = cards.first();
        await expect(firstCard.locator('[data-testid="edital-titulo"]')).toBeVisible();
        // Status pode ser "aberto" ou "fechando" (quando data_encerramento já passou)
        const statusEl = firstCard.locator('[data-testid="edital-status"]');
        await expect(statusEl).toBeVisible();
        await expect(statusEl).toHaveText(/aberto|fechando/i);
    });

    test('Detalhes do edital', async ({ page }) => {
        const firstTitle = page.locator('[data-testid="edital-titulo"] a').first();
        const titleText = await firstTitle.innerText();

        await firstTitle.click();

        await expect(page).toHaveURL(/\/editais\/.+/);
        await expect(page.locator('h1')).toContainText(titleText.trim());
    });

    test('Buscar edital por palavra-chave', async ({ page }) => {
        const searchInput = page.locator('#search-input');

        // Digitar um termo que provavelmente existe (ex: FAPES)
        await searchInput.fill('fapes');

        // Aguardar o tempo do debounce (300ms) + margem
        await page.waitForTimeout(500);

        // Verificar se a URL foi atualizada com o query param
        await expect(page).toHaveURL(/.*q=fapes/i);

        // Verificar se existem cards visíveis e se pelo menos um aparece
        const visibleCards = page.locator('[data-testid="edital-card"]:visible');
        await expect(visibleCards.first()).toBeVisible();

        // Limpar a busca
        await searchInput.clear();
        await page.waitForTimeout(500);

        // Verificar que o parametro q sumiu
        await expect(page).not.toHaveURL(/.*q=/);
    });
});

