import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { run } from '../../scripts/schedule-reminders.js';

describe('schedule-reminders.js Unit Tests', () => {
    let tempDir;
    let dataDir;
    let registryFile;

    beforeEach(() => {
        process.env.TELEGRAM_BOT_TOKEN = 'mock-token';
        process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';

        tempDir = mkdtempSync(join(tmpdir(), 'reminder-test-'));
        dataDir = join(tempDir, 'data');
        const registryDir = join(tempDir, 'registry');
        registryFile = join(registryDir, 'downloads_registry.json');
        
        mkdirSync(dataDir);
        mkdirSync(registryDir);

        // Mock fetch globally
        global.fetch = async (url) => {
            if (url.includes('createForumTopic')) {
                return {
                    ok: true,
                    json: async () => ({ ok: true, result: { message_thread_id: 123 } }),
                    text: async () => JSON.stringify({ ok: true, result: { message_thread_id: 123 } })
                };
            }
            return { 
                ok: true, 
                text: async () => 'ok',
                json: async () => ({ ok: true })
            };
        };
    });

    afterEach(() => {
        rmSync(tempDir, { recursive: true, force: true });
    });

    test('Should trigger reminder for today event', async () => {
        const today = new Date().toISOString().split('T')[0];
        const testEdital = {
            nome: "Edital Hoje",
            cronograma: [{ evento: "Evento de Hoje", data: today }]
        };
        
        writeFileSync(join(dataDir, 'hoje.json'), JSON.stringify(testEdital));
        
        let fetchMessage = '';
        global.fetch = async (url, options) => {
            if (url.includes('createForumTopic')) {
                return {
                    ok: true,
                    json: async () => ({ ok: true, result: { message_thread_id: 123 } })
                };
            }
            const body = JSON.parse(options.body);
            fetchMessage = body.text;
            return { 
                ok: true, 
                text: async () => 'ok',
                json: async () => ({ ok: true })
            };
        };

        await run(dataDir, registryFile);
        
        assert.ok(fetchMessage.includes('Lembrete de Cronograma'), 'Should send reminder message');
        assert.ok(fetchMessage.includes('Evento de Hoje'), 'Message should contain event name');
        
        const registry = JSON.parse(readFileSync(registryFile, 'utf-8'));
        assert.ok(registry['hoje.json'].notificacoes_enviadas.includes(`Evento de Hoje_${today}`), 'Should record sent notification');
    });

    test('Should not double notify for the same event', async () => {
        const today = new Date().toISOString().split('T')[0];
        const eventKey = `Evento Repetido_${today}`;
        
        const initialRegistry = {
            'repetido.json': {
                notificacoes_enviadas: [eventKey]
            }
        };
        writeFileSync(registryFile, JSON.stringify(initialRegistry));
        
        const testEdital = {
            nome: "Edital Repetido",
            cronograma: [{ evento: "Evento Repetido", data: today }]
        };
        writeFileSync(join(dataDir, 'repetido.json'), JSON.stringify(testEdital));
        
        let fetchCalls = 0;
        global.fetch = async (url) => {
            if (url.includes('createForumTopic')) {
                return {
                    ok: true,
                    json: async () => ({ ok: true, result: { message_thread_id: 123 } })
                };
            }
            fetchCalls++;
            return { 
                ok: true, 
                text: async () => 'ok',
                json: async () => ({ ok: true })
            };
        };

        await run(dataDir, registryFile);
        
        assert.strictEqual(fetchCalls, 0, 'Should not send notification if already recorded in registry');
    });
});
