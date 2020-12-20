import { render } from '@testing-library/svelte';
import Word from './Word.svelte';

describe('Word', () => {
    test('should not be selected', async () => {
        const results = render(Word, {
            props: {
                name: 'TDD',
                wordId: 1,
                isSelected: false,
            }
        });
        const word = await results.getByTestId('word')
        expect(word.className.includes('selected')).toBeFalsy();
    });

    test('should be selected', async () => {
        const results = render(Word, {
            props: {
                name: 'TDD',
                wordId: 1,
                isSelected: true,
            }
        });
        const word = await results.getByTestId('word')
        expect(word.className.includes('selected')).toBeTruthy();
    });

    test('should have the passed name', async () => {
        const results = render(Word, {
            props: {
                name: 'TDD',
                wordId: 1,
                isSelected: true,
            }
        });
        const word = await results.getByText('TDD')
        expect(word).toBeTruthy();
    });
});
