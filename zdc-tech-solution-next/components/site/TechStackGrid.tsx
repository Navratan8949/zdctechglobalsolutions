"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { TechGroup } from "@/data/technologies";
import { getIconSlug } from "./TechnologyBadge";
import { cn } from "@/lib/utils";
import { getTechnologies } from "@/service/technology.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

interface TechStackGridProps {
  groups: TechGroup[];
}

export function TechStackGrid({ groups }: TechStackGridProps) {
  const [items, setItems] = useState(groups);
  const [activeTab, setActiveTab] = useState(groups[0]?.category ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadTechnologies = async () => {
      try {
        const response = await getTechnologies();
        if (!active) return;
        const liveGroups = unwrapApiResponse<TechGroup[]>(response) || [];
        if (liveGroups.length) {
          setItems(liveGroups);
          setActiveTab(liveGroups[0].category);
        }
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadTechnologies();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-start">
      {/* Left side: Tabs */}
      <div className="flex flex-col gap-2 p-2 bg-white/80 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.02)] rounded-lg">
        {items.map((group) => {
          const Icon = getIcon(group.icon);
          const isActive = activeTab === group.category;
          return (
            <button
              key={group.category}
              onClick={() => setActiveTab(group.category)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all duration-300 border w-full",
                isActive
                  ? "bg-[#0ea5e9]/10 border-[#0ea5e9]/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]"
                  : "border-transparent hover:bg-slate-50",
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-[#0ea5e9] text-white shadow-md scale-105"
                    : "bg-white border border-gray-100 text-slate-400 shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div
                className={cn(
                  "font-bold text-[15px] transition-colors duration-300",
                  isActive ? "text-[#0ea5e9]" : "text-[#0b1b3d]",
                )}
              >
                {group.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Right side: Content */}
      <div className="relative min-h-[400px] p-8 lg:p-10 rounded-3xl border border-gray-100 bg-slate-50/50 shadow-inner">
        {error && <p className="mb-4 text-xs text-amber-500">{error}</p>}
        <AnimatePresence mode="wait">
          {items.map((group) => {
            if (group.category !== activeTab) return null;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              >
                {group.technologies.map((tech) => {
                  const iconSlug = getIconSlug(tech);
                  return (
                    <div
                      key={tech}
                      className="group flex flex-col items-center justify-center p-6 rounded-lg bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(14,165,233,0.1)] hover:border-blue-200 gap-4"
                    >
                      {iconSlug ? (
                        <div className="h-16 w-16 flex items-center justify-center rounded-xl">
                          <img
                            src={`https://cdn.simpleicons.org/${iconSlug}`}
                            alt={`${tech} icon`}
                            className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="h-14 w-14 flex items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9] font-bold text-xs transition-transform duration-300 group-hover:scale-110">
                          {tech.slice(0, 2)}
                        </div>
                      )}
                      <span className="text-[14px] font-bold text-[#0b1b3d] text-center transition-colors group-hover:text-[#0ea5e9]">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
