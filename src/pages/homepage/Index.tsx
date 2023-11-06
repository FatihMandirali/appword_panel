import "./css/Index.css"
import {useEffect, useState} from "react";
import {WordListService} from "../../services/homepage/homepageService";
import {WordDto} from "../../dtos/wordDto";
function Index(){
    const [wordList,setWordList] = useState<WordDto[]>([]);
    const [step,setStep] = useState<number>(0);

    useEffect(() => {
        const repository: WordListService = new WordListService();

        repository.getWordList().then((response: WordDto[]) => {
            setWordList(response);
        });
    }, []);

    const StepUpdate = (answer:string) => {
        let trueAnswer = wordList[step].trueAnswer;
        if(trueAnswer !== answer)
            alert(`Doğru Cevap : ${trueAnswer}`)

        if(step+1>=wordList.length){
            alert("Yarışma bitti, Tekrar Başla..");
            window.location.reload();
            return;
        }
        setStep(step+1);
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
                    <div className={"clearBoth"}></div></div>
            )
        );
    }

    return(
        <div className={"container"}>
            <div className={"step"}>
                {step+1}/{wordList.length}
            </div>
            {wordList.length>0 ? WordQuestionSolution() : "Bekleniyor"}
        </div>

    );
}

export default Index;