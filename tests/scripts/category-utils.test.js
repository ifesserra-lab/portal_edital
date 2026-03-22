import { afterEach, beforeEach, describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import {
    ensureCategory,
    getCategoryLabel,
    getSiteCategories,
    normalizeCategory
} from '../../src/utils/category.js';

describe('category normalization', () => {
    let registryDir;
    let registryFile;

    beforeEach(() => {
        registryDir = mkdtempSync(join(tmpdir(), 'category-registry-'));
        registryFile = pathToFileURL(join(registryDir, 'categories.json'));
    });

    afterEach(() => {
        rmSync(registryDir, { recursive: true, force: true });
    });

    test('keeps known categories configured in the registry', () => {
        assert.equal(
            normalizeCategory('extensao', { registryFile }),
            'extensão'
        );
    });

    test('creates a category entry when a new category appears', () => {
        const categoryId = normalizeCategory('pesquisa, extensão', {
            registryFile,
            createIfMissing: true
        });

        assert.equal(categoryId, 'pesquisa, extensão');
        assert.equal(getCategoryLabel(categoryId, registryFile), 'Pesquisa, Extensão');

        const categories = getSiteCategories(registryFile);
        assert.ok(categories.some((category) => category.id === 'pesquisa, extensão'));
    });

    test('reuses aliases already recorded in the category file', () => {
        ensureCategory('categoria experimental', {
            registryFile,
            createIfMissing: true
        });

        assert.equal(
            normalizeCategory('Categoria Experimental', { registryFile }),
            'categoria experimental'
        );
    });
});
