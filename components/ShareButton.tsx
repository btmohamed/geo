'use client';

import { useState, memo, useCallback } from 'react';
import { useFractalStore } from '@/lib/store';
import { UI_CONSTANTS } from '@/lib/constants';

function ShareButton() {
  const getShareURL = useFractalStore((state) => state.getShareURL);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = getShareURL();

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), UI_CONSTANTS.SHARE_BUTTON_FEEDBACK_DURATION);
    } catch (err) {
      alert('Failed to copy URL. Please try again.');
    }
  }, [getShareURL]);

  return (
    <button
      onClick={handleShare}
      className="px-7 py-4 backdrop-blur-md border-2 mono font-semibold text-sm rounded-xl transition-all duration-300"
      style={{
        background: copied
          ? 'linear-gradient(135deg, rgba(0, 245, 212, 0.2), rgba(125, 249, 180, 0.2))'
          : 'linear-gradient(135deg, rgba(255, 111, 242, 0.15), rgba(157, 78, 221, 0.15))',
        borderColor: copied ? 'var(--aurora-cyan)' : 'rgba(255, 111, 242, 0.4)',
        color: copied ? 'var(--aurora-cyan)' : 'var(--aurora-pink)',
        boxShadow: copied
          ? `
            0 10px 30px rgba(0, 245, 212, 0.3),
            0 0 40px rgba(0, 245, 212, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
          : `
            0 10px 30px rgba(255, 111, 242, 0.2),
            0 0 20px rgba(255, 111, 242, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        transform: copied ? 'translateY(-2px) scale(1.02)' : 'translateY(0)',
        letterSpacing: '0.05em'
      }}
    >
      {copied ? (
        <span className="flex items-center gap-2.5">
          <span style={{ fontSize: '1.1em' }}>✓</span>
          <span>LINK COPIED</span>
        </span>
      ) : (
        <span className="flex items-center gap-2.5">
          <span>◈</span>
          <span>SHARE FRACTAL</span>
        </span>
      )}
    </button>
  );
}

export default memo(ShareButton);
