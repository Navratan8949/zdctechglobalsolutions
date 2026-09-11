"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index?: number;
}

export function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(14,165,233,0.1)] hover:border-blue-200"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#0b1b3d] shadow-sm">
              {caseStudy.industry}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
            {caseStudy.client}
          </p>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#0b1b3d] transition-colors duration-300 group-hover:text-[#0ea5e9] leading-snug mb-3">
            {caseStudy.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-slate-500 line-clamp-3 mb-6 flex-1">
            {caseStudy.challenge}
          </p>

          <div className="mt-auto flex items-center text-[12px] font-bold uppercase tracking-widest text-[#0b1b3d] transition-colors duration-300 group-hover:text-[#0ea5e9]">
            Read Case Study
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
