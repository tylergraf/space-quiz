import React, { createContext, useState, useEffect, useContext } from 'react'
import { io } from "socket.io-client";
import { v4 } from 'uuid';
import localforage from 'localforage';
import type { Context, State, User } from '../types'
import {useNavigate} from 'react-router-dom'

const socket = io("localhost:3001")
// const socket = io("https://space-quiz-api.herokuapp.com")

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

let kickAudio: HTMLAudioElement = new Audio('/kick.mp3')
let snareAudio: HTMLAudioElement = new Audio('/snare.mp3')
let fifteenAudio: HTMLAudioElement = new Audio('/15-step.mp3')

export default function SocketContextProvider({ children }: Props): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [state, setState] = useState<State>(defaultState)
  const [user, setUser] = useState<User>({})
  const navigate = useNavigate()
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
    socket.on('ping', (data) => {
      socket.emit('pong', {...data, userId: user.id})
    });
    socket.on('navigate', (path) => {
      navigate(path)
    });
    socket.on('latency', (fullLatency) => {
      const latency = Math.round(fullLatency * 100) / 100
      setUser(oldUser=>({...oldUser, latency}))
    });
    socket.on('playSound', ({ src}:{latent:string,src:'kick'|'snare'|'15'}) => {
      // const time = latent && user.latency ? 1000-(user.latency/2) : 1000
      const time = user.latency && 1000+user.latency
      const map = {
        'kick': kickAudio,
        'snare': snareAudio,
        '15': fifteenAudio,
      }
      const audio = map[src]
      setTimeout(()=>{

        try{
          audio.play()
        } catch(err){
          alert(err)
        }
      },time)
    });
    return () => {
      socket.off('playSound');
      socket.off('connect');
      socket.off('ping');
      socket.off('disconnect');
      socket.off('state');
    }
  }, [user.id, user.latency, navigate])

  const checkLatency = () => {
    kickAudio = new Audio('/kick.mp3')
    snareAudio = new Audio('/snare.mp3')
    fifteenAudio = new Audio('/15-step.mp3')
    socket.emit('checkLatency')
  }
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
  const handleNavigate = (path: string) => {
    socket.emit('navigate', path)
  }
  const playSound = (data: {latent?: boolean,src: string}) => {
    socket.emit('playSound', data)
  }

  const value: Context = { state, nextQuestion, prevQuestion, isConnected, addName, user, setAnswer, checkLatency, navigate: handleNavigate, playSound }
  
  console.log(value)

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
