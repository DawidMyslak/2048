<template>
  <div class="game-core">
    <GameDashboard @click:newGame="startNewGame($event)" />
    <GameGrid />
  </div>
</template>

<script setup>
import { provide } from "vue";
import {
  DEFAULT_GRID_SIZE,
  DEFAULT_NUMBER_OF_OBSTACLES,
  KEYBOARD_ARROW_CODE_TO_DIRECTION,
} from "../constants";
import createGameEngine from "../lib/2048-game";
import trackKeyboardInput from "../lib/keyboard-input";
import GameDashboard from "./GameDashboard.vue";
import GameGrid from "./GameGrid.vue";

const gameEngine = createGameEngine();
provide("gameEngine", gameEngine);

const {
  initGame,
  insertNumberTileRandomly,
  insertObstacleTileRandomly,
  slideAndMergeTiles,
} = gameEngine;

let tileId;

function startNewGame({ gridSize, numberOfObstacles }) {
  tileId = 0;

  initGame({ gridSize: Number(gridSize) });
  insertNumberTileRandomly({ id: ++tileId });

  for (let i = 0; i < Number(numberOfObstacles); i++) {
    insertObstacleTileRandomly({ id: ++tileId });
  }
}

startNewGame({
  gridSize: DEFAULT_GRID_SIZE,
  numberOfObstacles: DEFAULT_NUMBER_OF_OBSTACLES,
});

trackKeyboardInput({
  onArrowPressed: ({ code }) => {
    slideAndMergeTiles({ direction: KEYBOARD_ARROW_CODE_TO_DIRECTION[code] });
    insertNumberTileRandomly({ id: ++tileId });
  },
});
</script>

<style scoped>
.game-core {
  display: flex;
  user-select: none;
}
</style>
