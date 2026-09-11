"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { portfolio as fallbackPortfolio, type PortfolioItem } from "@/data/portfolio";
import { getPortfolios } from "@/service/portfolio.service";
import { unwrapApiResponse } from "@/lib/public-api";

export function HomePortfolioSection() {
  const [items, setItems] = useState<PortfolioItem[]>(fallbackPortfolio);

  useEffect(() => {
    let active = true;
    const fetchPortfolio = async () => {
      try {
        const res = await getPortfolios();
        if (!active) return;
        const liveItems = unwrapApiResponse<PortfolioItem[]>(res) || [];
        if (liveItems.length > 0) {
          setItems(liveItems);
        }
      } catch (err) {
        // Fallback already set
      }
    };
    void fetchPortfolio();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-2">OUR WORK</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] inline-block relative pb-4">
              Featured Projects
              <span className="absolute bottom-0 left-0 w-24 h-[3px] bg-[#0ea5e9]" />
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
              A selection of projects we have delivered for clients across industries.
            </p>
          </div>
          
          <Link
            href="/portfolio"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:text-[#0ea5e9]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>

        {/* Cards Grid - 3 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <PortfolioCard key={item.slug} item={item} index={i} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-sm transition-all hover:border-blue-200 hover:text-[#0ea5e9]"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

      </div>
    </section>
  );
}
