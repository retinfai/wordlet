import { useEffect } from 'react'
import styles from './Letter.module.css'

export default function Letter({value,color}){
    // console.log("  Letter:", guess)
    function clicked(){
        // console.log(guess.guess)
        console.log(guess)
        console.log(setGuess)
    }

    return(
        <div className={styles.letter} style={{backgroundColor: "var(--"+color+")"}} onClick={clicked}>
            <p>{value}</p>
        </div>
    )

}