"use client";

import { MessageSquarePlus } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingContactButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event("open-contact-popup"));
  };

  return (
    <>
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed right-0 top-1/2 z-[100] hidden lg:block"
      >
        <button
          onClick={handleClick}
          className="flex items-center gap-3 rounded-r-xl px-3 py-6 font-semibold text-foreground shadow-[-10px_0_20px_rgba(var(--primary),0.3)] transition-all hover:-translate-x-1"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            background: "linear-gradient(270deg, #0055ff, #00a2ff, #0055ff)",
            backgroundSize: "200% 200%",
            animation: "gradientFlow 3s ease infinite",
          }}
        >
          <MessageSquarePlus className="h-5 w-5 rotate-90" />
          <span className="tracking-wider uppercase text-sm">Get in Touch</span>
        </button>
      </motion.div>
    </>
  );
}
