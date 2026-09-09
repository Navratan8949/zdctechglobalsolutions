"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { TechGroup } from "@/data/technologies";
import { TechnologyBadge } from "./TechnologyBadge";
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
    <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-16 items-start">
      {/* Left side: Tabs */}
      <div className="flex flex-col gap-2">
        {items.map((group) => {
          const Icon = getIcon(group.icon);
          const isActive = activeTab === group.category;
          return (
            <button
              key={group.category}
              onClick={() => setActiveTab(group.category)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-xl text-left transition-all duration-300 border border-transparent",
                isActive
                  ? "bg-primary/10 border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                  : "hover:bg-white/5 hover:border-white/10",
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/5 text-slate-400",
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div
                  className={cn(
                    "font-bold text-lg",
                    isActive ? "text-primary" : "text-white",
                  )}
                >
                  {group.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Right side: Content */}
      <div className="relative min-h-[300px] p-8 rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm">
        {error && <p className="mb-4 text-xs text-amber-300">{error}</p>}
        <AnimatePresence mode="wait">
          {items.map((group) => {
            if (group.category !== activeTab) return null;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
              >
                {group.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-colors gap-3"
                  >
                    <TechnologyBadge name={tech} />
                    <span className="text-sm font-medium text-slate-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
