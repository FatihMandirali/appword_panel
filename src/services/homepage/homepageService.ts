import {WordList} from "../../dtos/wordList";

export interface IWordListService{
    getWordList():Promise<WordList[]>;
}
const transform = (response:WordList[]): Promise<WordList[]> => {
    return new Promise((resolve, reject) => {
        resolve(response);
    });
};
export class WordListService implements IWordListService{
    getWordList = (): Promise<WordList[]> => {
        let wordList:WordList[] = [{
            question :"q1",
            answer1:"a1",
            answer2:"a2",
            answer3:"a3",
            answer4:"a4",
            trueAnswer:"a1"
        }];

        wordList.push({
            question :"q2",
            answer1:"a1",
            answer2:"a2",
            answer3:"a3",
            answer4:"a4",
            trueAnswer:"a2"
        });

        wordList.push({
            question :"q3",
            answer1:"a1",
            answer2:"a2",
            answer3:"a3",
            answer4:"a4",
            trueAnswer:"a3"
        });

        wordList.push({
            question :"q4",
            answer1:"a1",
            answer2:"a2",
            answer3:"a3",
            answer4:"a4",
            trueAnswer:"a4"
        });
        return transform(wordList);
    }
}