import React, { lazy, Suspense } from "react";
import { useSocketContext } from './service/SocketContextProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './components/Error'

const Quiz = lazy(() => import('./components/Quiz'))
const Admin = lazy(() => import('./components/Admin'))

function App(): JSX.Element {
  const { isConnected, state } = useSocketContext()

  if (!isConnected || !state.questions.length) return <Error>You're not connected, hang on.</Error>

  return (
    <div className="h-screen bg-slate-900">
      <div className="md:container md:mx-auto">
        <Suspense fallback="">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Quiz></Quiz>}></Route>
              <Route path="/admin" element={<Admin></Admin>}></Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>

  );
}

export default App;
