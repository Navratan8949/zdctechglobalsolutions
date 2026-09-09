import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { TechnologyBadge } from "@/components/site/TechnologyBadge";
import {
  caseStudies,
  getCaseStudyBySlug,
  type CaseStudy,
} from "@/data/caseStudies";
import { getCaseStudyBySlug as getLiveCaseStudyBySlug } from "@/service/caseStudy.service";
import { unwrapApiResponse } from "@/lib/public-api";

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let caseStudy = getCaseStudyBySlug(params.slug);
  try {
    caseStudy = unwrapApiResponse<CaseStudy>(
      await getLiveCaseStudyBySlug(params.slug),
    );
  } catch {}
  if (!caseStudy) return { title: "Case Study Not Found" };

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.challenge,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let caseStudy = getCaseStudyBySlug(params.slug);
  try {
    caseStudy = unwrapApiResponse<CaseStudy>(
      await getLiveCaseStudyBySlug(params.slug),
    );
  } catch {}
  if (!caseStudy) notFound();

  return (
    <>
      <PageHero
        eyebrow={`Case Study: ${caseStudy.client}`}
        title={caseStudy.heroHeadline}
        description={caseStudy.challenge.substring(0, 150) + "..."}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  The Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Our Solution
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Key Features Delivered
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {caseStudy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 lg:sticky lg:top-24 h-max">
              <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Project Overview
                </h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground mb-1">Client</dt>
                    <dd className="font-medium text-white">
                      {caseStudy.client}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground mb-1">Industry</dt>
                    <dd className="font-medium text-white">
                      {caseStudy.industry}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Impact & Results
                </h3>
                <div className="space-y-6">
                  {caseStudy.results.map((result, idx) => (
                    <div key={idx}>
                      <p className="font-display text-3xl font-bold text-primary">
                        {result.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <TechnologyBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
