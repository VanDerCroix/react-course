import { WINNER_LINES, TURNS } from '../constants'

export const checkForWinner = (currentBoard) => {
  for (const line of WINNER_LINES) {
    const [a, b, c] = line
    const valA = currentBoard[a]
    const valB = currentBoard[b]
    const valC = currentBoard[c]
    if (valA && valA === valB && valB === valC) {
      return valA
    }
  }

  return null
}

export const checkDraw = (newBoard) => {
  return !newBoard.includes(null)
}

export const nextTurn = (turn) => turn === TURNS.X ? TURNS.O : TURNS.X
