import "./css/Index.css"
import {useState} from "react";
import {WordListService} from "../../services/homepage/homepageService";
import {WordList} from "../../dtos/wordList";
function Index(){
    const [wordList] = useState<WordList[]>(WordListService);
    const [step,setStep] = useState<number>(0);

    const StepUpdate = (answer:string) => {
        let trueAnswer = wordList[step].trueAnswer;
        if(trueAnswer !== answer)
            alert(`Doğru Cevap : ${trueAnswer}`)

        if(step+1>=wordList.length){
            alert("Yarışma bitti, Tekrar Başla..");
            return;
        }
        setStep(step+1);
    }
    const WordQuestionSolution = () =>{
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
            {WordQuestionSolution()}
        </div>

    );
}

export default Index;