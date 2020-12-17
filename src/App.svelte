<script lang="ts">
    const buzzWords = [
        'OOP',
        'Agile',
        'Best practice',
        'Clean code',
        'Refactoring',
        'Scrum',
        'Hack',
        'Functional',
        'Abstract',
        'Motivated',
        'Driven',
        'Patterns',
        'Algorithms',
        '80/20',
        'Outstanding',
        'UML',
        'Virtual',
        'Cloud',
        'Wizard',
        'Domain',
        'Bug-free',
        'Green',
        'TDD',
        'BDD',
        'Extreme',
    ];

    const selectedWords: { [key: string]: boolean } = {};

    function onWordClick(e: TypedMouseEvent<HTMLDivElement>): void {
        const id = e.currentTarget.dataset.id;
        selectedWords[id] = !selectedWords[id];
    }
</script>

<div class="container">
    {#each buzzWords as word, i}
        <div
            class="word"
            class:selected={selectedWords[i]}
            on:click="{onWordClick}"
            data-id={i}
        >
            {word}
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
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        max-width: 600px;
        margin: 0 auto;
        user-select: none;
    }

    .word {
        border: 1px solid;
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