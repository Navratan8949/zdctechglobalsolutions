import Link from "next/link";
import type { Metadata } from "next";
import { HomePortfolioSection } from "@/components/site/HomePortfolioSection";
import { HomeCaseStudiesSection } from "@/components/site/HomeCaseStudiesSection";
import { HomeBlogSection } from "@/components/site/HomeBlogSection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { TechStackGrid } from "@/components/site/TechStackGrid";
import { WhyChooseUsCards } from "@/components/site/WhyChooseUsCards";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { IndustriesMarquee } from "@/components/site/IndustriesMarquee";
import { AboutBento } from "@/components/site/AboutBento";
import { ServicesSection } from "@/components/site/ServicesSection";
import { whyChooseUs, homeFaqs, type Stat, type ProcessStep } from "@/data/company";
import { getStats } from "@/service/stat.service";
import { getProcessSteps } from "@/service/processStep.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { caseStudies } from "@/data/caseStudies";
import { blogPosts } from "@/data/blog";
import { technologyStack } from "@/data/technologies";
import { HomeHero } from "./_components/HomeHero";
import { CompanyDescription } from "@/components/site/CompanyDescription";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";
import { StatsCounter } from "@/components/site/StatsCounter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AllServicesCloud } from "@/components/site/AllServicesCloud";

export const metadata: Metadata = {
  title: "ZDC Tech Global Solutions — Best IT Company | Web & App Development",
  description:
    "Looking for the best IT company? ZDC Tech Global Solutions delivers premium website design, mobile app development, SEO, and custom software globally.",
  openGraph: {
    title:
      "ZDC Tech Global Solutions — Best IT Company | Web & App Development",
    description:
      "Looking for the best IT company? ZDC Tech Global Solutions delivers premium website design, mobile app development, SEO, and custom software globally.",
    url: "https://zdctechglobalsolutions.com/",
  },
};

export default async function HomePage() {
  const [statsRaw, processStepsRaw] = await Promise.all([
    getStats(),
    getProcessSteps(),
  ]);
  const stats = unwrapApiResponse<Stat[]>(statsRaw) || [];
  const processSteps = unwrapApiResponse<ProcessStep[]>(processStepsRaw) || [];

  return (
    <>
      <HomeHero />
      <CompanyDescription />
      {/* <ClientsMarquee /> */}

      {/* Services — New premium animated section */}
      <ServicesSection />

      {/* About Company — Bento Grid */}
      {/* <AboutBento /> */}

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-[#0b1b3d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-blue-200 mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Reasons to Partner With Us
            </h2>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-relaxed text-blue-100 max-w-2xl mx-auto">
              We combine technical excellence with business understanding to
              deliver results that matter.
            </p>
          </div>
          <div className="mt-12">
            <WhyChooseUsCards items={whyChooseUs} />
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Build Your Solution"
            description="A proven 7-step development process that ensures quality, transparency and on-time delivery."
          />
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Industries — scrolling marquee */}
      <IndustriesMarquee />

      {/* Technology Stack */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-white">
        <div className="absolute right-0 top-1/4 h-[300px] w-[400px] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Tech Stack"
            title="Technologies We Master"
            description="We work with modern, proven technologies to build solutions that are fast, secure and scalable."
          />
          <div className="mt-12">
            <TechStackGrid groups={technologyStack} />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <HomePortfolioSection />

      {/* Case Studies */}
      <HomeCaseStudiesSection />

      {/* Stats */}
      <section className="relative border-y border-border py-16 lg:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsCounter stats={stats} />
        </div>
      </section>

      <TestimonialsSection />

      {/* Blog Preview */}
      <HomeBlogSection />

      {/* All Services Cloud */}
      <AllServicesCloud />

      {/* FAQ */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-muted/30">
        <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Have questions? We have answers. If you cannot find what you are looking for, feel free to contact us."
          />
          <div className="mt-12">
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <CTASection /> */}
    </>
  );
}
