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
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_10px_40px_rgba(14,165,233,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
    >
      {/* Background Quote Mark */}
      <Quote 
        className="absolute -right-4 -top-4 h-32 w-32 -scale-x-100 text-slate-50 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-blue-50" 
        strokeWidth={1}
      />
      
      {/* Top subtle highlight */}
      <div className="absolute inset-x-0 top-0 h-[3px] w-full bg-[#0ea5e9] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-6 flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:scale-110" />
          ))}
        </div>
        <p className="text-[15px] leading-relaxed text-slate-500 italic transition-colors duration-300 group-hover:text-[#0b1b3d] flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
        <div className="relative shrink-0">
          <img
            src={typeof testimonial.avatar === 'string' ? testimonial.avatar : testimonial.avatar?.url || ''}
            alt={testimonial.name}
            className="h-14 w-14 rounded-full border border-gray-200 object-cover transition-colors duration-300 group-hover:border-[#0ea5e9]"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0ea5e9] text-white ring-2 ring-white transition-transform duration-300 group-hover:scale-110">
            <Quote className="h-2.5 w-2.5" strokeWidth={3} />
          </div>
        </div>
        <div>
          <h4 className="text-[15px] font-bold text-[#0b1b3d] transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {testimonial.position} <span className="mx-1 text-gray-300">|</span> <span className="font-bold text-[#0ea5e9]">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
