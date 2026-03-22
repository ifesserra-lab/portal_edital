import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeStatus } from '../../src/utils/status.js';

describe('status normalization', () => {
    test('falls back to aberto when status is blank', () => {
        assert.equal(normalizeStatus(''), 'aberto');
    });

    test('normalizes aliases to supported values', () => {
        assert.equal(normalizeStatus('abertas'), 'aberto');
        assert.equal(normalizeStatus('fechado'), 'encerrado');
    });
});
