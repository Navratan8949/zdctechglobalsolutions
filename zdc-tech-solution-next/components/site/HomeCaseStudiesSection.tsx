"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { caseStudies as fallbackCaseStudies, type CaseStudy } from "@/data/caseStudies";
import { getCaseStudies } from "@/service/caseStudy.service";
import { unwrapApiResponse } from "@/lib/public-api";

export function HomeCaseStudiesSection() {
  const [items, setItems] = useState<CaseStudy[]>(fallbackCaseStudies);

  useEffect(() => {
    let active = true;
    const fetchCaseStudies = async () => {
      try {
        const res = await getCaseStudies();
        if (!active) return;
        const liveItems = unwrapApiResponse<CaseStudy[]>(res) || [];
        if (liveItems.length > 0) {
          setItems(liveItems);
        }
      } catch (err) {
        // Fallback already set
      }
    };
    void fetchCaseStudies();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute left-0 top-1/3 h-[300px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Case Studies"
          title="Real Results, Real Impact"
          description="See how we have helped our clients overcome challenges and achieve their business goals."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.slice(0, 4).map((item, i) => (
            <CaseStudyCard key={item.slug} study={item} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
          >
            View All Case Studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
