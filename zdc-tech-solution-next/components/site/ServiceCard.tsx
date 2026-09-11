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
      <div className="group h-full rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
        <Link
          href={`/services/${service.slug}`}
          className="relative flex h-full flex-col p-8"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-[#0ea5e9] overflow-hidden">
            {service.image?.url ? (
              <img 
                src={service.image.url} 
                alt={service.title} 
                className="w-10 h-10 object-contain transition-transform duration-500"
              />
            ) : (
              <Icon className="h-6 w-6 text-[#0ea5e9] transition-colors group-hover:text-white" strokeWidth={2.5} />
            )}
          </div>

          <h3 className="mt-6 text-[20px] font-bold text-[#0b1b3d] transition-colors">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-500">
            {service.shortDescription}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wider text-[#0ea5e9]">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
