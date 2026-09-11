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
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50 border-b border-slate-100">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-4">Case Study: {caseStudy.client}</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#0b1b3d] sm:text-5xl lg:text-6xl">
            {caseStudy.heroHeadline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-slate-500">
            {caseStudy.challenge.substring(0, 150) + "..."}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#0b1b3d] mb-6">
                  The Challenge
                </h2>
                <p className="text-[16px] text-slate-600 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#0b1b3d] mb-6">
                  Our Solution
                </h2>
                <p className="text-[16px] text-slate-600 leading-relaxed">
                  {caseStudy.solution}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#0b1b3d] mb-8">
                  Key Features Delivered
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2">
                  {caseStudy.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0ea5e9]">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-[15px] font-medium text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8 lg:sticky lg:top-24 h-max">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h3 className="text-[18px] font-bold text-[#0b1b3d] border-b border-slate-200 pb-4 mb-6">
                  Project Overview
                </h3>
                <dl className="space-y-6 text-[14px]">
                  <div>
                    <dt className="text-slate-500 font-medium uppercase tracking-wider text-[11px] mb-1">Client</dt>
                    <dd className="font-bold text-[#0b1b3d] text-[16px]">
                      {caseStudy.client}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 font-medium uppercase tracking-wider text-[11px] mb-1">Industry</dt>
                    <dd className="font-bold text-[#0b1b3d] text-[16px]">
                      {caseStudy.industry}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h3 className="text-[18px] font-bold text-[#0b1b3d] border-b border-slate-200 pb-4 mb-6">
                  Impact & Results
                </h3>
                <div className="space-y-8">
                  {caseStudy.results.map((result, idx) => (
                    <div key={idx}>
                      <p className="text-4xl font-bold text-[#0ea5e9]">
                        {result.value}
                      </p>
                      <p className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mt-2">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
                <h3 className="text-[18px] font-bold text-[#0b1b3d] border-b border-slate-200 pb-4 mb-6">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
