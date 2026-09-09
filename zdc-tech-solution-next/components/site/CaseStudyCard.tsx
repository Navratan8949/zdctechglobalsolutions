'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';

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
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/50 transition-all duration-300 hover:border-primary/40"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            {caseStudy.industry}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{caseStudy.client}</p>
          <h3 className="mt-2 text-xl font-semibold text-white transition-colors group-hover:text-primary">
            {caseStudy.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {caseStudy.challenge}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
            {caseStudy.results.slice(0, 3).map((r) => (
              <div key={r.label}>
                <p className="font-display text-lg font-bold text-primary">{r.value}</p>
                <p className="text-[10px] leading-tight text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read Case Study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
