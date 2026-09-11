import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { TechnologyBadge } from "@/components/site/TechnologyBadge";
import { WhyChooseUsCards } from "@/components/site/WhyChooseUsCards";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ServiceCard } from "@/components/site/ServiceCard";
import { getIcon } from "@/lib/icons";
import { services, getServiceBySlug, type Service } from "@/data/services";
import { processSteps, whyChooseUs } from "@/data/company";
import { getServiceBySlug as getLiveServiceBySlug } from "@/service/service.service";
import { unwrapApiResponse } from "@/lib/public-api";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let service = getServiceBySlug(params.slug);
  try {
    service = unwrapApiResponse<Service>(
      await getLiveServiceBySlug(params.slug),
    );
  } catch {}
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Best IT Company Services`,
    description: `${service.shortDescription} Partner with ZDC Tech Global Solutions, the best IT company for premium ${service.title.toLowerCase()} services.`,
    keywords: [
      service.title,
      `Best ${service.title} Agency`,
      `Top ${service.title} Company`,
      "Best IT Company",
      "Software Development",
      "ZDC Tech Global Solutions",
    ],
    openGraph: {
      title: `${service.title} | Best IT Company Services`,
      description: `${service.shortDescription} Partner with ZDC Tech Global Solutions, the best IT company for premium ${service.title.toLowerCase()} services.`,
      url: `https://zdctechglobalsolutions.com/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let service = getServiceBySlug(params.slug);
  try {
    service = unwrapApiResponse<Service>(
      await getLiveServiceBySlug(params.slug),
    );
  } catch {}
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const relatedServices = service.relatedSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-[#0ea5e9] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={3} />
            All Services
          </Link>
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-[#0ea5e9] overflow-hidden">
            {service.image?.url ? (
              <img 
                src={service.image.url} 
                alt={service.title} 
                className="w-14 h-14 object-contain"
              />
            ) : (
              <Icon className="h-10 w-10" strokeWidth={2} />
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0b1b3d] sm:text-5xl lg:text-6xl">
            {service.heroHeadline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-slate-500">
            {service.heroSubheadline}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-8 py-4 text-[14px] font-bold uppercase tracking-widest text-white shadow-lg transition-transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-[14px] font-bold uppercase tracking-widest text-[#0b1b3d] transition-colors hover:border-[#0ea5e9] hover:text-[#0ea5e9]"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Overview</p>
          <h2 className="text-3xl font-bold text-[#0b1b3d]">About Our {service.title} Services</h2>
          <p className="mt-6 text-[18px] leading-relaxed text-slate-500">
            {service.introduction}
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Our Service Offerings</h2>
            <p className="mt-4 text-[16px] text-slate-500 max-w-2xl mx-auto">Comprehensive solutions tailored to your specific needs.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.whatWeOffer.map((offer, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <span className="text-[18px] font-black">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-[#0b1b3d]">
                  {offer.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Key Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Everything You Need</h2>
            <p className="mt-4 text-[16px] text-slate-500 max-w-2xl mx-auto">Features and capabilities included in every project we deliver.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.keyFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0ea5e9]" />
                <span className="text-[14px] font-bold text-[#0b1b3d]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Technologies</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] mb-12">Tools We Use</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 lg:py-28 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">How We Deliver</h2>
          </div>
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Benefits</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Why It Matters</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9] mb-6">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0b1b3d]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={service.faqs} />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">Related Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">Explore More Services</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
