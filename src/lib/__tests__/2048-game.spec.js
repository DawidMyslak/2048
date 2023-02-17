import { describe, it, expect } from "vitest";

import createGameEngine from "../2048-game";

describe("2048-game", () => {
  describe("initNewGame", () => {
    it("should initialise the game", () => {
      const { state, initNewGame } = createGameEngine();

      initNewGame({ gridSize: 4 });

      expect(state.score).toEqual(0);
      expect(state.grid).toMatchObject([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]);
    });
  });

  describe("insertRandomlyNewTile", () => {
    it("should insert randomly a new tile and return true", () => {
      const { initNewGame, insertRandomlyNewTile } = createGameEngine();

      initNewGame({ gridSize: 4 });
      const hasSucceeded = insertRandomlyNewTile();

      expect(hasSucceeded).toEqual(true);
    });

    it("should not insert a new tile when there is no space and return false", () => {
      const { loadGrid, insertRandomlyNewTile } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 4 }],
        [{ value: 8 }, { value: 16 }],
      ]);
      const hasSucceeded = insertRandomlyNewTile();

      expect(hasSucceeded).toEqual(false);
    });

    it("should insert a new tile into the last empty space", () => {
      const { state, loadGrid, insertRandomlyNewTile } = createGameEngine();

      loadGrid([
        [{ value: 2 }, { value: 4 }],
        [{ value: 8 }, null],
      ]);
      insertRandomlyNewTile();

      expect(state.grid).toMatchObject([
        [{ value: 2 }, { value: 4 }],
        [{ value: 8 }, { value: 2 }],
      ]);
    });
  });

  describe("slideAndMergeTiles", () => {
    it("should slide tiles right and merge the same values", () => {
      const { DIRECTION, state, loadGrid, slideAndMergeTiles } =
        createGameEngine();

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
      const { DIRECTION, state, loadGrid, slideAndMergeTiles } =
        createGameEngine();

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
      const { DIRECTION, state, loadGrid, slideAndMergeTiles } =
        createGameEngine();

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
      const { DIRECTION, state, loadGrid, slideAndMergeTiles } =
        createGameEngine();

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
