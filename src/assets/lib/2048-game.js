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

  function insertRandomlyNewCell() {
    const cell = {
      id: id++,
      value: 1,
    };

    state.grid[0][0] = cell;
  }

  function moveAndMergeCellsInRow({ rowIndex, direction }) {
    let emptyIndex = null;
    let numberIndex = null;
    let lastMergedNumberIndex = 0;

    const getCell = (i) => {
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

    const setCell = (i, cell) => {
      switch (direction) {
        case DIRECTION.LEFT:
          state.grid[rowIndex][i] = cell;
          break;
        case DIRECTION.RIGHT:
          state.grid[rowIndex][state.grid.length - 1 - i] = cell;
          break;
        case DIRECTION.UP:
          state.grid[i][rowIndex] = cell;
          break;
        case DIRECTION.DOWN:
          state.grid[state.grid.length - 1 - i][rowIndex] = cell;
          break;
      }
    };

    for (let i = 0; i < state.grid.length; i++) {
      if (getCell(i) === null) {
        // found an empty cell
        if (emptyIndex === null) {
          emptyIndex = i;
        }
      } else {
        // found a number
        numberIndex = i;

        if (emptyIndex !== null) {
          // move number to the empty cell
          setCell(emptyIndex, getCell(numberIndex));
          setCell(numberIndex, null);
          numberIndex = emptyIndex;
          emptyIndex++;
        }

        if (
          getCell(numberIndex - 1)?.value === getCell(numberIndex).value &&
          numberIndex > lastMergedNumberIndex
        ) {
          // neighbour numbers the same, merge them
          const mergedCell = getCell(numberIndex);
          mergedCell.value *= 2;

          setCell(numberIndex - 1, mergedCell);
          setCell(numberIndex, null);
          emptyIndex = numberIndex;
          lastMergedNumberIndex = numberIndex;
        }
      }
    }
  }

  function moveAndMergeCells({ direction }) {
    for (let i = 0; i < state.grid.length; i++) {
      moveAndMergeCellsInRow({ rowIndex: i, direction });
    }
  }

  return {
    DIRECTION,
    state,
    init,
    loadGrid,
    insertRandomlyNewCell,
    moveAndMergeCells,
  };
}
