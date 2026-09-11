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
    badge: "Tech",
  },
  {
    name: "Finance & Banking",
    icon: Briefcase,
    description: "Fintech, banking & payments",
    badge: "Finance",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description: "Patient portals & HMS",
    badge: "Health",
  },
  {
    name: "Government",
    icon: Building2,
    description: "e-Governance & citizen apps",
    badge: "Gov",
  },
  {
    name: "E-Commerce",
    icon: ShoppingCart,
    description: "Online stores & marketplaces",
    badge: "eCommerce",
  },
  {
    name: "Education",
    icon: GraduationCap,
    description: "LMS & edtech platforms",
    badge: "EdTech",
  },
  {
    name: "Manufacturing",
    icon: Factory,
    description: "ERP & process automation",
    badge: "Mfg",
  },
  {
    name: "Logistics",
    icon: Truck,
    description: "Fleet tracking & supply chain",
    badge: "Logistics",
  },
  {
    name: "Real Estate",
    icon: Home,
    description: "Property portals & CRM",
    badge: "PropTech",
  },
  {
    name: "Travel & Tourism",
    icon: Plane,
    description: "Booking & tourism platforms",
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
    <section className="relative bg-[#0b1b3d] py-16 lg:py-20 overflow-hidden">
      {/* Decorative subtle glows for the dark bg */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9] opacity-[0.15] blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600 opacity-[0.15] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-white inline-block relative pb-4">
            INDUSTRIES WE SERVE
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-[#0ea5e9]" />
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-blue-100/70 mx-auto">
            We deliver impactful digital solutions tailored to the unique
            challenges and opportunities of each industry we serve.
          </p>
          {error && <p className="mt-2 text-xs text-amber-500">{error}</p>}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative cursor-default h-full"
              >
                <div className="relative h-full overflow-hidden rounded-lg bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-[#0ea5e9] transition-all duration-500 group-hover:scale-110 mb-5 group-hover:bg-[#0ea5e9] group-hover:text-white">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>

                  {/* Name + desc */}
                  <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#0b1b3d] mb-2 transition-colors group-hover:text-[#0ea5e9]">
                    {industry.name}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-slate-500">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md px-10 py-8 shadow-xl"
        >
          {[
            { value: "10+", label: "Industries Served" },
            { value: "20+", label: "Countries Reached" },
            { value: "100+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-black text-white mb-1">
                {stat.value.replace('+', '')}<span className="text-[#0ea5e9]">+</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200/60">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
