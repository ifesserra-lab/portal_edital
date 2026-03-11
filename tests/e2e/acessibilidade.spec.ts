import { test, expect } from '@playwright/test';

test.describe('Acessibilidade', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./');
    });

    test('Deve alternar Alto Contraste', async ({ page }) => {
        await page.click('#a11y-trigger');
        await page.click('#toggle-contrast');
        await expect(page.locator('html')).toHaveClass(/contrast/);
    });

    test('Deve alternar Baixa Visão (Fonte Grande)', async ({ page }) => {
        await page.click('#a11y-trigger');
        await page.click('[data-font-size="lg"]');
        await expect(page.locator('html')).toHaveClass(/text-lg/);

        // Verificar se o font-size aumentou (baseado no CSS que define 125%)
        // Aguardar a transição se necessário
        await expect(async () => {
            const fontSize = await page.evaluate(() => window.getComputedStyle(document.documentElement).fontSize);
            expect(fontSize).toBe('20px'); // 16px * 1.25 = 20px
        }).toPass();
    });

    test('Deve persistir configurações após recarregar', async ({ page }) => {
        await page.click('#a11y-trigger');
        await page.click('#toggle-contrast');
        await page.click('[data-font-size="lg"]');

        await page.reload();

        await expect(page.locator('html')).toHaveClass(/contrast/);
        await expect(page.locator('html')).toHaveClass(/text-lg/);
    });

    test('Deve ser responsivo em dispositivos móveis', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        const trigger = page.locator('#a11y-trigger');
        await expect(trigger).toBeVisible();

        // O menu de acessibilidade deve estar escondido inicialmente
        const menu = page.locator('#a11y-menu');
        await expect(menu).toBeHidden();
    });
});
