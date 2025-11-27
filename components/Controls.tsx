'use client';

import { memo, useCallback, useMemo } from 'react';
import { useFractalStore } from '@/lib/store';
import { FRACTAL_CONSTRAINTS } from '@/lib/constants';

function Controls() {
  const {
    angle,
    scaleFactor,
    depth,
    color,
    colorEnd,
    setAngle,
    setScaleFactor,
    setDepth,
    setColor,
    setColorEnd
  } = useFractalStore();

  const handleAngleChange = useCallback((value: number) => {
    setAngle(value);
  }, [setAngle]);

  const handleScaleChange = useCallback((value: number) => {
    setScaleFactor(value);
  }, [setScaleFactor]);

  const handleDepthChange = useCallback((value: number) => {
    setDepth(value);
  }, [setDepth]);

  const gradientStyle = useMemo(() => ({
    background: `linear-gradient(90deg, ${color}, ${colorEnd})`,
    border: '2px solid rgba(255, 111, 242, 0.35)',
    boxShadow: '0 0 20px rgba(255, 111, 242, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
  }), [color, colorEnd]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}
    >
      <div
        className="backdrop-blur-md rounded-2xl p-8 border-2"
        role="region"
        aria-label="Fractal controls"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 16, 35, 0.9) 0%, rgba(10, 6, 18, 0.95) 100%)',
          borderColor: 'rgba(255, 111, 242, 0.3)',
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(255, 111, 242, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3)
          `,
          minWidth: '560px'
        }}
      >
        <div className="space-y-7">
          {/* Branch Angle */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="angle-slider" className="text-base mono font-medium" style={{ color: 'var(--aurora-cyan)' }}>
                  BRANCH ANGLE
                </label>
                <div className="text-xs text-white/50 mt-1.5 serif italic">how wide the tree spreads</div>
              </div>
              <span
                className="text-2xl mono font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--aurora-pink), var(--aurora-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                aria-live="polite"
              >
                {angle.toFixed(1)}°
              </span>
            </div>
            <input
              id="angle-slider"
              type="range"
              min={FRACTAL_CONSTRAINTS.ANGLE.MIN}
              max={FRACTAL_CONSTRAINTS.ANGLE.MAX}
              step={FRACTAL_CONSTRAINTS.ANGLE.STEP}
              value={angle}
              onChange={(e) => handleAngleChange(parseFloat(e.target.value))}
              className="w-full"
              aria-label={`Branch angle: ${angle.toFixed(1)} degrees`}
              aria-valuemin={FRACTAL_CONSTRAINTS.ANGLE.MIN}
              aria-valuemax={FRACTAL_CONSTRAINTS.ANGLE.MAX}
              aria-valuenow={angle}
            />
          </div>

          {/* Scale Factor */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="scale-slider" className="text-base mono font-medium" style={{ color: 'var(--aurora-cyan)' }}>
                  SCALE FACTOR
                </label>
                <div className="text-xs text-white/50 mt-1.5 serif italic">how much smaller each branch gets</div>
              </div>
              <span
                className="text-2xl mono font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--aurora-pink), var(--aurora-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                aria-live="polite"
              >
                {scaleFactor.toFixed(2)}
              </span>
            </div>
            <input
              id="scale-slider"
              type="range"
              min={FRACTAL_CONSTRAINTS.SCALE.MIN}
              max={FRACTAL_CONSTRAINTS.SCALE.MAX}
              step={FRACTAL_CONSTRAINTS.SCALE.STEP}
              value={scaleFactor}
              onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
              className="w-full"
              aria-label={`Scale factor: ${scaleFactor.toFixed(2)}`}
              aria-valuemin={FRACTAL_CONSTRAINTS.SCALE.MIN}
              aria-valuemax={FRACTAL_CONSTRAINTS.SCALE.MAX}
              aria-valuenow={scaleFactor}
            />
          </div>

          {/* Depth */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="depth-slider" className="text-base mono font-medium" style={{ color: 'var(--aurora-cyan)' }}>
                  RECURSION DEPTH
                </label>
                <div className="text-xs text-white/50 mt-1.5 serif italic">how many times to repeat</div>
              </div>
              <span
                className="text-2xl mono font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--aurora-pink), var(--aurora-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                aria-live="polite"
              >
                {depth}
              </span>
            </div>
            <input
              id="depth-slider"
              type="range"
              min={FRACTAL_CONSTRAINTS.DEPTH.MIN}
              max={FRACTAL_CONSTRAINTS.DEPTH.MAX}
              step={FRACTAL_CONSTRAINTS.DEPTH.STEP}
              value={depth}
              onChange={(e) => handleDepthChange(parseInt(e.target.value))}
              className="w-full"
              aria-label={`Recursion depth: ${depth}`}
              aria-valuemin={FRACTAL_CONSTRAINTS.DEPTH.MIN}
              aria-valuemax={FRACTAL_CONSTRAINTS.DEPTH.MAX}
              aria-valuenow={depth}
            />
          </div>

          {/* Colors */}
          <div className="pt-3">
            <label className="text-base mono font-medium mb-4 block" style={{ color: 'var(--aurora-cyan)' }}>
              COLOR SPECTRUM
              <span className="text-xs text-white/50 ml-3 serif italic font-normal">root to tips</span>
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="color-start" className="sr-only">
                  Start color (root)
                </label>
                <input
                  id="color-start"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="cursor-pointer"
                  aria-label="Start color for fractal gradient"
                />
                <span className="text-xs text-white/50 mono text-center tracking-wider">ROOT</span>
              </div>

              <div
                className="flex-1 h-16 rounded-xl relative overflow-hidden"
                role="presentation"
                aria-hidden="true"
                style={gradientStyle}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    animation: 'shimmer 3s ease-in-out infinite'
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="color-end" className="sr-only">
                  End color (tips)
                </label>
                <input
                  id="color-end"
                  type="color"
                  value={colorEnd}
                  onChange={(e) => setColorEnd(e.target.value)}
                  className="cursor-pointer"
                  aria-label="End color for fractal gradient"
                />
                <span className="text-xs text-white/50 mono text-center tracking-wider">TIPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tip */}
        <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/40 serif italic text-center">
          Laboratory preset: angle 25° • scale 0.67 • depth 10
        </div>
      </div>
    </div>
  );
}

export default memo(Controls);
