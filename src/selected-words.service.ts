export interface Words { [key: string]: boolean };

export class SelectedWordsService {
  private static instance: SelectedWordsService | undefined;
  public static words: Words = {};
  private constructor() {}

  static getInstance(): SelectedWordsService {
    if (!SelectedWordsService.instance) {
      SelectedWordsService.instance = new SelectedWordsService();
    }

    return SelectedWordsService.instance;
  }

  getWord(key: string): boolean {
    return SelectedWordsService.words[key];
  }

  setWord(key: string, state: boolean): void {
    SelectedWordsService.words[key] = state;
  }

  getWords(): Words {
    return SelectedWordsService.words;
  }
}
