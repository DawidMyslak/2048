import { describe, it, expect } from "vitest";

import create2048Game from "../2048-game";

describe("2048-game", () => {
  describe("init", () => {
    it("should initialise the state", () => {
      const { state, init } = create2048Game();

      init({ gridSize: 4 });

      expect(state.score).toEqual(0);
      expect(state.grid).toMatchObject([
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ]);
    });
  });

  describe("slideAndMergeTiles", () => {
    it("should slide tiles right and merge the same values", () => {
      const { DIRECTION, state, loadGrid, slideAndMergeTiles } =
        create2048Game();

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
        create2048Game();

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
        create2048Game();

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
        create2048Game();

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
