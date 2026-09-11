"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProcessStep } from "@/data/company";
import { cn } from "@/lib/utils";

interface ProcessGridProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessGridProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Calculate the percentage width for the progress bar
  const progressPercentage = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Timeline Section */}
      <div className="relative mb-10 sm:mb-14">
        {/* Background Track */}
        <div className="absolute top-[18px] left-10 right-10 h-[2px] bg-slate-200" />

        {/* Animated Progress Track */}
        <div className="absolute top-[18px] left-10 right-10 h-[2px] overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[#0ea5e9]"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <div className="relative flex justify-between items-start z-10">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;

            return (
              <div
                key={step.step}
                className="flex flex-col items-center cursor-pointer group w-16 sm:w-28"
                onClick={() => setActiveStep(i)}
              >
                {/* Number Circle */}
                <div
                  className={cn(
                    "w-[38px] h-[38px] rounded-lg flex items-center justify-center text-[13px] font-bold transition-all duration-300 relative",
                    isActive
                      ? "bg-[#0ea5e9] text-white shadow-md ring-4 ring-blue-50"
                      : isPast
                        ? "bg-[#0ea5e9] text-white"
                        : "bg-white border-2 border-slate-200 text-slate-400 group-hover:border-blue-200 group-hover:text-[#0ea5e9]",
                  )}
                >
                  {i + 1}
                </div>

                {/* Step Title (below circle) */}
                <div
                  className={cn(
                    "mt-3 text-[12px] sm:text-[14px] font-semibold text-center transition-colors duration-300 leading-tight hidden sm:block",
                    isActive || isPast
                      ? "text-[#0b1b3d]"
                      : "text-slate-500 group-hover:text-[#0ea5e9]",
                  )}
                >
                  {step.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Section (Minimalist) */}
      <div className="text-center min-h-[140px] px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl sm:text-[28px] font-bold text-[#0b1b3d] mb-4 tracking-tight">
              {steps[activeStep].title}
            </h3>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-slate-500 max-w-2xl mx-auto">
              {steps[activeStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
