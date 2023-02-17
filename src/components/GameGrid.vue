<template>
  <div class="game-grid">
    <div
      class="box"
      :style="{
        width: state.grid.length * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
        height: state.grid.length * (TILE_SIZE + 2 * TILE_SPACING) + 'px',
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
import { TILE_SIZE, TILE_SPACING } from "./../constants";
import GameTile from "./GameTile.vue";
import GameTileEmpty from "./GameTileEmpty.vue";

const gameEngine = inject("gameEngine");
const { state, getTiles } = gameEngine;

const tiles = computed(() => {
  return getTiles.value
    .map(({ tile, positionInGrid }) => {
      return {
        ...tile,
        x: TILE_SPACING + positionInGrid.j * (TILE_SIZE + 2 * TILE_SPACING),
        y: TILE_SPACING + positionInGrid.i * (TILE_SIZE + 2 * TILE_SPACING),
      };
    })
    .sort((a, b) => {
      // tiles order is important as Vue can use the :key="tile.id"
      // to track each tile component and not recreate them every singe time
      // when re-rendering the list, in this way CSS transitions are also possible
      return a.id - b.id;
    });
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
