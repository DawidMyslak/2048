<template>
  <div class="game-container">
    <GameDashboard @start-new-game="startNewGame($event)" />
    <GameGrid />
  </div>
</template>

<script setup>
import { provide, onBeforeMount, onBeforeUnmount } from "vue";
import {
  DEFAULT_GRID_SIZE,
  DEFAULT_NUMBER_OF_OBSTACLES,
  KEY_CODE_TO_DIRECTION,
} from "./../constants";
import createGameEngine from "../lib/2048-game";
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

let isReadyForUserInput = true;

const onKeyDownHandler = function (e) {
  if (!isReadyForUserInput) return;

  if (Object.keys(KEY_CODE_TO_DIRECTION).includes(e.code)) {
    isReadyForUserInput = false;
    slideAndMergeTiles({ direction: KEY_CODE_TO_DIRECTION[e.code] });
    insertNumberTileRandomly({ id: ++tileId });
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
