import { interval, fromEvent, EMPTY } from 'rxjs'
import { filter, map, mapTo, pairwise, scan, startWith, switchMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators'
import { catElement, hideCat, playButton, renderBoard, renderCat, setGameOverVisible, setPlaySectionVisible, showRemainingCats, showScore } from './renderer'
import './index.css'
import { Board } from './board'

const CatsAllowedToRunAway = 5

const board = new Board()
renderBoard(board)
renderCat(board.windows[0])

const cat = interval(1200).pipe(
  startWith(0),
  map(() => board.windows[Math.floor(Math.random() * board.windows.length)]),
  tap(renderCat)
)

const catClicks = fromEvent(catElement, "click").pipe(
  mapTo(true),
  startWith(false),
  scan((totalScore, clicked) => clicked ? totalScore + 1 : totalScore, 0),
  tap(showScore),
  tap(clicked => {
    if (clicked) {
      hideCat()
    }
  })
)

const game = cat.pipe(
  withLatestFrom(catClicks),
  pairwise(),
  filter(([[prevCat, prevScore], [currentCat, currentScore]]) => currentScore === prevScore),
  scan(remaining => remaining - 1, CatsAllowedToRunAway),
  tap(showRemainingCats),
  tap(remaining => {
    if (remaining === 0) {
      setGameOverVisible(true)
      setPlaySectionVisible(true)
    }
  }),
  takeWhile(remaining => remaining > 0),
)

const playClicks = fromEvent(playButton, "click").pipe(
  mapTo(true),
  startWith(false),
  tap(playing => {
    console.log("playing", playing)
    if (playing) {
      setGameOverVisible(false)
      setPlaySectionVisible(false)
      showRemainingCats(CatsAllowedToRunAway)
    }
  }),
  switchMap(playing => playing ? game : EMPTY)
)

playClicks.subscribe()
