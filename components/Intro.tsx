'use client';

import { useState, useEffect } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    try {
      const hasSeenIntro = localStorage.getItem('hasSeenIntro');
      if (hasSeenIntro) {
        onComplete();
      }
    } catch (err) {
      // LocalStorage not available, continue with intro
    }
  }, [onComplete]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && points.length < 3) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newPoints = [...points, { x, y }];
      setPoints(newPoints);

      if (newPoints.length === 3) {
        setTimeout(() => {
          setStep(2);
          setTimeout(() => {
            try {
              localStorage.setItem('hasSeenIntro', 'true');
            } catch (err) {
              // LocalStorage not available, continue anyway
            }
            onComplete();
          }, 2000);
        }, 500);
      }
    }
  };

  const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      localStorage.setItem('hasSeenIntro', 'true');
    } catch (err) {
      // LocalStorage not available, continue anyway
    }
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 bg-[#050505] z-50"
      onClick={handleClick}
      style={{ width: '100vw', height: '100vh', cursor: 'crosshair' }}
    >
      {/* Skip button - always visible */}
      <button
        onClick={handleSkip}
        className="fixed top-6 right-6 px-4 py-2 text-white/60 hover:text-[#39FF14] hover:bg-white/5 transition-all text-sm mono border border-white/10 rounded"
        style={{ zIndex: 100 }}
      >
        skip intro →
      </button>

      {/* Step indicator */}
      <div className="fixed top-6 left-6 text-white/40 text-xs mono">
        step {step}/3 {points.length > 0 && `• ${points.length}/3 points`}
      </div>

      {/* Step 0: Initial dot */}
      {step === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div 
              className="w-6 h-6 rounded-full mx-auto mb-6"
              style={{
                backgroundColor: '#39FF14',
                boxShadow: '0 0 30px rgba(57, 255, 20, 0.8)'
              }}
            />
            <div className="text-xl text-white mb-2">
              this dot is at position (0,0)
            </div>
            <div className="text-white/50 text-base">
              click anywhere to place your first point
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Plotting points */}
      {step === 1 && (
        <>
          <div className="absolute inset-0">
            {points.map((point, i) => (
              <div key={i}>
                {/* Point dot */}
                <div
                  className="absolute w-5 h-5 rounded-full"
                  style={{ 
                    left: point.x - 10, 
                    top: point.y - 10,
                    backgroundColor: '#39FF14',
                    boxShadow: '0 0 20px rgba(57, 255, 20, 0.6)',
                    zIndex: 10
                  }}
                />
                {/* Coordinates label */}
                <div 
                  className="absolute text-sm text-[#39FF14] mono font-bold"
                  style={{
                    left: point.x + 15,
                    top: point.y - 8,
                    textShadow: '0 0 10px rgba(57, 255, 20, 0.8)',
                    zIndex: 10
                  }}
                >
                  ({Math.round(point.x)}, {Math.round(point.y)})
                </div>
              </div>
            ))}
            
            {/* Lines connecting points */}
            {points.length >= 2 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                {points.slice(0, -1).map((point, i) => (
                  <line
                    key={i}
                    x1={point.x}
                    y1={point.y}
                    x2={points[i + 1].x}
                    y2={points[i + 1].y}
                    stroke="#39FF14"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                ))}
              </svg>
            )}
          </div>

          {/* Instructions */}
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-center">
            <div className="text-lg text-white mb-2">
              {points.length === 0 && "click anywhere to place point 1 of 3"}
              {points.length === 1 && "nice! now place point 2 of 3"}
              {points.length === 2 && "one more! place point 3 of 3"}
            </div>
            <div className="text-white/50 text-sm">
              these are coordinates - numbers that describe positions
            </div>
          </div>
        </>
      )}

      {/* Step 2: Final message */}
      {step === 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-lg">
            <div className="text-3xl text-[#39FF14] mb-4 font-bold" style={{ textShadow: '0 0 20px rgba(57, 255, 20, 0.6)' }}>
              that's all math is
            </div>
            <div className="text-xl text-white/70 mb-2">
              numbers describing where things are
            </div>
            <div className="text-white/40 text-sm">
              fractals are next
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
