'use client';

import { useEffect, useRef } from 'react';
import type { Globe, COBEOptions } from 'cobe';

export function GlobeComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const phiRef = useRef(0.5);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    import('cobe').then(({ default: createGlobe }) => {
      if (!canvasRef.current) return;

      const options: COBEOptions = {
        devicePixelRatio: Math.min(window.devicePixelRatio, 2),
        width: width * 2,
        height: width * 2,
        phi: 0.5,
        theta: 0.3,
        dark: 1,
        diffuse: 1.8,
        mapSamples: 16000,
        mapBrightness: 2.0,
        baseColor: [0.05, 0.05, 0.2],
        markerColor: [0.3, 0.5, 1],
        glowColor: [0.2, 0.3, 0.9],
        markers: [
          { location: [28.6, 77.2], size: 0.07 },   // Delhi (main)
          { location: [51.5, -0.1], size: 0.05 },   // London
          { location: [40.7, -74.0], size: 0.05 },  // New York
          { location: [35.7, 139.7], size: 0.04 },  // Tokyo
          { location: [1.3, 103.8], size: 0.04 },   // Singapore
          { location: [25.2, 55.3], size: 0.04 },   // Dubai
          { location: [-33.9, 151.2], size: 0.04 }, // Sydney
        ],
      };

      globeRef.current = createGlobe(canvasRef.current, options);

      const animate = () => {
        phiRef.current += 0.001; // Slower rotation = less CPU
        globeRef.current?.update({
          phi: phiRef.current,
          width: width * 2,
          height: width * 2,
        });
        frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(frameRef.current);
      globeRef.current?.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[600px]">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute inset-4 rounded-full border border-primary/10" />
      <div className="absolute inset-8 rounded-full border border-primary/5" />

      <canvas
        ref={canvasRef}
        className="aspect-square w-full"
        style={{ contain: 'layout paint size' }}
      />

      {/* City connection labels */}
      <div className="absolute left-[8%] top-[20%] flex items-center gap-2 rounded-full border border-border bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-medium text-foreground/80">London</span>
      </div>
      <div className="absolute right-[10%] top-[35%] flex items-center gap-2 rounded-full border border-border bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-foreground/80">New York</span>
      </div>
      <div className="absolute bottom-[25%] left-[20%] flex items-center gap-2 rounded-full border border-border bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-xs font-medium text-foreground/80">Singapore</span>
      </div>
      <div className="absolute right-[5%] bottom-[30%] flex items-center gap-2 rounded-full border border-border bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-xs font-medium text-foreground/80">Dubai</span>
      </div>
    </div>
  );
}
