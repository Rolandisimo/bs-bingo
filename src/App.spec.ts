import { render, fireEvent } from '@testing-library/svelte';
import App from './App.svelte';
import { selectedWordsStore } from './selected-words.store';

describe('App', () => {
    afterEach(() => {
        selectedWordsStore.reset();
    });

    test('should render', async () => {
        const results = render(App);
        const container = await results.findByTestId('container');
        expect(container).toBeTruthy();
    });

    test('should highlight when clicked', async () => {
        const results = render(App, { props: { words: [['TDD']]} });
        const word = (await results.getAllByTestId('word'))[0]

        expect(word.className.includes('selected')).toBeFalsy();

        await fireEvent.click(word);

        expect(word.className.includes('selected')).toBeTruthy();
    });

    test('should reset highlight', async () => {
        const results = render(App, { props: { words: [['TDD']]} });
        const word = (await results.getAllByTestId('word'))[0]

        await fireEvent.click(word);

        expect(word.className.includes('selected')).toBeTruthy();

        const resetButton = await results.getByTestId('resetButton');

        await fireEvent.click(resetButton);

        expect(word.className.includes('selected')).toBeFalsy();
    });
});
