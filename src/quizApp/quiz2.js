import { useState } from 'react'
import {quiz} from './quiz';
import './quiz.css';

export default function Quiz () {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  
  //* getting the quiz object(the exported/imported)
  const { questions } = quiz;

  //* destructing
  const { question, choices, correctAnswer } = questions[activeQuestion];

  //* when the button Next is clicked
  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      //* again reset the selectedAnwerIndex, so it won't effect next question
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  }
  const addQuesCounter = (count) => (count > 9 ? count : `0${count}`);

  //* matching if the selected answer matches the correct answer in quiz
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  }

const again = () => {
          setActiveQuestion(0);
          setSelectedAnswer('');
          setShowResult(false);
          setSelectedAnswerIndex(null);
          setResult({
                      score: 0,
                      correctAnswers: 0,
                      wrongAnswers: 0,
                  });
                    }

  return (
    <div className="quiz-container">
      {result.score >= 100
                      ? (<><h3 id="h3">We have a WINNER!</h3>
                      <div 
                          style={{fontSeize: '20px'}} 
                          className="alert alert-success text-center" 
                          role="alert">Congratulations! You got all the answers correct! Such a Genuis!</div></>) : ''}
       {!showResult ? (
        <div>
          <div id='wrapper'>
            <span className="active-question-no">{addQuesCounter(activeQuestion + 1)}</span>
            <span className="total-question">/{addQuesCounter(questions.length)}</span>
          </div>
          <h4>{question}</h4>
          <ul>
            {choices.map((answer, index) => (
             <li
                 onClick={() => onAnswerSelected(answer, index)}
                 key={answer}
                 className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                 {answer}
            </li>
              ))}
            </ul>
          <div className="flex-right">
            <button id="btn" onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>

        </div>
      ) : (
      <div className="result">
        {result.score < 100? (
          <div className='alert alert-primary' role='alert'>Reminder : you can always be a winner, try again !</div>
         ): ''}
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
          {result.score < 100? (
          <div className='flex-right'>
          <button onClick={again} id="btn2">Try Again</button>
          </div>) : ''}
        </div> 
      )}
    </div>
  )
}
