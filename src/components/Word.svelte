<script lang="ts">
    export let name: string;
    export let wordId: number;
    export let isSelected: boolean;
</script>

<div
    class="word"
    data-testid="word"
    class:selected={isSelected}
    on:click
    data-id={wordId}
>
    {name}
</div>

<style lang="scss">
    $selectedColor: rgb(196, 241, 230);
    $hoverColor: darken($color: #fff, $amount: 5);
    $mainLight: rgba(128, 128, 128, .28);

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

        @media (max-width: 728px) {
            padding: 3em 1em;
        }
    }
</style>
