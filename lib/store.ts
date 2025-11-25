import { create } from 'zustand';

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
  angle: 25,
  scaleFactor: 0.7,
  depth: 10,
  color: '#39FF14',
  colorEnd: '#FF4500',
  showIntro: true,
  
  setAngle: (angle) => set({ angle }),
  setScaleFactor: (scaleFactor) => set({ scaleFactor }),
  setDepth: (depth) => set({ depth }),
  setColor: (color) => set({ color }),
  setColorEnd: (colorEnd) => set({ colorEnd }),
  completeIntro: () => set({ showIntro: false }),
  
  loadFromParams: (params) => {
    const updates: Partial<FractalState> = {};
    
    const angle = params.get('a');
    if (angle) updates.angle = parseFloat(angle);
    
    const scale = params.get('s');
    if (scale) updates.scaleFactor = parseFloat(scale);
    
    const depth = params.get('d');
    if (depth) updates.depth = parseInt(depth);
    
    const color = params.get('c');
    if (color) updates.color = `#${color}`;
    
    const colorEnd = params.get('c2');
    if (colorEnd) updates.colorEnd = `#${colorEnd}`;
    
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
