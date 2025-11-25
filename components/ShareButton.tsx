'use client';

import { useState } from 'react';
import { useFractalStore } from '@/lib/store';

export default function ShareButton() {
  const getShareURL = useFractalStore((state) => state.getShareURL);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = getShareURL();
    console.log('[SHARE] Generated URL:', url);
    
    try {
      await navigator.clipboard.writeText(url);
      console.log('[SHARE] URL copied to clipboard');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('[SHARE] Failed to copy:', err);
      alert('Failed to copy URL. Please try again.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-6 py-3 bg-black/60 border-2 border-[#39FF14] text-[#39FF14] mono hover:bg-[#39FF14] hover:text-black transition-all font-bold text-sm rounded"
      style={{
        boxShadow: copied 
          ? '0 0 30px rgba(57, 255, 20, 0.8)' 
          : '0 0 10px rgba(57, 255, 20, 0.4)'
      }}
    >
      {copied ? (
        <span className="flex items-center gap-2">
          ✓ link copied!
        </span>
      ) : (
        <span className="flex items-center gap-2">
          📋 share this fractal
        </span>
      )}
    </button>
  );
}
