import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_DATA_DIR = 'data';
const DEFAULT_REGISTRY_FILE = join('registry', 'downloads_registry.json');
const PORTAL_URL = 'https://ifesserra-lab.github.io/portal_edital';

async function sendTelegramMessage(text) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn('⚠️ Telegram credentials not found. Skipping notification.');
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML',
                disable_web_page_preview: false
            })
        });
        if (!response.ok) {
            const err = await response.text();
            console.error(`❌ Failed to send Telegram message: ${err}`);
        } else {
            console.log('✅ Telegram reminder sent!');
        }
    } catch (err) {
        console.error(`❌ Error sending Telegram message: ${err.message}`);
    }
}

function getRegistry(registryPath) {
    if (existsSync(registryPath)) {
        try {
            return JSON.parse(readFileSync(registryPath, 'utf-8'));
        } catch (e) {
            console.error(`❌ Error reading registry: ${e.message}`);
            return {};
        }
    }
    return {};
}

export async function run(dataDir = DEFAULT_DATA_DIR, registryFile = DEFAULT_REGISTRY_FILE) {
    const registry = getRegistry(registryFile);
    const files = existsSync(dataDir) ? readdirSync(dataDir).filter(file => file.endsWith('.json')) : [];
    
    // Get today's date in YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    console.log(`🔎 Checking reminders for: ${today}`);
    
    let stateChanged = false;

    for (const file of files) {
        const filePath = join(dataDir, file);
        try {
            const content = JSON.parse(readFileSync(filePath, 'utf-8'));
            const cronograma = content.cronograma || [];
            const editalName = content.nome || file;
            const editalLink = content.link || PORTAL_URL;

            // Initialize notification tracking if not present
            if (!registry[file]) {
                registry[file] = { data_entrada: new Date().toISOString(), categoria: content.categoria || 'N/A', cronograma: cronograma };
            }
            if (!registry[file].notificacoes_enviadas) {
                registry[file].notificacoes_enviadas = [];
            }

            for (const item of cronograma) {
                const eventDate = item.data;
                const eventName = item.evento;

                // Check if the event date matches today (handles "YYYY-MM-DD" or "A partir de YYYY-MM-DD")
                if (eventDate.includes(today)) {
                    const notificationKey = `${eventName}_${eventDate}`;

                    // Only send if not already sent
                    if (!registry[file].notificacoes_enviadas.includes(notificationKey)) {
                        console.log(`⏰ Reminder trigger: ${editalName} - ${eventName}`);
                        
                        const message = `⏰ <b>Lembrete de Cronograma!</b>\n\n` +
                                        `<b>📌 Edital:</b> ${editalName}\n` +
                                        `<b>📅 Evento:</b> <i>${eventName}</i>\n` +
                                        `<b>ℹ️ Data prevista:</b> ${eventDate}\n\n` +
                                        `<b>🌐 Ver mais no portal:</b> <a href="${PORTAL_URL}">Acessar site</a>\n` +
                                        `<b>🔗 Link direto:</b> <a href="${editalLink}">Abrir documento</a>`;

                        await sendTelegramMessage(message);
                        registry[file].notificacoes_enviadas.push(notificationKey);
                        stateChanged = true;
                    }
                }
            }
        } catch (err) {
            console.error(`❌ Error processing ${file}: ${err.message}`);
        }
    }

    if (stateChanged) {
        writeFileSync(registryFile, JSON.stringify(registry, null, 4));
        console.log('💾 Registry updated with sent notifications.');
    } else {
        console.log('✨ No reminders to send today.');
    }
}

// Auto-run if executed directly
if (process.argv[1] && (process.argv[1].endsWith('schedule-reminders.js') || fileURLToPath(import.meta.url) === process.argv[1])) {
    run();
}
