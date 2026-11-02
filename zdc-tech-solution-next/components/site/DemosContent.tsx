"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  KeyRound,
  User,
  Lock,
  Globe,
  X,
  Eye,
  EyeOff,
  Laptop,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { fallbackDemos, type DemoItem } from "@/data/demos";
import { getDemos } from "@/service/demo.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";

const fallbackDemoImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

export function DemosContent({ initialDemos }: { initialDemos?: DemoItem[] }) {
  const [demosList, setDemosList] = useState<DemoItem[]>(
    Array.isArray(initialDemos) && initialDemos.length > 0
      ? initialDemos
      : fallbackDemos
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revealedPasswords, setRevealedPasswords] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (Array.isArray(initialDemos) && initialDemos.length > 0) {
      setDemosList(initialDemos);
    }
  }, [initialDemos]);

  useEffect(() => {
    let active = true;
    const fetchFresh = async () => {
      try {
        const res: any = await getDemos();
        if (!active) return;
        const data = unwrapApiResponse<DemoItem[]>(res);
        if (Array.isArray(data) && data.length > 0) {
          setDemosList(data);
        }
      } catch (err) {
        // Silently preserve initial list
      }
    };
    void fetchFresh();
    return () => {
      active = false;
    };
  }, []);

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const togglePasswordReveal = (key: string) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteredDemos = demosList.filter((demo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      demo.title?.toLowerCase().includes(query) ||
      demo.description?.toLowerCase().includes(query) ||
      demo.demoType?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Page Hero */}
      <PageHero
        eyebrow="LIVE DEMO SHOWCASE"
        title="Interactive Demos & Prototypes"
        description="Explore company live demo projects with ready-to-test credentials. Click to launch and explore."
      />

      {/* Main Demos Section */}
      <section className="bg-slate-50/60 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-10 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live demos by project name or type..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-10 text-sm text-[#0b1b3d] shadow-sm transition-all focus:border-[#0ea5e9] focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="mt-2 text-center text-xs text-slate-500">
              Showing{" "}
              <strong className="text-[#0b1b3d]">{filteredDemos.length}</strong>{" "}
              of {demosList.length} demo projects
            </div>
          </div>

          {/* Demos Cards Grid */}
          {filteredDemos.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredDemos.map((demo, index) => {
                const demoId = demo._id || demo.id || `demo-${index}`;
                const rawImage =
                  typeof demo.image === "string"
                    ? demo.image
                    : demo.image?.url || "";
                const displayImage = rawImage
                  ? resolveImageUrl(rawImage)
                  : fallbackDemoImage;

                const credentials = Array.isArray(demo.credentials)
                  ? demo.credentials
                  : [];

                return (
                  <motion.div
                    key={demoId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#0ea5e9]/50 hover:shadow-lg transition-all"
                  >
                    {/* Demo Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={displayImage}
                        alt={demo.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {demo.demoType && (
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/20">
                            {demo.demoType}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-4">
                      {/* Title */}
                      <h3 className="font-display text-lg sm:text-xl font-bold text-[#0b1b3d] leading-snug">
                        {demo.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {demo.description}
                      </p>

                      {/* Test Credentials Box */}
                      {credentials.length > 0 && (
                        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5 space-y-3">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0b1b3d]">
                            <KeyRound className="h-4 w-4 text-[#0ea5e9]" />
                            <span>Demo Test Credentials</span>
                          </div>

                          <div className="space-y-2.5">
                            {credentials.map((cred, cIdx) => {
                              const credKey = `${demoId}-${cIdx}`;
                              const isPassRevealed =
                                revealedPasswords[credKey] || false;

                              return (
                                <div
                                  key={cIdx}
                                  className="rounded-lg bg-white p-2.5 border border-blue-100 text-xs space-y-1.5"
                                >
                                  {cred.role && (
                                    <div className="flex items-center justify-between text-[11px] font-bold text-[#0ea5e9]">
                                      <span>Role: {cred.role}</span>
                                      {cred.notes && (
                                        <span className="text-[10px] text-slate-500 font-normal">
                                          {cred.notes}
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Username */}
                                  <div className="flex items-center justify-between font-mono text-[11px] bg-slate-50 rounded px-2 py-1">
                                    <div className="flex items-center gap-1.5 truncate">
                                      <User className="h-3 w-3 text-slate-400" />
                                      <span className="text-slate-700 truncate">
                                        {cred.username}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleCopy(
                                          cred.username,
                                          `${credKey}-user`
                                        )
                                      }
                                      className={`ml-2 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                                        copiedKey === `${credKey}-user`
                                          ? "bg-emerald-500 text-white"
                                          : "bg-slate-200 text-slate-700 hover:bg-[#0ea5e9] hover:text-white"
                                      }`}
                                    >
                                      {copiedKey === `${credKey}-user` ? (
                                        <>
                                          <Check className="h-2.5 w-2.5" />
                                          <span>Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-2.5 w-2.5" />
                                          <span>Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  {/* Password */}
                                  <div className="flex items-center justify-between font-mono text-[11px] bg-slate-50 rounded px-2 py-1">
                                    <div className="flex items-center gap-1.5 truncate">
                                      <Lock className="h-3 w-3 text-slate-400" />
                                      <span className="text-slate-700 truncate">
                                        {isPassRevealed
                                          ? cred.password
                                          : "••••••••"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 ml-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          togglePasswordReveal(credKey)
                                        }
                                        className="text-slate-400 hover:text-slate-600 p-0.5"
                                        title="Toggle password"
                                      >
                                        {isPassRevealed ? (
                                          <EyeOff className="h-3 w-3" />
                                        ) : (
                                          <Eye className="h-3 w-3" />
                                        )}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleCopy(
                                            cred.password,
                                            `${credKey}-pass`
                                          )
                                        }
                                        className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold transition-all ${
                                          copiedKey === `${credKey}-pass`
                                            ? "bg-emerald-500 text-white"
                                            : "bg-slate-200 text-slate-700 hover:bg-[#0ea5e9] hover:text-white"
                                        }`}
                                      >
                                        {copiedKey === `${credKey}-pass` ? (
                                          <>
                                            <Check className="h-2.5 w-2.5" />
                                            <span>Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="h-2.5 w-2.5" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Live Demo Button */}
                      <div className="mt-auto pt-2">
                        <a
                          href={demo.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#0ea5e9]/20 hover:bg-[#0284c7] hover:shadow-lg transition-all active:scale-[0.98]"
                        >
                          <span>Launch Live Demo</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-700">
                No matching demo projects found.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-xl bg-[#0ea5e9] px-4 py-2 text-xs font-bold text-white"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Need a Custom Solution Built for Your Team?"
        description="We build bespoke web applications, enterprise ERPs, and cloud systems tailored to your unique specifications."
        primaryLabel="Start a Project"
        primaryHref="/contact"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
