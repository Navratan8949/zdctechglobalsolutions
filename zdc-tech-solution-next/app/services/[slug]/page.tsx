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
    title: service.title,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | ZDC Tech Global Solutions`,
      description: service.shortDescription,
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
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Services
          </Link>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20 glow-blue-sm">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {service.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.heroSubheadline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Overview"
            title={`About Our ${service.title} Services`}
            align="left"
          />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {service.introduction}
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute right-0 top-1/4 h-[300px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title="Our Service Offerings"
            description="Comprehensive solutions tailored to your specific needs."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.whatWeOffer.map((offer, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30 hover:bg-card/70"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/15">
                  <span className="font-display text-sm font-bold text-primary">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Key Features"
            title="Everything You Need"
            description="Features and capabilities included in every project we deliver."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {service.keyFeatures.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-card/40 px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-0 top-1/3 h-[300px] w-[400px] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technologies"
            title="Tools We Use"
            description="We leverage the best technologies to deliver outstanding results."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {service.technologies.map((tech) => (
              <TechnologyBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Deliver"
            description="A proven process that ensures quality at every stage."
          />
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute right-0 top-1/4 h-[300px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Benefits"
            title="Why It Matters"
            description="The tangible benefits you can expect from working with us."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30 hover:bg-card/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/15">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="The ZDC Tech Global Solutions Advantage"
            description="What makes us the right partner for your project."
          />
          <div className="mt-12">
            <WhyChooseUsCards items={whyChooseUs} />
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
            description="Common questions about our services and process."
          />
          <div className="mt-12">
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Related Services"
            title="Explore More Services"
            align="left"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
