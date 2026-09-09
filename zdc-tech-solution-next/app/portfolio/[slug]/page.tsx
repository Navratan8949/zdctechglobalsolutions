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
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {item.category}
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {item.description}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={item.image}
              alt={item.title}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white">
                Project Overview
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {item.technologies.map((technology) => (
                  <TechnologyBadge key={technology} name={technology} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/40 p-6">
              <h2 className="text-lg font-semibold text-white">
                Project Details
              </h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Client</dt>
                  <dd className="mt-1 font-medium text-white">{item.client}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Year</dt>
                  <dd className="mt-1 font-medium text-white">{item.year}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="mt-1 font-medium text-white">
                    {item.category}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <Link
            href="/contact"
            className="group mt-12 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Start a Similar Project{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      <CTASection />
    </>
  );
}
