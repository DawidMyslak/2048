<template>
  <div class="game-dashboard">
    <div class="section">
      <span class="title">SCORE</span>
      <div class="score">{{ state.score }}</div>
    </div>
    <div class="section">
      <span class="title">GRID</span>
      <div class="selection">
        <button
          v-for="option in GRID_OPTIONS"
          class="button"
          :class="{ 'button-active': gameConfig.gridSize === option.value }"
          :key="option.value"
          @click="gameConfig.gridSize = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    <div class="section">
      <span class="title">OBSTACLES</span>
      <div class="selection">
        <button
          v-for="option in OBSTACLES_OPTIONS"
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
    </div>
    <div>
      <button
        class="button button-large"
        @click="$emit('click:newGame', gameConfig)"
      >
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

const GRID_OPTIONS = [
  { value: 4, label: "4x4" },
  { value: 5, label: "5x5" },
  { value: 6, label: "6x6" },
  { value: 7, label: "7x7" },
  { value: 8, label: "8x8" },
];

const OBSTACLES_OPTIONS = [
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
  padding: 24px;
  margin-right: 12px;
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #555;
}

.score {
  font-weight: bold;
  color: #000;
  font-size: 32px;
}

.button {
  min-width: 42px;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 0;
  margin: 2px 4px 2px 0;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #888;
  border-radius: 8px;
  color: #000;
}

.button:hover {
  border-color: #444;
}

.button:focus {
  outline: none;
}

.button:last-child {
  margin-right: 0;
}

.button-active {
  background-color: #888;
  color: #fff;
}

.button-large {
  font-size: 20px;
  padding: 8px 12px;
}
</style>
