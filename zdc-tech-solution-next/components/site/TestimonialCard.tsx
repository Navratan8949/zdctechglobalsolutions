'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-[#071124]/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#071124]/80 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]"
    >
      {/* Background Quote Mark */}
      <Quote 
        className="absolute -right-3 -top-3 h-28 w-28 -scale-x-100 text-white/[0.02] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-primary/[0.05]" 
        strokeWidth={1}
      />
      
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-5 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-transform duration-300 group-hover:scale-105" />
          ))}
        </div>
        <p className="text-[14px] leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/95">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full border-2 border-white/10 object-cover transition-colors duration-300 group-hover:border-primary/50"
          />
          <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-2 ring-[#020617] transition-transform duration-300 group-hover:scale-110">
            <Quote className="h-2 w-2 text-white" strokeWidth={3} />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {testimonial.position} <span className="mx-1 text-white/30">|</span> <span className="font-medium text-white/70">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
