"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  Headphones,
  Lock,
  Cloud,
  Check,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { products, productCategories, type ProductItem } from "@/data/products";
import { getIcon } from "@/lib/icons";

export function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Enterprise-Grade Digital Products & Turnkey Platforms"
        description="Scalable, secure, and ready-to-deploy software platforms designed to modernize business operations, accelerate revenue, and automate core workflows."
      />

      {/* Main Products Section */}
      <section className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Controls: Search and Categories */}
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, feature, or keyword..."
                className="w-full rounded-xl border border-white/10 bg-card/60 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Product Count Pill */}
            <div className="text-xs font-medium text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-primary">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            {productCategories.map((category) => {
              const count =
                category === "All"
                  ? products.length
                  : products.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.35)]"
                      : "border border-white/10 bg-card/40 text-muted-foreground hover:border-white/20 hover:bg-card/80 hover:text-white"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      activeCategory === category
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
              <Search className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <h3 className="mt-3 text-base font-semibold text-white">
                No products found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search query or selecting another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const Icon = getIcon(product.icon);

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-card/40 p-6 sm:p-8 transition-all hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                            {product.category}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                            {product.badge}
                          </span>
                        </div>

                        {/* Title and Icon */}
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/15 transition-transform group-hover:scale-105">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                              {product.title}
                            </h3>
                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {product.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>

                        {/* Feature Highlights */}
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Key Capabilities:
                          </p>
                          <ul className="space-y-2.5">
                            {product.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs text-slate-300"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Bottom CTA & Metric */}
                      <div className="mt-8 border-t border-white/10 pt-5">
                        <div className="mb-4 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                            <Zap className="h-3.5 w-3.5" />
                            {product.metrics}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Cloud-Ready & Customizable
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            href={product.ctaLink || `/contact?product=${product.slug}`}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(var(--primary),0.35)]"
                          >
                            <span>{product.ctaText || "Request Demo"}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/10"
                          >
                            Talk to Sales
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Enterprise Standards Section */}
      <section className="border-t border-white/10 bg-card/20 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Enterprise Ready
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Scale, Security & Seamless Integration
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every ZDC Tech product is built upon modern modular microservices,
              allowing friction-free customization, zero-downtime scaling, and
              private cloud hosting.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                <Cloud className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Multi-Cloud or On-Prem
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Deploy on AWS, Azure, GCP, or your company&apos;s own private bare-metal
                servers with Docker and Kubernetes automation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Zero-Trust Security
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                End-to-end TLS encryption, role-based access control (RBAC),
                automated backups, and compliance-ready data audit trails.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-blue-400/20 bg-blue-400/10 text-blue-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Extensible APIs & Hooks
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Full REST and GraphQL API suites, real-time webhooks, and pre-built
                connectors for ERPs, payment gateways, and CRMs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-amber-400/20 bg-amber-400/10 text-amber-400">
                <Headphones className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                Dedicated 24/7 SLA
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Dedicated solutions engineer, guaranteed SLA response times,
                regular version upgrades, and routine vulnerability audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Looking for a Tailored Product Demo?"
        description="Experience firsthand how ZDC Tech platforms can streamline your workflows. Schedule a live walkthrough with our enterprise product architects."
        primaryLabel="Schedule a Live Demo"
        primaryHref="/contact"
        secondaryLabel="Explore Custom Development"
        secondaryHref="/services"
      />
    </>
  );
}

