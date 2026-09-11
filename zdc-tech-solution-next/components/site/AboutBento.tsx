'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe2, Users, Code2, Award, Zap, HeartHandshake, 
  ArrowRight, TrendingUp, Clock, CheckCircle
} from 'lucide-react';

const bentoCards = [
  {
    id: 'globe',
    className: 'lg:col-span-2 row-span-2',
    content: (
      <div className="flex h-full flex-col justify-between p-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            <Globe2 className="h-3 w-3" />
            Global Reach
          </div>
          <h3 className="font-display text-3xl font-bold text-foreground">Serving Clients in<br /><span className="text-gradient">20+ Countries</span></h3>
          <p className="mt-2 text-sm text-muted-foreground">India-based, globally connected. We deliver world-class digital solutions to businesses across every continent.</p>
        </div>
        {/* SVG World Map lines */}
        <div className="relative mt-6 h-40 overflow-hidden opacity-60">
          <svg viewBox="0 0 800 400" className="w-full" fill="none">
            {/* Simplified world continents - stroke only */}
            <path d="M160 180 Q180 160 200 170 Q220 165 230 180 Q225 195 210 200 Q190 205 170 195 Z" stroke="rgb(99 102 241)" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M250 160 Q280 140 320 145 Q360 148 380 165 Q385 185 370 200 Q345 215 310 210 Q275 205 255 188 Z" stroke="rgb(99 102 241)" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M430 150 Q480 130 530 140 Q575 148 600 175 Q605 200 580 215 Q540 228 490 220 Q445 210 430 185 Z" stroke="rgb(99 102 241)" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M620 155 Q660 140 700 155 Q720 170 715 190 Q695 210 660 205 Q630 195 620 175 Z" stroke="rgb(99 102 241)" strokeWidth="1" fill="none" opacity="0.6"/>
            {/* Connection arcs */}
            <path d="M490 170 Q400 80 250 175" stroke="rgb(139 92 246)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2s" repeatCount="indefinite"/>
            </path>
            <path d="M490 170 Q600 60 680 165" stroke="rgb(59 130 246)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="2.5s" repeatCount="indefinite"/>
            </path>
            <path d="M490 170 Q500 260 490 300" stroke="rgb(16 185 129)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" opacity="0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="3s" repeatCount="indefinite"/>
            </path>
            {/* Dots */}
            <circle cx="490" cy="170" r="5" fill="rgb(99 102 241)"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/></circle>
            <circle cx="250" cy="175" r="3" fill="rgb(139 92 246)" opacity="0.9"/>
            <circle cx="680" cy="165" r="3" fill="rgb(59 130 246)" opacity="0.9"/>
            <circle cx="200" cy="180" r="3" fill="rgb(16 185 129)" opacity="0.9"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: 'stats1',
    className: 'col-span-1',
    content: (
      <div className="flex h-full flex-col justify-between p-6">
        <TrendingUp className="h-6 w-6 text-emerald-400" />
        <div>
          <div className="font-display text-4xl font-bold text-foreground">500+</div>
          <div className="text-sm text-muted-foreground">Projects Delivered</div>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            +40% this year
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'stats2',
    className: 'col-span-1',
    content: (
      <div className="flex h-full flex-col justify-between p-6">
        <Users className="h-6 w-6 text-purple-400" />
        <div>
          <div className="font-display text-4xl font-bold text-foreground">98%</div>
          <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          <div className="mt-3 flex gap-0.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-1 flex-1 rounded-full bg-purple-400 opacity-90" style={{ opacity: i <= 4 ? 1 : 0.5 }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'team',
    className: 'col-span-1 lg:col-span-2',
    content: (
      <div className="flex h-full flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-pink-400" />
          <span className="text-sm font-semibold text-foreground">Why ZDC Tech?</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Agile Development',
            'Transparent Pricing',
            'Dedicated Support',
            'On-Time Delivery',
          ].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary hover:gap-2 transition-all"
        >
          Learn About Us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    ),
  },
  {
    id: 'exp',
    className: 'col-span-1',
    content: (
      <div className="flex h-full flex-col justify-between p-6">
        <Clock className="h-6 w-6 text-orange-400" />
        <div>
          <div className="font-display text-4xl font-bold text-foreground">5+</div>
          <div className="text-sm text-muted-foreground">Years of Excellence</div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
            <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
          </div>
        </div>
      </div>
    ),
  },
];

export function AboutBento() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Code2 className="h-3 w-3" />
            About Our Company
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Your Global Digital Partner
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            We are a team of passionate engineers, designers and strategists transforming ideas into world-class digital products.
          </p>
        </motion.div>

        <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 ${card.className}`}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.06), transparent 70%)' }}
              />
              {card.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
