"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

import InteractiveNeuralVortex from "@/components/ui/interactive-neural-vortex-background";

// Separate component to prevent HomeHero from re-rendering every 40ms during typing
const TypewriterEffect = () => {
  const words = ["FUTURE", "INNOVATION", "TECHNOLOGY", "DIGITAL WORLD"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1),
      );

      // Speed is faster when deleting
      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        // Pause at the end of the word before starting to delete
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // Move to the next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="relative ml-3 inline-flex items-center min-w-[280px] whitespace-nowrap sm:min-w-[400px]">
      <span className="whitespace-nowrap text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.3)]">
        {text}
      </span>
      <span className="ml-1 -mb-1 animate-pulse font-light text-primary">
        |
      </span>
    </span>
  );
};

export function HomeHero() {
  return (
    <InteractiveNeuralVortex className="flex items-center justify-center text-center">
      {/* ── Text content ── */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-32 pb-20 sm:px-8 lg:px-8 flex flex-col items-center justify-center">
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary shadow-sm"
        >
          <Globe className="h-4 w-4" />
          India Based · Serving 20+ Countries Globally
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[76px] flex flex-col items-center"
        >
          WELCOME TO
          <span className="relative mt-2 flex flex-wrap sm:flex-nowrap items-center justify-center whitespace-nowrap">
            THE
            <TypewriterEffect />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
        >
          We design and build world-class websites, mobile apps, and custom
          software that moves your business forward — fast, secure, and highly
          scalable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center items-center gap-5"
        >
          <Link
            href="/services"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-md transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Services
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl border border-border bg-white px-8 py-4 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-gray-50 hover:border-primary/30 hover:shadow-md"
          >
            Free Consultation
          </Link>
        </motion.div>
      </div>
    </InteractiveNeuralVortex>
  );
}
