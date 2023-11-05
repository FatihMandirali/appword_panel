import {WordList} from "../../dtos/wordList";

export function WordListService(){
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
    return wordList;
}