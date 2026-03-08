// @ts-check
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindv4()],
    },
});
