<template>
  <div class="game-dashboard">
    <div class="section">
      <span class="title">SCORE</span>
      <div class="score">{{ state.score }}</div>
    </div>
    <div class="section section-grid">
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
    <button
      class="button button-large"
      @click="$emit('click:newGame', gameConfig)"
    >
      NEW GAME
    </button>
    <div class="author">© 2023 <strong>Dawid Myślak</strong></div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import {
  DEFAULT_GRID_SIZE,
  DEFAULT_NUMBER_OF_OBSTACLES,
  GRID_OPTIONS,
  OBSTACLES_OPTIONS,
} from "@/constants";

const gameEngine = inject("gameEngine");
const { state } = gameEngine;

const gameConfig = reactive({
  gridSize: DEFAULT_GRID_SIZE,
  numberOfObstacles: DEFAULT_NUMBER_OF_OBSTACLES,
});
</script>

<style scoped>
.game-dashboard {
  border-radius: 24px;
  background-color: #f1f1f1;
  padding: 24px;
  margin: 0 12px 0 0;
  position: relative;
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
  width: 100%;
  font-size: 20px;
  padding: 8px 12px;
}

.author {
  position: absolute;
  font-size: 13px;
  color: #444;
  bottom: 24px;
}

@media (max-width: 480px) {
  .game-dashboard {
    margin: 0 0 12px 0;
    min-width: 376px;
  }

  .section-grid {
    display: none;
  }

  .author {
    top: 24px;
    right: 24px;
    bottom: auto;
  }
}
</style>
