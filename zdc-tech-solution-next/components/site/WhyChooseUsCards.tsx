'use client';

import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icons';
import type { WhyChooseUs } from '@/data/company';

interface WhyChooseUsCardsProps {
  items: WhyChooseUs[];
}

export function WhyChooseUsCards({ items }: WhyChooseUsCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = getIcon(item.icon);
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group relative h-full rounded-2xl border border-white/8 bg-[#071124]/80 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]"
          >
            {/* Top highlight on hover — CSS only, no JS animation */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400/40 group-hover:bg-blue-400/15">
              <Icon className="h-7 w-7 text-blue-400" />
            </div>

            {/* Text */}
            <h3 className="mt-6 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-blue-200">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
