<template>
  <div class="game-container">
    <div class="score">SCORE: {{ state.score }}</div>
    <GameGrid />
  </div>
</template>

<script setup>
import { provide, onBeforeMount, onBeforeUnmount } from "vue";
import { GRID_SIZE } from "./../constants";
import createGameEngine from "../lib/2048-game";
import GameGrid from "./GameGrid.vue";

const gameEngine = createGameEngine();
provide("gameEngine", gameEngine);

const {
  DIRECTION,
  state,
  initNewGame,
  insertRandomlyNewTile,
  slideAndMergeTiles,
} = gameEngine;

let tileId = 0;

initNewGame({ gridSize: GRID_SIZE });
insertRandomlyNewTile({ id: ++tileId });

const KEY_CODE_TO_DIRECTION = {
  ArrowRight: DIRECTION.RIGHT,
  ArrowLeft: DIRECTION.LEFT,
  ArrowUp: DIRECTION.UP,
  ArrowDown: DIRECTION.DOWN,
};
let isReadyForUserInput = true;

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
.score {
  font-weight: bold;
  color: #000;
  font-size: 32px;
  padding: 0 8px 8px;
}
</style>
