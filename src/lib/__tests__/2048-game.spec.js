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

  describe("moveAndMergeCells", () => {
    it("should move cells right and merge the same values", () => {
      const { DIRECTION, state, loadGrid, moveAndMergeCells } =
        create2048Game();

      loadGrid([
        [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
        [{ value: 1 }, { value: 1 }, null, { value: 2 }],
        [{ value: 4 }, { value: 4 }, null, null],
        [{ value: 8 }, { value: 8 }, null, { value: 8 }],
      ]);

      moveAndMergeCells({ direction: DIRECTION.RIGHT });

      expect(state.grid).toMatchObject([
        [null, null, { value: 2 }, { value: 2 }],
        [null, null, { value: 2 }, { value: 2 }],
        [null, null, null, { value: 8 }],
        [null, null, { value: 8 }, { value: 16 }],
      ]);
    });

    it("should move cells left and merge the same values", () => {
      const { DIRECTION, state, loadGrid, moveAndMergeCells } =
        create2048Game();

      loadGrid([
        [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
        [{ value: 1 }, { value: 1 }, null, { value: 2 }],
        [{ value: 4 }, { value: 4 }, null, null],
        [{ value: 8 }, { value: 8 }, null, { value: 8 }],
      ]);

      moveAndMergeCells({ direction: DIRECTION.LEFT });

      expect(state.grid).toMatchObject([
        [{ value: 2 }, { value: 2 }, null, null],
        [{ value: 2 }, { value: 2 }, null, null],
        [{ value: 8 }, null, null, null],
        [{ value: 16 }, { value: 8 }, null, null],
      ]);
    });

    it("should move cells up and merge the same values", () => {
      const { DIRECTION, state, loadGrid, moveAndMergeCells } =
        create2048Game();

      loadGrid([
        [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
        [{ value: 1 }, { value: 1 }, null, { value: 2 }],
        [{ value: 8 }, { value: 2 }, null, null],
        [{ value: 8 }, { value: 8 }, { value: 2 }, { value: 8 }],
      ]);

      moveAndMergeCells({ direction: DIRECTION.UP });

      expect(state.grid).toMatchObject([
        [{ value: 2 }, { value: 2 }, { value: 1 }, { value: 1 }],
        [{ value: 16 }, { value: 2 }, { value: 2 }, { value: 2 }],
        [null, { value: 8 }, null, { value: 8 }],
        [null, null, null, null],
      ]);
    });

    it("should move cells down and merge the same values", () => {
      const { DIRECTION, state, loadGrid, moveAndMergeCells } =
        create2048Game();

      loadGrid([
        [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
        [{ value: 1 }, { value: 1 }, null, { value: 2 }],
        [{ value: 8 }, { value: 2 }, null, null],
        [{ value: 8 }, { value: 8 }, { value: 2 }, { value: 8 }],
      ]);

      moveAndMergeCells({ direction: DIRECTION.DOWN });

      expect(state.grid).toMatchObject([
        [null, null, null, null],
        [null, { value: 2 }, null, { value: 1 }],
        [{ value: 2 }, { value: 2 }, { value: 1 }, { value: 2 }],
        [{ value: 16 }, { value: 8 }, { value: 2 }, { value: 8 }],
      ]);
    });
  });
});
