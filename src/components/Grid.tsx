import {Row} from "@/components/Row";
import {useEffect, useLayoutEffect, useState} from "react";
import styles from './Grid.module.css'

export function Grid() {
  const [words, setWords] = useState<string[]>([])
  const [targetWord, setTargetWord] = useState<string>('')

  async function fetchWords() {
    try {
      const resp = await fetch('https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/6bfa15d263d6d5b63840a8e5b64e04b382fdb079/valid-wordle-words.txt')
      const text = await resp.text()
      setWords(text.split('\n'))
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  const rows = [];
  for (let i = 0; i < 6; i++) {
    rows.push(<Row targetWord={targetWord} wordList={words} key={i}/>)
  }

  return <>
    <input value={targetWord.toUpperCase()} onChange={(e) => setTargetWord(e.target.value.toLowerCase())} className={styles.input}/>
    <div className={styles.grid}>
      {rows}
    </div>

  </>
}