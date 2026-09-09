"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TechnologyBadge } from "./TechnologyBadge";
import type { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  index?: number;
}

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.technologies.slice(0, 4).map((tech) => (
            <TechnologyBadge key={tech} name={tech} />
          ))}
        </div>

        <Link
          href={`/portfolio/${item.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          View Project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
