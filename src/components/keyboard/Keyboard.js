import Letter from "../letter/Letter"
import styles from "./Keyboard.module.css"
import React from 'react'
export default function Keyboard({color}) {

    const letters = []

    for (let a = 0; a < 26; a++) {
        letters.push(String.fromCharCode(65 + a))
    }



    // console.log(letters)
    return (
        <div className={styles.KeyboardContainer}>

            {
                letters.map((letter, index )=> {
                    return(
                        <Letter value={letter} className={styles.key} key={letter+"-key"} color={color[index]}/>
                    )
                })
            }


        </div>
    )

}