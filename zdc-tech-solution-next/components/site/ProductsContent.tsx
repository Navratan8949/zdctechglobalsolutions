"use client";

import { useState, useEffect } from "react";
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
  Building2,
  Eye,
  Send,
  Loader2,
  X,
  ExternalLink,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { products as defaultProducts, productCategories, type ProductItem } from "@/data/products";
import { getProducts } from "@/service/product.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import { submitContact } from "@/service/contact.service";

const fallbackCardImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

export function ProductsContent({ initialProducts }: { initialProducts?: ProductItem[] }) {
  const [productsList, setProductsList] = useState<ProductItem[]>(
    Array.isArray(initialProducts) && initialProducts.length > 0
      ? initialProducts
      : defaultProducts
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Quick Demo Modal State
  const [demoModalProduct, setDemoModalProduct] = useState<ProductItem | null>(null);
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);

  // Sync initialProducts if passed
  useEffect(() => {
    if (Array.isArray(initialProducts) && initialProducts.length > 0) {
      setProductsList(initialProducts);
    }
  }, [initialProducts]);

  // Client-side fetch to guarantee real-time admin sync
  useEffect(() => {
    let active = true;
    const fetchFresh = async () => {
      try {
        const res: any = await getProducts();
        if (!active) return;
        const data = unwrapApiResponse<ProductItem[]>(res);
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
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

  // Compute available categories dynamically based on products
  const availableCategories = [
    "All",
    ...Array.from(
      new Set(
        productsList
          .map((p) => p.category?.trim())
          .filter((c): c is string => Boolean(c))
      )
    ),
  ];

  const filteredProducts = productsList.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      (product.title || "").toLowerCase().includes(q) ||
      (product.tagline || "").toLowerCase().includes(q) ||
      (product.description || "").toLowerCase().includes(q) ||
      (product.category || "").toLowerCase().includes(q) ||
      (Array.isArray(product.features) &&
        product.features.some((f) => f.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  const handleOpenDemo = (product: ProductItem) => {
    setDemoModalProduct(product);
    setDemoForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: `Hi, I would like to request an interactive live demo and pricing for ${product.title}.`,
    });
    setDemoSuccess(false);
    setDemoError(null);
  };

  const handleSubmitDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoModalProduct) return;
    setIsSubmittingDemo(true);
    setDemoError(null);

    try {
      await submitContact({
        name: demoForm.name,
        email: demoForm.email,
        phone: demoForm.phone,
        company: demoForm.company,
        service: demoModalProduct.title,
        inquiryType: "project",
        subject: `Product Demo Request: ${demoModalProduct.title}`,
        message: `${demoForm.message}\n\n[Product: ${demoModalProduct.title} | Category: ${demoModalProduct.category} | Company: ${demoForm.company || "N/A"}]`,
      });
      setDemoSuccess(true);
      setTimeout(() => {
        setDemoModalProduct(null);
        setDemoSuccess(false);
      }, 3000);
    } catch (err: any) {
      setDemoError(
        err?.response?.data?.message || err?.message || "Failed to submit demo request. Please try again."
      );
    } finally {
      setIsSubmittingDemo(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Turnkey Software Platforms"
        title="Enterprise Digital Products Engineered for Scale"
        description="Ready-to-deploy, modular enterprise software platforms designed to modernize business operations, accelerate revenue, and automate core workflows with 99.99% reliability."
      />

      {/* Main Section */}
      <section className="relative py-16 lg:py-24 bg-[#f8fafc] dark:bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Controls: Search & Category Pills */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, feature, or keyword..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-[#0b1b3d] shadow-sm placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/20 dark:border-white/10 dark:bg-card dark:text-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-xs text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Count badge */}
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Showing{" "}
                <span className="font-black text-[#0ea5e9]">
                  {filteredProducts.length}
                </span>{" "}
                of {productsList.length} products
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {availableCategories.map((cat) => {
                const count =
                  cat === "All"
                    ? productsList.length
                    : productsList.filter((p) => p.category === cat).length;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[#0ea5e9] text-white shadow-md shadow-[#0ea5e9]/25 scale-[1.02]"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-[#0b1b3d] dark:border-white/10 dark:bg-card dark:text-slate-300 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                        activeCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center dark:border-white/10 dark:bg-card">
              <Layers className="h-14 w-14 text-slate-300" />
              <h3 className="mt-4 text-xl font-bold text-[#0b1b3d] dark:text-white">
                No matching products found
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                We couldn&apos;t find any products matching &ldquo;{searchQuery}&rdquo;. Try another keyword or switch categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-xl bg-[#0ea5e9] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0284c7]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
              {filteredProducts.map((product) => {
                const Icon = getIcon(product.icon || "Layers");
                const rawImage =
                  typeof product.image === "string"
                    ? product.image
                    : product.image?.url;
                const cardImage =
                  resolveImageUrl(rawImage) || fallbackCardImage;

                return (
                  <div
                    key={product._id || product.slug}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0ea5e9]/40 hover:shadow-2xl dark:border-white/10 dark:bg-card"
                  >
                    {/* Top Image Preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-100 dark:border-white/10">
                      <img
                        src={cardImage}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#0ea5e9] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg">
                          {product.category}
                        </span>
                        {product.badge && (
                          <span className="rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur-md">
                            ✦ {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Icon & Title Overlay in Bottom of Image */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-lg">
                          <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-xl sm:text-2xl font-black text-white drop-shadow-md">
                            {product.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      {/* Subtitle / Tagline */}
                      {product.tagline && (
                        <p className="text-[14px] font-bold text-[#0ea5e9] leading-snug">
                          {product.tagline}
                        </p>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {product.description}
                      </p>

                      {/* Key Capabilities */}
                      <div className="mt-6 space-y-2.5 rounded-2xl border border-slate-100 bg-[#f8fafc] p-5 dark:border-white/5 dark:bg-white/[0.02]">
                        <p className="text-[11px] font-black uppercase tracking-widest text-[#0b1b3d] dark:text-white flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#0ea5e9]" /> Key Capabilities
                        </p>
                        <ul className="space-y-2 pt-1">
                          {product.features?.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-[14px] font-medium text-[#1e293b] dark:text-slate-200"
                            >
                              <CheckCircle2
                                className="h-4 w-4 shrink-0 text-[#0ea5e9] mt-0.5"
                                strokeWidth={2.5}
                              />
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics & Deployment Highlight Bar */}
                      {(product.metrics || product.deployment) && (
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs dark:border-white/5">
                          {product.metrics && (
                            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                              <Zap className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/20" />
                              <span>{product.metrics}</span>
                            </div>
                          )}
                          {product.deployment && (
                            <div className="flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
                              <Cloud className="h-4 w-4 shrink-0 text-slate-400" />
                              <span>{product.deployment}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA Buttons */}
                      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDemo(product)}
                          className="w-full flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-5 py-3.5 text-[14px] font-bold text-white shadow-lg shadow-[#0ea5e9]/25 transition-all duration-200 hover:bg-[#0284c7] hover:shadow-xl active:scale-[0.98]"
                        >
                          <span>{product.ctaText || "Request Demo"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        <Link
                          href={product.ctaLink || `/contact?product=${encodeURIComponent(product.title)}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-[14px] font-bold text-[#0b1b3d] shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-card dark:text-white dark:hover:bg-white/5"
                        >
                          <span>Get In Touch</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Enterprise Assurance Pillars */}
          <div className="mt-20 rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-sm dark:border-white/10 dark:bg-card">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-2">
                Enterprise Standards
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0b1b3d] dark:text-white">
                Engineered for High-Reliability Operations
              </h3>
              <p className="mt-3 text-[15px] text-slate-500 leading-relaxed">
                Every software platform is built with strict security compliances, zero-downtime architecture, and dedicated onboarding engineering support.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <ShieldCheck className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h4 className="mt-4 text-base font-bold text-[#0b1b3d] dark:text-white">
                  SOC-2 &amp; GDPR Ready
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  End-to-end encrypted databases, automated audit logs, and granular role permissions.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <Zap className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h4 className="mt-4 text-base font-bold text-[#0b1b3d] dark:text-white">
                  99.99% Guaranteed SLA
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  High-availability multi-region cloud deployment with automated failover &amp; live backups.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <Cloud className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h4 className="mt-4 text-base font-bold text-[#0b1b3d] dark:text-white">
                  Cloud or On-Premise
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Deploy to AWS, Azure, Google Cloud, or your private enterprise VPC infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-6 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0ea5e9]">
                  <Headphones className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h4 className="mt-4 text-base font-bold text-[#0b1b3d] dark:text-white">
                  Dedicated Tech Architect
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Direct Slack/Teams channel with senior solutions engineers for customization and integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {demoModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/75 p-3 sm:p-6 backdrop-blur-sm">
          <div className="relative flex flex-col w-full max-w-lg max-h-[92vh] rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden dark:border-white/10 dark:bg-slate-900">
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between border-b border-slate-100 px-6 py-4 sm:px-8 dark:border-white/10 bg-white dark:bg-slate-900 z-10">
              <div>
                <span className="rounded-full bg-blue-50 text-[#0ea5e9] px-3 py-1 text-[11px] font-black uppercase tracking-wider">
                  Interactive Walkthrough
                </span>
                <h3 className="mt-1.5 text-xl font-bold text-[#0b1b3d] dark:text-white">
                  Request Live Demo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDemoModalProduct(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {demoSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-8 w-8" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0b1b3d] dark:text-white">
                    Demo Request Received!
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Thank you! Our enterprise solutions team will reach out within 2 hours to schedule your personalized live demo of{" "}
                    <strong className="text-[#0b1b3d] dark:text-white">
                      {demoModalProduct.title}
                    </strong>.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-xs text-slate-500">
                    See how{" "}
                    <strong className="text-[#0ea5e9]">
                      {demoModalProduct.title}
                    </strong>{" "}
                    can streamline operations for your organization.
                  </p>

                  {demoError && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                      {demoError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitDemo} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoForm.name}
                        onChange={(e) =>
                          setDemoForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none dark:border-white/10 dark:bg-card dark:text-white"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={demoForm.email}
                          onChange={(e) =>
                            setDemoForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none dark:border-white/10 dark:bg-card dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={demoForm.phone}
                          onChange={(e) =>
                            setDemoForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none dark:border-white/10 dark:bg-card dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Organization / Company Name
                      </label>
                      <input
                        type="text"
                        value={demoForm.company}
                        onChange={(e) =>
                          setDemoForm((p) => ({ ...p, company: e.target.value }))
                        }
                        placeholder="e.g. Acme Global Logistics"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none dark:border-white/10 dark:bg-card dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                        Message / Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={demoForm.message}
                        onChange={(e) =>
                          setDemoForm((p) => ({ ...p, message: e.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:outline-none dark:border-white/10 dark:bg-card dark:text-white"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmittingDemo}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] py-3 text-sm font-bold text-white shadow-lg shadow-[#0ea5e9]/25 hover:bg-[#0284c7] disabled:opacity-50"
                      >
                        {isSubmittingDemo ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                        <span>Schedule Live Demo</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Solution CTA Banner */}
      <CTASection />
    </>
  );
}
