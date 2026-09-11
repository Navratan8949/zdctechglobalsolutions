"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
}

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-200"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <span className="mb-2 text-[11px] font-bold uppercase tracking-wider text-blue-500">
            {item.category}
          </span>
          
          <h3 className="text-[18px] font-bold text-[#0b1b3d] mb-2 group-hover:text-[#0ea5e9] transition-colors">
            {item.title}
          </h3>
          
          <p className="text-[14px] leading-relaxed text-slate-500 line-clamp-2 mb-6 flex-1">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {item.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
