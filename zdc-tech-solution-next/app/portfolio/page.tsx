"use client";

import { useState } from "react";
import { useEffect } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import {
  portfolio as fallbackPortfolio,
  portfolioCategories,
  type PortfolioItem,
} from "@/data/portfolio";
import { getPortfolios } from "@/service/portfolio.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getPortfolios()
      .then((response) => {
        if (!active) return;
        setItems(unwrapApiResponse<PortfolioItem[]>(response) || []);
      })
      .catch((requestError) => {
        if (!active) return;
        setItems(fallbackPortfolio);
        setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = Array.from(
    new Set([
      "All",
      ...portfolioCategories.filter((category) => category !== "All"),
      ...items.map((item) => item.category),
    ]),
  );

  const filteredPortfolio =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Work We Are Proud Of"
        description="Explore our recent projects and see how we have helped businesses transform their digital presence."
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-slate-500">
              Loading portfolio...
            </p>
          )}
          {error && (
            <p className="mb-8 text-center text-sm text-red-500">{error}</p>
          )}
          {!loading && items.length === 0 && (
            <p className="mb-8 text-center text-slate-500">
              No published projects are available yet.
            </p>
          )}
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Our Latest Work</h2>
            <p className="mt-4 text-[16px] text-slate-500 max-w-2xl mx-auto">Filter by category to explore projects similar to what you are looking for.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-[13px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === category
                    ? "bg-[#0ea5e9] text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0b1b3d]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((item, index) => (
              <PortfolioCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
