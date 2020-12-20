import { Writable, writable } from 'svelte/store';

export interface Words { [key: string]: boolean };

interface SelectedWordsStore extends Writable<Words> {
  setWord: (key: string, state: boolean) => void;
  isWordSelected: (key: string) => boolean;
  reset: () => void;
}

function createSelectedWordsStore(): SelectedWordsStore {
  const state: Words = {};
  const store: Writable<Words> = writable(state);

  return {
    ...store,
		setWord: (key: string, isSelected: boolean) => store.update((words) => {
      words[key] = isSelected;
      return words;
    }),

    isWordSelected: (key: string) => {
      return state[key] ?? false;
    },

    reset: () => store.set({}),
  }
}

export const selectedWordsStore = createSelectedWordsStore();
