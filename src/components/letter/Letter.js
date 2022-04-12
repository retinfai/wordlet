import styles from './Letter.module.css'

export default function Letter({value,color, guessObj,guessBarRef}){
    const guess = guessObj ? guessObj[0] : undefined
    const setGuess = guessObj ? guessObj[1] : undefined

    function clicked(){
        if(guessObj === undefined){
            return
        }
        setGuess(guess+value)
        guessBarRef.current.focus()
    }

    return(
        <div className={styles.letter} style={{backgroundColor: "var(--"+color+")"}} onClick={clicked}>
            <p>{value}</p>
        </div>
    )

}