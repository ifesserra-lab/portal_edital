import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const DEFAULT_CATEGORIES = [
    { id: 'pesquisa', label: 'Pesquisa', order: 10, aliases: ['pesquisa'] },
    { id: 'extensão', label: 'Extensão', order: 20, aliases: ['extensão', 'extensao'] },
    { id: 'inovação', label: 'Inovação', order: 30, aliases: ['inovação', 'inovacao'] },
    { id: 'bolsa', label: 'Bolsas', order: 40, aliases: ['bolsa', 'bolsas'] },
    { id: 'outros', label: 'Outros', order: 90, aliases: ['outro', 'outros'] },
    { id: 'chamadas', label: 'Chamadas', order: 50, aliases: ['chamada', 'chamadas'] },
    {
        id: 'divulgação de conhecimento',
        label: 'Divulgação de Conhecimento',
        order: 60,
        aliases: ['divulgação de conhecimento', 'divulgacao de conhecimento']
    },
    {
        id: 'arranjo administrativo',
        label: 'Arranjo Administrativo',
        order: 70,
        aliases: ['arranjo administrativo']
    }
];

const CATEGORY_REGISTRY_FILE = new URL('../../registry/categories.json', import.meta.url);

function normalizeText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function toTitleCase(value) {
    return value
        .split(/(\s+|,\s*)/)
        .map((part) => {
            if (!part.trim()) return part;
            return part.charAt(0).toUpperCase() + part.slice(1);
        })
        .join('');
}

function sanitizeCategoryId(value) {
    if (typeof value !== 'string') {
        return 'outros';
    }

    const normalized = value
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    if (!normalized) {
        return 'outros';
    }

    return normalized.replace(/\s*([,/;|])\s*/g, '$1 ');
}

function getDefaultCategoryMap() {
    return new Map(DEFAULT_CATEGORIES.map((category) => [category.id, category]));
}

function sortCategories(categories) {
    return [...categories].sort((left, right) => {
        const leftOrder = left.order ?? 999;
        const rightOrder = right.order ?? 999;

        if (leftOrder !== rightOrder) {
            return leftOrder - rightOrder;
        }

        return left.label.localeCompare(right.label, 'pt-BR');
    });
}

function mergeCategory(category, existingCategory) {
    const aliases = new Set([
        ...(existingCategory?.aliases ?? []),
        ...(category.aliases ?? []),
        category.id,
        category.label
    ].map((alias) => normalizeText(alias)).filter(Boolean));

    return {
        id: category.id,
        label: category.label,
        order: category.order ?? existingCategory?.order ?? 999,
        aliases: [...aliases]
    };
}

export function loadCategoryRegistry(registryFile = CATEGORY_REGISTRY_FILE) {
    const defaults = getDefaultCategoryMap();

    if (!existsSync(registryFile)) {
        return sortCategories(DEFAULT_CATEGORIES);
    }

    try {
        const content = JSON.parse(readFileSync(registryFile, 'utf-8'));
        const categories = Array.isArray(content) ? content : [];
        const merged = new Map(defaults);

        for (const category of categories) {
            if (!category?.id || !category?.label) continue;
            merged.set(
                category.id,
                mergeCategory(category, merged.get(category.id))
            );
        }

        return sortCategories([...merged.values()]);
    } catch {
        return sortCategories(DEFAULT_CATEGORIES);
    }
}

export function saveCategoryRegistry(categories, registryFile = CATEGORY_REGISTRY_FILE) {
    const targetDir = dirname(fileURLToPath(registryFile));
    if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
    }

    writeFileSync(registryFile, `${JSON.stringify(sortCategories(categories), null, 4)}\n`);
}

export function getSiteCategories(registryFile = CATEGORY_REGISTRY_FILE) {
    return loadCategoryRegistry(registryFile);
}

export function getCategoryValues(registryFile = CATEGORY_REGISTRY_FILE) {
    return getSiteCategories(registryFile).map((category) => category.id);
}

export function getCategoryById(categoryId, registryFile = CATEGORY_REGISTRY_FILE) {
    return getSiteCategories(registryFile).find((category) => category.id === categoryId) ?? null;
}

export function getCategoryLabel(categoryId, registryFile = CATEGORY_REGISTRY_FILE) {
    const category = getCategoryById(categoryId, registryFile);
    return category?.label ?? toTitleCase(categoryId);
}

export function ensureCategory(value, options = {}) {
    const { createIfMissing = false, registryFile = CATEGORY_REGISTRY_FILE } = options;
    const rawValue = typeof value === 'string' ? value : '';
    const sanitizedId = sanitizeCategoryId(rawValue);
    const categories = loadCategoryRegistry(registryFile);
    const normalizedInput = normalizeText(rawValue);

    const existingCategory = categories.find((category) => {
        if (category.id === sanitizedId) {
            return true;
        }

        return (category.aliases ?? []).some((alias) => normalizeText(alias) === normalizedInput);
    });

    if (existingCategory) {
        return existingCategory;
    }

    if (!createIfMissing) {
        return {
            id: sanitizedId,
            label: toTitleCase(sanitizedId),
            order: 999,
            aliases: [normalizedInput].filter(Boolean)
        };
    }

    const newCategory = {
        id: sanitizedId,
        label: toTitleCase(sanitizedId),
        order: 999,
        aliases: [normalizedInput, sanitizedId].filter(Boolean)
    };

    saveCategoryRegistry([...categories, newCategory], registryFile);
    return newCategory;
}

export function normalizeCategory(value, options = {}) {
    return ensureCategory(value, options).id;
}
