/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Arrays(): void {

  const questions: (string | number)[] = ['What is stuff?', 'Who are you?', 3]

  questions.map(question => {
    if (typeof question === 'string') {
      question.toUpperCase()
    }
    return question
  })

  const threeQuestions: [string, string, string] = ['1','2','3']

  const status: 'loading' | 'error' | 'success' = 'loading'

  // const drivers: (string | number)[] = ['VET', 'VER', 44]

  // drivers.map(driver => {
  //   if (typeof driver === 'string') {
  //     return driver.toUpperCase()
  //   }
  //   return driver
  // })

  // const top3Teams: [string, string, string] = ['Mer', 'Fer', 'Redbull']

  // const status: 'retired' | 'driving' | 'waiting' = 'waiting'

}
