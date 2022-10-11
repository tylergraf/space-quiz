import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
import type { State, Context } from '../types'

const socket = io("localhost:3001")
// const socket = io("https://space-quiz-api.herokuapp.com")

type Props = {
  children: React.ReactNode
}

const defaultState: State = {
  questionIndex: 0,
  connections: 0,
  questions: [],
  answers: [],
}

const defaultContext: Context = {
  isConnected: false,
  state: defaultState
}

const SocketContext = createContext<Context>(defaultContext)


export const useQuizContext = (): Context => {
  return useContext(SocketContext)
}

export default function SocketContextProvider({ children }: Props): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [state, setState] = useState<State>(defaultState)

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected')
    });
    
    socket.on('state', setState);
    
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('disconnected')
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('state');
    }
  }, [])


  const value: Context = { state, isConnected }
  
  console.log(value)

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
