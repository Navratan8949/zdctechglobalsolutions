import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsCounter } from "@/components/site/StatsCounter";
import { PortfolioCard } from "@/components/site/PortfolioCard";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { BlogCard } from "@/components/site/BlogCard";
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
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            description="A selection of projects we have delivered for clients across industries."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item, i) => (
              <PortfolioCard key={item.slug} item={item} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-0 top-1/3 h-[300px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Case Studies"
            title="Real Results, Real Impact"
            description="See how we have helped our clients overcome challenges and achieve their business goals."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Blog Preview */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Latest Insights"
            title="From Our Blog"
            description="Thoughts, trends and practical advice from our team of experts."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

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
