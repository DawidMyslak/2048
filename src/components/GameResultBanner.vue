<template>
  <div class="game-result-banner">
    <span class="heading" v-if="state.isGameCompleted">WOOHOO 😃</span>
    <span class="heading" v-else-if="state.isGameOver">OH NO 😔</span>
    <span class="score-title">SCORE</span>
    <span class="score-value">{{ state.score }}</span>
  </div>
</template>

<script setup>
import { inject } from "vue";

const gameEngine = inject("gameEngine");
const { state } = gameEngine;
</script>

<style scoped>
.game-result-banner {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 48px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  border: 4px solid #bbb;
}

.heading {
  font-weight: bold;
  font-size: 32px;
  color: #000;
  margin-bottom: 16px;
}

.score-title {
  font-weight: bold;
  font-size: 14px;
  color: #555;
}

.score-value {
  font-weight: bold;
  font-size: 24px;
  color: #333;
  animation: score-animation 1s ease-in-out infinite;
}

@keyframes score-animation {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.9);
  }
}
</style>
