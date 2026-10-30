"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ClientsMarquee } from "@/components/site/ClientsMarquee";
import { getClientsPageContent } from "@/service/client.service";
import { unwrapApiResponse } from "@/lib/public-api";
import {
  fallbackClientsPageContent,
  type ClientsPageContent,
} from "@/data/clients";
import { getIcon } from "@/lib/icons";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";

export function ClientsContent({
  initialContent,
}: {
  initialContent?: ClientsPageContent;
}) {
  const [content, setContent] = useState<ClientsPageContent>(
    initialContent || fallbackClientsPageContent
  );

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

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow || "Our Clients"}
        title={hero.title || "Trusted by Innovative Companies Worldwide"}
        description={
          hero.description ||
          "We partner with startups, growing brands, and established enterprises to design, engineer, and scale high-performance digital products."
        }
      />

      {/* Marquee / Partnerships Section */}
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

      {/* Collaboration / Engagement Models */}
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

      {/* Domain Expertise / Industries We Transform */}
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

      {/* Collaboration Standards & Trust */}
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

