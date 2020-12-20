import { SelectedWordsService } from '../selected-words.service';
import { launchConfetti } from './confetti';
import { getWordKey, IndexProps, wordsPerLine } from './words';

const selectedWordsService = SelectedWordsService.getInstance();

export function isBingo({ columnId, wordId }: IndexProps): boolean {
    function isFilledVertically(): boolean {
        let isFilled = true;

        for (let i = 0; i < wordsPerLine; i++) {
            const key = getWordKey({
                columnId,
                wordId: i,
            });
            isFilled = selectedWordsService.getWord(key);

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
            isFilled = selectedWordsService.getWord(key);
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

            isFilled = selectedWordsService.getWord(key);
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

            isFilled = selectedWordsService.getWord(key);
            if (!isFilled) {
                break;
            }
        }

        return wordIsOnTheLine && isFilled;
    }

    const bingo = isFilledHorizontally()
        || isFilledVertically()
        || isFilledRTLDiagonally()
        || isFilledLTRDiagonally();

    if (bingo) {
        launchConfetti();
    }

    return bingo;
}
