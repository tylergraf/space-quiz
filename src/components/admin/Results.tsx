import { useSocketContext } from "service/SocketContextProvider";
import Button from "../Button";

export default function Results() {
  const { state, goToLatency } = useSocketContext()
  const users = state.users.map((user) => {
    const correctCount = state.answers.filter((answer, i) => {
      if (!user?.id) return false
      return answer[user.id] === state.questions[i].correctAnswer
    })
    return { ...user, correctCount: correctCount.length }
  }).sort((a, b) => b.correctCount > a.correctCount ? 1 : -1)

  return <div>
    <h1 className="text-6xl font-bold text-white mb-10">Results</h1>
    <ul>
      {users.map(user => {
        return <li className="text-2xl font-bold text-white">{user.correctCount} {user.name}</li>
      })}
    </ul>
    <Button onClick={()=>goToLatency?.()}>Go to Latency</Button>
  </div>
}
