import { CANVAS_CONSTANTS } from './constants';

export interface FractalParams {
  angle: number;
  scaleFactor: number;
  depth: number;
  color: string;
  colorEnd: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 57, g: 255, b: 20 };
}

function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

export function drawFractalTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  angle: number,
  params: FractalParams,
  currentDepth: number = 0
) {
  if (currentDepth >= params.depth) return;

  const endX = x + length * Math.cos(angle);
  const endY = y + length * Math.sin(angle);

  // Gradient color based on depth
  const colorFactor = currentDepth / params.depth;
  const currentColor = interpolateColor(params.color, params.colorEnd, colorFactor);

  const alpha = 1 - (currentDepth / params.depth) * CANVAS_CONSTANTS.ALPHA_REDUCTION;
  ctx.strokeStyle = currentColor;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = Math.max(CANVAS_CONSTANTS.MIN_LINE_WIDTH, params.depth - currentDepth * CANVAS_CONSTANTS.LINE_WIDTH_MULTIPLIER);

  // Enhanced glow effect
  ctx.shadowBlur = CANVAS_CONSTANTS.SHADOW_BLUR_BASE + (params.depth - currentDepth) * CANVAS_CONSTANTS.SHADOW_BLUR_MULTIPLIER;
  ctx.shadowColor = currentColor;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  const newLength = length * params.scaleFactor;
  const angleOffset = (params.angle * Math.PI) / 180;

  drawFractalTree(
    ctx,
    endX,
    endY,
    newLength,
    angle - angleOffset,
    params,
    currentDepth + 1
  );

  drawFractalTree(
    ctx,
    endX,
    endY,
    newLength,
    angle + angleOffset,
    params,
    currentDepth + 1
  );
}

export function renderFractalTree(
  canvas: HTMLCanvasElement,
  params: FractalParams
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = CANVAS_CONSTANTS.BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const startX = canvas.width / 2;
  const startY = canvas.height - CANVAS_CONSTANTS.TREE_BASE_OFFSET;
  const initialLength = Math.min(canvas.width, canvas.height) / CANVAS_CONSTANTS.INITIAL_LENGTH_DIVISOR;
  const initialAngle = CANVAS_CONSTANTS.INITIAL_ANGLE;

  drawFractalTree(ctx, startX, startY, initialLength, initialAngle, params);
}
