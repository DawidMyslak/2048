import { describe, it, expect } from "vitest";
import { DIRECTION } from "./../../constants";
import createGameEngine from "../2048-game";

describe("2048-game", () => {
  describe("initGame", () => {
    it("should initialise the game", () => {
      const { state, initGame } = createGameEngine();

      initGame({ gridSize: 4 });

      expect(state.score).toEqual(0);
      expect(state).toMatchObject({
        isGameCompleted: false,
        isGameOver: false,
        score: 0,
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      });
    });
  });

  describe("insertTileRandomly", () => {
    it("should insert randomly a new tile", () => {
      const { state, initGame, insertTileRandomly } = createGameEngine();

      initGame({ gridSize: 4 });
      insertTileRandomly({ value: 2 });
      insertTileRandomly({ value: 4 });

      let tileCounter = 0;

      for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid.length; j++) {
          if (state.grid[i][j] !== null) {
            tileCounter++;
          }
        }
      }

      expect(tileCounter).toEqual(2);
    });

    it("should not insert a new tile when there is no empty space", () => {
      const { state, loadGrid, insertTileRandomly } = createGameEngine();

      loadGrid([
        [{ value: 4 }, { value: 32 }],
        [{ value: 8 }, { value: 16 }],
      ]);
      insertTileRandomly({ value: 2 });

      expect(state.grid).toMatchObject([
        [{ value: 4 }, { value: 32 }],
        [{ value: 8 }, { value: 16 }],
      ]);
    });

    it("should insert a new tile into the last empty space", () => {
      const { state, loadGrid, insertTileRandomly } = createGameEngine();

      loadGrid([
        [{ value: 4 }, { value: 32 }],
        [{ value: 8 }, null],
      ]);
      insertTileRandomly({ value: 2 });

      expect(state.grid).toMatchObject([
        [{ value: 4 }, { value: 32 }],
        [{ value: 8 }, { value: 2 }],
      ]);
    });
  });

  describe("slideAndMergeTiles", () => {
    it("should slide tiles right and merge the same values", () => {
      const { state, loadGrid, slideAndMergeTiles } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 2 }, { value: 2 }, null, { value: 4 }],
        [{ value: 8 }, { value: 8 }, null, null],
        [{ value: 16 }, { value: 16 }, null, { value: 16 }],
      ]);

      slideAndMergeTiles({ direction: DIRECTION.RIGHT });

      expect(state.grid).toMatchObject([
        [null, null, { value: 4 }, { value: 4 }],
        [null, null, { value: 4 }, { value: 4 }],
        [null, null, null, { value: 16 }],
        [null, null, { value: 16 }, { value: 32 }],
      ]);
    });

    it("should slide tiles left and merge the same values", () => {
      const { state, loadGrid, slideAndMergeTiles } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 2 }, { value: 2 }, null, { value: 4 }],
        [{ value: 8 }, { value: 8 }, null, null],
        [{ value: 16 }, { value: 16 }, null, { value: 16 }],
      ]);

      slideAndMergeTiles({ direction: DIRECTION.LEFT });

      expect(state.grid).toMatchObject([
        [{ value: 4 }, { value: 4 }, null, null],
        [{ value: 4 }, { value: 4 }, null, null],
        [{ value: 16 }, null, null, null],
        [{ value: 32 }, { value: 16 }, null, null],
      ]);
    });

    it("should slide tiles up and merge the same values", () => {
      const { state, loadGrid, slideAndMergeTiles } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 2 }, { value: 2 }, null, { value: 4 }],
        [{ value: 16 }, { value: 4 }, null, null],
        [{ value: 16 }, { value: 16 }, { value: 4 }, { value: 16 }],
      ]);

      slideAndMergeTiles({ direction: DIRECTION.UP });

      expect(state.grid).toMatchObject([
        [{ value: 4 }, { value: 4 }, { value: 2 }, { value: 2 }],
        [{ value: 32 }, { value: 4 }, { value: 4 }, { value: 4 }],
        [null, { value: 16 }, null, { value: 16 }],
        [null, null, null, null],
      ]);
    });

    it("should slide tiles down and merge the same values", () => {
      const { state, loadGrid, slideAndMergeTiles } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [{ value: 2 }, { value: 2 }, null, { value: 4 }],
        [{ value: 16 }, { value: 4 }, null, null],
        [{ value: 16 }, { value: 16 }, { value: 4 }, { value: 16 }],
      ]);

      slideAndMergeTiles({ direction: DIRECTION.DOWN });

      expect(state.grid).toMatchObject([
        [null, null, null, null],
        [null, { value: 4 }, null, { value: 2 }],
        [{ value: 4 }, { value: 4 }, { value: 2 }, { value: 4 }],
        [{ value: 32 }, { value: 16 }, { value: 4 }, { value: 16 }],
      ]);
    });
  });
});
