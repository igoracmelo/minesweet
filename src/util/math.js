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

export function countAdjascents (matrix, pos, target, possibs = 8) {
  const [row, col] = pos
  let count = 0
  const deltaRow = [0, 0, 1, -1, 1, -1, 1, -1]
  const deltaCol = [1, -1, 0, 0, 1, -1, -1, 1]

  const totalRows = matrix.length
  const totalCols = matrix[0].length

  for (let i = 0; i < possibs; i++) {
    const r = row + deltaRow[i]
    const c = col + deltaCol[i]
    const isTarget =
      between(r, 0, totalRows - 1) &&
      between(c, 0, totalCols - 1) &&
      matrix[r][c] === target
    if (isTarget) count++
  }
  return count
}
