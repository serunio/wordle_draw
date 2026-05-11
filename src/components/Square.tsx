import styles from './Square.module.css'
import {Dispatch, SetStateAction} from "react";

type SquareProps = {index:number, letter:string, isActive:string, setIsActive:Dispatch<SetStateAction<string>>}
export function Square({index, letter, isActive, setIsActive}:SquareProps) {
  return <>
    <button onClick={flip} className={`${styles.button} ${isActive === '1' ? styles.green : isActive === '2' ? styles.yellow : ''}`}>{letter}</button>
  </>

  function flip() {
    const newValue = isActive === '0' ? '1' : isActive === '1' ? '2' : '0';
    setIsActive(old => old.substring(0, index) + newValue + old.substring(index + 1))
  }
}

