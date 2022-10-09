import {useState} from 'react'
import { useSocketContext } from 'service/SocketContextProvider'

export default function Name() {
  const {addName} = useSocketContext()
  const [name, setName] = useState<string>()
  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    addName(name)
  }
  return<div className="h-screen w-screen flex justify-center items-center absolute top-0 bottom-0 right-0 left-0">
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="name" className="block text-center text-white text-4xl mb-4 font-bold">What's your name?</label>
      <input type="text" className="w-96 text-2xl p-1" id="name" value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}/>
      <button type="submit" className="block my-4 bg-amber-600 font-bold rounded py-2 px-4 text-amber-50">Save</button>
    </form>
  </div>
}
