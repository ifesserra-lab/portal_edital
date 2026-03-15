import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { loadEnv } from './load-env.js';

loadEnv();

const DEFAULT_DATA_DIR = 'data';
const DEFAULT_REGISTRY_FILE = join('registry', 'downloads_registry.json');
const TOPICS_REGISTRY = join('registry', 'topics_registry.json');

const PORTAL_URL = 'https://ifesserra-lab.github.io/portal_edital';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getOrCreateTopicId(category) {
    if (!category || category === 'N/A' || category.toLowerCase() === 'sem categoria') return null;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) return null;

    let topics = {};
    if (existsSync(TOPICS_REGISTRY)) {
        topics = JSON.parse(readFileSync(TOPICS_REGISTRY, 'utf-8'));
    }

    const normalizedCategory = category.trim().toLowerCase();
    if (topics[normalizedCategory]) return topics[normalizedCategory];

    // Create new topic
    console.log(`🏗️ Creating new Telegram topic for category: ${category}`);
    const url = `https://api.telegram.org/bot${token}/createForumTopic`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                name: category.charAt(0).toUpperCase() + category.slice(1)
            })
        });

        const result = await response.json();
        if (result.ok) {
            const topicId = result.result.message_thread_id;
            topics[normalizedCategory] = topicId;
            writeFileSync(TOPICS_REGISTRY, JSON.stringify(topics, null, 4));
            return topicId;
        } else if (result.error_code === 429) {
            const waitTime = (result.parameters?.retry_after || 5) * 1000;
            console.warn(`🛑 Rate limited while creating topic. Waiting ${waitTime/1000}s...`);
            await sleep(waitTime);
            return getOrCreateTopicId(category); // Retry
        } else {
            console.error(`❌ Failed to create topic: ${result.description}`);
            return null;
        }
    } catch (err) {
        console.error(`❌ Error creating topic: ${err.message}`);
        return null;
    }
}

async function sendTelegramMessage(text, topicId = null) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn('⚠️ Telegram credentials not found. Skipping notification.');
        return false;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                message_thread_id: topicId,
                text: text,
                parse_mode: 'HTML',
                disable_web_page_preview: false
            })
        });
        
        if (response.ok) {
            console.log('✅ Telegram notification sent!');
            return true;
        }

        const result = await response.json();
        if (result.error_code === 429) {
            const waitTime = (result.parameters?.retry_after || 5) * 1000;
            console.warn(`🛑 Rate limited. Waiting ${waitTime/1000}s...`);
            await sleep(waitTime);
            return sendTelegramMessage(text, topicId); // Retry
        } else {
            console.error(`❌ Failed to send Telegram message: ${result.description}`);
            return false;
        }
    } catch (err) {
        console.error(`❌ Error sending Telegram message: ${err.message}`);
        return false;
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
    const files = existsSync(dataDir) ? readdirSync(dataDir).filter(file =>
        file.endsWith('.json') &&
        !file.includes('downloads_registry') &&
        !file.includes('backup')
    ) : [];
    const now = new Date().toISOString();
    let newItemsFound = false;

    for (const file of files) {
        if (!registry[file]) {
            console.log(`🆕 New edital detected: ${file}`);
            const filePath = join(dataDir, file);
            try {
                const content = JSON.parse(readFileSync(filePath, 'utf-8'));
                const title = content.nome || file;
                const link = content.link || '';
                const description = content.descrição || 'Sem descrição disponível.';
                const category = content.categoria || 'N/A';
                
                // Get the first event if available
                let eventInfo = 'N/A';
                if (content.cronograma && content.cronograma.length > 0) {
                    const firstEvent = content.cronograma[0];
                    eventInfo = `${firstEvent.evento} (${firstEvent.data})`;
                }
                
                // Truncate description if too long
                const shortDescription = description.length > 300 
                    ? description.substring(0, 297) + '...' 
                    : description;

                const message = `🔔 <b>Novo Edital Detectado!</b>\n\n` +
                                `<b>📌 Título:</b> ${title}\n` +
                                `<b>📁 Categoria:</b> ${category}\n` +
                                `<b>📅 Próximo Evento:</b> ${eventInfo}\n\n` +
                                `<b>📝 Descrição:</b> <i>${shortDescription}</i>\n\n` +
                                `<b>🔗 Link do Edital:</b> <a href="${link}">Acessar Documento</a>\n` +
                                `<b>🌐 Portal de Editais:</b> <a href="${PORTAL_URL}">Ver todos os editais</a>`;

                const topicId = await getOrCreateTopicId(category);
                const success = await sendTelegramMessage(message, topicId);
                
                if (success) {
                    registry[file] = {
                        data_entrada: now,
                        categoria: content.categoria || 'N/A',
                        orgão_fomento: content.orgão_fomento || 'N/A',
                        cronograma: content.cronograma || []
                    };
                    newItemsFound = true;
                    // Add delay to avoid rate limits
                    await sleep(2000);
                } else {
                    console.warn(`🛑 Skipping registry update for ${file} due to failure.`);
                }
            } catch (err) {
                console.error(`❌ Error processing ${file}: ${err.message}`);
            }
        }
    }

    if (newItemsFound) {
        if (!existsSync(dirname(registryFile))) {
             // Create registry dir if not exists (for tests)
             // fs.mkdirSync(dirname(registryFile), { recursive: true });
        }
        writeFileSync(registryFile, JSON.stringify(registry, null, 4));
        console.log('💾 Registry updated.');
    } else {
        console.log('✨ No new editals found.');
    }
}

// Auto-run if executed directly
import { fileURLToPath } from 'url';
if (process.argv[1] && (process.argv[1].endsWith('notify-telegram.js') || fileURLToPath(import.meta.url) === process.argv[1])) {
    run();
}
