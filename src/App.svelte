<script lang="ts">
    import confetti from 'canvas-confetti';

    const buzzWords = [
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

    const wordsPerLine = buzzWords.length;

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

            for (let i = wordsPerLine - 1; i >= 0; i--) {
                const key = getWordKey({
                    columnId: i,
                    wordId: i,
                });
                // console.log({
                //     key,
                //     i,
                //     wordId,
                //     columnId,
                // })
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
        

        if (
            isFilledHorizontally()
            || isFilledVertically()
            || isFilledRTLDiagonally()
            || isFilledLTRDiagonally()
        ) {
            launchConfetti();
        }
    }

    function launchConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
}


</script>

<div class="container">
    {#each buzzWords as wordGroup, columnId}
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
    }

    .word {
        border: 0.1em solid rgba(128, 128, 128, .28);
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-align: center;

        &:hover {
            background-color: darken($color: #fff, $amount: 5);
        }

        &.selected {
            background-color: rgb(196, 241, 230);
        }
    }
</style>