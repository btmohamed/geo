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
    console.log('[APP] HomeContent mounted');
    console.log('[APP] Show intro:', showIntro);
    console.log('[APP] URL params:', searchParams.toString());
    
    if (searchParams.toString()) {
      console.log('[APP] Loading state from URL params');
      loadFromParams(searchParams);
    }
  }, [searchParams, loadFromParams]);

  if (showIntro) {
    console.log('[APP] Rendering intro');
    return <Intro onComplete={completeIntro} />;
  }

  console.log('[APP] Rendering main app');
  
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050505]">
      {/* Header - Top Left */}
      <div className="fixed top-6 left-6 z-10">
        <h1 className="text-2xl font-bold text-[#39FF14] mono" style={{ textShadow: '0 0 20px rgba(57, 255, 20, 0.6)' }}>
          fractal lab
        </h1>
        <p className="text-sm text-white/40 mono mt-1">
          drag sliders to morph the tree
        </p>
      </div>

      {/* Share button - Top Right */}
      <div className="fixed top-6 right-6 z-10">
        <ShareButton />
      </div>

      {/* Canvas - Full screen background */}
      <FractalCanvas />

      {/* Controls - Bottom Center */}
      <Controls />

      {/* Debug info - Bottom Left */}
      <div className="fixed bottom-4 left-4 text-xs text-white/20 mono">
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
