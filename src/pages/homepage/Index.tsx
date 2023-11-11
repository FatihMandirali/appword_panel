import "./css/Index.css"
import {useEffect, useState} from "react";
import {WordListService} from "../../services/homepage/homepageService";
import {WordDto, WordList} from "../../dtos/wordDto";
function Index(){
    const [wordList,setWordList] = useState<WordDto[]>([]);
    const [unknownWordList,setUnknownWordList] = useState<WordDto[]>([]);
    const [step,setStep] = useState<number>(0);
    const [stepUnknown,setStepUnknown] = useState<number>(0);
    const repository: WordListService = new WordListService();

    useEffect(() => {

        repository.getWordList().then((response: WordDto[]) => {
            setWordList(response);
        });
        repository.getUnknownWordList().then((response: WordDto[]) => {
            setUnknownWordList(response);
        });
    }, []);

    const StepUpdate = (answer:string) => {
        let word = wordList[step];
        if(word.trueAnswer !== answer){
            alert(`Doğru Cevap : ${word.trueAnswer}`)
            repository.postUnknownWord(word.question, word.trueAnswer).then();
        }

        if(step+1>=wordList.length){
            alert("Yarışma bitti, Tekrar Başla..");
            repository.getWordList().then((response: WordDto[]) => {
                setWordList(response);
            });
            setStep(0);
            return;
        }
        setStep(step+1);
    }
    const StepUpdateUnknown = (answer:string) => {
        let word = unknownWordList[stepUnknown];
        if(word.trueAnswer !== answer){
            alert(`Doğru Cevap : ${word.trueAnswer}`)
        }

        if(stepUnknown+1>=unknownWordList.length){
            alert("Yarışma bitti, Tekrar Başla..");
            repository.getUnknownWordList().then((response: WordDto[]) => {
                setUnknownWordList(response);
            });
            setStepUnknown(0);
            return;
        }
        setStepUnknown(stepUnknown+1);
    }
    const WordQuestionSolution = () =>{
        if(wordList.length<=0){
            alert("Çözülecek Kelime Bulunamadı.");
            return;
        }
        let word = wordList[step];
        return(
            (
                <div>
                    <div className={"step"}>
                        {step+1}/{wordList.length}
                    </div>
                    <div className={"clearBoth"}></div>

                    <div className={"questionBox borderRadius"}>
                        <h1>{word.question}</h1>
                    </div>
                    <div className={"answerBox floatLeft borderRadius"}>
                        <button onClick={()=>StepUpdate(word.answer1)} className={"btn"}>{word.answer1}</button>
                    </div>
                    <div className={"answerBox floatRight borderRadius"}>
                        <button onClick={()=>StepUpdate(word.answer2)} className={"btn"}>{word.answer2}</button>
                    </div>
                    <div className={"clearBoth"}></div>
                    <br/>
                    <div className={"answerBox floatLeft borderRadius"}>
                        <button onClick={()=>StepUpdate(word.answer3)} className={"btn"}>{word.answer3}</button>
                    </div>
                    <div className={"answerBox floatRight borderRadius"}>
                        <button onClick={()=>StepUpdate(word.answer4)} className={"btn"}>{word.answer4}</button>
                    </div>
                    <div className={"clearBoth"}></div>
                    <br/>
                    <div className={"unknownWordDiv borderRadius"}>
                        <button onClick={()=>{
                            setStep(step+1)
                            repository.postUnknownWord(word.question,word.trueAnswer)
                        }} className={"btn unknownWordBtn"}>Unknown</button>
                    </div>
                </div>

            )
        );
    }

    const UnknownWordQuestionSolution = () =>{
        if(unknownWordList.length<=0){
            alert("Çözülecek Kelime Bulunamadı.");
            return;
        }
        let word = unknownWordList[stepUnknown];
        return(
            (
                <div>
                    <div className={"step"}>
                        {stepUnknown+1}/{unknownWordList.length}
                    </div>
                    <div className={"clearBoth"}></div>

                    <div className={"questionBox borderRadius"}>
                        <h1>{word.question}</h1>
                    </div>
                    <div className={"answerBox floatLeft borderRadius"}>
                        <button onClick={()=>StepUpdateUnknown(word.answer1)} className={"btn"}>{word.answer1}</button>
                    </div>
                    <div className={"answerBox floatRight borderRadius"}>
                        <button onClick={()=>StepUpdateUnknown(word.answer2)} className={"btn"}>{word.answer2}</button>
                    </div>
                    <div className={"clearBoth"}></div>
                    <br/>
                    <div className={"answerBox floatLeft borderRadius"}>
                        <button onClick={()=>StepUpdateUnknown(word.answer3)} className={"btn"}>{word.answer3}</button>
                    </div>
                    <div className={"answerBox floatRight borderRadius"}>
                        <button onClick={()=>StepUpdateUnknown(word.answer4)} className={"btn"}>{word.answer4}</button>
                    </div>
                    <div className={"clearBoth"}></div>
                    <br/>
                    <div className={"knownWordDiv borderRadius"}>
                        <button onClick={()=>repository.deleteUnknownWord(word.question)} className={"btn knownWordBtn"}>Unknown</button>
                    </div>

                </div>

            )
        );
    }

    return(
        <div className={"container"}>

            {wordList.length>0 ? WordQuestionSolution() : "Bekleniyor"}
            <br/>
            <br/>
            {unknownWordList.length>0 ? UnknownWordQuestionSolution() : "Bekleniyor"}

        </div>

    );
}

export default Index;