import { useSocketContext } from "service/SocketContextProvider";
import {Link} from 'react-router-dom'

export default function Results() {
  const { state, navigate } = useSocketContext()
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
        return <li className="text-2xl font-bold text-white">{user.correctCount} - {user.name}</li>
      })}
    </ul>
    <div className="mt-10">
      <Link to="/admin/latency" className="text-white font-bold rounded bg-green-500 px-4 py-1" onClick={()=>navigate?.('/latency')}>Go to Latency</Link>
    </div>
  </div>
}
