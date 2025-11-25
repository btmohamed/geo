import { create } from 'zustand';
import { FRACTAL_CONSTRAINTS, DEFAULT_COLORS } from './constants';

export interface FractalState {
  angle: number;
  scaleFactor: number;
  depth: number;
  color: string;
  colorEnd: string;
  showIntro: boolean;
  setAngle: (angle: number) => void;
  setScaleFactor: (factor: number) => void;
  setDepth: (depth: number) => void;
  setColor: (color: string) => void;
  setColorEnd: (color: string) => void;
  completeIntro: () => void;
  loadFromParams: (params: URLSearchParams) => void;
  getShareURL: () => string;
}

export const useFractalStore = create<FractalState>((set, get) => ({
  angle: FRACTAL_CONSTRAINTS.ANGLE.DEFAULT,
  scaleFactor: FRACTAL_CONSTRAINTS.SCALE.DEFAULT,
  depth: FRACTAL_CONSTRAINTS.DEPTH.DEFAULT,
  color: DEFAULT_COLORS.START,
  colorEnd: DEFAULT_COLORS.END,
  showIntro: true,
  
  setAngle: (angle) => set({ angle }),
  setScaleFactor: (scaleFactor) => set({ scaleFactor }),
  setDepth: (depth) => set({ depth }),
  setColor: (color) => set({ color }),
  setColorEnd: (colorEnd) => set({ colorEnd }),
  completeIntro: () => set({ showIntro: false }),
  
  loadFromParams: (params) => {
    const updates: Partial<FractalState> = {};

    // Validate and parse angle
    const angleStr = params.get('a');
    if (angleStr) {
      const angle = parseFloat(angleStr);
      if (!isNaN(angle) && angle >= FRACTAL_CONSTRAINTS.ANGLE.MIN && angle <= FRACTAL_CONSTRAINTS.ANGLE.MAX) {
        updates.angle = angle;
      }
    }

    // Validate and parse scale factor
    const scaleStr = params.get('s');
    if (scaleStr) {
      const scale = parseFloat(scaleStr);
      if (!isNaN(scale) && scale >= FRACTAL_CONSTRAINTS.SCALE.MIN && scale <= FRACTAL_CONSTRAINTS.SCALE.MAX) {
        updates.scaleFactor = scale;
      }
    }

    // Validate and parse depth
    const depthStr = params.get('d');
    if (depthStr) {
      const depth = parseInt(depthStr, 10);
      if (!isNaN(depth) && depth >= FRACTAL_CONSTRAINTS.DEPTH.MIN && depth <= FRACTAL_CONSTRAINTS.DEPTH.MAX) {
        updates.depth = depth;
      }
    }

    // Validate and parse color (hex format)
    const colorStr = params.get('c');
    if (colorStr && /^[0-9A-Fa-f]{6}$/.test(colorStr)) {
      updates.color = `#${colorStr}`;
    }

    // Validate and parse end color (hex format)
    const colorEndStr = params.get('c2');
    if (colorEndStr && /^[0-9A-Fa-f]{6}$/.test(colorEndStr)) {
      updates.colorEnd = `#${colorEndStr}`;
    }

    if (Object.keys(updates).length > 0) {
      updates.showIntro = false;
    }

    set(updates);
  },

  getShareURL: () => {
    if (typeof window === 'undefined') return '';
    
    const state = get();
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('a', state.angle.toFixed(1));
    url.searchParams.set('s', state.scaleFactor.toFixed(2));
    url.searchParams.set('d', state.depth.toString());
    url.searchParams.set('c', state.color.replace('#', ''));
    url.searchParams.set('c2', state.colorEnd.replace('#', ''));
    return url.toString();
  },
}));
