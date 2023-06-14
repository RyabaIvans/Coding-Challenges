import './index.scss'
import { useEffect, useState } from 'react'
import { pronouns } from '../../data/pronouns'

type PropsType = {
  resultData: string
}

const ResultBox = (props: PropsType) => {
  let data = props.resultData

  const [words, setWords] = useState(0)
  const [characters, setCharacters] = useState(0)
  const [sentences, setSentences] = useState(0)
  const [paragraphs, setParagraphs] = useState(0)
  const [pronounces, setPronounces] = useState(0)

  function countWords(text: string) {
    // Удаляем все пробелы в начале и конце текста
    text = text.trim()

    // Разделяем текст на отдельные слова по пробелам
    let words = text.split(' ')

    // Удаляем пустые элементы массива (в случае множественных пробелов)
    words = words.filter(function (word) {
      return word.length > 0
    })

    // Возвращаем количество слов
    return words.length
  }
  function countSentences(text: string) {
    // Разделяем текст на предложения, используя разделители [.?!]
    let sentences = text.split(/[.?!]+/)

    // Удаляем пустые элементы массива (в случае множественных разделителей)
    sentences = sentences.filter(function (sentence) {
      return sentence.length > 0
    })

    // Возвращаем количество предложений
    return sentences.length
  }
  function countParagraphs(text: string) {
    // Разбиваем текст на строки
    let lines = text.split('\n')

    // Фильтруем пустые строки
    let nonEmptyLines = lines.filter(function (line) {
      return line.trim() !== ''
    })

    // Возвращаем количество непустых строк (параграфов)
    return nonEmptyLines.length
  }
  function countMatchingWords(string: string, wordsArray: Array<string>) {
    // Приводим строку к нижнему регистру для сравнения без учета регистра
    let lowercaseString = string.toLowerCase()
    let count = 0

    for (let i = 0; i < wordsArray.length; i++) {
      let word = wordsArray[i].toLowerCase()
      let regex = new RegExp('\\b' + word + '\\b', 'g') // Создаем регулярное выражение для поиска слова с учетом границ слова
      let matches = lowercaseString.match(regex)

      if (matches !== null) {
        count += matches.length // Увеличиваем счетчик на количество совпадений
      }
    }

    return count
  }

  const sentenceCount = countSentences(data)
  const wordCount = countWords(data)
  const paragraphCount = countParagraphs(data)
  const containsWords = countMatchingWords(data, pronouns)

  useEffect(() => {
    setCharacters(data.length)
    setWords(wordCount)
    setSentences(sentenceCount)
    setParagraphs(paragraphCount)
    setPronounces(containsWords)
  }, [props])

  const resultBar = [
    {
      title: 'Words',
      value: words,
    },
    {
      title: 'Characters',
      value: characters,
    },
    {
      title: 'Sentences',
      value: sentences,
    },
    {
      title: 'Paragraphs ',
      value: paragraphs,
    },
    {
      title: 'Pronouns',
      value: pronounces,
    },
  ]

  return (
    <div className="result-bar">
      {resultBar.map(({ title, value }) => (
        <div className="result-box" key={title}>
          <span className="box-title">{title}</span>
          <span className="box-value">{value}</span>
        </div>
      ))}
    </div>
  )
}

export default ResultBox
