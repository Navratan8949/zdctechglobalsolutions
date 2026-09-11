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
    return () =>
      window.removeEventListener("open-contact-popup", handleOpenPopup);
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
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row"
          >
            {/* Left Image Section */}
            <div className="hidden md:block w-6/12 relative bg-slate-100">
              <img
                src="/contact-popup-img.jpg"
                alt="Contact ZDC Tech"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-7/12 flex flex-col max-h-[70vh]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-2">
                <h3 className="text-xl font-bold text-[#0b1b3d]">
                  Get a Free Consultation
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Container */}
              <div className="p-4 overflow-y-auto bg-white">
                <p className="mb-3 text-sm text-slate-500">
                  Discuss your project with our experts. Fill out the form below
                  and we will get back to you shortly.
                </p>

                <div className="[&_label]:text-slate-700 [&_input]:bg-white [&_select]:bg-white [&_textarea]:bg-white [&_input]:text-slate-900 [&_select]:text-slate-900 [&_textarea]:text-slate-900">
                  <ContactForm />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
