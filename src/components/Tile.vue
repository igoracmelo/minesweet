<template>
  <div
    class="Tile"
    :class="{ revealed: isRevealed }"
    @click="onClick"
  >
    <div
      class="Reveal"
      :class="{ 'contains-bomb': containsBomb }"
      v-if="isRevealed"
    >
      <span v-if="containsBomb">!</span>

      <span
        v-else-if="bombsAround"
        :style="{ color: colors[bombsAround] }"
      >
        {{ bombsAround }}
      </span>
    </div>
  </div>
</template>

<script>

import { BOMB } from 'src/constants'

export default {
  props: {
    bombsAround: Number,
    isRevealed: Boolean,
    row: Number,
    col: Number
  },

  data () {
    return {
      colors: [
        'transparent',
        'blue',
        'green',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red'
      ]
    }
  },

  computed: {
    containsBomb () {
      return this.bombsAround === BOMB
    }
  },

  methods: {
    onClick () {
      this.$emit('tile-clicked', [this.row, this.col])
    }
  }
}
</script>

<style lang="scss" scoped>
  .Tile {
    border: 3px outset;
    width: 40px;
    height: 40px;
    cursor: pointer;

    &.revealed {
      border: 1px inset;
    }
  }

  .Reveal {
    font-weight: bold;
    font-size: 1.2em;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: #ffc;

    &.contains-bomb {
      background-color: #faa;
    }
  }
</style>
