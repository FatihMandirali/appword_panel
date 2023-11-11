import {WordDto, WordList} from "../../dtos/wordDto";
import axios from "axios";

export interface IWordListService{
    getWordList():Promise<WordDto[]>;
    getUnknownWordList():Promise<WordDto[]>;
    deleteUnknownWord(name:string):void;
    postUnknownWord(question:string, answer:string):Promise<string>;
}
const transform = (response:any): Promise<any> => {
    return new Promise((resolve, reject) => {
        resolve(response);
    });
};
export class WordListService implements IWordListService{

    getShuffleAnswer = (array: string[]) => {
        for (let i = array.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    getShuffleQuestion = (array: WordList[]) => {
        for (let i = array.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    getWordList = async (): Promise<WordDto[]> => {
        let wordResponseList:WordList[];
        let wordList1:WordDto[]=[];
        await axios.get<WordList[]>("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/words.json")
            .then(res=>{
                wordResponseList=Object.values(res.data);
                let answerList:string[]=[];
                wordResponseList.map(x=>{
                    answerList.push(x.answer)
                })

                wordResponseList = this.getShuffleQuestion(wordResponseList);
                wordResponseList.map(x=>{
                    let shuffle:string[] = this.getShuffleAnswer(answerList.filter(y=>y!==x.answer));
                    let answerShuffleList:string[] =  this.getShuffleAnswer([shuffle[0],shuffle[1],shuffle[2],x.answer])
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
    getUnknownWordList = async (): Promise<WordDto[]> => {
        let wordResponseList:WordList[];
        let wordList1:WordDto[]=[];
        await axios.get<WordList[]>("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/unknown.json")
            .then(res=>{
                wordResponseList=Object.values(res.data);
                let answerList:string[]=[];
                wordResponseList.map(x=>{
                    answerList.push(x.answer)
                })

                wordResponseList = this.getShuffleQuestion(wordResponseList);
                wordResponseList.map(x=>{
                    let shuffle:string[] = this.getShuffleAnswer(answerList.filter(y=>y!==x.answer));
                    let answerShuffleList:string[] =  this.getShuffleAnswer([shuffle[0],shuffle[1],shuffle[2],x.answer])
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

    postUnknownWord = async (question:string, answer:string): Promise<string> =>{
        console.log(`${question} ${answer}`);
        let unKnownWord:WordList={
            answer:answer,
            question:question
        }
        await axios.post("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/unknown.json",unKnownWord);
        console.log(unKnownWord);
        return transform("");
    }

    deleteUnknownWord= async (question: string) => {
        let wordResponseList:WordList[]=[];

        await axios.get<WordList[]>("https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/unknown.json")
            .then(async res=>{
                for(let key in res.data){
                    let word = res.data[key];
                    wordResponseList.push({
                        id:key,
                        question:word.question,
                        answer:word.answer
                    })
                }
                let deletedWord:WordList|undefined = wordResponseList.find(x=>x.question===question);
                console.log(deletedWord);
                await axios.delete(`https://engword-53111-default-rtdb.europe-west1.firebasedatabase.app/unknown/${deletedWord===undefined?0:deletedWord.id}.json`);
            });

    }
}