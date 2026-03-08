// @ts-check
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://ifesserra-lab.github.io',
    base: '/portal_edital',
    vite: {
        plugins: [tailwindv4()],
    },
});
