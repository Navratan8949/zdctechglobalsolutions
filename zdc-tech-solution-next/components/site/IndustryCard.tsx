'use client';

import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icons';
import type { Industry } from '@/data/industries';

interface IndustryCardProps {
  industry: Industry;
  index?: number;
}

import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const Icon = getIcon(industry.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <SpotlightCard className="h-full">
        <div className="relative z-10 flex h-full flex-col items-center p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/15 transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">{industry.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
