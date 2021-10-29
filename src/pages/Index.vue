<template>
  <q-page class="Index">
    <div class="Game">
      <div class="top">
        <label>
          Rows
          <input type="number" min="3" v-model="nRows">
        </label>
        <label>
          Cols
          <input type="number" min="5" v-model="nCols">
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

      <div class="Info">
        <span class="lose" v-if="lose">You lose :(</span>
        <span class="won" v-else-if="won">You won!</span>
      </div>

      <button class="Button" @click="newGame">
        Reset
      </button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Tile from 'components/Tile.vue'
import { randomInt, createMatrix, countAdjascents } from 'src/util/math'
import { BOMB } from 'src/constants'

export default defineComponent({
  name: 'PageIndex',

  components: {
    Tile
  },

  data () {
    return {
      lose: false,
      bombsCount: 3,
      revealedCount: 0,
      nRows: 3,
      nCols: 5,
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
    }
  },

  methods: {
    onTileClicked (pos) {
      const [row, col] = pos
      const gameFreezed = this.lose || this.won || this.boardRevealed[row][col]

      if (gameFreezed) return
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .Game {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .top {
    display: flex;
    gap: 1rem;
  }

  label {
    display: flex;
    text-align: center;
    flex-direction: column;
  }

  input {
    text-align: center;
    width: 70px;
  }

  .Board {
    border: 3px outset;
    padding: 1rem;
  }

  .row {
    display: flex;
  }

  .Info {
    font-size: 11px;
    .lose { color: red; }
    .won { color: green; }
  }

  .Button {
    align-self: stretch;
    background: transparent;
    border: 3px outset;
    padding: .5rem;
    cursor: pointer;

    &:active {
      border: inset;
    }
  }
</style>
