import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCategory } from '../../src/utils/category.js';

describe('category normalization', () => {
    test('normalizes composite categories to the first supported category', () => {
        assert.equal(
            normalizeCategory('pesquisa, extensão'),
            'pesquisa'
        );
    });

    test('normalizes known aliases and plurals', () => {
        assert.equal(normalizeCategory('bolsas'), 'bolsa');
        assert.equal(normalizeCategory('outro'), 'outros');
    });

    test('falls back to outros when the category is unknown', () => {
        assert.equal(normalizeCategory('categoria experimental'), 'outros');
    });
});
