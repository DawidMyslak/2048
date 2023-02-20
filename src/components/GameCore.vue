<template>
  <div class="game-core">
    <GameDashboard @click:newGame="startNewGame($event)" />
    <GameGrid />
  </div>
</template>

<script setup>
import { provide } from "vue";
import { DEFAULT_GRID_SIZE, DEFAULT_NUMBER_OF_OBSTACLES } from "@/constants";
import createGameEngine from "@/lib/2048-game";
import trackKeyboardInput from "@/lib/keyboard-input";
import trackTouchGestures from "@/lib/touch-gestures";
import GameDashboard from "./GameDashboard.vue";
import GameGrid from "./GameGrid.vue";

const gameEngine = createGameEngine();
provide("gameEngine", gameEngine);

const {
  state,
  initGame,
  insertNumberTileRandomly,
  insertObstacleTileRandomly,
  slideAndMergeTiles,
  checkIfGameIsOver,
} = gameEngine;

let tileId;

function startNewGame({ gridSize, numberOfObstacles }) {
  tileId = 0;

  initGame({ gridSize });
  insertNumberTileRandomly({ id: ++tileId });

  for (let i = 0; i < numberOfObstacles; i++) {
    insertObstacleTileRandomly({ id: ++tileId });
  }
}

function slideTiles({ direction }) {
  if (state.isGameCompleted || state.isGameOver) return;

  const hasGridChanged = slideAndMergeTiles({ direction });
  if (!hasGridChanged) return;

  const isGridFull = insertNumberTileRandomly({ id: ++tileId });
  if (!isGridFull) return;

  checkIfGameIsOver();
}

startNewGame({
  gridSize: DEFAULT_GRID_SIZE,
  numberOfObstacles: DEFAULT_NUMBER_OF_OBSTACLES,
});

trackKeyboardInput({
  onArrowPressed: slideTiles,
});

trackTouchGestures({
  onSwipe: slideTiles,
});
</script>

<style scoped>
.game-core {
  display: flex;
  user-select: none;
}

@media (max-width: 480px) {
  .game-core {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
