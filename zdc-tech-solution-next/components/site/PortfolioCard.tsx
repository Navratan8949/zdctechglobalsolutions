"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
}

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(14,165,233,0.1)] hover:border-blue-200"
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-white border-b border-slate-50">
        <Link href={`/portfolio/${item.slug}`} className="block h-full w-full p-4">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0ea5e9] bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100">
            {item.category}
          </span>
          {item.websiteUrl && (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-[#0ea5e9] hover:text-white transition-all shadow-sm"
              title="Visit Live Site"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        
        <Link href={`/portfolio/${item.slug}`} className="block mb-3">
          <h3 className="text-[22px] font-bold text-[#0b1b3d] group-hover:text-[#0ea5e9] transition-colors line-clamp-1">
            {item.title}
          </h3>
        </Link>
        
        <div 
          className="text-[14px] leading-relaxed text-slate-500 line-clamp-2 mb-8 flex-1"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        {/* Footer Section: Technologies & Action */}
        <div className="flex flex-col gap-5 mt-auto border-t border-slate-100 pt-6">
          <div className="flex flex-wrap gap-2">
            {item.technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#0b1b3d] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <Link 
              href={`/portfolio/${item.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-[#0ea5e9] group/link"
            >
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" strokeWidth={3} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
