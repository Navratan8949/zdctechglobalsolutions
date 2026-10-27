"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { TeamCard } from "@/components/site/TeamCard";
import {
  team as fallbackTeam,
  teamCategories,
  normalizeCategory,
  type TeamMember,
} from "@/data/team";
import { getTeamMembers } from "@/service/team.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";
import { Users, Code, Award, Target, Sparkles, ShieldCheck, Headphones } from "lucide-react";
import Link from "next/link";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  All: "Browse our complete multidisciplinary team of engineers, founders, designers, and growth experts building world-class technology.",
  "Leadership & Founders":
    "Meet our executive founders and leaders directing strategic innovation, engineering standards, and company-wide growth.",
  Developers:
    "Our core software engineering team specializing in full-stack, backend microservices, modern frontend frameworks, mobile apps, and DevOps.",
  "Technical Support":
    "Dedicated technical support executives and client service specialists providing rapid troubleshooting, multi-platform assistance, and round-the-clock digital reliability.",
  "Sales & Marketing":
    "Enterprise account directors, digital marketing specialists, and business growth strategists scaling our global footprint.",
  "UI/UX Design":
    "Human-centered designers and design system architects crafting intuitive, engaging, and accessible digital interfaces.",
  "Quality Assurance":
    "Dedicated SDETs and QA automation leads executing rigorous testing to ensure enterprise-grade stability and zero defect tolerance.",
};

const CATEGORY_ICONS: Record<string, typeof Users> = {
  All: Users,
  "Leadership & Founders": Award,
  Developers: Code,
  "Technical Support": Headphones,
  "Sales & Marketing": Target,
  "UI/UX Design": Sparkles,
  "Quality Assurance": ShieldCheck,
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(fallbackTeam);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadTeam = async () => {
      try {
        const response = await getTeamMembers();
        if (!active) return;
        const liveMembers = unwrapApiResponse<TeamMember[]>(response);
        if (Array.isArray(liveMembers) && liveMembers.length > 0) {
          // Normalize member categories
          const normalized = liveMembers.map((m) => ({
            ...m,
            category: normalizeCategory(m.category, m.position),
          }));
          setMembers(normalized);
        }
      } catch (requestError) {
        if (!active) return;
        setError(getApiErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadTeam();
    return () => {
      active = false;
    };
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: members.length };
    for (const m of members) {
      const cat = normalizeCategory(m.category, m.position);
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [members]);

  // Build unique category list preserving canonical order
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    teamCategories.forEach((cat) => {
      if (cat === "All" || (categoryCounts[cat] && categoryCounts[cat] > 0)) {
        set.add(cat);
      }
    });
    // Add any categories from live data not in standard list
    Object.keys(categoryCounts).forEach((cat) => {
      if (categoryCounts[cat] > 0) set.add(cat);
    });
    return Array.from(set);
  }, [categoryCounts]);

  // Filter members
  const filteredMembers = useMemo(() => {
    if (activeCategory === "All") return members;
    return members.filter((member) => {
      const cat = normalizeCategory(member.category, member.position);
      return cat === activeCategory;
    });
  }, [members, activeCategory]);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        eyebrow="Our Team"
        title="Meet the People Behind the Code"
        description="A multidisciplinary team of visionary founders, skilled developers, creative designers, and growth strategists united by a passion for digital excellence."
      />

      {/* Main Team Section with Category Filter */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
              Departments &amp; Roles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d]">
              Explore Our Team by Category
            </h2>
            <p className="mt-3 text-[16px] text-slate-500 max-w-2xl mx-auto">
              Select any department below to view our leaders, engineers, designers, sales specialists, and QA experts.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {categories.map((category) => {
              const count = categoryCounts[category] || 0;
              const isActive = activeCategory === category;
              const Icon = CATEGORY_ICONS[category] || Users;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/25 scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0b1b3d]"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
                  <span>{category}</span>
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-500 group-hover:bg-slate-300/80"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Notice */}
          <div className="mt-8 text-center">
            <p className="text-[14px] text-slate-500 italic max-w-2xl mx-auto bg-slate-50/80 border border-slate-100 rounded-xl py-3 px-6 shadow-sm">
              {CATEGORY_DESCRIPTIONS[activeCategory] ||
                `Viewing team members in the ${activeCategory} category.`}
            </p>
          </div>

          {/* Status Messages */}
          {loading && (
            <p className="mt-8 text-center text-sm text-slate-400">
              Updating team directory...
            </p>
          )}
          {error && (
            <p className="mt-8 text-center text-sm text-amber-500">{error}</p>
          )}

          {/* Team Cards Grid */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredMembers.map((member, i) => (
                  <TeamCard
                    key={`${member.name}-${member.position}`}
                    member={member}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredMembers.length === 0 && !loading && (
              <div className="mt-16 text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Users className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No members found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  There are currently no team members listed under &ldquo;{activeCategory}&rdquo;.
                </p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="mt-4 inline-flex items-center rounded-lg bg-[#0ea5e9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0284c7] transition-colors"
                >
                  View All Members
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join the Team / Hiring CTA */}
      <section className="py-16 bg-[#0b1b3d] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
            Join Our Mission
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Want to Build the Future with Us?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            We are always looking for ambitious developers, designers, sales leaders, and QA engineers who share our passion for high-impact software.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center rounded-xl bg-[#0ea5e9] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#0284c7]"
            >
              Explore Open Careers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
