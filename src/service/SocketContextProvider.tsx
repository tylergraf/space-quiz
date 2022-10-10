import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
// import { v4 } from 'uuid';
// import localforage from 'localforage';
import type { State, Context } from '../types'

// const socket = io("localhost:3001")
const socket = io("https://space-quiz-api.herokuapp.com")

type Props = {
  children: React.ReactNode
}

const defaultState: State = {
  questionIndex: 0,
  connections: 0,
}
const defaultContext: Context = {
  nextQuestion: () => { },
  prevQuestion: () => { },
  isConnected: false,
  state: defaultState
}

const SocketContext = createContext<Context>(defaultContext)


export const useSocketContext = (): Context => {
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
    socket.on('state', setState)

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

  const nextQuestion = () => {
    socket.emit('nextQuestion')
  }
  const prevQuestion = () => {
    socket.emit('prevQuestion')
  }

  const value: Context = { state, nextQuestion, prevQuestion, isConnected }
  
  console.log(value)

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
