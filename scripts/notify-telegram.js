import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DATA_DIR = 'data';
const REGISTRY_FILE = join('registry', 'downloads_registry.json');
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(text) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn('⚠️ Telegram credentials not found. Skipping notification.');
        return;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });
        if (!response.ok) {
            const err = await response.text();
            console.error(`❌ Failed to send Telegram message: ${err}`);
        } else {
            console.log('✅ Telegram notification sent!');
        }
    } catch (err) {
        console.error(`❌ Error sending Telegram message: ${err.message}`);
    }
}

function getRegistry() {
    if (existsSync(REGISTRY_FILE)) {
        try {
            return JSON.parse(readFileSync(REGISTRY_FILE, 'utf-8'));
        } catch (e) {
            console.error(`❌ Error reading registry: ${e.message}`);
            return {};
        }
    }
    return {};
}

async function run() {
    const registry = getRegistry();
    const files = readdirSync(DATA_DIR).filter(file =>
        file.endsWith('.json') &&
        file !== 'downloads_registry.json' &&
        !file.includes('backup')
    );
    const now = new Date().toISOString();
    let newItemsFound = false;

    for (const file of files) {
        if (!registry[file]) {
            console.log(`🆕 New edital detected: ${file}`);
            const filePath = join(DATA_DIR, file);
            try {
                const content = JSON.parse(readFileSync(filePath, 'utf-8'));
                const title = content.nome || file;
                const link = content.link || '';

                const message = `🔔 <b>Novo Edital Detectado!</b>\n\n<b>Título:</b> ${title}\n<b>Link:</b> <a href="${link}">Clique aqui para acessar</a>`;

                await sendTelegramMessage(message);
                registry[file] = now;
                newItemsFound = true;
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        }
    }

    if (newItemsFound) {
        writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 4));
        console.log('💾 Registry updated.');
    } else {
        console.log('✨ No new editals found.');
    }
}

run();
