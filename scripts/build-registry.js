/**
 * Builds registry/downloads_registry.json from all JSON files in data/.
 * Does not require Telegram credentials. Use this to (re)create the registry locally.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const DEFAULT_DATA_DIR = 'data';
const DEFAULT_REGISTRY_FILE = join('registry', 'downloads_registry.json');
const TOPICS_REGISTRY = join('registry', 'topics_registry.json');

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

export function run(dataDir = DEFAULT_DATA_DIR, registryFile = DEFAULT_REGISTRY_FILE) {
    const registry = getRegistry(registryFile);
    const files = existsSync(dataDir)
        ? readdirSync(dataDir).filter(
              (file) =>
                  file.endsWith('.json') &&
                  !file.includes('downloads_registry') &&
                  !file.includes('backup')
          )
        : [];

    const now = new Date().toISOString();
    let updated = false;

    for (const file of files) {
        const filePath = join(dataDir, file);
        try {
            const content = JSON.parse(readFileSync(filePath, 'utf-8'));
            const category = content.categoria || 'N/A';
            const cronograma = content.cronograma || [];

            if (!registry[file]) {
                registry[file] = {
                    data_entrada: now,
                    categoria: category,
                    cronograma: cronograma,
                    notificacoes_enviadas: []
                };
                console.log(`📋 Registered: ${file}`);
                updated = true;
            } else {
                // Keep existing data_entrada and notificacoes_enviadas, update categoria/cronograma
                registry[file].categoria = category;
                registry[file].cronograma = cronograma;
            }
        } catch (err) {
            console.error(`❌ Error processing ${file}: ${err.message}`);
        }
    }

    const registryDir = dirname(registryFile);
    if (!existsSync(registryDir)) {
        mkdirSync(registryDir, { recursive: true });
    }
    writeFileSync(registryFile, JSON.stringify(registry, null, 4));
    console.log(`💾 Wrote ${registryFile} (${Object.keys(registry).length} entries).`);

    if (!existsSync(TOPICS_REGISTRY)) {
        writeFileSync(TOPICS_REGISTRY, JSON.stringify({}, null, 4));
        console.log(`💾 Created empty ${TOPICS_REGISTRY}.`);
    }
}

const isMain = process.argv[1]?.endsWith('build-registry.js');
if (isMain) {
    run();
}
