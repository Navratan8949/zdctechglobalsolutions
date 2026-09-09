"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto popup after 10 seconds (like competitor site)
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPopup", "true");
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Listen for custom event from FloatingContactButton
  useEffect(() => {
    const handleOpenPopup = () => setIsOpen(true);
    window.addEventListener("open-contact-popup", handleOpenPopup);
    return () => window.removeEventListener("open-contact-popup", handleOpenPopup);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0B101F] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Get a Free Consultation</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Container */}
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <p className="mb-6 text-sm text-slate-300">
                Discuss your project with our experts. Fill out the form below and we will get back to you shortly.
              </p>
              
              <ContactForm />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
