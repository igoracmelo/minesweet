<template>
  <q-page class="Index">
    <div class="Game">
      <div class="top">
        <label>
          Rows
          <input type="number" min="5" v-model="nRows">
        </label>
        <label>
          Cols
          <input type="number" min="8" v-model="nCols">
        </label>
        <label>
          Bombs
          <input type="number" min="1" :max="tilesCount - 1" v-model="bombsCount">
        </label>
      </div>

      <div class="Board">
        <div class="row" v-for="(_, row) of board" :key="row">
          <Tile
            v-for="(_, col) of board[row]"
            :key="col"
            :row="row"
            :col="col"
            :isRevealed="boardRevealed[row][col]"
            :bombsAround="board[row][col]"
            @tile-clicked="onTileClicked"
          />
        </div>
      </div>

      <span class="info lose" v-if="lose">You lose :(</span>
      <span class="info won" v-else-if="won">You won!</span>

      <button class="Button" @click="newGame">
        Reset
      </button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Tile from 'components/Tile.vue'
import { randomInt, createMatrix, countAdjacents, findLargestField } from 'src/util/math'
import { BOMB } from 'src/constants'

export default defineComponent({
  name: 'PageIndex',

  components: {
    Tile
  },

  data () {
    return {
      lose: false,
      bombsCount: 1,
      nRows: 5,
      nCols: 8,
      board: [],
      boardRevealed: []
    }
  },

  watch: {
    nRows () {
      this.newGame()
    },
    nCols () {
      this.newGame()
    },
    bombsCount () {
      this.newGame()
    }
  },

  created () {
    this.newGame()
  },

  computed: {
    tilesCount () {
      return this.nRows * this.nCols
    },

    won () {
      return this.revealedCount === this.tilesCount - this.bombsCount
    },

    revealedCount () {
      let count = 0
      for (const row of this.boardRevealed) {
        for (const cell of row) {
          count += Number(cell)
        }
      }
      return count
    }
  },

  methods: {
    onTileClicked (pos) {
      const [row, col] = pos
      const gameFreezed = this.lose || this.boardRevealed[row][col] || this.won

      if (gameFreezed) return

      if (this.board[row][col] === BOMB) {
        this.lose = true
      } else {
        const avoid = (currPos) => countAdjacents(this.board, currPos, BOMB)
        findLargestField(this.board, pos, avoid, this.boardRevealed)
        this.board[row][col] = countAdjacents(this.board, pos, BOMB)
      }

      this.boardRevealed[row][col] = true
    },

    newBoard () {
      this.board = createMatrix(this.nRows, this.nCols, 0)
      this.boardRevealed = createMatrix(this.nRows, this.nCols, false)
    },

    addRandomBombs () {
      let bombsLeft = this.bombsCount
      while (bombsLeft) {
        const row = randomInt(0, this.nRows - 1)
        const col = randomInt(0, this.nCols - 1)

        if (this.board[row][col] === BOMB) continue

        this.board[row][col] = BOMB
        bombsLeft--
      }
    },

    newGame () {
      this.revealedCount = 0
      this.lose = false
      this.newBoard()
      this.addRandomBombs()
      console.log(this.board)
    }
  }
})
</script>

<style lang="scss" scoped>
  .Index {
    background-color: rgb(136, 255, 171);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
  }

  .Game {
    background-color: #bbb;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    border: 5px outset;
  }

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  label {
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  input {
    text-align: center;
    border: 3px inset;
    width: 70px;
  }

  .Board {
    border: 3px inset;
  }

  .row {
    display: flex;
  }

  .info {
    font-size: 11px;
    &.lose { color: red; }
    &.won { color: green; }
  }

  .Button {
    align-self: stretch;
    background: #222;
    color: #eee;
    border: 3px outset white;
    padding: .5rem;
    cursor: pointer;

    &:hover {
      background: #555;
    }

    &:active {
      border: inset;
    }
  }
</style>
