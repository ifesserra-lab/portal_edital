/**
 * Copia os JSON de data/ para public/dados/ para permitir download direto na página /dados/.
 * Deve rodar antes do build (ex.: prebuild).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const DATA_DIR = 'data';
const OUT_DIR = join('public', 'dados');

const files = existsSync(DATA_DIR)
  ? readdirSync(DATA_DIR).filter(
      (f) =>
        f.endsWith('.json') &&
        !f.includes('downloads_registry') &&
        !f.includes('backup')
    )
  : [];

if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log(`📁 Created ${OUT_DIR}`);
}

let count = 0;
for (const file of files) {
  const src = join(DATA_DIR, file);
  const dest = join(OUT_DIR, file);
  writeFileSync(dest, readFileSync(src));
  count++;
}
console.log(`📋 Copied ${count} JSON file(s) to ${OUT_DIR}`);
