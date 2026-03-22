import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { ensureCategory, getSiteCategories } from '../src/utils/category.js';

const DEFAULT_DATA_DIR = 'data';

export function run(dataDir = DEFAULT_DATA_DIR) {
    const files = existsSync(dataDir)
        ? readdirSync(dataDir).filter((file) => file.endsWith('.json'))
        : [];

    let createdCount = 0;

    for (const file of files) {
        const filePath = join(dataDir, file);
        const content = JSON.parse(readFileSync(filePath, 'utf-8'));
        const beforeCount = getSiteCategories().length;
        ensureCategory(content.categoria, { createIfMissing: true });
        const afterCount = getSiteCategories().length;

        if (afterCount > beforeCount) {
            createdCount += afterCount - beforeCount;
        }
    }

    console.log(`🗂️ Categories synchronized (${getSiteCategories().length} categorias, ${createdCount} novas).`);
}

const isMain = process.argv[1]?.endsWith('sync-categories.js');
if (isMain) {
    run();
}
