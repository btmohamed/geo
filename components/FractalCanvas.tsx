'use client';

import { useEffect, useRef, memo } from 'react';
import { useFractalStore } from '@/lib/store';
import { renderFractalTree } from '@/lib/fractals';

function FractalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { angle, scaleFactor, depth, color, colorEnd } = useFractalStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resizeCanvas = () => {
      // Debounce resize events
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFractalTree(canvas, { angle, scaleFactor, depth, color, colorEnd });
      }, 150);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFractalTree(canvas, { angle, scaleFactor, depth, color, colorEnd });

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Debounce rendering with requestAnimationFrame for smooth updates
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }

    renderTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        renderFractalTree(canvas, { angle, scaleFactor, depth, color, colorEnd });
      });
    }, 16); // ~60fps

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [angle, scaleFactor, depth, color, colorEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#050505', zIndex: 0 }}
      aria-label="Interactive fractal tree visualization"
      role="img"
    />
  );
}

export default memo(FractalCanvas);
