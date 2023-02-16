<template>
  <div class="game-container">
    <div
      class="grid"
      :style="{
        width: GRID_SIZE * (CELL_SIZE + 2 * CELL_SPACING) + 'px',
        height: GRID_SIZE * (CELL_SIZE + 2 * CELL_SPACING) + 'px',
      }"
    >
      <div
        v-for="index in state.grid.length * state.grid.length"
        class="cell--bg"
        :key="index"
        :style="{
          width: CELL_SIZE + 'px',
          height: CELL_SIZE + 'px',
          margin: CELL_SPACING + 'px',
        }"
      ></div>
      <div
        v-for="(cell, index) in cells"
        class="cell"
        :class="'cell--value-' + cell.value"
        :key="cell.id || 'empty-' + index"
        :style="{
          left: cell.x + 'px',
          top: cell.y + 'px',
          width: CELL_SIZE + 'px',
          height: CELL_SIZE + 'px',
        }"
      >
        {{ cell.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount } from "vue";
import create2048Game from "../lib/2048-game";

const { DIRECTION, state, loadGrid, moveAndMergeCells } = create2048Game();
const GRID_SIZE = 4; // 4 x 4 cells
const CELL_SIZE = 80; // px
const CELL_SPACING = 4; // px

loadGrid([
  [
    { id: 1, value: 2 },
    { id: 2, value: 2 },
    { id: 3, value: 2 },
    { id: 4, value: 2 },
  ],
  [{ id: 5, value: 2 }, { id: 6, value: 2 }, null, { id: 7, value: 2 }],
  [{ id: 8, value: 4 }, { id: 9, value: 4 }, null, null],
  [{ id: 10, value: 8 }, { id: 11, value: 8 }, null, { id: 12, value: 8 }],
]);

const cells = computed(() => {
  const result = [];

  // extract non-empty cells from the grid
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid.length; j++) {
      if (state.grid[i][j]) {
        result.push({
          ...state.grid[i][j],
          x: CELL_SPACING + j * (CELL_SIZE + 2 * CELL_SPACING),
          y: CELL_SPACING + i * (CELL_SIZE + 2 * CELL_SPACING),
        });
      }
    }
  }

  // keeping the same cells order is important as Vue can use the "key"
  // to track each cell component and not recreate them every singe time
  // when re-rendering the list, in this way CSS transitions are also possible
  result.sort((a, b) => {
    return a.id - b.id;
  });

  return result;
});

const onKeydownHandler = function (e) {
  switch (e.code) {
    case "ArrowRight":
      moveAndMergeCells({ direction: DIRECTION.RIGHT });
      break;
    case "ArrowLeft":
      moveAndMergeCells({ direction: DIRECTION.LEFT });
      break;
    case "ArrowUp":
      moveAndMergeCells({ direction: DIRECTION.UP });
      break;
    case "ArrowDown":
      moveAndMergeCells({ direction: DIRECTION.DOWN });
      break;
  }
};

onBeforeMount(() => {
  window.addEventListener("keydown", onKeydownHandler, null);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydownHandler);
});
</script>

<style scoped>
.game-container {
  border-radius: 24px;
  background-color: #f1f1f1;
  user-select: none;
  padding: 12px;
}

.grid {
  position: relative;
}

.cell--bg {
  background-color: #e9e9e9;
  display: block;
  float: left;
  border-radius: 16px;
}

.cell {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.2s;
  transition-property: left, top;
  border-radius: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 0 rgba(26, 67, 114, 0.5);
  font-size: 32px;
}

.cell--value-2 {
  background-color: #ebdbd1;
}

.cell--value-4 {
  background-color: #f6ca84;
}

.cell--value-8 {
  background-color: #ec8b81;
}

.cell--value-16 {
  background-color: #dd5c67;
}

.cell--value-32 {
  background-color: #9a3471;
}

.cell--value-64 {
  background-color: #5f2872;
}

.cell--value-128 {
  background-color: #000;
}

.cell--value-256 {
  background-color: #000;
}
</style>
