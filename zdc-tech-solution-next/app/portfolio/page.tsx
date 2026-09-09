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

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Loading portfolio...
            </p>
          )}
          {error && (
            <p className="mb-8 text-center text-sm text-amber-300">{error}</p>
          )}
          {!loading && items.length === 0 && (
            <p className="mb-8 text-center text-muted-foreground">
              No published projects are available yet.
            </p>
          )}
          <SectionHeading
            eyebrow="Projects"
            title="Our Latest Work"
            description="Filter by category to explore projects similar to what you are looking for."
          />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,136,255,0.4)]"
                    : "bg-card/50 text-muted-foreground hover:bg-card hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPortfolio.map((item, index) => (
              <PortfolioCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
