import React, { useState } from 'react'
import { useSocketContext } from "service/SocketContextProvider"
import Quiz from './Quiz'
import Results from './Results'
import Error from './Error'
import Cookies from 'js-cookie'
// @ts-ignore
import useKeypress from 'react-use-keypress';

export default function Admin() {
  const { state, nextQuestion, prevQuestion } = useSocketContext()
  const admin = Cookies.get('admin')
  const [showAnswer, setShowAnswer] = useState(false)
  const [showResults, setShowResults] = useState(false)


  
    useKeypress(['ArrowLeft', 'ArrowRight'], (event:React.KeyboardEvent) => {
      setShowAnswer(false)
      if (event.key === 'ArrowLeft') {
        prevQuestion();
      } else {
        nextQuestion();
      }
    });
    
  if (admin !== 'admin') return <div>
    <Error>Uhh...what are you doing here?</Error>
  </div>

  const answersForIndex = state.answers[state.questionIndex] || {}
  const answerCount = Object.keys(answersForIndex).length

  return <div>
    <div className="absolute top-0 right-0 bg-orange-700 text-orange-50 font-bold px-4 py-1 rounded-bl">{state?.connections} Connections</div>

    {!showResults ? <>
      <div className="absolute top-0 left-0 bg-green-700 text-green-50 font-bold px-4 py-1 rounded-br">{answerCount}/{state.connections} Answers</div>
      {/* <h4 className="text-white">Answer Count: {answerCount}/{state.connections}</h4> */}
      <Quiz admin showAnswer={showAnswer}></Quiz>
      <div className="flex justify-between">
        <div>{state.questionIndex > 0 && <button onClick={() => { setShowAnswer(false); prevQuestion() }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Prev</button>}</div>
        <div><button onClick={() => setShowAnswer(old=>!old)} className="text-white font-bold rounded bg-green-500 px-4 py-1">Show Answer</button></div>
        <div>
          {state.questionIndex < state.questions?.length - 1 && <button onClick={() => { setShowAnswer(false); nextQuestion() }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Next</button>}
          {state.questionIndex === state.questions?.length - 1 && <button onClick={() => { setShowResults(true) }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Show Results</button>}
        </div>
      </div>
    </> : (
      <>

      <Results></Results>
      <div className="flex justify-between">
      <button onClick={() => { setShowResults(false) }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Back</button>
      </div>
      </>
    )}
  </div>
}
