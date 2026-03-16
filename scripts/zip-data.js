/**
 * Gera public/dados-editais.zip com todos os JSON da pasta data/.
 * Roda no build para disponibilizar download único na página /dados/.
 */
import { createWriteStream, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const DATA_DIR = join(root, 'data');
const OUT_FILE = join(root, 'public', 'dados-editais.zip');

const files = existsSync(DATA_DIR)
  ? readdirSync(DATA_DIR).filter(
      (f) =>
        f.endsWith('.json') &&
        !f.includes('downloads_registry') &&
        !f.includes('backup')
    )
  : [];

const outDir = dirname(OUT_FILE);
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const output = createWriteStream(OUT_FILE);
const archive = archiver('zip', { zlib: { level: 9 } });

await new Promise((resolve, reject) => {
  output.on('close', () => {
    console.log(`📦 dados-editais.zip: ${archive.pointer()} bytes (${files.length} arquivos)`);
    resolve();
  });
  archive.on('error', reject);
  output.on('error', reject);
  archive.pipe(output);
  for (const file of files) {
    archive.file(join(DATA_DIR, file), { name: file });
  }
  archive.finalize();
});
