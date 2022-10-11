import type { Question } from '../types'

type Props = Question & {
  setAnswer: Function
  questionIndex: number
  userAnswer?: number
  showAnswer?: boolean
  admin?: boolean
}

export default function QuestionComponent({ admin, value, width = '75%', img, showAnswer, userAnswer, possibleAnswers, questionIndex, setAnswer, correctAnswer }: Props): JSX.Element {
  
  return  <div>
    <h2 className="text-3xl text-white font-bold mb-10">{questionIndex + 1}. {value}</h2>
    {img && <div className="flex justify-center"><img style={{ width: admin ? width : '100%' }} className="bg-white" src={img} alt="Space Telescope" /></div>}
    <ul className="flex flex-wrap">
      {possibleAnswers.map((possibleAnswer, index) => {
        let color = userAnswer === index ? 'bg-yellow-500' : 'bg-amber-600'
        if (showAnswer && correctAnswer === index) {
          color = 'bg-green-600'
        }
        return <div key={possibleAnswer} className="w-1/2 flex justify-center"><button className={`my-4 ${color} font-bold rounded py-4 px-8 text-white`} onClick={() => setAnswer(index)}>{possibleAnswer}</button></div>
      })}
    </ul>
  </div>
}
