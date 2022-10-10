type Props = {
  children: string
  onClick: Function
  className?: string
}

export default function Button({children, onClick, className}: Props){
  return <button onClick={(e)=>onClick(e)} className={`text-white font-bold rounded bg-green-500 px-4 py-1 ${className}`}>{children}</button>
}
