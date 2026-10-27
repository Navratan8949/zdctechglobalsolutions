"use client";

import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import {
  caseStudies as fallbackCaseStudies,
  type CaseStudy,
} from "@/data/caseStudies";
import { getCaseStudies } from "@/service/caseStudy.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export default function CaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>(fallbackCaseStudies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getCaseStudies()
      .then((response) => {
        if (!active) return;
        const live = unwrapApiResponse<CaseStudy[]>(response);
        if (Array.isArray(live) && live.length > 0) {
          setItems(live);
        }
      })
      .catch((requestError) => {
        if (!active) return;
        setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Success Stories"
        description="See how we have partnered with companies across industries to solve complex problems and drive measurable growth."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {error && (
            <p className="mb-8 text-center text-sm text-amber-300">{error}</p>
          )}
          {!loading && items.length === 0 && (
            <p className="mb-8 text-center text-muted-foreground">
              No published case studies are available yet.
            </p>
          )}
          <div className="grid gap-8 sm:grid-cols-2">
            {items.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
