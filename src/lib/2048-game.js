import { reactive } from "vue";

const DIRECTION = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

export default function create2048Game() {
  let id = 0;

  let state = reactive({
    score: 0,
    grid: null,
  });

  function init({ gridSize }) {
    state.score = 0;

    state.grid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill(null));
  }

  function loadGrid(grid) {
    state.grid = grid;
  }

  function insertRandomlyNewTile() {
    const tile = {
      id: id++,
      value: 1,
    };

    state.grid[0][0] = tile;
  }

  function slideAndMergeTilesInRow({ rowIndex, direction }) {
    let emptyIndex = null;
    let numberIndex = null;
    let lastMergedNumberIndex = 0;

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

    for (let i = 0; i < state.grid.length; i++) {
      if (getTile(i) === null) {
        // found an empty tile
        if (emptyIndex === null) {
          emptyIndex = i;
        }
      } else {
        // found a number
        numberIndex = i;

        if (emptyIndex !== null) {
          // move number to the empty tile
          setTile(emptyIndex, getTile(numberIndex));
          setTile(numberIndex, null);
          numberIndex = emptyIndex;
          emptyIndex++;
        }

        if (
          getTile(numberIndex - 1)?.value === getTile(numberIndex).value &&
          numberIndex > lastMergedNumberIndex
        ) {
          // neighbour numbers the same, merge them
          const mergedTile = getTile(numberIndex);
          mergedTile.value *= 2;

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

  return {
    DIRECTION,
    state,
    init,
    loadGrid,
    insertRandomlyNewTile,
    slideAndMergeTiles,
  };
}
