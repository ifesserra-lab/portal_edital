import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = 'data';

try {
    const files = readdirSync(DATA_DIR).filter(file => file.endsWith('.json'));
    console.log(`🔍 Validating ${files.length} JSON files in ${DATA_DIR}...`);

    files.forEach(file => {
        const filePath = join(DATA_DIR, file);
        try {
            const content = readFileSync(filePath, 'utf-8');
            JSON.parse(content);
            console.log(`✅ ${file} is valid.`);
        } catch (err) {
            console.error(`❌ ${file} is invalid: ${err.message}`);
            process.exit(1);
        }
    });

    console.log('🚀 All data files are valid!');
} catch (err) {
    console.error(`❌ Error reading data directory: ${err.message}`);
    process.exit(1);
}
