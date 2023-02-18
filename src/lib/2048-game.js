import { reactive, computed } from "vue";
import { DIRECTION } from "./../constants";

export default function createGameEngine() {
  let state = reactive({
    isGameCompleted: false,
    isGameOver: false,
    score: 0,
    grid: null,
  });

  function initGame({ gridSize }) {
    state.isGameCompleted = false;
    state.isGameOver = false;
    state.score = 0;

    state.grid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(null));
  }

  function loadGrid(grid) {
    state.grid = grid;
  }

  function findEmptyPositionsInGrid() {
    const result = [];

    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid.length; j++) {
        if (state.grid[i][j] === null) {
          result.push({ i, j });
        }
      }
    }

    return result;
  }

  function insertTileRandomly(tile) {
    const emptyPositions = findEmptyPositionsInGrid();
    if (emptyPositions.length === 0) return;

    // select random empty position
    const { i, j } =
      emptyPositions[Math.floor(Math.random() * emptyPositions.length)];

    state.grid[i][j] = tile;
  }

  function slideAndMergeTilesInRow({ rowIndex, direction }) {
    const getTile = (i) => {
      switch (direction) {
        case DIRECTION.LEFT:
          return state.grid[rowIndex][i];
        case DIRECTION.RIGHT:
          return state.grid[rowIndex][state.grid.length - 1 - i];
        case DIRECTION.UP:
          return state.grid[i]?.[rowIndex];
        case DIRECTION.DOWN:
          return state.grid[state.grid.length - 1 - i]?.[rowIndex];
      }
    };

    const setTile = (i, tile) => {
      switch (direction) {
        case DIRECTION.LEFT:
          state.grid[rowIndex][i] = tile;
          break;
        case DIRECTION.RIGHT:
          state.grid[rowIndex][state.grid.length - 1 - i] = tile;
          break;
        case DIRECTION.UP:
          state.grid[i][rowIndex] = tile;
          break;
        case DIRECTION.DOWN:
          state.grid[state.grid.length - 1 - i][rowIndex] = tile;
          break;
      }
    };

    let emptyIndex = null;
    let numberIndex = null;
    let lastMergedNumberIndex = 0;

    // sliding and merging is done in a single for-loop
    // to achieve the best performance of the algorithm
    for (let i = 0; i < state.grid.length; i++) {
      if (getTile(i) === null) {
        // found an empty space, we will start tracking
        // its position to be able to move numbers there
        if (emptyIndex === null) {
          emptyIndex = i;
        }
      } else if (getTile(i).type === "obstacle") {
        // found an obstacle, we need to reset the empty space
        // position and start looking for a new one
        emptyIndex = null;
      } else {
        // found a number
        numberIndex = i;

        if (emptyIndex !== null) {
          // move number to the empty space
          setTile(emptyIndex, getTile(numberIndex));
          setTile(numberIndex, null);
          numberIndex = emptyIndex;
          emptyIndex++;
        }

        if (
          getTile(numberIndex - 1)?.value === getTile(numberIndex).value &&
          numberIndex > lastMergedNumberIndex
        ) {
          // neighbour numbers are the same, merge them
          const mergedTile = getTile(numberIndex);
          mergedTile.value *= 2;

          // bump the score and check if 2048 tile was achieved
          state.score += mergedTile.value;
          if (mergedTile.value === 2048) state.isGameCompleted = true;

          setTile(numberIndex - 1, mergedTile);
          setTile(numberIndex, null);
          emptyIndex = numberIndex;
          lastMergedNumberIndex = numberIndex;
        }
      }
    }
  }

  function slideAndMergeTiles({ direction }) {
    for (let i = 0; i < state.grid.length; i++) {
      slideAndMergeTilesInRow({ rowIndex: i, direction });
    }
  }

  const getTiles = computed(() => {
    // extract tiles from the grid and flatten them to an array
    const result = [];

    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid.length; j++) {
        if (state.grid[i][j] !== null) {
          result.push({
            tile: state.grid[i][j],
            positionInGrid: { i, j },
          });
        }
      }
    }

    return result;
  });

  return {
    state,
    initGame,
    loadGrid,
    insertTileRandomly,
    insertNumberTileRandomly: (customProps) => {
      return insertTileRandomly({ ...customProps, type: "number", value: 2 });
    },
    insertObstacleTileRandomly: (customProps) => {
      return insertTileRandomly({ ...customProps, type: "obstacle" });
    },
    slideAndMergeTiles,
    getTiles,
  };
}
