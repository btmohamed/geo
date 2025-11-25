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

  const alpha = 1 - (currentDepth / params.depth) * 0.3;
  ctx.strokeStyle = currentColor;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = Math.max(0.5, params.depth - currentDepth * 0.8);
  
  // Enhanced glow effect
  ctx.shadowBlur = 15 + (params.depth - currentDepth) * 2;
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

  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const startX = canvas.width / 2;
  const startY = canvas.height - 50;
  const initialLength = Math.min(canvas.width, canvas.height) / 6;
  const initialAngle = -Math.PI / 2;

  drawFractalTree(ctx, startX, startY, initialLength, initialAngle, params);
}
