import { useState } from 'react'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkForWinner, checkDraw, nextTurn } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { GameBoard } from './components/GameBoard.jsx'
import { saveGameToStorage, resetGameStorage } from './storage/index.js'
import confetti from 'canvas-confetti'

function App () {
  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')
    if (savedBoard) return JSON.parse(savedBoard)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')
    return savedTurn ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = Array.from(board)
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = nextTurn(turn)
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkForWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkDraw(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <GameBoard board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
