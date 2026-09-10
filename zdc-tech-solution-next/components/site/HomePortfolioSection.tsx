"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
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
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Featured Projects"
          description="A selection of projects we have delivered for clients across industries."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <PortfolioCard key={item.slug} item={item} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
