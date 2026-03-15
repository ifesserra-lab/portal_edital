/**
 * Loads .env from project root into process.env.
 * Used by scripts that need TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID when run locally.
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const envPath = join(projectRoot, '.env');

export function loadEnv() {
    if (!existsSync(envPath)) return;
    try {
        const content = readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eq = trimmed.indexOf('=');
            if (eq <= 0) continue;
            const key = trimmed.slice(0, eq).trim();
            let value = trimmed.slice(eq + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (!process.env[key]) process.env[key] = value;
        }
    } catch (e) {
        console.warn('⚠️ Could not load .env:', e.message);
    }
}
