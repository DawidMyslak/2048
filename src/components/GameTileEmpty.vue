<template>
  <div
    class="game-tile-empty"
    :style="{
      width: TILE_SIZE + 'px',
      height: TILE_SIZE + 'px',
      margin: TILE_SPACING + 'px',
    }"
  ></div>
</template>

<script setup>
import { TILE_SIZE, TILE_SPACING } from "@/constants";
</script>

<style scoped>
.game-tile-empty {
  background-color: #e9e9e9;
  display: block;
  float: left;
  border-radius: 16px;
}
</style>
