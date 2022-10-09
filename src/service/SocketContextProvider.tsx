import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
import { v4 } from 'uuid';
import localforage from 'localforage';
import type { Context, State, User } from '../types'

// const socket = io("localhost:3001")
const socket = io("https://space-quiz-api.herokuapp.com")

type Props = {
  children: React.ReactNode
}

const defaultState = {
  questionIndex: 0,
  questions: [],
  answers: [],
  users: []
}
const defaultContext: Context = {
  nextQuestion: () => { },
  prevQuestion: () => { },
  addName: () => { },
  setAnswer: () => { },
  isConnected: false,
  state: defaultState
}

const SocketContext = createContext<Context>(defaultContext)


export const useSocketContext = (): Context => {
  return useContext(SocketContext)
}

export default function SocketContextProvider({ children }: Props): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [state, setState] = useState<State>(defaultState)
  const [user, setUser] = useState<User>({})
  useEffect(() => {
    localforage.getItem('user').then((cachedUser) => {
      if (cachedUser) {
        setUser(cachedUser)
      } else {
        const id = v4()
        setUser({ id })
      }
    })

  }, [])

  useEffect(() => {
    if (user?.id) {
      localforage.setItem('user', user)
      socket.emit('setUser', user)
    }
  }, [user])

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected')
    });
    socket.on('state', setState)

    socket.on("connect", () => {
      console.log(socket.id);
    });

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

  const setAnswer = (index: number) => {
    socket.emit('setAnswer', { user, index })
  }
  const nextQuestion = () => {
    socket.emit('nextQuestion')
  }
  const prevQuestion = () => {
    socket.emit('prevQuestion')
  }
  const addName = (name: string) => {
    setUser(stateUser => ({ ...stateUser, name }))
  }

  const value: Context = { state, nextQuestion, prevQuestion, isConnected, addName, user, setAnswer }
  
  console.log(value)

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
