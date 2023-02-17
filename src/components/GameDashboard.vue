<template>
  <div class="game-dashboard">
    <div class="score">SCORE: {{ state.score }}</div>
    <div>
      GRID:
      <select v-model="gameConfig.gridSize">
        <option value="4">4x4</option>
        <option value="5">5x5</option>
        <option value="6">6x6</option>
        <option value="7">7x7</option>
        <option value="8">8x8</option>
      </select>
    </div>
    <div>
      OBSTACLES:
      <select v-model="gameConfig.numberOfObstacles">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <div>
      <button @click="$emit('click:newGame', gameConfig)">NEW GAME</button>
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
</script>

<style scoped>
.score {
  font-weight: bold;
  color: #000;
  font-size: 32px;
  padding: 0 8px 8px;
}
</style>
