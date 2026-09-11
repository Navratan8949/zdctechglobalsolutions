import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";
import { TechnologyBadge } from "@/components/site/TechnologyBadge";
import { portfolio, type PortfolioItem } from "@/data/portfolio";
import { getPortfolioBySlug as getLivePortfolioBySlug } from "@/service/portfolio.service";
import { unwrapApiResponse } from "@/lib/public-api";

export async function generateStaticParams() {
  return portfolio.map((item) => ({ slug: item.slug }));
}

async function getPortfolio(slug: string) {
  try {
    return unwrapApiResponse<PortfolioItem>(await getLivePortfolioBySlug(slug));
  } catch {
    return portfolio.find((item) => item.slug === slug);
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getPortfolio(params.slug);
  if (!item) return { title: "Project Not Found" };

  return { title: `${item.title} | Portfolio`, description: item.description };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getPortfolio(params.slug);
  if (!item) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#0ea5e9] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={3} />
            All Projects
          </Link>
          <br />
          <p className="inline-block mt-4 text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] bg-blue-50 px-4 py-2 rounded-full">
            {item.category}
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#0b1b3d] sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-slate-500">
            {item.description}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[#0b1b3d]">
                Project Overview
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-slate-500">
                {item.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {item.technologies.map((technology) => (
                  <span key={technology} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700">
                    {technology}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 shadow-sm h-fit">
              <h2 className="text-[18px] font-bold text-[#0b1b3d] border-b border-slate-200 pb-4">
                Project Details
              </h2>
              <dl className="mt-6 space-y-6 text-[14px]">
                <div>
                  <dt className="text-slate-500 font-medium uppercase tracking-wider text-[11px] mb-1">Client</dt>
                  <dd className="font-bold text-[#0b1b3d] text-[16px]">{item.client}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 font-medium uppercase tracking-wider text-[11px] mb-1">Year</dt>
                  <dd className="font-bold text-[#0b1b3d] text-[16px]">{item.year}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 font-medium uppercase tracking-wider text-[11px] mb-1">Category</dt>
                  <dd className="font-bold text-[#0b1b3d] text-[16px]">
                    {item.category}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-16 text-center lg:text-left">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0ea5e9] px-8 py-4 text-[14px] font-bold uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105"
            >
              Start a Similar Project{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>
      {/* <CTASection /> */}
    </>
  );
}
