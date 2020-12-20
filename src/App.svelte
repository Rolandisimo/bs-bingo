<script lang="ts">
    import Word from './components/Word.svelte';
    import { words, getWordKey } from './helpers/words';
    import type { IndexProps } from './helpers/words';
    import { isBingo } from './helpers/bingo';
    import { selectedWordsStore } from './selected-words.store';

    const onWordClick = ({ currentTarget }: TypedMouseEvent<HTMLDivElement>): void => {
        const parent = currentTarget.parentElement;
        const columnId = parent.dataset.columnId;
        const wordId = currentTarget.dataset.id;
        const key = getWordKey({ columnId, wordId })

        selectedWordsStore.setWord(
            key,
            !selectedWordsStore.isWordSelected(key),
        )

        isBingo({ columnId, wordId });
    }

    function isWordSelected(options: IndexProps): boolean {
        return selectedWordsStore.isWordSelected(getWordKey(options));
    }
</script>

<div class="container" data-testid="container">
    {#each words as wordGroup, columnId}
        <div data-column-id={columnId}>
            {#each wordGroup as word, wordId}
                <Word
                    on:click={onWordClick}
                    name={word}
                    isSelected={isWordSelected({ columnId, wordId })}
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
</style>