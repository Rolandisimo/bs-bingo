import { Writable, writable } from 'svelte/store';

export interface Words { [key: string]: boolean };

interface SelectedWordsStore extends Writable<Words> {
  isWordSelected: (key: string) => boolean;
  toggleWordState: (key: string) => void;
  reset: () => void;
}

function createSelectedWordsStore(): SelectedWordsStore {
  const state: Words = {};
  const store: Writable<Words> = writable(state);

  return {
    ...store,

    isWordSelected: (key: string) => {
      return state[key] ?? false;
    },

    toggleWordState: (key: string) => {
      store.update((words) => {
        words[key] = !words[key];
        return words;
      });
    },

    reset: () => store.set({}),
  }
}

export const selectedWordsStore = createSelectedWordsStore();
