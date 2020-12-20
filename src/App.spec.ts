import { render, fireEvent } from '@testing-library/svelte';
import App from './App.svelte';

describe('App', () => {
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
});
