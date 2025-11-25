import { FractalParams } from './fractals';

export function encodeParams(params: FractalParams): string {
  const urlParams = new URLSearchParams({
    a: params.angle.toString(),
    s: params.scaleFactor.toString(),
    d: params.depth.toString(),
    c: params.color.replace('#', ''),
  });
  return urlParams.toString();
}

export function getShareUrl(params: FractalParams): string {
  const encoded = encodeParams(params);
  return `${window.location.origin}?${encoded}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
