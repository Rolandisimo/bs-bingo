export interface IndexProps {
    columnId: number | string;
    wordId: number | string;
}

export const words = [
    [
        'OOP',
        'Agile',
        'Best practice',
        'Clean code',
        'Refactoring',
    ],
    [
        'Scrum',
        'Hack',
        'Functional',
        'Abstract',
        'Motivated',
    ],
    [
        'Driven',
        'Patterns',
        'Algorithms',
        '80/20',
        'Outstanding',
    ],
    [
        'UML',
        'Virtual',
        'Cloud',
        'Wizard',
        'Domain',
    ],
    [
        'Bug-free',
        'Green',
        'TDD',
        'BDD',
        'Extreme',
    ],
];

export const wordsPerLine = words.length;

export function getWordKey({ columnId, wordId }: IndexProps): string {
    return `${wordId}${columnId}`;
}
