import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import { SectionHeading } from '@/components/site/SectionHeading';
import { CTASection } from '@/components/site/CTASection';
import { StatsCounter } from '@/components/site/StatsCounter';
import { WhyChooseUsCards } from '@/components/site/WhyChooseUsCards';
import { ProcessTimeline } from '@/components/site/ProcessTimeline';
import { TechStackGrid } from '@/components/site/TechStackGrid';
import { CheckCircle2 } from 'lucide-react';
import { stats, processSteps, whyChooseUs, coreValues } from '@/data/company';
import { technologyStack } from '@/data/technologies';
import { getIcon } from '@/lib/icons';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ZDC Tech Global Solutions — our mission, vision, core values and the team that builds digital solutions for businesses worldwide.',
  keywords: ['IT company', 'software development agency', 'ZDC Tech', 'tech partner', 'custom software', 'digital solutions'],
  openGraph: {
    title: 'About ZDC Tech Global Solutions',
    description:
      'Learn about ZDC Tech Global Solutions — our mission, vision, core values and the team that builds digital solutions for businesses worldwide.',
    url: 'https://zdctechglobalsolutions.com/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Engineering Digital Excellence Since 2019"
        description="We are a team of engineers, designers and strategists committed to building technology that creates real business value."
      />

      {/* Company Introduction */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="ZDC Tech Global Solutions team collaborating"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-card/90 p-5 backdrop-blur-md glow-blue-sm">
                <div className="font-display text-3xl font-bold text-gradient">20+</div>
                <p className="text-xs text-muted-foreground">Expert Professionals</p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="A Technology Company Built on Trust and Excellence"
                align="left"
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  ZDC Tech Global Solutions was founded with a simple belief: technology should solve real problems,
                  not create new ones. Since 2019, we have been helping businesses across industries
                  leverage digital solutions to streamline operations, reach more customers and grow faster.
                </p>
                <p>
                  What started as a small team of passionate engineers has grown into a full-service
                  technology company with expertise across web, mobile, software and cloud. We have
                  delivered over 100 projects for more than 50 clients, from startups to enterprises.
                </p>
                <p>
                  We do not just write code. We understand your business, ask the right questions and
                  build solutions that align with your goals. Every project is a partnership, and every
                  partnership is built on transparency, quality and mutual respect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-1/4 top-1/2 h-[300px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-card/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20">
                {(() => { const Icon = getIcon('Rocket'); return <Icon className="h-6 w-6 text-primary" />; })()}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To empower businesses with innovative digital solutions that drive growth, efficiency
                and competitive advantage. We exist to turn complex problems into elegant software that
                people love to use.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card/50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-secondary/20 to-primary/20">
                {(() => { const Icon = getIcon('TrendingUp'); return <Icon className="h-6 w-6 text-secondary" />; })()}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                To be the most trusted technology partner for businesses worldwide, recognized for
                engineering excellence, honest partnerships and solutions that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            description="The principles that guide every decision we make and every line of code we write."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30 hover:bg-card/70"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/15 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            description="Six reasons why businesses choose ZDC Tech Global Solutions as their technology partner."
          />
          <div className="mt-12">
            <WhyChooseUsCards items={whyChooseUs} />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Tech Stack"
            title="Technologies We Work With"
            description="We invest in modern, proven technologies to deliver solutions that last."
          />
          <div className="mt-12">
            <TechStackGrid groups={technologyStack} />
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Work"
            description="A structured, transparent process that keeps you informed at every step."
          />
          <div className="mt-16">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsCounter stats={stats} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
