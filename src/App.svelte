<script lang="ts">
    export let words: string[][] = [];

    import Word from './components/Word.svelte';
    import { getWordKey } from './helpers/words';
    import type { IndexProps } from './helpers/words';
    import { isBingo } from './helpers/bingo';
    import { selectedWordsStore } from './selected-words.store';

    const onWordClick = ({ currentTarget }: TypedMouseEvent<HTMLDivElement>): void => {
        const columnId = currentTarget.parentElement.dataset.columnId;
        const wordId = currentTarget.dataset.id;
        const key = getWordKey({ columnId, wordId })

        selectedWordsStore.toggleWordState(key);

        isBingo({ columnId, wordId });
    }

    const isWordSelected = (options: IndexProps): boolean => {
        return selectedWordsStore.isWordSelected(getWordKey(options));
    }
</script>

<button
    data-testid="resetButton"
    class="resetButton"
    on:click={selectedWordsStore.reset}
>
    Reset
</button>

<div class="container" data-testid="container">
    {#each words as wordGroup, columnId}
        <div data-column-id={columnId}>
            {#each wordGroup as word, wordId}
                <Word
                    on:click={onWordClick}
                    name={word}
                    isSelected={$selectedWordsStore && isWordSelected({ columnId, wordId })}
                    wordId={wordId}
                />
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        display: flex;
        max-width: 100%;
        margin: 0 auto;
        user-select: none;
        font-size: 2.4vw;

        @media(min-width: 1080px) {
            font-size: 1.8em;
        }
    }

    .resetButton {
        position: fixed;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        padding: .5em 1em;
        font-size: 2em;
    }
</style>
