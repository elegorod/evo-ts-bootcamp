import cat from './cat.svg'
import brick from './brick.svg'
import win from './window.svg'
import { Board, Cell } from './board'

export const CellSize = 70

const boardElement = document.getElementById('board')!
const appElement = document.getElementById('app')!
appElement.insertAdjacentHTML("beforeend", `<img id="cat" src=${cat} width="70" height="70"/>`)
export const catElement = document.getElementById('cat')!
const scoreElement = document.getElementById('score')!
const remainingCatsElement = document.getElementById('remainingCats')!
const gameOverElement = document.getElementById('gameOver')!
const playContainerElement = document.getElementById('playContainer')!
export const playButton = document.getElementById('play')!

export const renderBoard = (board: Board) => {
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      const src = board.hasWindowAt(x, y) ? win : brick
      boardElement.insertAdjacentHTML("beforeend", `<img src=${src} width="70" height="70"/>`)
    }
  }
}

export const renderCat = (cell: Cell) => {
  catElement.style.left = cell.x * CellSize + "px"
  catElement.style.top = cell.y * CellSize + "px"
  catElement.style.display = "block"
}

export const showScore = (score: number) => {
  scoreElement.innerText = score.toString()
}

export const showRemainingCats = (remaining: number) => {
  remainingCatsElement.innerText = remaining.toString()
}

export const hideCat = () => {
  catElement.style.display = "none"
}

export const setGameOverVisible = (visible: boolean) => {
  gameOverElement.style.display = visible ? "block" : "none"
}

export const setPlaySectionVisible = (visible: boolean) => {
  playContainerElement.style.display = visible ? "block" : "none"
}
