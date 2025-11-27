'use client';

import { useState, useEffect, useCallback } from 'react';

interface IntroProps {
  onComplete: () => void;
}

type Act = 1 | 2 | 3 | 4;

interface Point {
  x: number;
  y: number;
}

export default function Intro({ onComplete }: IntroProps) {
  const [act, setAct] = useState<Act>(1);
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState<Point[]>([]);
  const [targetPoint, setTargetPoint] = useState<Point | null>(null);
  const [circleCenter, setCircleCenter] = useState<Point>({ x: 0, y: 0 });
  const [circleRadius, setCircleRadius] = useState<number>(0);
  const [fractalAngle, setFractalAngle] = useState(25);
  const [color1, setColor1] = useState('#ff6ff2');
  const [color2, setColor2] = useState('#00f5d4');

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

  useEffect(() => {
    // Set random target for Act 1 step 3
    if (act === 1 && step === 3 && !targetPoint) {
      setTargetPoint({
        x: Math.floor(Math.random() * 400) + 200,
        y: Math.floor(Math.random() * 300) + 150
      });
    }
    // Set circle center for Act 2
    if (act === 2 && step === 0) {
      if (typeof window !== 'undefined') {
        setCircleCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
        setCircleRadius(150);
      }
    }
  }, [act, step, targetPoint]);

  const handleSkip = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      localStorage.setItem('hasSeenIntro', 'true');
    } catch (err) {
      // Continue anyway
    }
    onComplete();
  }, [onComplete]);

  const distance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoint = { x, y };

    // Act 1: Numbers → Location
    if (act === 1) {
      if (step === 0) {
        setStep(1);
      } else if (step === 1) {
        setPoints([newPoint]);
        setStep(2);
      } else if (step === 2) {
        setPoints(prev => [...prev, newPoint]);
        if (points.length + 1 >= 3) {
          setTimeout(() => setStep(3), 1000);
        }
      } else if (step === 3 && targetPoint) {
        setPoints([newPoint]);
        const dist = distance(newPoint, targetPoint);
        if (dist < 50) {
          setTimeout(() => setStep(4), 500);
        } else {
          setTimeout(() => {
            setPoints([]);
          }, 1000);
        }
      } else if (step === 4) {
        // Move to Act 2
        setAct(2);
        setStep(0);
        setPoints([]);
      }
    }
    // Act 2: Shapes Are Rules
    else if (act === 2) {
      if (step === 0) {
        const dist = distance(newPoint, circleCenter);
        const tolerance = 20;
        if (Math.abs(dist - circleRadius) < tolerance) {
          setPoints(prev => [...prev, newPoint]);
          if (points.length + 1 >= 6) {
            setTimeout(() => setStep(1), 500);
          }
        }
      } else if (step === 1) {
        setTimeout(() => setStep(2), 100);
      } else if (step === 2) {
        // Move to Act 3
        setAct(3);
        setStep(0);
        setPoints([]);
      }
    }
    // Act 3: Repetition = Complexity
    else if (act === 3) {
      if (step === 0) {
        setStep(1);
      } else if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        // Move to Act 4
        setAct(4);
        setStep(0);
      }
    }
    // Act 4: Color = Another Dimension
    else if (act === 4) {
      if (step === 0) {
        setStep(1);
      } else if (step === 1) {
        // Complete intro
        try {
          localStorage.setItem('hasSeenIntro', 'true');
        } catch (err) {
          // Continue anyway
        }
        onComplete();
      }
    }
  };

  const drawBranch = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number,
    maxDepth: number
  ) => {
    if (depth > maxDepth) return;

    const x2 = x + length * Math.cos((angle * Math.PI) / 180);
    const y2 = y + length * Math.sin((angle * Math.PI) / 180);

    const gradient = ctx.createLinearGradient(x, y, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.strokeStyle = act === 4 ? gradient : color1;
    ctx.lineWidth = Math.max(1, maxDepth - depth);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    drawBranch(ctx, x2, y2, length * 0.7, angle - fractalAngle, depth + 1, maxDepth);
    drawBranch(ctx, x2, y2, length * 0.7, angle + fractalAngle, depth + 1, maxDepth);
  };

  useEffect(() => {
    if ((act === 3 && step >= 1) || act === 4) {
      const canvas = document.getElementById('fractal-preview') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawBranch(ctx, canvas.width / 2, canvas.height - 50, 80, -90, 0, act === 4 ? 8 : 6);
        }
      }
    }
  }, [act, step, fractalAngle, color1, color2]);

  const getActTitle = () => {
    switch (act) {
      case 1: return "ACT 1: NUMBERS → LOCATION";
      case 2: return "ACT 2: SHAPES ARE RULES";
      case 3: return "ACT 3: REPETITION = COMPLEXITY";
      case 4: return "ACT 4: COLOR = ANOTHER DIMENSION";
    }
  };

  const pointStyle = (point: Point, index: number = 0) => ({
    left: point.x - 12,
    top: point.y - 12,
    background: 'radial-gradient(circle, var(--aurora-pink), var(--aurora-purple))',
    boxShadow: '0 0 25px rgba(255, 111, 242, 0.7), 0 0 50px rgba(157, 78, 221, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  });

  return (
    <div
      className="fixed inset-0"
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--bg-deep)',
        cursor: 'crosshair',
        zIndex: 50,
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="px-5 py-2.5 backdrop-blur-md border-2 mono font-medium text-xs rounded-lg transition-all"
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 100,
          background: 'rgba(255, 111, 242, 0.1)',
          borderColor: 'rgba(255, 111, 242, 0.3)',
          color: 'var(--aurora-pink)',
          letterSpacing: '0.1em'
        }}
      >
        SKIP INTRO →
      </button>

      {/* Progress indicator */}
      <div
        className="text-xs mono tracking-widest"
        style={{
          position: 'fixed',
          top: '32px',
          left: '32px',
          zIndex: 100,
          color: 'var(--aurora-cyan)',
          letterSpacing: '0.15em'
        }}
      >
        {getActTitle()}
      </div>

      {/* ACT 1: Numbers → Location */}
      {act === 1 && (
        <>
          {/* Step 0: Everything starts at a point */}
          {step === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '600px'
              }}
            >
              <div
                className="w-8 h-8 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(circle, var(--aurora-pink), var(--aurora-purple))',
                  boxShadow: '0 0 40px rgba(255, 111, 242, 0.8), 0 0 80px rgba(157, 78, 221, 0.4)',
                  margin: '0 auto 32px auto'
                }}
              />
              <div className="text-3xl mb-4 font-light serif" style={{ color: 'var(--text-primary)' }}>
                everything starts at a point
              </div>
              <div className="text-white/60 text-base mb-3 mono tracking-wide">
                this one is at (0, 0)
              </div>
              <div className="text-white/40 text-sm serif italic">
                click anywhere
              </div>
            </div>
          )}

          {/* Step 1-4: Point interactions */}
          {step >= 1 && (
            <>
              {points.map((point, i) => (
                <div key={i}>
                  <div className="absolute w-6 h-6 rounded-full" style={pointStyle(point, i)} />
                  <div
                    className="absolute text-sm mono font-semibold"
                    style={{
                      left: point.x + 18,
                      top: point.y - 8,
                      color: 'var(--aurora-cyan)',
                      textShadow: '0 0 15px rgba(0, 245, 212, 0.8)'
                    }}
                  >
                    ({Math.round(point.x)}, {Math.round(point.y)})
                  </div>
                </div>
              ))}
              {step === 2 && points.length >= 2 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {points.slice(0, -1).map((point, i) => (
                    <line
                      key={i}
                      x1={point.x}
                      y1={point.y}
                      x2={points[i + 1].x}
                      y2={points[i + 1].y}
                      stroke="var(--aurora-purple)"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  ))}
                </svg>
              )}
            </>
          )}

          {step === 1 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', width: '100%', maxWidth: '600px' }}>
              <div className="text-2xl mb-2 serif" style={{ color: 'var(--text-primary)' }}>
                two numbers describe where it is
              </div>
              <div className="text-white/50 text-sm serif italic">click again</div>
            </div>
          )}

          {step === 3 && targetPoint && (
            <>
              <div
                className="absolute w-16 h-16 rounded-full border-2 flex items-center justify-center"
                style={{
                  left: targetPoint.x - 32,
                  top: targetPoint.y - 32,
                  borderColor: 'var(--aurora-cyan)',
                  boxShadow: '0 0 30px rgba(0, 245, 212, 0.3)'
                }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: 'var(--aurora-cyan)' }} />
              </div>
              <div
                style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}
              >
                <div className="text-xl serif" style={{ color: 'var(--text-primary)' }}>
                  {points.length === 0 ? 'try to click inside the target' : 'close! try again'}
                </div>
                <div className="text-white/50 text-sm serif italic mt-2">
                  you describe "where" using numbers
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-4xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                location IS numbers
              </div>
              <div className="text-xl text-white/70 mb-4 serif italic">
                you can't describe where without them
              </div>
              <div className="text-white/40 text-sm">click to continue</div>
            </div>
          )}
        </>
      )}

      {/* ACT 2: Shapes Are Rules */}
      {act === 2 && (
        <>
          {step === 0 && (
            <>
              <div
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: circleCenter.x - 8,
                  top: circleCenter.y - 8,
                  background: 'var(--aurora-cyan)',
                  boxShadow: '0 0 20px var(--aurora-cyan)'
                }}
              />
              <div
                className="absolute rounded-full border-2"
                style={{
                  left: circleCenter.x - circleRadius,
                  top: circleCenter.y - circleRadius,
                  width: circleRadius * 2,
                  height: circleRadius * 2,
                  borderColor: 'rgba(255, 111, 242, 0.4)',
                  boxShadow: '0 0 30px rgba(255, 111, 242, 0.2)'
                }}
              />
              {points.map((point, i) => (
                <div key={i} className="absolute w-5 h-5 rounded-full" style={pointStyle(point, i)} />
              ))}
              {points.length >= 2 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {points.map((point, i) => (
                    <line
                      key={i}
                      x1={point.x}
                      y1={point.y}
                      x2={points[(i + 1) % points.length].x}
                      y2={points[(i + 1) % points.length].y}
                      stroke="var(--aurora-purple)"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  ))}
                </svg>
              )}
              <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none', maxWidth: '600px' }}>
                <div className="text-xl serif mb-2" style={{ color: 'var(--text-primary)' }}>
                  place {6 - points.length} more dots on the circle
                </div>
                <div className="text-white/50 text-sm serif italic">
                  all points must be the same distance from the center
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-2xl mb-4 serif" style={{ color: 'var(--text-primary)' }}>
                a circle isn't a shape you draw
              </div>
              <div className="text-4xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                it's a rule
              </div>
              <div className="text-lg text-white/70 mb-2 serif italic">
                "all points exactly distance r from center"
              </div>
              <div className="text-white/50 text-sm mono mt-6">
                x² + y² = r²
              </div>
              <div className="text-white/30 text-sm mt-8">click to continue</div>
            </div>
          )}

          {step === 2 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-3xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                shapes are rules about numbers
              </div>
              <div className="text-lg text-white/70 serif italic">
                lines, triangles, stars - all just number patterns
              </div>
              <div className="text-white/30 text-sm mt-8">click to continue</div>
            </div>
          )}
        </>
      )}

      {/* ACT 3: Repetition = Complexity */}
      {act === 3 && (
        <>
          {step === 0 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-2xl mb-4 serif" style={{ color: 'var(--text-primary)' }}>
                what if you did the same thing
              </div>
              <div className="text-4xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                again and again
              </div>
              <div className="text-lg text-white/70 serif italic">smaller each time</div>
              <div className="text-white/30 text-sm mt-8">click to see</div>
            </div>
          )}

          {step === 1 && (
            <>
              <canvas
                id="fractal-preview"
                width={800}
                height={600}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
              <div style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', width: '280px', pointerEvents: 'none' }}>
                <div className="text-center mb-4">
                  <div className="text-lg serif mb-2" style={{ color: 'var(--text-primary)' }}>
                    drag to change the angle
                  </div>
                  <div className="mono text-sm" style={{ color: 'var(--aurora-cyan)' }}>
                    {fractalAngle}°
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="1"
                  value={fractalAngle}
                  onChange={(e) => setFractalAngle(parseFloat(e.target.value))}
                  className="w-full pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
              <div style={{ position: 'fixed', top: '128px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <div className="text-white/50 text-sm serif italic">click when ready</div>
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-4xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                recursion
              </div>
              <div className="text-xl text-white/70 mb-2 serif italic">
                simple rules create complex patterns
              </div>
              <div className="text-white/50 text-sm">this is how fractals work</div>
              <div className="text-white/30 text-sm mt-8">click to continue</div>
            </div>
          )}
        </>
      )}

      {/* ACT 4: Color = Another Dimension */}
      {act === 4 && (
        <>
          {step === 0 && (
            <>
              <canvas
                id="fractal-preview"
                width={800}
                height={600}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />
              <div
                style={{ position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'auto' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xl serif mb-4" style={{ color: 'var(--text-primary)' }}>
                  numbers describe position
                </div>
                <div className="text-3xl mb-6 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                  they describe color too
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div>
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="cursor-pointer"
                    />
                    <div className="text-xs text-white/50 mt-2 mono tracking-wider">ROOT</div>
                  </div>
                  <div className="text-white/50">→</div>
                  <div>
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="cursor-pointer"
                    />
                    <div className="text-xs text-white/50 mt-2 mono tracking-wider">TIPS</div>
                  </div>
                </div>
                <div className="text-white/50 text-sm serif italic mt-6">
                  each branch depth gets a different color
                </div>
              </div>
              <div style={{ position: 'fixed', top: '128px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <div className="text-white/50 text-sm serif italic">click when ready</div>
              </div>
            </>
          )}

          {step === 1 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '600px', padding: '0 20px' }}>
              <div className="text-4xl mb-4 font-light serif aurora-glow" style={{ color: 'var(--aurora-pink)' }}>
                you're ready
              </div>
              <div className="text-xl text-white/70 mb-4 serif italic">
                coordinates, shapes, recursion, color
              </div>
              <div className="text-lg text-white/50 serif">now create something</div>
              <div className="text-white/30 text-sm mt-8">click to begin</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
