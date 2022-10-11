import { lazy } from "react";
import { useSocketContext } from './service/SocketContextProvider'
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error'

const Quiz = lazy(() => import('./components/Quiz'))
const Admin = lazy(() => import('./components/Admin'))
const CheckLatency = lazy(() => import('./components/CheckLatency'))
const Results = lazy(() => import('./components/Results'))

function App(): JSX.Element {
  const { isConnected, state } = useSocketContext()

  if (!isConnected || !state.questions.length) return <Error>You're not connected, hang on.</Error>

  return (
    <div className="h-screen bg-slate-900">
      <div className="md:container md:mx-auto">
        <Routes>
          <Route path="/" element={<Quiz></Quiz>}></Route>
          <Route path="/admin/*" element={<Admin></Admin>}></Route>
          <Route path="/latency" element={<CheckLatency></CheckLatency>}></Route>
          <Route path="/results" element={<Results></Results>}></Route>
        </Routes>
      </div>
    </div>

  );
}

export default App;
