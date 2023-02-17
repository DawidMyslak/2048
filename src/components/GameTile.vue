<template>
  <div
    class="game-tile"
    :class="['type-' + tile.type, 'value-' + tile.value]"
    :style="{
      left: tile.x + 'px',
      top: tile.y + 'px',
      width: TILE_SIZE + 'px',
      height: TILE_SIZE + 'px',
    }"
  >
    {{ tile.type === "number" ? tile.value : "" }}
  </div>
</template>

<script setup>
import { TILE_SIZE } from "./../constants";

defineProps({
  tile: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.game-tile {
  position: absolute;
  display: flex;
  border-radius: 16px;
  transition-duration: 0.2s;
  transition-property: left, top;
}

.type-obstacle {
  background-color: #444;
  border: 4px solid #333;
}

.type-number {
  background-color: #222;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  text-shadow: 1px 1px 0 rgba(26, 67, 114, 0.5);
  animation: tile-animation 0.2s ease-in;
}

.value-2 {
  background-color: #ebdbd1;
}

.value-4 {
  background-color: #f6ca84;
}

.value-8 {
  background-color: #e79187;
}

.value-16 {
  background-color: #dd5c67;
}

.value-32 {
  background-color: #aa3d46;
}

.value-64 {
  background-color: #9a3471;
}

.value-128 {
  background-color: #7f1f59;
  font-size: 28px;
}

.value-256 {
  background-color: #5f2872;
  font-size: 28px;
}

.value-512 {
  background-color: #421053;
  font-size: 28px;
}

.value-1024 {
  background-color: #d5b541;
  font-size: 24px;
}

.value-2048 {
  background-color: #f5c519;
  font-size: 24px;
}

@keyframes tile-animation {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
