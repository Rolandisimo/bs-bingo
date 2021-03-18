<script lang="ts">
    export let words: string[][] = [];

    import { Link, Router, Route } from 'svelte-navigator';
    import About from './routes/About.svelte';
    import Home from './routes/Home.svelte';
    import { selectedWordsStore } from './selected-words.store';
</script>

<Router>
    <div class="buttonContainer">
        <Link to="/bs-bingo/">
            <button
                data-testid="resetButton"
                class="resetButton"
            >
                Home
            </button>
        </Link>

        <Link to="/bs-bingo/about">
            <button
                data-testid="resetButton"
                class="resetButton"
            >
                About
            </button>
        </Link>
    </div>

    <div class="buttonContainer">
        <button
            data-testid="resetButton"
            class="resetButton"
            on:click={selectedWordsStore.reset}
        >
            Reset
        </button>
    </div>

    <Route path="/bs-bingo/about" component={About} />
    <Route path="/bs-bingo/">
        <Home words={words} />
    </Route>
</Router>

<style lang="scss">
    :global(body) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .buttonContainer {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .resetButton {
        background-color: hsl(0, 0, 100%);
        padding: .5em 1em;
        font-size: 2em;
        cursor: pointer;

        &:hover {
            background-color: hsl(0, 0, 90%);
        }
    }
</style>
