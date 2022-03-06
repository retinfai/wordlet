import { createRef, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import './App.css';
import Line from './components/word/Word';
import Keyboard from './components/keyboard/Keyboard';
import words from "./words";
const Typo = require("typo-js");

// import "Typo.js"
function App() {

  const [word,setWord] = useState(words[Math.floor(Math.random() * 178187)])
  console.log(word)
  const [grid, setGrid] = useState(Array(6).fill(0).map(x => Array(word.length).fill("")))
  const [guess, setGuess] = useState("")
  const [guessNum, setGuessNum] = useState(0)
  const [color, setColor] = useState(Array(6).fill(0).map(x => Array(word.length).fill("neutral")))
  const guessBar = createRef()
  
  const [keyboard, setKeyboard] = useState(Array(26).fill("keyboard"))
  
  useEffect(() => { // guess changes
    const newGrid = [...grid]
    const newLine = new Array(word.length).fill("")
    guess.split("").forEach((elmt, index) => {
      newLine[index] = elmt.toUpperCase()
    })
    newGrid[guessNum] = newLine
    setGrid(newGrid)
  },[guess])

  useEffect(() => { // guessNum changes
    setGuess("")
    guessBar.current.focus()
  },[guessNum])

  function onSubmit(){

    if(guess.length < word.length || !words.includes(guess.toLowerCase())){
      console.log("Nothing Entered")
      return
    }
    const newColor = [...color]
    
    const newLine = new Array(word.length).fill("incorrect")
    const guessArr = guess.toUpperCase().split("")
    const ans = word.toUpperCase().split("")
    const ansSet = new Set(ans)

    // fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + "dsad")
    //   .then(res => res.json())
    //   .then(result => console.log(result))
    //   .catch(err => {console.log(err)})

    for(let a = 0; a < word.length; a++){
      // console.log(ans[a], guessArr[a])
      if(guessArr[a] === ans[a]){
        newLine[a] = "correct"
        ansSet.delete(guessArr[a])
        keyboard[guessArr[a].charCodeAt(0) - 65] = "correct"

        
      } 
    }
    for(let a = 0; a < word.length; a++){
      if(ansSet.has(guessArr[a])){
        newLine[a] = "semiCorrect"
        ansSet.delete(guessArr[a])
        console.log(guessArr[a])
        keyboard[guessArr[a].charCodeAt(0) - 65] = "semiCorrect"

      } else if(keyboard[guessArr[a].charCodeAt(0) - 65] === "keyboard"){
        keyboard[guessArr[a].charCodeAt(0) - 65] = "incorrect"
      }
    }
    
    // console.log(newLine)
    newColor[guessNum] = newLine
    setColor(newColor)
    setGuessNum(guessNum + 1)
  }

  function inputOnChange(e){// Very inefficient - 
    const newGrid = [...grid]
    setGuess(e.target.value)
    
    const newLine = new Array(word.length).fill("")
    guess.split("").forEach((elmt, index) => {
      newLine[index] = elmt
    })
    newGrid[guessNum] = newLine
    setGrid(newGrid)
  }

  function keyDown(e){
    if(e.key === "Enter"){
      onSubmit()
    }
  }

  return (
    <div className="App">
      <h1>Wordlet!</h1>
      {/* <div id="overlay"></div> */}
      <div onClick={() => guessBar.current.focus()}>
      {
        [...Array(6)].map((elmt,index) => {
          return (
            <Line 
              lineNum={index}
              length={word.length}
              colorLine={color[index]}
              gridLine={grid[index]}
              key={"line-" + index.toString()}
            />
          )
        })
      }
      </div>

      <input className="guessBar" ref={guessBar} value={guess}type="text" maxLength={word.length} onChange={inputOnChange} onKeyDown={keyDown}/>
      <br></br>
      <Keyboard color={keyboard}/>
    </div>
  );
  
  
}

export default App;

 // useEffect(() => {
  //   const overlayLength = word.length * 4 + (word.length + 1)*2
  //   document.documentElement.style.setProperty('--overlayWidth', overlayLength.toString() + "rem");
  //   document.documentElement.style.setProperty('--overlayHeight', "4.7rem");

  // },[])