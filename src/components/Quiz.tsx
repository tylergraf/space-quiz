import { useSocketContext } from "service/SocketContextProvider"
import Question from './Question'
import Name from './Name'

type Props = {
  admin?: boolean
  showAnswer?: boolean
}

export default function Quiz({ admin, showAnswer }: Props): JSX.Element | null {
  const { state, user, setAnswer } = useSocketContext()

  if(!user?.name && !admin) return <Name></Name>
  if(!user?.id) return null

  const userAnswer: number | undefined = !admin ? state.answers[state.questionIndex]?.[user.id] : undefined

  return <div className="p-6">
    <h1 className="text-6xl mb-5 font-bold text-white">Quiz</h1>
    {state?.questions && typeof state?.questionIndex !== 'undefined' && <Question admin={admin} userAnswer={userAnswer} showAnswer={showAnswer} {...state?.questions[state?.questionIndex]} questionIndex={state?.questionIndex} setAnswer={setAnswer}></Question>}
  </div>
}
