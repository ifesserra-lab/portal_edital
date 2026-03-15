import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { run } from '../../scripts/notify-telegram.js';

describe('notify-telegram.js Unit Tests', () => {
    let tempDir;
    let dataDir;
    let registryDir;
    let registryFile;

    beforeEach(() => {
        process.env.TELEGRAM_BOT_TOKEN = 'mock-token';
        process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';
        
        tempDir = mkdtempSync(join(tmpdir(), 'notify-test-'));
        dataDir = join(tempDir, 'data');
        registryDir = join(tempDir, 'registry');
        registryFile = join(registryDir, 'downloads_registry.json');
        
        mkdirSync(dataDir);
        mkdirSync(registryDir);

        // Mock fetch globally
        global.fetch = async (url, options) => {
            return {
                ok: true,
                text: async () => 'OK'
            };
        };
    });

    afterEach(() => {
        rmSync(tempDir, { recursive: true, force: true });
    });

    test('Should detect a new edital and update registry', async () => {
        const testEdital = {
            nome: "Edital Teste",
            descrição: "Descrição de teste",
            link: "https://test.com",
            categoria: "bolsas",
            cronograma: [{ evento: "Início", data: "2026-01-01" }]
        };
        
        writeFileSync(join(dataDir, 'test.json'), JSON.stringify(testEdital));
        
        await run(dataDir, registryFile);
        
        assert.ok(existsSync(registryFile), 'Registry file should be created');
        const registry = JSON.parse(readFileSync(registryFile, 'utf-8'));
        assert.ok(registry['test.json'], 'test.json should be in registry');
        assert.strictEqual(registry['test.json'].categoria, 'bolsas');
    });

    test('Should skip already registered editais', async () => {
        const initialRegistry = {
            'existing.json': { data_entrada: '2026-01-01T00:00:00.000Z' }
        };
        writeFileSync(registryFile, JSON.stringify(initialRegistry));
        
        // Create the file but it's already in registry
        writeFileSync(join(dataDir, 'existing.json'), JSON.stringify({ nome: "Existing" }));
        
        // Mock fetch to track calls
        let fetchCalled = false;
        global.fetch = async () => {
            fetchCalled = true;
            return { ok: true };
        };

        await run(dataDir, registryFile);
        
        assert.strictEqual(fetchCalled, false, 'Fetch should not be called for existing editals');
    });
});
