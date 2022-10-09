/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Objects(): void {

  type Person = {
    name: string
    height?: number
  }

  type Driver = Person & {
    readonly number: number
    team: string
    wins: number
    retired?: boolean
  }


  const driver: Driver = {
    name: 'Hamilton',
    number: 44,
    team: 'Merc',
    wins: 100
  }

  // type Person = {
  //   name: string
  //   height?: number
  // }

  // type Driver = Person & {
  //   readonly number: number
  //   team: string
  //   wins: number
  //   retired?: boolean
  // }

  // const driver: Driver = {
  //   number: 44,
  //   wins: 101,
  //   name: 'Hamilton',
  //   team: 'Merc'
  // }

}
