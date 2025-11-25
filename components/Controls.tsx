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
    border: '2px solid rgba(57, 255, 20, 0.3)',
    boxShadow: '0 0 10px rgba(57, 255, 20, 0.2)'
  }), [color, colorEnd]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10
      }}
    >
      <div
        className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-[#39FF14]/30"
        role="region"
        aria-label="Fractal controls"
        style={{
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.9), 0 0 2px rgba(57, 255, 20, 0.5)',
          minWidth: '400px'
        }}
      >
        <div className="space-y-6">
          {/* Branch Angle */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <label htmlFor="angle-slider" className="text-sm text-white/70 mono">
                  branch angle
                </label>
                <div className="text-xs text-white/40 mt-0.5">how wide the tree spreads</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold" aria-live="polite">
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
            <div className="flex justify-between items-center mb-3">
              <div>
                <label htmlFor="scale-slider" className="text-sm text-white/70 mono">
                  scale factor
                </label>
                <div className="text-xs text-white/40 mt-0.5">how much smaller each branch gets</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold" aria-live="polite">
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
            <div className="flex justify-between items-center mb-3">
              <div>
                <label htmlFor="depth-slider" className="text-sm text-white/70 mono">
                  recursion depth
                </label>
                <div className="text-xs text-white/40 mt-0.5">how many times to repeat</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold" aria-live="polite">
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
          <div>
            <label className="text-sm text-white/70 mono mb-3 block">
              color gradient
              <span className="text-xs text-white/40 ml-2">root to tips</span>
            </label>
            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-2">
                <label htmlFor="color-start" className="sr-only">
                  Start color (root)
                </label>
                <input
                  id="color-start"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="cursor-pointer w-14 h-14"
                  aria-label="Start color for fractal gradient"
                />
                <span className="text-xs text-white/40 mono text-center">start</span>
              </div>

              <div
                className="flex-1 h-14 rounded-lg"
                role="presentation"
                aria-hidden="true"
                style={gradientStyle}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="color-end" className="sr-only">
                  End color (tips)
                </label>
                <input
                  id="color-end"
                  type="color"
                  value={colorEnd}
                  onChange={(e) => setColorEnd(e.target.value)}
                  className="cursor-pointer w-14 h-14"
                  aria-label="End color for fractal gradient"
                />
                <span className="text-xs text-white/40 mono text-center">end</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick tip */}
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30 mono text-center">
          tip: try angle=25°, scale=0.67, depth=10 for a classic tree
        </div>
      </div>
    </div>
  );
}

export default memo(Controls);
