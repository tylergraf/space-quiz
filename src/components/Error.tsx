type Props = {
  children: string
}

export default function Error({ children }: Props): JSX.Element {
  return <div className="bg-red-600 h-screen w-screen flex justify-center items-center">
    <h1 className="text-center text-white text-6xl font-bold">{children}</h1>
  </div>
}
