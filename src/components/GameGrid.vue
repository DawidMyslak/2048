<template>
  <div class="game-grid">
    <div
      class="box"
      :style="{
        width: GRID_SIZE * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
        height: GRID_SIZE * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
      }"
    >
      <GameTileEmpty
        v-for="index in state.grid.length * state.grid.length"
        :key="index"
      />
      <GameTile v-for="tile in tiles" :tile="tile" :key="tile.id" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import { GRID_SIZE, TILE_SIZE, TILE_SPACING } from "./../constants";
import GameTile from "./GameTile.vue";
import GameTileEmpty from "./GameTileEmpty.vue";

const gameEngine = inject("gameEngine");
const { state } = gameEngine;

const tiles = computed(() => {
  const result = [];

  // extract non-empty tiles from the grid
  // and fletten them to an array
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid.length; j++) {
      if (state.grid[i][j]) {
        result.push({
          ...state.grid[i][j],
          x: TILE_SPACING + j * (TILE_SIZE + 2 * TILE_SPACING),
          y: TILE_SPACING + i * (TILE_SIZE + 2 * TILE_SPACING),
        });
      }
    }
  }

  // keeping the same tiles order is important as Vue can use the :key="tile.id"
  // to track each tile component and not recreate them every singe time
  // when re-rendering the list, in this way CSS transitions are also possible
  result.sort((a, b) => {
    return a.id - b.id;
  });

  return result;
});
</script>

<style scoped>
.game-grid {
  border-radius: 24px;
  background-color: #f1f1f1;
  user-select: none;
  padding: 12px;
}

.box {
  position: relative;
}
</style>
