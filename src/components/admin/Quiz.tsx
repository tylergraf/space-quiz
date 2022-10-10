
import React, { useState } from 'react'
import { useSocketContext } from "service/SocketContextProvider"
import Quiz from '../Quiz'
// @ts-ignore
import useKeypress from 'react-use-keypress';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { state, nextQuestion, prevQuestion } = useSocketContext()
  const [showAnswer, setShowAnswer] = useState(false)

  useKeypress(['ArrowLeft', 'ArrowRight'], (event: React.KeyboardEvent) => {
    setShowAnswer(false)
    if (event.key === 'ArrowLeft') {
      prevQuestion();
    } else {
      nextQuestion();
    }
  });



  const answersForIndex = state.answers[state.questionIndex] || {}
  const answerCount = Object.keys(answersForIndex).length

  return <div>
    <div className="absolute top-0 right-0 bg-orange-700 text-orange-50 font-bold px-4 py-1 rounded-bl">{state?.connections} Connections</div>


    <div className="absolute top-0 left-0 bg-green-700 text-green-50 font-bold px-4 py-1 rounded-br">{answerCount}/{state.connections} Answers</div>
    {/* <h4 className="text-white">Answer Count: {answerCount}/{state.connections}</h4> */}
    <Quiz admin showAnswer={showAnswer}></Quiz>
    <div className="flex justify-between">
      <div>{state.questionIndex > 0 && <button onClick={() => { setShowAnswer(false); prevQuestion() }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Prev</button>}</div>
      <div><button onClick={() => setShowAnswer(old => !old)} className="text-white font-bold rounded bg-green-500 px-4 py-1">Show Answer</button></div>
      <div>
        {state.questionIndex < state.questions?.length - 1 && <button onClick={() => { setShowAnswer(false); nextQuestion() }} className="text-white font-bold rounded bg-green-500 px-4 py-1">Next</button>}
        {state.questionIndex === state.questions?.length - 1 && <Link to='/admin/latency' className="text-white font-bold rounded bg-green-500 px-4 py-1">Show Results</Link>}
      </div>
    </div>
  </div >
}
