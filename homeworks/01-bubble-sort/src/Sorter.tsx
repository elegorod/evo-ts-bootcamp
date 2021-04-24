const DELAY = 50

interface Callback {
  (values: number[], finished: boolean, active: number[], firstSorted: number): void
}

class Sorter {

  callback: Callback

  values: number[] = []
  j = 0
  i = 0
  firstTick = false
  swapped = false
  running = false
  timer?: number = undefined

  constructor(callback: Callback) {
    this.callback = callback
  }

  reset(values: number[]) {
    this.clearTimer()
    this.running = false
    this.values = values.slice()
    this.j = 1
    this.i = 0
    this.firstTick = true
    this.swapped = false
  }

  start() {
    this.running = true
    setTimeout(this.tick, 0)
    this.timer = window.setInterval(this.tick, DELAY)
  }

  tick = () => {
    if (this.firstTick) {
      this.firstTick = false
    } else {
      this.i++;
    }
    let i = this.i
    const v = this.values
    let finished = false
    if (i >= v.length - this.j) {
      if (!this.swapped) {
        finished = true
      } else {
        this.swapped = false
        this.j++;
        if (this.j >= v.length) {
          finished = true
        } else {
          this.i = i = 0
        }
      }
    }
    if (finished) {
      this.running = false
      this.clearTimer()
    } else {
      if (v[i] > v[i + 1]) {
        const temp = v[i + 1]
        v[i + 1] = v[i]
        v[i] = temp
        this.swapped = true
      }
    }
    const active = finished ? [] : [i, i + 1]
    const firstSorted = finished ? 0 : v.length - this.j + 1
    this.callback(v, finished, active, firstSorted)
  }

  setPaused(paused: boolean) {
    if (paused) {
      this.clearTimer()
      this.running = false
    } else {
      this.start()
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

}

export default Sorter;
