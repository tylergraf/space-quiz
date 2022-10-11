export default function Quiz(){
  return <div>
    <h1 className="text-white font-bold text-3xl">Quiz</h1>
  </div>
}













































// import { useSocketContext } from "service/SocketContextProvider"
// import HeaderBlock from "./HeaderBlock"
// import Question from './Question'

// export default function Quiz(){
  
//   const {state} = useSocketContext()

//   const handleAnswer = console.log

//   return <div className="pt-10">
//     <HeaderBlock heading="Quiz" size="xl"></HeaderBlock>
    
//     {state.questions && <Question {...state.questions[state.questionIndex]} onAnswer={handleAnswer}></Question>}

//     </div>
// }
