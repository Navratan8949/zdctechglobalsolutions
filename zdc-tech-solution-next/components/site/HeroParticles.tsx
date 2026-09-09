"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type ISourceOptions } from "@tsparticles/engine";

export function HeroParticles({ id = "tsparticles" }: { id?: string }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fullScreen: {
        enable: false,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#3b82f6", // primary blue
        },
        links: {
          color: "#8b5cf6", // secondary purple
          distance: 120,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            height: 800,
            width: 800,
          },
          value: 15, // Drastically reduced for performance
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto">
      {/* Background glow effects - Optimized for performance */}
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none transform-gpu" />
      <div className="absolute right-1/4 top-1/3 h-[300px] w-[400px] rounded-full bg-secondary/10 blur-[80px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[350px] rounded-full bg-primary/5 blur-[80px] pointer-events-none transform-gpu" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Interactive Particles */}
      {init && (
        <Particles id={id} options={options} className="absolute inset-0 z-0" />
      )}
    </div>
  );
}
