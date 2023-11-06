import {WordDto, WordList} from "../../dtos/wordDto";
import axios from "axios";

export interface IWordListService{
    getWordList():Promise<WordDto[]>;
}
const transform = (response:WordDto[]): Promise<WordDto[]> => {
    return new Promise((resolve, reject) => {
        resolve(response);
    });
};
export class WordListService implements IWordListService{

    getShuffle = (array: string[]) => {
        for (let i = array.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    getWordList = async (): Promise<WordDto[]> => {
        //let word:WordList = {question:"blue",answer:"mavi"}
        let wordResponseList:WordList[];
        let wordList1:WordDto[]=[];

        //let res = axios.post("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/words.json",word);
        await axios.get<WordList[]>("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/words.json")
            .then(res=>{
                wordResponseList=Object.values(res.data);
                let answerList:string[]=[];
                wordResponseList.map(x=>{
                    answerList.push(x.answer)
                })
                wordResponseList.map(x=>{
                    let shuffle:string[] = this.getShuffle(answerList.filter(y=>y!==x.answer));
                    let answerShuffleList:string[] =  this.getShuffle([shuffle[0],shuffle[1],shuffle[2],x.answer])
                    wordList1.push({
                        question:x.question,
                        trueAnswer:x.answer,
                        answer1:answerShuffleList[0],
                        answer2:answerShuffleList[1],
                        answer3:answerShuffleList[2],
                        answer4:answerShuffleList[3]
                    })
                })
            });
        return transform(wordList1);
    }
}