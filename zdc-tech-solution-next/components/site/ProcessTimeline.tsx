"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { getIcon } from "@/lib/icons";
import type { ProcessStep } from "@/data/company";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

const stepThemes = [
  {
    num: "from-blue-500 to-cyan-400",
    border: "border-blue-500/25",
    hoverBorder: "hover:border-blue-400/60",
    glow: "0 0 40px -8px rgba(59,130,246,0.35)",
    dot: "from-blue-500 to-cyan-400",
    text: "text-blue-400",
    ring: "ring-blue-500/15",
    card: "from-blue-500/[0.06] to-transparent",
  },
  {
    num: "from-violet-500 to-purple-400",
    border: "border-violet-500/25",
    hoverBorder: "hover:border-violet-400/60",
    glow: "0 0 40px -8px rgba(139,92,246,0.35)",
    dot: "from-violet-500 to-purple-400",
    text: "text-violet-400",
    ring: "ring-violet-500/15",
    card: "from-violet-500/[0.06] to-transparent",
  },
  {
    num: "from-rose-500 to-pink-400",
    border: "border-rose-500/25",
    hoverBorder: "hover:border-rose-400/60",
    glow: "0 0 40px -8px rgba(244,63,94,0.35)",
    dot: "from-rose-500 to-pink-400",
    text: "text-rose-400",
    ring: "ring-rose-500/15",
    card: "from-rose-500/[0.06] to-transparent",
  },
  {
    num: "from-emerald-500 to-teal-400",
    border: "border-emerald-500/25",
    hoverBorder: "hover:border-emerald-400/60",
    glow: "0 0 40px -8px rgba(16,185,129,0.35)",
    dot: "from-emerald-500 to-teal-400",
    text: "text-emerald-400",
    ring: "ring-emerald-500/15",
    card: "from-emerald-500/[0.06] to-transparent",
  },
  {
    num: "from-amber-500 to-orange-400",
    border: "border-amber-500/25",
    hoverBorder: "hover:border-amber-400/60",
    glow: "0 0 40px -8px rgba(245,158,11,0.35)",
    dot: "from-amber-500 to-orange-400",
    text: "text-amber-400",
    ring: "ring-amber-500/15",
    card: "from-amber-500/[0.06] to-transparent",
  },
  {
    num: "from-sky-500 to-blue-400",
    border: "border-sky-500/25",
    hoverBorder: "hover:border-sky-400/60",
    glow: "0 0 40px -8px rgba(14,165,233,0.35)",
    dot: "from-sky-500 to-blue-400",
    text: "text-sky-400",
    ring: "ring-sky-500/15",
    card: "from-sky-500/[0.06] to-transparent",
  },
  {
    num: "from-fuchsia-500 to-violet-400",
    border: "border-fuchsia-500/25",
    hoverBorder: "hover:border-fuchsia-400/60",
    glow: "0 0 40px -8px rgba(217,70,239,0.35)",
    dot: "from-fuchsia-500 to-violet-400",
    text: "text-fuchsia-400",
    ring: "ring-fuchsia-500/15",
    card: "from-fuchsia-500/[0.06] to-transparent",
  },
];

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const theme = stepThemes[index % stepThemes.length];
  const Icon = getIcon(step.icon);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card side — 45% */}
      <div className={`relative group w-[45%] ${isLeft ? "pr-8" : "pl-8"}`}>
        {/* Ghost step number */}
        <div
          className={`absolute ${isLeft ? "right-8 bottom-0" : "left-8 bottom-0"} select-none pointer-events-none font-black text-[110px] leading-none opacity-[0.035] bg-gradient-to-br ${theme.num} bg-clip-text text-transparent`}
        >
          {step.step}
        </div>

        {/* Card */}
        <div
          className={`relative overflow-hidden rounded-2xl border ${theme.border} ${theme.hoverBorder} bg-gradient-to-br ${theme.card} transition-all duration-300 group-hover:-translate-y-1 cursor-default`}
          style={{ boxShadow: "none" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = theme.glow;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Top accent */}
          <div
            className={`h-[2px] w-full bg-gradient-to-r ${theme.num} opacity-50`}
          />

          <div className="relative z-10 p-6">
            {/* Step badge */}
            <span
              className={`inline-block rounded-full border ${theme.border} bg-white/[0.04] px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] ${theme.text} mb-4`}
            >
              Step {step.step}
            </span>

            {/* Icon + title */}
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${theme.num} shadow-md ring-4 ${theme.ring}`}
              >
                <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mt-1 text-lg font-bold leading-snug text-white">
                {step.title}
              </h3>
            </div>

            {/* Expanding underline */}
            <div
              className={`mt-3 h-px bg-gradient-to-r ${theme.num} opacity-25 transition-all duration-300 w-8 group-hover:w-full`}
            />

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300">
              {step.description}
            </p>
          </div>
        </div>
      </div>

      {/* Central dot — 10% */}
      <div className="relative z-20 flex w-[10%] justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.07 + 0.15 }}
          className={`h-9 w-9 rounded-full bg-gradient-to-br ${theme.dot} shadow-md ring-4 ${theme.ring} flex items-center justify-center`}
        >
          <span className="text-[10px] font-black text-white">{step.step}</span>
        </motion.div>
      </div>

      {/* Empty side — 45% */}
      <div className="w-[45%]" />
    </motion.div>
  );
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <>
      {/* Mobile layout */}
      <div className="flex flex-col gap-5 lg:hidden">
        {steps.map((step, i) => {
          const theme = stepThemes[i % stepThemes.length];
          const Icon = getIcon(step.icon);
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${theme.num} shadow-md ring-4 ${theme.ring}`}
                >
                  <span className="text-xs font-black text-white">
                    {step.step}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`mt-1 w-0.5 flex-1 min-h-[32px] bg-gradient-to-b ${theme.num} opacity-25`}
                  />
                )}
              </div>
              <div
                className={`mb-3 flex-1 rounded-xl border ${theme.border} bg-gradient-to-br ${theme.card} p-5`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${theme.num}`}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop layout */}
      <div className="relative hidden lg:block">
        {/* Static vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        {/* Steps */}
        <div className="relative flex flex-col gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* End cap */}
      <div className="hidden lg:flex justify-center mt-1">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500" />
        </motion.div>
      </div>
    </>
  );
}
