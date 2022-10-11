import { useSocketContext } from "service/SocketContextProvider"
import HeaderBlock from "./HeaderBlock"

export default function Results(){
  const {state, user} = useSocketContext()
  const correctCount = state.answers.filter((answer, i) => {
    if (!user?.id) return false
    return answer[user.id] === state.questions[i].correctAnswer
  })
  return <div className="flex justify-center pt-20">
    <HeaderBlock heading={`You Got ${correctCount.length} of ${state.questions.length}`}></HeaderBlock>
  </div>
}
