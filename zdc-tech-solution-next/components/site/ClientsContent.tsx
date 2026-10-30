"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { getClientsPageContent } from "@/service/client.service";
import { unwrapApiResponse } from "@/lib/public-api";
import {
  fallbackClientsPageContent,
  type ClientsPageContent,
} from "@/data/clients";
import { resolveImageUrl } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import { CheckCircle2, Lock, ArrowRight, Star, Shield, Users, Award } from "lucide-react";

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

export function ClientsContent({
  initialContent,
}: {
  initialContent?: ClientsPageContent;
}) {
  const [content, setContent] = useState<ClientsPageContent>(
    initialContent || fallbackClientsPageContent
  );
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  useEffect(() => {
    let active = true;
    const fetchFresh = async () => {
      try {
        const response: any = await getClientsPageContent();
        if (!active) return;
        const data = unwrapApiResponse<ClientsPageContent>(response);
        if (data && data.hero) {
          setContent(data);
        }
      } catch (err) {
        // Silently preserve initial content
      }
    };
    void fetchFresh();
    return () => {
      active = false;
    };
  }, []);

  const {
    hero,
    partnerships,
    engagementModels,
    domainExpertise,
    trustAndSecurity,
  } = content;

  const rawHeroImage =
    typeof hero.image === "string" ? hero.image : hero.image?.url || "";
  const resolvedHeroImage = rawHeroImage
    ? resolveImageUrl(rawHeroImage)
    : "";
  const displayHeroImage =
    !imageError && resolvedHeroImage ? resolvedHeroImage : fallbackHeroImage;

  return (
    <>
      {/* ============================================================== */}
      {/* 1. RICH CLIENTS HERO SECTION                                   */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#0ea5e9]">
                <span className="flex h-2 w-2 rounded-full bg-[#0ea5e9] animate-pulse" />
                <span>{hero.eyebrow || "Our Clients"}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-4xl lg:text-5xl leading-[1.15]">
                {hero.title || "Trusted by Innovative Companies Worldwide"}
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-slate-600 max-w-2xl">
                {hero.description ||
                  "We partner with startups, growing brands, and established enterprises to design, engineer, and scale high-performance digital products."}
              </p>

              {/* Key Trust Highlights Checklist */}
              {Array.isArray(hero.highlights) && hero.highlights.length > 0 && (
                <div className="grid gap-2.5 sm:grid-cols-2 pt-2">
                  {hero.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-[#0ea5e9] mt-0.5"
                        strokeWidth={2.5}
                      />
                      <span className="text-[13px] font-semibold text-[#1e293b] leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hero CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <Link
                  href={hero.primaryCtaLink || "/contact"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0ea5e9]/25 hover:bg-[#0284c7] hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <span>{hero.primaryCtaText || "Become a Client Partner"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={hero.secondaryCtaLink || "/case-studies"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-[#0b1b3d] shadow-sm hover:border-[#0ea5e9] hover:text-[#0ea5e9] hover:bg-slate-50 transition-colors"
                >
                  <span>{hero.secondaryCtaText || "Explore Case Studies"}</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Showcase Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Image Frame */}
                <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-slate-900 aspect-[4/3] relative">
                  <img
                    key={displayHeroImage}
                    src={displayHeroImage}
                    alt={hero.title || "Client partnership showcase"}
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Floating Rating Chip */}
                  {hero.ratingText && (
                    <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md flex items-center gap-1.5 text-xs font-bold text-[#0b1b3d]">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{hero.ratingText}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Floating Metric Badge */}
                <div className="absolute -bottom-6 -right-2 sm:right-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-black text-[#0ea5e9]">
                    {hero.badgeNumber || "98%"}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0b1b3d] leading-tight">
                      {hero.badgeText?.includes(" ") ? (
                        <>
                          {hero.badgeText.split(" ")[0]}
                          <br />
                          <span className="text-slate-500 font-semibold text-xs">
                            {hero.badgeText.split(" ").slice(1).join(" ")}
                          </span>
                        </>
                      ) : (
                        hero.badgeText || "Client Retention Rate"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Client Metrics Bar */}
          {Array.isArray(hero.stats) && hero.stats.length > 0 && (
            <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8">
              {hero.stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center border-r last:border-r-0 border-slate-100 px-3"
                >
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0ea5e9]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. MARQUEE / PARTNERSHIPS SECTION                              */}
      {/* ============================================================== */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={partnerships.eyebrow || "Partnerships"}
            title={partnerships.title || "Global Footprint"}
            description={
              partnerships.description ||
              "Our engineering solutions power organizations across diverse sectors and global markets."
            }
          />
        </div>
        <ClientsMarquee subheading={partnerships.subheading} />
      </section>

      {/* ============================================================== */}
      {/* 3. COLLABORATION / ENGAGEMENT MODELS                           */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
              {engagementModels.eyebrow || "ENGAGEMENT MODELS"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">
              {engagementModels.title || "Flexible Ways We Work Together"}
            </h2>
            <p className="mt-4 text-[16px] text-slate-500 max-w-2xl mx-auto">
              {engagementModels.description ||
                "Every organization has unique operational workflows. We tailor our collaboration model to match your specific timeline, team structure, and delivery goals."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.models?.map((model, idx) => {
              const Icon = getIcon(model.icon || "Users");
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#0b1b3d] mb-3">
                    {model.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-slate-500">
                    {model.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. DOMAIN EXPERTISE / INDUSTRIES WE TRANSFORM                   */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
              {domainExpertise.eyebrow || "DOMAIN EXPERTISE"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">
              {domainExpertise.title || "Industries We Transform"}
            </h2>
            <p className="mt-4 text-[16px] text-slate-500 max-w-2xl mx-auto">
              {domainExpertise.description ||
                "Our engineering teams bring deep technical knowledge combined with practical domain understanding to build purpose-built software."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domainExpertise.industries?.map((industry, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <h3 className="text-[17px] font-bold text-[#0b1b3d] mb-2.5">
                  {industry.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-slate-500">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. COLLABORATION STANDARDS & TRUST                             */}
      {/* ============================================================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
                {trustAndSecurity.eyebrow || "TRUST & SECURITY"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] leading-tight mb-6">
                {trustAndSecurity.title ||
                  "Our Commitment to Every Client Partner"}
              </h2>
              <p className="text-[16px] leading-relaxed text-slate-500 mb-8">
                {trustAndSecurity.description ||
                  "Building long-term client relationships requires more than clean code. We maintain rigorous standards for confidentiality, security compliance, and transparent delivery throughout every stage of the project lifecycle."}
              </p>

              <div className="space-y-4">
                {trustAndSecurity.standards?.map((standard, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 shrink-0 text-[#0ea5e9] mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-[14px] leading-relaxed text-slate-600">
                      {standard}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9] mb-6">
                  <Lock className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-[#0b1b3d] mb-4">
                  {trustAndSecurity.cardTitle ||
                    "Explore Case Studies & Results"}
                </h3>
                <p className="text-[15px] leading-relaxed text-slate-500 mb-8">
                  {trustAndSecurity.cardDescription ||
                    "Review real-world architectures and measurable outcomes from our recent client engagements across healthcare, e-commerce, and enterprise management."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={trustAndSecurity.caseStudiesLink || "/case-studies"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0ea5e9] px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:scale-105 hover:bg-blue-600"
                >
                  {trustAndSecurity.caseStudiesText || "View Case Studies"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={trustAndSecurity.portfolioLink || "/portfolio"}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] transition-colors hover:border-[#0ea5e9] hover:text-[#0ea5e9]"
                >
                  {trustAndSecurity.portfolioText || "Browse Portfolio"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
