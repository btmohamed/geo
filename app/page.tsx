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
    <main className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Header - Top Left */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          zIndex: 10
        }}
      >
        <h1 className="text-2xl font-bold text-[#39FF14] mono" style={{ textShadow: '0 0 20px rgba(57, 255, 20, 0.6)' }}>
          fractal lab
        </h1>
        <p className="text-sm text-white/40 mono mt-1">
          drag sliders to morph the tree
        </p>
      </div>

      {/* Share button - Top Right */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
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
        className="text-xs text-white/20 mono"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '16px'
        }}
      >
        v1.0 • press F12 for console
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center">
        <div className="text-[#39FF14] mono">loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
