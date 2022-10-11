import { useSocketContext } from "service/SocketContextProvider";
import Button from "../Button";
import HeaderBlock from "../HeaderBlock";

function getRandomArbitrary(min:number, max:number) {
  return Math.round(Math.random() * (max - min) + min)
}
export default function Results() {
  const { state, playSound } = useSocketContext()
  const users = state.users.filter(user=>user.latency)
  .map((user) => {
    return user.latency || 0
  }).sort((a, b) => b < a ? 1 : -1)

// const numbers = Array.from(new Array(50).fill(null)).map(()=>getRandomArbitrary(30, 4000)).sort((a, b) => b < a ? 1 : -1)
  
  // const numbers = [66,43,89,333,595,2424,3059,2392,334,14,664,239,2324,234,434,312,12,123,23,3423,523,4,66,56,46].sort((a, b) => b < a ? 1 : -1)

  const ratio = Math.max(...users) / 100;
  const normalized = users.map(v => Math.round(v / ratio));

  return <div>
    <HeaderBlock heading="Latency"></HeaderBlock>
    <ul className="flex items-end justify-evenly" style={{height: '600px'}}>
      {normalized.map((latency,i) => {
        return <li className="h-100" style={{width: 900/users.length,height: `${(latency)}%`}}>
          <div className="text-2xl font-bold text-white bg-blue-500 mr-1 h-full w-full"></div>
          <p className="text-white font-bold rotate-[270deg]">{users[i]}</p>
        </li>
      })}
    </ul>
    <p>Latent</p>
    <Button onClick={()=>playSound?.({src:'kick',latent: true})}>Kick</Button>
    <Button onClick={()=>playSound?.({src:'snare',latent: true})}>Snare</Button>
    <Button onClick={()=>playSound?.({src:'15',latent: true})}>15 Step</Button>
    <p>Non-Latent</p>
    <Button onClick={()=>playSound?.({src:'kick',latent: false})}>Kick</Button>
    <Button onClick={()=>playSound?.({src:'snare',latent: false})}>Snare</Button>
    <Button onClick={()=>playSound?.({src:'15',latent: false})}>15 Step</Button>
  </div>
}
