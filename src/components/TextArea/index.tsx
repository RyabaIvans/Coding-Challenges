import './index.scss'
import { ChangeEvent, createContext, useRef } from 'react'

type PropsType = {
  propsHandler: (data: string) => void
}
const TextArea = (props: PropsType) => {
  const onchangeHandler = (value: ChangeEvent<HTMLTextAreaElement>) => {
    let valueData = value.target.value
    localStorage.setItem('data', valueData)
  }

  return (
    <textarea
      onChange={(event) => props.propsHandler(event.target.value)}
      className="text-area"
      placeholder="Paste your text here..."
    />
  )
}

export default TextArea
