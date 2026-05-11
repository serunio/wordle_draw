import {useEffect, useState} from "react";
import {Square} from "@/components/Square";
import styles from './Row.module.css'

export function Row({wordList, targetWord}:{wordList:string[], targetWord:string}) {
  const [isActive, setIsActive] = useState<string>('00000')
  const [word, setWord] = useState<string>('     ')

  useEffect(() => {

    const freq = [...targetWord].reduce<Record<string, number>>((acc, ch) => {
      acc[ch] = (acc[ch] ?? 0) + 1
      return acc
    }, {})

    const countLookaheads = Object.keys(freq).map((c) => `(?=(?:[^${c}]*${c}){0,${freq[c]}}[^${c}]*$)`).join('')

    let regexString = isActive.split('').map((v, i) => {
      if ( v === '1' ) {
        return targetWord[i]
      }
      else if (v === '2') {
        return '[' + targetWord.split('').map((v2, i2) => {
          if (targetWord[i] !== targetWord[i2]) return targetWord[i2]
        }).join('') + ']'
      }
      else {
        return `(?:(?![${targetWord}])[a-z])`
      }
    }).join('')
    regexString = `${countLookaheads}(?!${targetWord})(${regexString})`
    const regex = new RegExp(regexString)
    wordList.some(w => {
      if (regex.test(w)) {
        setWord(w)
        return true
      }
      setWord('     ')
    })
  }, [isActive, wordList, targetWord])

  return (<div className={styles.row}>
      {
        isActive.split('').map(
          (v, i) =>
            (<Square key={i} index={i} letter={word[i].toUpperCase()} isActive={isActive[i]} setIsActive={setIsActive}/>)
        )
      }
    </div>
  )
}