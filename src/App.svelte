<script lang="ts">
    import { launchConfetti } from './confetti';
    import { words, wordsPerLine } from './words';

    interface IndexProps {
        columnId: number | string;
        wordId: number | string;
    }

    const selectedWords: { [key: string]: boolean } = {};

    function getWordKey({ columnId, wordId }: IndexProps) {
        return `${wordId}${columnId}`;
    }

    function onWordClick({ currentTarget }: TypedMouseEvent<HTMLDivElement>): void {
        const parent = currentTarget.parentElement;
        const columnId = parent.dataset.columnId;
        const wordId = currentTarget.dataset.id;
        const key = getWordKey({ columnId, wordId })
        selectedWords[key] = !selectedWords[key];

        isBingo({ columnId, wordId });
    }

    function isBingo({ columnId, wordId }: IndexProps) {
        function isFilledVertically(): boolean {
            let isFilled = true;

            for (let i = 0; i < wordsPerLine; i++) {
                const key = getWordKey({
                    columnId,
                    wordId: i,
                });
                isFilled = !!selectedWords[key];

                if (!isFilled) {
                    break;
                }
            }

            return isFilled;
        }

        function isFilledHorizontally(): boolean {
            let isFilled = true;

            for (let i = 0; i < wordsPerLine; i++) {
                const key = getWordKey({
                    columnId: i,
                    wordId,
                });
                isFilled = !!selectedWords[key];
                if (!isFilled) {
                    break;
                }
            }

            return isFilled;
        }

        function isFilledLTRDiagonally(): boolean {
            let wordIsOnTheLine = false;
            let isFilled = true;

            for (let i = 0; i < wordsPerLine; i++) {
                const key = getWordKey({
                    columnId: i,
                    wordId: i,
                });

                if (!wordIsOnTheLine) {
                    wordIsOnTheLine = +wordId === i && +columnId === i; 
                }

                isFilled = !!selectedWords[key];
                if (!isFilled) {
                    break;
                }
            }

            return wordIsOnTheLine && isFilled;
        }
        
        function isFilledRTLDiagonally(): boolean {
            let wordIsOnTheLine = false;
            let isFilled = true;

            for (let i = 0; i < wordsPerLine; i++) {
                const key = getWordKey({
                    columnId: wordsPerLine - 1 - i,
                    wordId: i,
                });

                if (!wordIsOnTheLine) {
                    wordIsOnTheLine = +wordId === i && +columnId === wordsPerLine - 1 - i; 
                }

                isFilled = !!selectedWords[key];
                if (!isFilled) {
                    break;
                }
            }

            return wordIsOnTheLine && isFilled;
        }

        if (
            isFilledHorizontally()
            || isFilledVertically()
            || isFilledRTLDiagonally()
            || isFilledLTRDiagonally()
        ) {
            launchConfetti();
        }
    }
</script>

<div class="container">
    {#each words as wordGroup, columnId}
        <div data-column-id={columnId}>
            {#each wordGroup as word, wordId}
                <div
                    class="word"
                    class:selected={selectedWords[getWordKey({ columnId, wordId })]}
                    on:click="{onWordClick}"
                    data-id={wordId}
                >
                    {word}
                </div>
            {/each}
        </div>
    {/each}
</div>


<style lang="scss">
    $selectedColor: rgb(196, 241, 230);
    $hoverColor: darken($color: #fff, $amount: 5);
    $mainLight: rgba(128, 128, 128, .28);

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

    .word {
        border: 0.1em solid $mainLight;
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-align: center;
        transition: background-color .1s, transform .1s;

        &:hover {
            background-color: $hoverColor;
        }

        &:active {
            transform: scale(.9);
        }

        &.selected {
            background-color: $selectedColor;
        }
    }
</style>