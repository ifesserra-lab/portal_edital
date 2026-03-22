export const CATEGORY_VALUES = [
    'pesquisa',
    'extensão',
    'inovação',
    'bolsa',
    'outros',
    'chamadas',
    'divulgação de conhecimento',
    'arranjo administrativo'
];

const CATEGORY_ALIASES = new Map([
    ['pesquisa', 'pesquisa'],
    ['extensao', 'extensão'],
    ['extensão', 'extensão'],
    ['inovacao', 'inovação'],
    ['inovação', 'inovação'],
    ['bolsa', 'bolsa'],
    ['bolsas', 'bolsa'],
    ['outro', 'outros'],
    ['outros', 'outros'],
    ['chamada', 'chamadas'],
    ['chamadas', 'chamadas'],
    ['divulgacao de conhecimento', 'divulgação de conhecimento'],
    ['divulgação de conhecimento', 'divulgação de conhecimento'],
    ['arranjo administrativo', 'arranjo administrativo']
]);

function normalizeText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
}

export function normalizeCategory(value) {
    if (typeof value !== 'string') {
        return 'outros';
    }

    const normalizedValue = normalizeText(value);
    if (!normalizedValue) {
        return 'outros';
    }

    if (CATEGORY_ALIASES.has(normalizedValue)) {
        return CATEGORY_ALIASES.get(normalizedValue);
    }

    const parts = normalizedValue
        .split(/[\/,;|]+/)
        .map((part) => part.trim())
        .filter(Boolean);

    for (const part of parts) {
        if (CATEGORY_ALIASES.has(part)) {
            return CATEGORY_ALIASES.get(part);
        }
    }

    for (const [alias, category] of CATEGORY_ALIASES.entries()) {
        if (normalizedValue.includes(alias)) {
            return category;
        }
    }

    return 'outros';
}
