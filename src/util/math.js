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

export function* iterateAdjacents (matrix, pos) {
  const [row, col] = pos

  const deltaRow = [0, 0, 1, -1, 1, -1, 1, -1]
  const deltaCol = [1, -1, 0, 0, 1, -1, -1, 1]

  const totalRows = matrix.length
  const totalCols = matrix[0].length

  for (let i = 0; i < deltaRow.length; i++) {
    const r = row + deltaRow[i]
    const c = col + deltaCol[i]
    const isValid =
      between(r, 0, totalRows - 1) &&
      between(c, 0, totalCols - 1)

    if (isValid) yield matrix[r][c]
  }
}

export function countAdjacents (matrix, pos, target, possibs = 8) {
  const adjIterator = iterateAdjacents(matrix, pos)
  let count = 0

  for (let i = 0; i < possibs; i++) {
    const value = adjIterator.next().value
    if (value === target) count++
  }

  return count
}
