"use client";

import { Marquee } from "./Marquee";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getClients } from "@/service/client.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

const fallbackCompanies = [
  { name: "Nexus", icon: "✦", color: "text-blue-400" },
  { name: "Aero", icon: "❊", color: "text-purple-400" },
  { name: "Quantum", icon: "⬡", color: "text-emerald-400" },
  { name: "Zephyr", icon: "⟡", color: "text-orange-400" },
  { name: "Horizon", icon: "✺", color: "text-cyan-400" },
  { name: "Lumina", icon: "✷", color: "text-pink-400" },
  { name: "Vertex", icon: "△", color: "text-indigo-400" },
  { name: "Orbit", icon: "◒", color: "text-yellow-400" },
];

const popups = [
  {
    text: "Effective service",
    className: "top-2 left-[20%]",
    pointerColor: "text-orange-500",
    pointerFill: "fill-orange-500",
    delay: "animation-delay-1000",
  },
  {
    text: "Fast security",
    className: "bottom-2 right-[30%]",
    pointerColor: "text-yellow-400",
    pointerFill: "fill-yellow-400",
    delay: "animation-delay-2000",
  },
];

export function ClientsMarquee() {
  const [companies, setCompanies] = useState(fallbackCompanies);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadClients = async () => {
      try {
        const response = await getClients();
        if (!active) return;
        const clients =
          unwrapApiResponse<{ name: string; logo?: string }[]>(response) || [];
        if (clients.length) {
          setCompanies(
            clients.map((client, index) => ({
              name: client.name,
              icon: "✦",
              color: [
                "text-blue-400",
                "text-emerald-400",
                "text-orange-400",
                "text-cyan-400",
              ][index % 4],
            })),
          );
        }
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadClients();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-white/5 py-12 lg:py-16">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
          <span className="text-primary">100K</span> Clients Worldwide
        </h2>
        {error && <p className="mt-2 text-xs text-amber-300">{error}</p>}
      </div>

      <div className="relative z-10 mt-10">
        <Marquee pauseOnHover duration="40s" className="[--gap:3rem]">
          {companies.map((company, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 px-8 py-4 transition-colors hover:bg-white/10"
            >
              <span className={cn("text-xl", company.color)}>
                {company.icon}
              </span>
              <span className="font-display text-lg font-medium text-white/80 transition-colors group-hover:text-white">
                {company.name}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Decorative Floating Cursors */}
        {/* {popups.map((popup, i) => (
          <div
            key={i}
            className={cn(
              'absolute z-20 flex animate-float flex-col items-start',
              popup.className,
              popup.delay
            )}
          >
            <div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
              {popup.text}
            </div>
            <MousePointer2
              className={cn('h-5 w-5 -mt-1 ml-4 rotate-[-20deg]', popup.pointerColor, popup.pointerFill)}
            />
          </div>
        ))} */}
      </div>
    </section>
  );
}
