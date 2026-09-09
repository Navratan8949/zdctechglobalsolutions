'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  title = 'Have a Project in Mind?',
  description = 'Let us turn your idea into a powerful digital solution. Get in touch today for a free consultation.',
  primaryLabel = 'Start a Project',
  primaryHref = '/contact',
  secondaryLabel = 'Contact Us',
  secondaryHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-8 text-center sm:p-12 lg:p-16"
        >
          <div className="absolute left-1/2 top-0 h-[200px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-[150px] w-[300px] rounded-full bg-secondary/15 blur-[80px]" />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105 hover:bg-primary/90"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
