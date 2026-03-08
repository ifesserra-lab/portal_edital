import { test, expect } from '@playwright/test';

test.describe('Temas (Light e Dark Mode)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Deve alternar para Modo Escuro', async ({ page }) => {
        // Abrir menu de acessibilidade
        await page.click('#a11y-trigger');

        // Clicar no botão de tema
        await page.click('#toggle-dark');

        // Verificar se a classe dark foi aplicada ao html
        await expect(page.locator('html')).toHaveClass(/dark/);

        // Verificar persistência no localStorage
        const theme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(theme).toBe('dark');
    });

    test('Deve alternar de volta para Modo Claro', async ({ page }) => {
        await page.click('#a11y-trigger');

        // Primeiro clique: para Dark
        await page.click('#toggle-dark');
        await expect(page.locator('html')).toHaveClass(/dark/);

        // Segundo clique: volta para Light
        await page.click('#toggle-dark');
        await expect(page.locator('html')).not.toHaveClass(/dark/);

        const theme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(theme).toBe('light');
    });

    test('Deve persistir o tema após recarregar a página', async ({ page }) => {
        await page.click('#a11y-trigger');
        await page.click('#toggle-dark');
        await expect(page.locator('html')).toHaveClass(/dark/);

        await page.reload();

        // Deve continuar sendo dark
        await expect(page.locator('html')).toHaveClass(/dark/);
    });

    test('Deve respeitar a preferência do sistema se não houver tema salvo', async ({ page, context }) => {
        // Limpar localStorage para garantir que não há preferência
        await page.evaluate(() => localStorage.removeItem('theme'));

        // Forçar preferência do sistema para dark
        await page.emulateMedia({ colorScheme: 'dark' });

        await page.reload();

        // O script anti-FOUC no BaseLayout deve aplicar dark
        await expect(page.locator('html')).toHaveClass(/dark/);
    });
});
