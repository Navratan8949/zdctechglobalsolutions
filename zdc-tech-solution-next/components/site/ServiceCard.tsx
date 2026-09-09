'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '@/lib/icons';
import type { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <SpotlightCard className="h-full">
        <Link
          href={`/services/${service.slug}`}
          className="relative flex h-full flex-col p-6 z-10"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6 text-primary" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white transition-colors group-hover:text-primary">
            {service.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}
