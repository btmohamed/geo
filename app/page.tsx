'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import FractalCanvas from '@/components/FractalCanvas';
import Controls from '@/components/Controls';
import ShareButton from '@/components/ShareButton';
import Intro from '@/components/Intro';
import { useFractalStore } from '@/lib/store';

function HomeContent() {
  const searchParams = useSearchParams();
  const loadFromParams = useFractalStore((state) => state.loadFromParams);
  const showIntro = useFractalStore((state) => state.showIntro);
  const completeIntro = useFractalStore((state) => state.completeIntro);

  useEffect(() => {
    if (searchParams.toString()) {
      loadFromParams(searchParams);
    }
  }, [searchParams, loadFromParams]);

  if (showIntro) {
    return <Intro onComplete={completeIntro} />;
  }

  return (
    <main className="relative w-full h-screen overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
      {/* Header - Top Left */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          left: '32px',
          zIndex: 10
        }}
      >
        <h1
          className="text-4xl font-light tracking-tight serif"
          style={{
            background: 'linear-gradient(135deg, var(--aurora-pink), var(--aurora-purple), var(--aurora-cyan))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px'
          }}
        >
          Fractal Laboratory
        </h1>
        <p className="text-sm text-white/50 mono tracking-wide" style={{ letterSpacing: '0.1em' }}>
          MORPHOGENIC TREE SYNTHESIS
        </p>
      </div>

      {/* Share button - Top Right */}
      <div
        style={{
          position: 'fixed',
          top: '32px',
          right: '32px',
          zIndex: 10
        }}
      >
        <ShareButton />
      </div>

      {/* Canvas - Full screen background */}
      <FractalCanvas />

      {/* Controls - Bottom Center */}
      <Controls />

      {/* Debug info - Bottom Left */}
      <div
        className="text-xs text-white/30 mono tracking-wider"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          letterSpacing: '0.15em'
        }}
      >
        LAB v1.0 • CONSOLE: F12
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--bg-deep)' }}>
        <div className="text-center">
          <div
            className="text-2xl mono font-light tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--aurora-pink), var(--aurora-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            INITIALIZING
          </div>
          <div className="flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--aurora-purple)',
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                  boxShadow: '0 0 10px var(--aurora-purple)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
