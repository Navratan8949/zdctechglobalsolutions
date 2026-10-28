import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsCounter } from "@/components/site/StatsCounter";
import { WhyChooseUsCards } from "@/components/site/WhyChooseUsCards";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { TechStackGrid } from "@/components/site/TechStackGrid";
import { CheckCircle2 } from "lucide-react";
import {
  whyChooseUs,
  stats as fallbackStats,
  processSteps as fallbackProcessSteps,
  coreValues as fallbackCoreValues,
  companyInfo as fallbackCompanyInfo,
  type Stat,
  type ProcessStep,
  type CoreValue,
} from "@/data/company";
import { getStats } from "@/service/stat.service";
import { getProcessSteps } from "@/service/processStep.service";
import { getCoreValues } from "@/service/coreValue.service";
import { getCurrentSiteContent } from "@/service/siteContent.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";
import { technologyStack } from "@/data/technologies";
import { getIcon } from "@/lib/icons";

import { AboutCompanySection } from "@/components/site/AboutCompanySection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "About Us | Best IT Company & Tech Partner",
  description:
    "Learn about ZDC Tech Global Solutions — recognized as the best IT company globally. Discover our mission, vision, and how we deliver top-tier software and digital solutions.",
  keywords: [
    "Best IT company in Jaipur",
    "Best IT company India",
    "Best IT company in Rajasthan",
    "Top tech partner Jaipur",
    "software development agency Jaipur",
    "ZDC Tech Global Solutions",
    "about ZDC tech",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ZDC Tech Global Solutions",
    description:
      "Learn about ZDC Tech Global Solutions — our mission, vision, core values and the team that builds digital solutions for businesses worldwide.",
    url: "https://zdctechglobalsolutions.com/about",
  },
};

export default async function AboutPage() {
  const [statsRaw, processStepsRaw, coreValuesRaw, siteContentRaw] = await Promise.all([
    getStats().catch(() => null),
    getProcessSteps().catch(() => null),
    getCoreValues().catch(() => null),
    getCurrentSiteContent().catch(() => null),
  ]);
  const liveStats = unwrapApiResponse<Stat[]>(statsRaw);
  const liveProcessSteps = unwrapApiResponse<ProcessStep[]>(processStepsRaw);
  const liveCoreValues = unwrapApiResponse<CoreValue[]>(coreValuesRaw);
  const liveSiteContent = unwrapApiResponse<any>(siteContentRaw);

  const stats = Array.isArray(liveStats) && liveStats.length > 0 ? liveStats : fallbackStats;
  const processSteps = Array.isArray(liveProcessSteps) && liveProcessSteps.length > 0 ? liveProcessSteps : fallbackProcessSteps;
  const coreValues = Array.isArray(liveCoreValues) && liveCoreValues.length > 0 ? liveCoreValues : fallbackCoreValues;
  const about = liveSiteContent?.about || (fallbackCompanyInfo as any)?.about || {};

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="About Us"
        title="Engineering Digital Excellence"
        description="We are a team of engineers, designers, and strategists committed to building technology that creates real business value."
      />

      {/* Dynamic Company Introduction & Mission/Vision (Controlled from Admin) */}
      <AboutCompanySection initialAbout={about} />

      {/* Core Values */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Our Core Values</h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">The principles that guide every decision we make and every line of code we write.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 bg-[#f8fafc] p-8 transition-colors hover:border-blue-200"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-[#0ea5e9]">
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-[#0b1b3d]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">What Sets Us Apart</h2>
          </div>
          <div className="mt-12">
            <WhyChooseUsCards items={whyChooseUs} />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Our Tech Stack</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Technologies We Work With</h2>
          </div>
          <div className="mt-12">
            <TechStackGrid groups={technologyStack} />
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 lg:py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">How We Work</h2>
          </div>
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsCounter stats={stats} />
        </div>
      </section>
    </div>
  );
}
