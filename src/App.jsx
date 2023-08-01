import { useState, useEffect, useRef } from 'react'

import Die from './components/Die'
import Header from './components/Header'
import Score from './components/Score'
import Modal from './components/Modal'

import './App.css'

import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [randomArray, setRandomArray] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)
  const [timer, setTimer] = useState(0)
  const [record, setRecord] = useState(false)

  // create a random number
  function randomNumber() { 
    return Math.floor((Math.random() * 6) + 1)
  }

  // create timer
  useEffect(() => {
    let intervallId
    if (!tenzies) {
      intervallId = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(intervallId)
  }, [tenzies])  
   
  // create a new array of random numbers
  function allNewDice() {
    const randomDiceArray = []
    for (let i=0; i < 10; i++) {
      // create a new dice object
      const dice = {value: randomNumber(), isHeld: false, id: nanoid()}
      randomDiceArray.push(dice)
    }
    return randomDiceArray
  }

  function holdDice(id) {
    setRandomArray(prevDice => prevDice.map(die => 
        die.id===id ? {...die, isHeld: !die.isHeld} : die
      ))
  }

    // create roll function
  function rollDice() {
    setRandomArray(prevDice => prevDice.map(die => 
      die.isHeld===false ? {...die, value: randomNumber()} : die
    ))
    setNumOfRolls(prevNum => prevNum + 1)
  }

  // check for win the game
  useEffect(() => {
    const referenceValue = randomArray[0]?.value
      const allSameValue = randomArray.every(die => die.value===referenceValue && die.isHeld) 
      if(allSameValue) {
        setTenzies(true)
        trackNewRecord()
      }
    }, [randomArray])

    //track new records
    function trackNewRecord() {
        const record = JSON.parse(localStorage.getItem("record")) 
        const newScore = numOfRolls + timer
        console.log(newScore)
        if (record) {
          if (newScore < record) {
            localStorage.setItem("record", JSON.stringify(newScore))
            setRecord(true)
          }
        } else {
          localStorage.setItem("record", JSON.stringify(newScore))
          setRecord(true)
        }
    }

  // reset game
  function resetGame() {
    setTenzies(false)
    setRandomArray(allNewDice())
    setNumOfRolls(0)
    setTimer(0)
    setRecord(false)
    console.log(numOfRolls)
    console.log(timer)
  }

  
  // create dice elements 
  const diceElements = randomArray.map(die => 
      <Die 
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
  )
  
  return (
    <main>
        {record && <Modal 
          resetGame={resetGame}
          />}
        <Header />
        {tenzies && <Confetti /> }
        <div className='dice--container'>
          {diceElements}
        </div>
        {!record && <button
          onClick={tenzies ? resetGame : rollDice}
          className='roll--button'
          >{tenzies ? "New Game" : "Roll"}
        </button>}
        <Score
          numOfRolls={numOfRolls}
          timer={timer}
        />
    </main>
  )
}


export default App