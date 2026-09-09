"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { HeroParticles } from "@/components/site/HeroParticles";

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
  // State extracted to TypewriterEffect to optimize rendering

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* ── FULL COVER background image ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-tech.jpg"
            alt="ZDC Tech Global IT Solutions"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Clean dark overlay matching brand tone */}
        <div className="absolute inset-0 bg-[#020612]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#01030a]/40 via-transparent to-[#01030a]/80" />

        {/* Gradients to blend with navbar and next section */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B101F] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Text content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[90%] px-6 pt-32 pb-20 sm:px-8 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md"
          >
            <Globe className="h-4 w-4" />
            India Based · Serving 20+ Countries Globally
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-display text-5xl font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-[76px]"
          >
            WELCOME TO <br />
            <span className="relative flex flex-wrap sm:flex-nowrap items-center whitespace-nowrap">
              THE
              <TypewriterEffect />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-300 drop-shadow-lg sm:text-lg lg:text-xl"
          >
            We design and build world-class websites, mobile apps, and custom
            software that moves your business forward — fast, secure, and highly
            scalable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105 hover:bg-primary/90"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Services
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/40"
            >
              Free Consultation
            </Link>
          </motion.div>

          {/* Glassmorphism Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            className="mt-16 flex flex-wrap gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-2xl lg:gap-12"
          >
            {[
              {
                value: "500+",
                label: "Projects Delivered",
              },
              {
                value: "20+",
                label: "Countries Served",
              },
              {
                value: "98%",
                label: "Client Satisfaction",
              },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <div className="font-display text-4xl font-black text-white">
                  {value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
