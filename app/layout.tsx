import type { Metadata, Viewport } from 'next';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'fractal lab',
  description: 'make fractals, learn math, share beauty',
  manifest: '/manifest.json',
  openGraph: {
    title: 'fractal lab',
    description: 'make fractals, learn math, share beauty',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fractal lab',
    description: 'make fractals, learn math, share beauty',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#050505',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
