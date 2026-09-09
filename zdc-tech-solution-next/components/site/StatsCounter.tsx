'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Stat } from '@/data/company';

interface StatsCounterProps {
  stats: Stat[];
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Counter key={stat.label} stat={stat} inView={inView} delay={i * 0.1} />
      ))}
    </div>
  );
}

function Counter({ stat, inView, delay }: { stat: Stat; inView: boolean; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="relative text-center"
    >
      <div className="font-display text-4xl font-bold text-white sm:text-5xl">
        <span className="text-gradient">{count}</span>
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{stat.label}</p>
    </motion.div>
  );
}
