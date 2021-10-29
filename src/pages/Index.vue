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
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Tile from 'components/Tile.vue'
import { BOMB } from 'src/constants'

export default defineComponent({
  name: 'PageIndex',

  components: {
    Tile
  },

  data () {
    return {
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
  },

  created () {
    this.newGame()
  },

  methods: {
    onTileClicked (pos) {
      const [row, col] = pos
      this.boardRevealed[row][col] = true
    },

    newBoard () {
      this.board = createMatrix(this.nRows, this.nCols, 0)
      this.boardRevealed = createMatrix(this.nRows, this.nCols, false)
    },

    newGame () {
      this.newBoard()
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
</style>
