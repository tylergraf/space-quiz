import Quiz from './admin/Quiz'
import Results from './admin/Results'
import Latency from './admin/Latency'
import { Routes, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import Error from './Error'

export default function AdminQuiz() {
  const admin = Cookies.get('admin')

  if (admin !== 'admin') return <Error>Uhh...what are you doing here?</Error>

  return <>
    <Routes>
      <Route path="/" element={<Quiz></Quiz>}></Route>
      <Route path="/results" element={<Results></Results>}></Route>
      <Route path="/latency" element={<Latency></Latency>}></Route>
    </Routes>
  </>
}
