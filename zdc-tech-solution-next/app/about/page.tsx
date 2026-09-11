import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsCounter } from "@/components/site/StatsCounter";
import { WhyChooseUsCards } from "@/components/site/WhyChooseUsCards";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { TechStackGrid } from "@/components/site/TechStackGrid";
import { CheckCircle2 } from "lucide-react";
import { stats, processSteps, whyChooseUs, coreValues } from "@/data/company";
import { technologyStack } from "@/data/technologies";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About Us | Best IT Company & Tech Partner",
  description:
    "Learn about ZDC Tech Global Solutions — recognized as the best IT company globally. Discover our mission, vision, and how we deliver top-tier software and digital solutions.",
  keywords: [
    "Best IT company",
    "software development agency",
    "top tech partner",
    "ZDC Tech",
    "global IT solutions",
    "about ZDC tech",
  ],
  openGraph: {
    title: "About ZDC Tech Global Solutions",
    description:
      "Learn about ZDC Tech Global Solutions — our mission, vision, core values and the team that builds digital solutions for businesses worldwide.",
    url: "https://zdctechglobalsolutions.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="About Us"
        title="Engineering Digital Excellence"
        description="We are a team of engineers, designers, and strategists committed to building technology that creates real business value."
      />

      {/* Company Introduction */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative lg:pr-8">
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-slate-100 aspect-[4/3]">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="ZDC Tech Global Solutions team collaborating"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 sm:right-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl font-black text-[#0ea5e9]">
                  20+
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0b1b3d] leading-tight">Expert<br/>Professionals</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
                WHO WE ARE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] leading-tight mb-6">
                A Technology Company Built on Trust and Excellence
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed text-slate-500">
                <p>
                  ZDC Tech Global Solutions was founded with a simple belief:
                  technology should solve real problems, not create new ones.
                  Since 2019, we have been helping businesses across industries
                  leverage digital solutions to streamline operations, reach
                  more customers, and grow faster.
                </p>
                <p>
                  What started as a small team of passionate engineers has grown
                  into a full-service technology company with expertise across
                  web, mobile, software, and cloud. We have delivered over 100
                  projects for more than 50 clients, from startups to
                  enterprises.
                </p>
                <ul className="space-y-3 pt-4">
                  {[
                    "Transparent communication at every step",
                    "Solutions aligned with your business goals",
                    "Long-term partnerships built on quality"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] font-semibold text-[#0b1b3d]">
                      <CheckCircle2 className="h-5 w-5 text-[#0ea5e9]" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                {(() => {
                  const Icon = getIcon("Rocket");
                  return <Icon className="h-7 w-7 text-[#0ea5e9]" strokeWidth={2.5} />;
                })()}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0b1b3d]">
                Our Mission
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
                To empower businesses with innovative digital solutions that
                drive growth, efficiency and competitive advantage. We exist to
                turn complex problems into elegant software that people love to
                use.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                {(() => {
                  const Icon = getIcon("TrendingUp");
                  return <Icon className="h-7 w-7 text-[#0ea5e9]" strokeWidth={2.5} />;
                })()}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0b1b3d]">
                Our Vision
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
                To be the most trusted technology partner for businesses
                worldwide, recognized for engineering excellence, honest
                partnerships and solutions that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

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
