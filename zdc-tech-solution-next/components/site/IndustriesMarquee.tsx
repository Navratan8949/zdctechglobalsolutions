"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Building2,
  Stethoscope,
  ShoppingCart,
  Zap,
  GraduationCap,
  Factory,
  Truck,
  Briefcase,
  Plane,
  Home,
} from "lucide-react";
import { getIndustries } from "@/service/industry.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";
import { industries as fallbackIndustries } from "@/data/industries";
import { getIcon } from "@/lib/icons";

const styledIndustries = [
  {
    name: "Technology",
    icon: Zap,
    description: "SaaS platforms & developer tools",
    gradient: "from-blue-500/15 to-cyan-500/10",
    border: "hover:border-blue-500/40",
    iconBg: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-400",
    badge: "Tech",
  },
  {
    name: "Finance & Banking",
    icon: Briefcase,
    description: "Fintech, banking & payments",
    gradient: "from-emerald-500/15 to-teal-500/10",
    border: "hover:border-emerald-500/40",
    iconBg: "from-emerald-500 to-teal-400",
    iconColor: "text-emerald-400",
    badge: "Finance",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Patient portals & HMS",
    gradient: "from-rose-500/15 to-pink-500/10",
    border: "hover:border-rose-500/40",
    iconBg: "from-rose-500 to-pink-400",
    iconColor: "text-rose-400",
    badge: "Health",
  },
  {
    name: "Government",
    icon: Building2,
    description: "e-Governance & citizen apps",
    gradient: "from-amber-500/15 to-yellow-500/10",
    border: "hover:border-amber-500/40",
    iconBg: "from-amber-500 to-yellow-400",
    iconColor: "text-amber-400",
    badge: "Gov",
  },
  {
    name: "E-Commerce",
    icon: ShoppingCart,
    description: "Online stores & marketplaces",
    gradient: "from-violet-500/15 to-purple-500/10",
    border: "hover:border-violet-500/40",
    iconBg: "from-violet-500 to-purple-400",
    iconColor: "text-violet-400",
    badge: "eCommerce",
  },
  {
    name: "Education",
    icon: GraduationCap,
    description: "LMS & edtech platforms",
    gradient: "from-sky-500/15 to-blue-500/10",
    border: "hover:border-sky-500/40",
    iconBg: "from-sky-500 to-blue-400",
    iconColor: "text-sky-400",
    badge: "EdTech",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "ERP & process automation",
    gradient: "from-orange-500/15 to-amber-500/10",
    border: "hover:border-orange-500/40",
    iconBg: "from-orange-500 to-amber-400",
    iconColor: "text-orange-400",
    badge: "Mfg",
  },
  {
    name: "Logistics",
    icon: Truck,
    description: "Fleet tracking & supply chain",
    gradient: "from-lime-500/15 to-green-500/10",
    border: "hover:border-lime-500/40",
    iconBg: "from-lime-500 to-green-400",
    iconColor: "text-lime-400",
    badge: "Logistics",
  },
  {
    name: "Real Estate",
    icon: Home,
    description: "Property portals & CRM",
    gradient: "from-indigo-500/15 to-blue-500/10",
    border: "hover:border-indigo-500/40",
    iconBg: "from-indigo-500 to-blue-400",
    iconColor: "text-indigo-400",
    badge: "PropTech",
  },
  {
    name: "Travel & Tourism",
    icon: Plane,
    description: "Booking & tourism platforms",
    gradient: "from-fuchsia-500/15 to-pink-500/10",
    border: "hover:border-fuchsia-500/40",
    iconBg: "from-fuchsia-500 to-pink-400",
    iconColor: "text-fuchsia-400",
    badge: "Travel",
  },
];

export function IndustriesMarquee() {
  const [industries, setIndustries] = useState(styledIndustries);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadIndustries = async () => {
      try {
        const response = await getIndustries();
        if (!active) return;
        const liveIndustries =
          unwrapApiResponse<typeof fallbackIndustries>(response) || [];
        if (liveIndustries.length) {
          setIndustries(
            liveIndustries.map((industry, index) => ({
              name: industry.name,
              icon: getIcon(industry.icon),
              description: industry.description,
              gradient:
                styledIndustries[index % styledIndustries.length].gradient,
              border: styledIndustries[index % styledIndustries.length].border,
              iconBg: styledIndustries[index % styledIndustries.length].iconBg,
              iconColor:
                styledIndustries[index % styledIndustries.length].iconColor,
              badge: industry.name,
            })),
          );
        }
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadIndustries();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative border-t border-white/5 py-20 lg:py-28">
      {/* Single, subtle bg glow — no heavy blur */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-primary/4 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Industries We Serve
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Powering Businesses{" "}
            <span className="text-gradient">Across Every Industry</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            We deliver impactful digital solutions tailored to the unique
            challenges and opportunities of each industry we serve.
          </p>
          {error && <p className="mt-2 text-xs text-amber-300">{error}</p>}
        </motion.div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative cursor-default"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${industry.gradient} p-5 transition-all duration-300 ${industry.border} hover:-translate-y-1`}
                >
                  {/* Corner badge */}
                  <div className="absolute right-2 top-2 rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/30 group-hover:text-white/55 transition-colors duration-200">
                    {industry.badge}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center text-center gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${industry.iconBg} shadow-md transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Name + desc */}
                    <div>
                      <p className="text-sm font-semibold leading-tight text-white">
                        {industry.name}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/45 group-hover:text-white/65 transition-colors duration-200">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-white/8 bg-white/[0.02] px-8 py-5"
        >
          {[
            { value: "10+", label: "Industries Served" },
            { value: "20+", label: "Countries Reached" },
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gradient">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
