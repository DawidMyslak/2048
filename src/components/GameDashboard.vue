<template>
  <div class="game-dashboard">
    <div class="score">SCORE: {{ state.score }}</div>
    <div class="row">
      GRID:
      <button
        v-for="option in gridOptions"
        class="button"
        :class="{ 'button-active': gameConfig.gridSize === option.value }"
        :key="option.value"
        @click="gameConfig.gridSize = option.value"
      >
        {{ option.label }}
      </button>
    </div>
    <div class="row">
      OBSTACLES:
      <button
        v-for="option in obstaclesOptions"
        class="button"
        :class="{
          'button-active': gameConfig.numberOfObstacles === option.value,
        }"
        :key="option.value"
        @click="gameConfig.numberOfObstacles = option.value"
      >
        {{ option.label }}
      </button>
    </div>
    <div>
      <button class="button" @click="$emit('click:newGame', gameConfig)">
        NEW GAME
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import { DEFAULT_GRID_SIZE, DEFAULT_NUMBER_OF_OBSTACLES } from "../constants";

const gameEngine = inject("gameEngine");
const { state } = gameEngine;

const gameConfig = reactive({
  gridSize: DEFAULT_GRID_SIZE,
  numberOfObstacles: DEFAULT_NUMBER_OF_OBSTACLES,
});

const gridOptions = [
  { value: 4, label: "4x4" },
  { value: 5, label: "5x5" },
  { value: 6, label: "6x6" },
  { value: 7, label: "7x7" },
  { value: 8, label: "8x8" },
];

const obstaclesOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];
</script>

<style scoped>
.game-dashboard {
  border-radius: 24px;
  background-color: #f1f1f1;
  padding: 12px;
  margin-bottom: 12px;
}

.score {
  font-weight: bold;
  color: #000;
  font-size: 32px;
}

button {
  font-family: inherit;
}

.button {
  min-width: 44px;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  margin: 0 4px 0 0;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #888;
  border-radius: 8px;
  color: #000;
}

.button-active {
  background-color: #888;
  color: #fff;
}

.row {
  margin-bottom: 10px;
}
</style>
