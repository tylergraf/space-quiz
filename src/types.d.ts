export declare type Question = {
  value: string
  possibleAnswers: string[]
  correctAnswer: number
}

export declare type State = {
  questionIndex: number
  connections: number
  questions: Question[]
  answers: []
}

export declare type Context = {
  state: State
  isConnected: boolean
}





































// export declare type Question = {
//   width?: string
//   img?: string
//   correctAnswer: number
//   possibleAnswers: string[]
//   value: string
// }

// export declare type Answer = {
//   [id: string]: number
// }

// export declare type State = {
//   questionIndex: number
//   connections?: number
//   questions: Question[]
//   answers: Answer[]
// }

