/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Functions(): void {

  const driverMapping = {
    '3': 'Daniel Ricciardo',
    '4': 'Lando Norris	',
    '5': 'Sebastian Vettel',
    '6': 'Nicholas Latifi',
    '10': 'Pierre Gasly',
    '11': 'Sergio Pérez',
    '14': 'Fernando Alonso',
    '16': 'Charles Leclerc',
    '18': 'Lance Stroll',
    '20': 'Kevin Magnussen',
    '22': 'Yuki Tsunoda',
    '23': 'Alexander Albon',
    '24': 'Zhou Guanyu',
    '27': 'Nico Hülkenberg',
    '31': 'Esteban Ocon',
    '44': 'Lewis Hamilton',
    '47': 'Mick Schumacher',
    '55': 'Carlos Sainz',
    '63': 'George Russell',
    '77': 'Valtteri Bottas',
  }

  const getDriver = (number) => {
    return driverMapping[number]
  }

}
