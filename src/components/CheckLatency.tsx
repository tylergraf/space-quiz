import { useRef } from 'react'
import { useSocketContext } from "service/SocketContextProvider"
import Button from "./Button"
import HeaderBlock from "./HeaderBlock"


export default function CheckLatency() {
  const { checkLatency, user } = useSocketContext()

  const play = (src: string) => {
    const audio = new Audio(src)
    audio.play()

  }

  return <div>
    <HeaderBlock heading="Latency Test"></HeaderBlock>
    <div className="flex mt-10 justify-center">
      <div className="flex flex-col items-center">
        {user?.latency && <HeaderBlock heading={`${(Math.round(user?.latency * 100) / 100)?.toString()}ms`}></HeaderBlock>}
        <Button onClick={() => checkLatency?.()} className="m-5">Check Latency</Button>
        <div className="flex">
          <Button className="p-8 mr-4" onClick={() => play('/kick.mp3')}>Kick</Button>
          <Button className="p-8 mr-4" onClick={() => play('/snare.mp3')}>Snare</Button>
          <Button className="p-8" onClick={() => play('/15-step.mp3')}>Drums</Button>
        </div>
      </div>
    </div>
  </div>
}
