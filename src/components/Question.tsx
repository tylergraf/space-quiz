import type { Question } from '../types'
import HeaderBlock from './HeaderBlock'

type Props = Question & {
  onAnswer: Function
}

export default function QuestionComponent({ value, possibleAnswers, onAnswer }: Props) {
  return <div>
    <HeaderBlock heading={value} size="md"></HeaderBlock>
    {possibleAnswers.map((possibleAnswer, index) => {
      return <button key={possibleAnswer} onClick={()=>onAnswer(index)} className="my-4 mr-8 bg-orange-600 font-bold rounded py-4 px-8 text-white">{possibleAnswer}</button>
    })}
  </div>
}












































// import HeaderBlock from "./HeaderBlock"
// import type {Question} from '../types'

// type Props = Question & {
//   onAnswer: Function
// }

// export default function QuestionComponent({ value, possibleAnswers, onAnswer}:Props) {
//   return <div>
//     <HeaderBlock heading={value}></HeaderBlock>
// 
//     {possibleAnswers.map((possibleAnswer, index)=>{
//       return <button key={possibleAnswer} onClick={()=>onAnswer(index)} className="my-4 mr-8 bg-orange-600 font-bold rounded py-4 px-8 text-white">{possibleAnswer}</button>
//     })}
//   </div>
// }
