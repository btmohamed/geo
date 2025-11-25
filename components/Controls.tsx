'use client';

import { useFractalStore } from '@/lib/store';

export default function Controls() {
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

  const handleAngleChange = (value: number) => {
    console.log('[CONTROLS] Angle changed:', value);
    setAngle(value);
  };

  const handleScaleChange = (value: number) => {
    console.log('[CONTROLS] Scale changed:', value);
    setScaleFactor(value);
  };

  const handleDepthChange = (value: number) => {
    console.log('[CONTROLS] Depth changed:', value);
    setDepth(value);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div
        className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-[#39FF14]/30"
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
                <label className="text-sm text-white/70 mono">branch angle</label>
                <div className="text-xs text-white/40 mt-0.5">how wide the tree spreads</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold">
                {angle.toFixed(1)}°
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="0.5"
              value={angle}
              onChange={(e) => handleAngleChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Scale Factor */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <label className="text-sm text-white/70 mono">scale factor</label>
                <div className="text-xs text-white/40 mt-0.5">how much smaller each branch gets</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold">
                {scaleFactor.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.9"
              step="0.01"
              value={scaleFactor}
              onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Depth */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <label className="text-sm text-white/70 mono">recursion depth</label>
                <div className="text-xs text-white/40 mt-0.5">how many times to repeat</div>
              </div>
              <span className="text-base text-[#39FF14] mono font-bold">
                {depth}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="15"
              step="1"
              value={depth}
              onChange={(e) => handleDepthChange(parseInt(e.target.value))}
              className="w-full"
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
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="cursor-pointer w-14 h-14"
                  title="Start color (root)"
                />
                <span className="text-xs text-white/40 mono text-center">start</span>
              </div>
              
              <div className="flex-1 h-14 rounded-lg" 
                style={{ 
                  background: `linear-gradient(90deg, ${color}, ${colorEnd})`,
                  border: '2px solid rgba(57, 255, 20, 0.3)',
                  boxShadow: '0 0 10px rgba(57, 255, 20, 0.2)'
                }} 
              />
              
              <div className="flex flex-col gap-2">
                <input
                  type="color"
                  value={colorEnd}
                  onChange={(e) => setColorEnd(e.target.value)}
                  className="cursor-pointer w-14 h-14"
                  title="End color (tips)"
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
