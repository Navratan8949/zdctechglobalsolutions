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
    <section className="relative overflow-hidden bg-[#f8fafc] border-y border-gray-100 py-12 lg:py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 mb-10">
        <h2 className="text-[13px] font-bold tracking-[0.2em] text-slate-400 uppercase">
          Trusted by <span className="text-[#0ea5e9]">100K+</span> Clients Worldwide
        </h2>
        {error && <p className="mt-2 text-xs text-amber-300">{error}</p>}
      </div>

      <div className="relative z-10">
        <Marquee pauseOnHover duration="40s" className="[--gap:3rem]">
          {companies.map((company, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_8px_20px_rgba(14,165,233,0.1)] grayscale hover:grayscale-0"
            >
              <span className={cn("text-2xl", company.color)}>
                {company.icon}
              </span>
              <span className="text-lg font-bold text-slate-500 transition-colors group-hover:text-[#0b1b3d]">
                {company.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
