// Fractal parameter constraints
export const FRACTAL_CONSTRAINTS = {
  ANGLE: {
    MIN: 5,
    MAX: 60,
    STEP: 0.5,
    DEFAULT: 25,
  },
  SCALE: {
    MIN: 0.5,
    MAX: 0.9,
    STEP: 0.01,
    DEFAULT: 0.7,
  },
  DEPTH: {
    MIN: 5,
    MAX: 15,
    STEP: 1,
    DEFAULT: 10,
  },
} as const;

// Default colors
export const DEFAULT_COLORS = {
  START: '#39FF14',
  END: '#FF4500',
} as const;

// Canvas rendering constants
export const CANVAS_CONSTANTS = {
  BACKGROUND_COLOR: '#0a0a0a',
  INITIAL_LENGTH_DIVISOR: 6,
  TREE_BASE_OFFSET: 50,
  INITIAL_ANGLE: -Math.PI / 2,
  MIN_LINE_WIDTH: 0.5,
  LINE_WIDTH_MULTIPLIER: 0.8,
  SHADOW_BLUR_BASE: 15,
  SHADOW_BLUR_MULTIPLIER: 2,
  ALPHA_REDUCTION: 0.3,
} as const;

// UI constants
export const UI_CONSTANTS = {
  SHARE_BUTTON_FEEDBACK_DURATION: 2000, // ms
} as const;
