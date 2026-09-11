"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section className="relative py-16 lg:py-20 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-2">CASE STUDIES</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] inline-block relative pb-4">
              Real Results, Real Impact
              <span className="absolute bottom-0 left-0 w-24 h-[3px] bg-[#0ea5e9]" />
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500">
              See how we have helped our clients overcome challenges and achieve their business goals.
            </p>
          </div>
          
          <Link
            href="/case-studies"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:text-[#0ea5e9]"
          >
            View All Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>

        {/* Cards Grid - Now 3 columns */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 3).map((item, i) => (
            <CaseStudyCard key={item.slug} caseStudy={item} index={i} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-sm transition-all hover:border-blue-200 hover:text-[#0ea5e9]"
          >
            View All Work
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

      </div>
    </section>
  );
}
