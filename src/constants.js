export const DEFAULT_GRID_SIZE = 6; // 6x6 tiles
export const DEFAULT_NUMBER_OF_OBSTACLES = 0;

export const TILE_SIZE = 80; // px
export const TILE_SPACING = 4; // 4px

export const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

export const KEYBOARD_ARROW_CODE_TO_DIRECTION = {
  ArrowLeft: DIRECTION.LEFT,
  ArrowRight: DIRECTION.RIGHT,
  ArrowUp: DIRECTION.UP,
  ArrowDown: DIRECTION.DOWN,
};

export const GRID_OPTIONS = [
  { value: 4, label: "4x4" },
  { value: 5, label: "5x5" },
  { value: 6, label: "6x6" },
  { value: 7, label: "7x7" },
  { value: 8, label: "8x8" },
];

export const OBSTACLES_OPTIONS = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];
