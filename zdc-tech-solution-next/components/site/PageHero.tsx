'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, className, children }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20', className)}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-1/4 top-20 h-[200px] w-[400px] rounded-full bg-secondary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary"
          >
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
