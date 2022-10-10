type Props = {
  heading: string
  className?: string
}

export default function HeaderBlock({heading, className}: Props) {
  return <h1 className={`text-white font-bold text-4xl ${className}`}>{heading}</h1>
}
