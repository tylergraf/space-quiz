import { lazy, Suspense } from "react";
import { useQuizContext } from './service/QuizProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Error from './components/Error'

const Quiz = lazy(() => import('./components/Quiz'))

function App(): JSX.Element {
  const { isConnected } = useQuizContext()

  if (!isConnected) return <Error>You're not connected, hang on.</Error>

  return (
    <div className="h-screen bg-slate-900">
      <div className="md:container md:mx-auto">
        <Suspense fallback="">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Quiz></Quiz>}></Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>

  );
}

export default App;
