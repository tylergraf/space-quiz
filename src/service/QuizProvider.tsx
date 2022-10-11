import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
// import { v4 } from 'uuid';
// import localforage from 'localforage';
import type { Context } from '../types'

// const socket = io("localhost:3001")
const socket = io("https://space-quiz-api.herokuapp.com")

type Props = {
  children: React.ReactNode
}

const defaultContext: Context = {
  isConnected: false,
}

const SocketContext = createContext<Context>(defaultContext)


export const useQuizContext = (): Context => {
  return useContext(SocketContext)
}

export default function SocketContextProvider({ children }: Props): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('connected')
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


  const value: Context = { isConnected }
  
  console.log(value)

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
