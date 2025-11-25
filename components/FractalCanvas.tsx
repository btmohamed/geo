'use client';

import { useEffect, useRef } from 'react';
import { useFractalStore } from '@/lib/store';
import { renderFractalTree } from '@/lib/fractals';

export default function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { angle, scaleFactor, depth, color, colorEnd } = useFractalStore();

  useEffect(() => {
    console.log('[CANVAS] Component mounted');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('[CANVAS] Canvas ref not found!');
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('[CANVAS] Resized to', canvas.width, 'x', canvas.height);
      
      renderFractalTree(canvas, { angle, scaleFactor, depth, color, colorEnd });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      console.log('[CANVAS] Cleanup');
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startTime = performance.now();
    console.log('[CANVAS] Rendering with:', { angle, scaleFactor, depth, color, colorEnd });
    
    renderFractalTree(canvas, { angle, scaleFactor, depth, color, colorEnd });
    
    const renderTime = performance.now() - startTime;
    console.log('[CANVAS] Render completed in', renderTime.toFixed(2), 'ms');
    
    if (renderTime > 50) {
      console.warn('[CANVAS] Slow render detected. Consider reducing depth.');
    }
  }, [angle, scaleFactor, depth, color, colorEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#050505', zIndex: 0 }}
    />
  );
}
