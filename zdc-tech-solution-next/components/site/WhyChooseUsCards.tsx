"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { WhyChooseUs } from "@/data/company";
import {
  getWhyChooseUs,
  type WhyChooseUsData,
} from "@/service/whyChooseUs.service";
import { unwrapApiResponse } from "@/lib/public-api";

interface WhyChooseUsCardsProps {
  items: WhyChooseUs[];
}

// Convert fallback data to match the API data structure loosely
const fallbackData: WhyChooseUsData[] = [];

export function WhyChooseUsCards({
  items: initialFallback,
}: WhyChooseUsCardsProps) {
  const [items, setItems] = useState<WhyChooseUsData[]>([]);
  const [fallbackItems] = useState<WhyChooseUs[]>(initialFallback);

  useEffect(() => {
    let active = true;
    const fetchWhyChooseUs = async () => {
      try {
        const res = await getWhyChooseUs();
        if (!active) return;
        const liveItems = unwrapApiResponse<WhyChooseUsData[]>(res) || [];
        if (liveItems.length > 0) {
          setItems(liveItems);
        }
      } catch (err) {
        // Silently fallback
      }
    };
    void fetchWhyChooseUs();
    return () => {
      active = false;
    };
  }, []);

  const displayItems = items.length > 0 ? items : fallbackItems;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayItems.map((item, i) => {
        // If it's a dynamic item with an image URL, we use that. Otherwise fallback icon.
        const isDynamic = "_id" in item;
        const imageUrl = isDynamic
          ? (item as WhyChooseUsData).image?.url
          : undefined;
        const Icon = !isDynamic
          ? getIcon((item as WhyChooseUs).icon)
          : undefined;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative h-full rounded-2xl bg-white p-4 shadow-xl overflow-hidden"
          >
            {/* Advanced Expanding Circle Fill Animation */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-[#0ea5e9] rounded-full scale-0 transition-transform duration-700 ease-out group-hover:scale-[20] z-0 origin-center" />

            {/* Icon / Image */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-50 text-[#125bba] transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110 mb-6 shadow-sm overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-12 h-12 object-cover transition-opacity duration-500 group-hover:opacity-90"
                />
              ) : Icon ? (
                <Icon className="h-8 w-8" />
              ) : null}
            </div>

            {/* Text */}
            <h3 className="relative z-10 text-xl font-bold tracking-tight text-[#0b1b3d] transition-colors duration-500 group-hover:text-white mb-3">
              {item.title}
            </h3>
            <p className="relative z-10 text-[14px] leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-blue-50">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
