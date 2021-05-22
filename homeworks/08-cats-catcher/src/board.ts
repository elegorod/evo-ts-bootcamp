
export class Board {

  width = 10
  height = 10
  windows: Cell[]

  constructor() {
    this.windows = [
      new Cell(0, 1),
      new Cell(0, 7),
      new Cell(1, 4),
      new Cell(2, 2),
      new Cell(3, 0),
      new Cell(3, 6),
      new Cell(4, 9),
      new Cell(5, 1),
      new Cell(5, 7),
      new Cell(6, 3),
      new Cell(7, 8),
      new Cell(8, 1),
      new Cell(8, 4),
      new Cell(9, 2),
    ]
  }

  hasWindowAt(x: number, y: number) {
    return this.windows.some(_ => _.x === x && _.y === y)
  }
}

export class Cell {
  constructor(public x: number, public y: number) {}
}
