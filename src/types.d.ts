export declare type Question = {
  width?: string
  img?: string
  correctAnswer: number
  possibleAnswers: string[]
  value: string
}

export declare type Answer = {
  [id: string]: number
}

export declare type User = {
  id?: string
  name?: string
  latency?: number
}
export declare type State = {
  questionIndex: number
  connections?: number
  questions: Question[]
  answers: Answer[]
  users: User[]
}

export declare type Context = {
  state: State
  isConnected: boolean
  nextQuestion: Function
  prevQuestion: Function
  addName: Function
  setAnswer: Function
  user?: User
  checkLatency?: Function
  navigate?: Function
  playSound?: Function
}
