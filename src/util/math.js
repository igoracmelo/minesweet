export function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1))
}

export function between (x, min, max) {
  return x >= min && x <= max
}

export function createMatrix (row, col, fillWith) {
  const board = []
  for (let r = 0; r < row; r++) {
    board.push([])
    for (let c = 0; c < col; c++) {
      board[r].push(fillWith)
    }
  }
  return board
}
