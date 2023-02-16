<template>
  <div class="game-container">
    <div class="score">SCORE: {{ state.score }}</div>
    <div
      class="grid"
      :style="{
        width: GRID_SIZE * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
        height: GRID_SIZE * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
      }"
    >
      <div
        v-for="index in state.grid.length * state.grid.length"
        class="tile--bg"
        :key="index"
        :style="{
          width: TILE_SIZE + 'px',
          height: TILE_SIZE + 'px',
          margin: TILE_SPACING + 'px',
        }"
      ></div>
      <div
        v-for="(tile, index) in tiles"
        class="tile"
        :class="'tile--value-' + tile.value"
        :key="tile.id || 'empty-' + index"
        :style="{
          left: tile.x + 'px',
          top: tile.y + 'px',
          width: TILE_SIZE + 'px',
          height: TILE_SIZE + 'px',
        }"
      >
        {{ tile.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount } from "vue";
import create2048Game from "../lib/2048-game";

const {
  DIRECTION,
  state,
  initNewGame,
  insertRandomlyNewTile,
  slideAndMergeTiles,
} = create2048Game();

const GRID_SIZE = 5; // 6 x 6 tiles
const TILE_SIZE = 80; // px
const TILE_SPACING = 4; // px
let tileId = 0;

initNewGame({ gridSize: GRID_SIZE });
insertRandomlyNewTile({ id: ++tileId });

const tiles = computed(() => {
  const result = [];

  // extract non-empty tiles from the grid
  // and fletten them to an array
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid.length; j++) {
      if (state.grid[i][j]) {
        result.push({
          ...state.grid[i][j],
          x: TILE_SPACING + j * (TILE_SIZE + 2 * TILE_SPACING),
          y: TILE_SPACING + i * (TILE_SIZE + 2 * TILE_SPACING),
        });
      }
    }
  }

  // keeping the same tiles order is important as Vue can use the :key="tile.id"
  // to track each tile component and not recreate them every singe time
  // when re-rendering the list, in this way CSS transitions are also possible
  result.sort((a, b) => {
    return a.id - b.id;
  });

  return result;
});

let isReadyForUserInput = true;
const KEY_CODE_TO_DIRECTION = {
  ArrowRight: DIRECTION.RIGHT,
  ArrowLeft: DIRECTION.LEFT,
  ArrowUp: DIRECTION.UP,
  ArrowDown: DIRECTION.DOWN,
};

const onKeyDownHandler = function (e) {
  if (!isReadyForUserInput) return;

  if (Object.keys(KEY_CODE_TO_DIRECTION).includes(e.code)) {
    isReadyForUserInput = false;
    slideAndMergeTiles({ direction: KEY_CODE_TO_DIRECTION[e.code] });
    insertRandomlyNewTile({ id: ++tileId });
  }
};

const onKeyUpHandler = function (e) {
  if (Object.keys(KEY_CODE_TO_DIRECTION).includes(e.code)) {
    isReadyForUserInput = true;
  }
};

onBeforeMount(() => {
  window.addEventListener("keydown", onKeyDownHandler);
  window.addEventListener("keyup", onKeyUpHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDownHandler);
  window.removeEventListener("keyup", onKeyUpHandler);
});
</script>

<style scoped>
.game-container {
  border-radius: 24px;
  background-color: #f1f1f1;
  user-select: none;
  padding: 12px;
}

.score {
  font-weight: bold;
  color: #000;
  font-size: 32px;
  padding: 0 8px 8px;
}

.grid {
  position: relative;
}

.tile--bg {
  background-color: #e9e9e9;
  display: block;
  float: left;
  border-radius: 16px;
}

.tile {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.2s;
  transition-property: left, top;
  border-radius: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 0 rgba(26, 67, 114, 0.5);
  font-size: 32px;
  animation: tile-animation 0.2s ease-in;
}

.tile--value-2 {
  background-color: #ebdbd1;
}

.tile--value-4 {
  background-color: #f6ca84;
}

.tile--value-8 {
  background-color: #ec8b81;
}

.tile--value-16 {
  background-color: #dd5c67;
}

.tile--value-32 {
  background-color: #9a3471;
}

.tile--value-64 {
  background-color: #5f2872;
}

.tile--value-128 {
  background-color: #000;
}

.tile--value-256 {
  background-color: #000;
}

@keyframes tile-animation {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
