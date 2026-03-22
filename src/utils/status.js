export const STATUS_VALUES = [
    'aberto',
    'encerrado',
    'suspenso',
    'resultado'
];

const STATUS_ALIASES = new Map([
    ['aberto', 'aberto'],
    ['aberta', 'aberto'],
    ['abertos', 'aberto'],
    ['abertas', 'aberto'],
    ['encerrado', 'encerrado'],
    ['encerrada', 'encerrado'],
    ['fechado', 'encerrado'],
    ['fechada', 'encerrado'],
    ['suspenso', 'suspenso'],
    ['suspensa', 'suspenso'],
    ['resultado', 'resultado'],
    ['resultados', 'resultado']
]);

function normalizeText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
}

export function normalizeStatus(value) {
    if (typeof value !== 'string') {
        return 'aberto';
    }

    const normalizedValue = normalizeText(value);
    if (!normalizedValue) {
        return 'aberto';
    }

    return STATUS_ALIASES.get(normalizedValue) ?? 'aberto';
}
