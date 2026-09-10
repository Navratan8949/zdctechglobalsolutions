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
import { stats, processSteps, whyChooseUs, homeFaqs } from "@/data/company";
import { portfolio } from "@/data/portfolio";
import { caseStudies } from "@/data/caseStudies";
import { blogPosts } from "@/data/blog";
import { technologyStack } from "@/data/technologies";
import { HomeHero } from "./_components/HomeHero";
import { CompanyDescription } from "@/components/site/CompanyDescription";
import { TestimonialsSection } from "@/components/site/TestimonialsSection";

export const metadata: Metadata = {
  title: "ZDC Tech Global Solutions — Software Development & IT Company",
  description:
    "India-based global IT company delivering world-class websites, mobile apps, custom software and digital solutions to businesses across 20+ countries.",
  openGraph: {
    title: "ZDC Tech Global Solutions — Software Development & IT Company",
    description:
      "India-based global IT company delivering world-class websites, mobile apps, custom software and digital solutions to businesses across 20+ countries.",
    url: "https://zdctechglobalsolutions.com/",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CompanyDescription />
      <ClientsMarquee />

      {/* Stats */}
      <section className="relative border-y border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Services — New premium animated section */}
      <ServicesSection />

      {/* About Company — Bento Grid */}
      <AboutBento />

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Reasons to Partner With Us"
            description="We combine technical excellence with business understanding to deliver results that matter."
          />
          <div className="mt-12">
            <WhyChooseUsCards items={whyChooseUs} />
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
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
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute right-0 top-1/4 h-[300px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />
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

      <TestimonialsSection />

      {/* Blog Preview */}
      <HomeBlogSection />

      {/* FAQ */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
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
      <CTASection />
    </>
  );
}
