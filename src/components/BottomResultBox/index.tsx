import './index.scss'
import { useEffect, useState } from 'react'

type PropsType = {
  resultData: string
}

const BottomResultBox = (props: PropsType) => {
  const [time, setTime] = useState('-')
  const [word, setWord] = useState('-')
  let data = props.resultData
  let averageSpeed = `~ ${(data.length / 140).toFixed(0).toString()} minute`

  const longestWord = data
    .trim()
    .split(' ')
    .reduce(function (longest, currentWord) {
      return currentWord.length > longest.length ? currentWord : longest
    }, '')

  useEffect(() => {
    setWord(longestWord)
    setTime(averageSpeed)
  }, [props])

  const bottomResultBar = [
    {
      title: 'Average Reading Time:',
      value: time,
    },
    {
      title: 'Longest word:',
      value: word,
    },
  ]

  return (
    <div className="bottom-result-bar">
      {bottomResultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomResultBox
