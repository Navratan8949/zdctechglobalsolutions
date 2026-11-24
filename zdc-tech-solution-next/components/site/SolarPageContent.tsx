"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sun,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  HelpCircle,
  FileCheck,
  Building2,
  Home,
  Factory,
  Sparkles,
  Award,
  ChevronDown,
  Wrench,
  Loader2,
  Send,
  IndianRupee,
} from "lucide-react";
import { SolarCalculator } from "@/components/site/SolarCalculator";
import { submitSolarInquiry } from "@/service/solarInquiry.service";
import {
  getAllSolarServices,
  type SolarServiceItem,
} from "@/service/solarService.service";
import { resolveImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SolarPageContent() {
  // Dynamic Solar Offerings from Admin / Database
  const [offerings, setOfferings] = useState<SolarServiceItem[]>([]);
  const [isLoadingOfferings, setIsLoadingOfferings] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getAllSolarServices()
      .then((res: any) => {
        const data = res?.data || res;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : [];
        if (isMounted && list.length > 0) {
          setOfferings(list);
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic solar services, using defaults:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingOfferings(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "Rajasthan",
    propertyType: "Residential Home",
    systemType: "On-Grid (Net Metering)",
    monthlyBill: "₹3,000 - ₹5,000",
    estimatedCapacity: "3 kW",
    roofArea: "300 - 500 sq ft",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCalculatorSelect = (capacityKw: number, billAmount: number) => {
    setFormData((prev) => ({
      ...prev,
      estimatedCapacity: `${capacityKw} kW`,
      monthlyBill: `₹${billAmount.toLocaleString("en-IN")}`,
      roofArea: `${capacityKw * 100} sq ft`,
      message: `Hi, I used your Solar Calculator. For my monthly bill of ₹${billAmount.toLocaleString("en-IN")}, the recommended system is ${capacityKw} kW. Please contact me with quotation and site survey dates.`,
    }));
    const el = document.getElementById("solar-quote-form");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquireOffering = (
    title: string,
    category: string,
    badge?: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: category.includes("Commercial")
        ? ("Commercial Building" as any)
        : category.includes("Residential")
        ? ("Residential Home" as any)
        : prev.propertyType,
      estimatedCapacity: badge || prev.estimatedCapacity,
      message: `Hi, I am interested in ${title} (${
        badge || category
      }). Please share quotation, subsidy details and site survey availability.`,
    }));
    const el = document.getElementById("solar-quote-form");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setSubmitError("Please provide your full name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitSolarInquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        state: formData.state,
        propertyType: formData.propertyType,
        systemType: formData.systemType,
        monthlyBill: formData.monthlyBill,
        estimatedCapacity: formData.estimatedCapacity,
        roofArea: formData.roofArea,
        message: formData.message,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          state: "Rajasthan",
          propertyType: "Residential Home",
          systemType: "On-Grid (Net Metering)",
          monthlyBill: "₹3,000 - ₹5,000",
          estimatedCapacity: "3 kW",
          roofArea: "300 - 500 sq ft",
          message: "",
        });
      }, 5000);
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message ||
          "Failed to submit solar inquiry. Please call or WhatsApp us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-36 sm:pt-44 lg:pt-48 pb-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.25),rgba(255,255,255,0))]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                <Sun className="h-4 w-4 text-amber-400" />
                PM Surya Ghar Muft Bijli Yojana Approved
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Power Your Home &amp; Business with{" "}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-[#0ea5e9] bg-clip-text text-transparent">
                  Clean Solar Energy
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Turn your empty rooftop into a 25-year profit center. Get up to{" "}
                <strong className="text-amber-400 font-bold">
                  ₹78,000 direct Government Subsidy
                </strong>
                , save up to 90% on electricity bills, and enjoy end-to-end DISCOM
                net metering approval with certified Tier-1 solar equipment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9] hover:bg-[#0284c7] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#0ea5e9]/25 transition-all"
                >
                  <Zap className="h-4 w-4" />
                  Calculate Solar Savings
                </a>

                <a
                  href="#solar-quote-form"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all"
                >
                  Book Free Site Survey
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hi,%20I%20am%20interested%20in%20Rooftop%20Solar%20Panel%20Installation%20for%20my%20home/business."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3.5 text-xs sm:text-sm font-bold text-emerald-300 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </a>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
                <div>
                  <p className="font-display text-xl sm:text-2xl font-black text-amber-400">
                    Up to 90%
                  </p>
                  <p className="text-[11px] text-slate-400">Electricity Bill Cut</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-black text-emerald-400">
                    ₹78,000
                  </p>
                  <p className="text-[11px] text-slate-400">Govt Subsidy (DBT)</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-black text-[#0ea5e9]">
                    25 Years
                  </p>
                  <p className="text-[11px] text-slate-400">Panel Warranty</p>
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl font-black text-purple-400">
                    3 - 4 Yrs
                  </p>
                  <p className="text-[11px] text-slate-400">Full ROI Payback</p>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                <Image
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Rooftop Solar Panels"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        Zero Carbon &amp; Zero Bills
                      </p>
                      <p className="text-[11px] text-slate-400">
                        TopCon Bifacial &amp; Mono PERC Tier-1 High Efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Solar Calculator Section */}
      <section id="calculator" className="py-16 sm:py-24 bg-slate-50/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
              Instant Estimate Tool
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Find Out How Much You Save
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Slide your average monthly electricity bill to calculate the ideal
              plant size, available central subsidy, and estimated cost.
            </p>
          </div>

          <SolarCalculator onSelectSystem={handleCalculatorSelect} />
        </div>
      </section>

      {/* 3. Solar Installation Offerings */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
              Comprehensive Solutions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              Solar Plants Engineered for Every Rooftop
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Customized solar installations tailored to residential homes, commercial
              complexes, educational institutions, and industrial plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(offerings.length > 0
              ? offerings
              : [
                  {
                    _id: "default-1",
                    title: "Residential Rooftop Solar",
                    slug: "residential-rooftop-solar",
                    category: "Residential Solar" as const,
                    badge: "1 kW - 10 kW",
                    shortDescription:
                      "Ideal for independent houses, villas, and residential societies. Eliminate electricity bills and claim up to ₹78,000 direct subsidy under PM Surya Ghar Muft Bijli Yojana.",
                    image: {
                      url: "https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1000&q=80",
                    },
                    fee: "Starting from ₹50,000 / kW",
                    subsidy: "Up to ₹78,000 (PM Surya Ghar)",
                    features: [
                      "Reduces domestic bills by 80% to 90%",
                      "Net Metering with state DISCOM",
                      "Direct bank subsidy transfer (DBT)",
                      "High efficiency Mono PERC panels",
                    ],
                    popular: true,
                    order: 1,
                    isActive: true,
                  },
                  {
                    _id: "default-2",
                    title: "Commercial & Industrial (C&I)",
                    slug: "commercial-industrial-solar",
                    category: "Commercial & Industrial" as const,
                    badge: "10 kW - 500 kW+",
                    shortDescription:
                      "Tailored for factories, warehouses, schools, hospitals, shopping malls, and office complexes facing high commercial tariff rates of ₹9 - ₹12/unit.",
                    image: {
                      url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
                    },
                    fee: "Custom Project Quote",
                    subsidy: "40% Accelerated Depreciation Benefit",
                    features: [
                      "Cut peak commercial electricity tariff",
                      "40% Accelerated Depreciation tax benefit",
                      "Elevated tin-shed / RCC custom mounting",
                      "Remote IoT generation monitoring",
                    ],
                    popular: true,
                    order: 2,
                    isActive: true,
                  },
                  {
                    _id: "default-3",
                    title: "Solar Maintenance & AMC",
                    slug: "solar-maintenance-amc",
                    category: "Solar Maintenance & AMC" as const,
                    badge: "Annual AMC",
                    shortDescription:
                      "Keep your panels generating maximum power throughout the year. Dust and residue can drop power generation by 20% to 35% without regular cleaning.",
                    image: {
                      url: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1000&q=80",
                    },
                    fee: "Starting from ₹3,499 / year",
                    subsidy: "Guaranteed 98% Plant Uptime",
                    features: [
                      "Scheduled de-mineralized water cleaning",
                      "Inverter health & string voltage diagnostics",
                      "Structure torque & cabling inspection",
                      "Fast breakdown troubleshooting & repair",
                    ],
                    popular: false,
                    order: 3,
                    isActive: true,
                  },
                ]
            ).map((item) => {
              const displayImg = resolveImageUrl(
                item.image?.url ||
                  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1000&q=80"
              );

              return (
                <div
                  key={item._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-[#0ea5e9] hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="h-48 w-full relative rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={displayImg}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#0ea5e9] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {item.badge || "1 kW - 10 kW"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.category === "Residential Solar" ? (
                        <Home className="h-5 w-5 text-[#0ea5e9]" />
                      ) : item.category === "Commercial & Industrial" ? (
                        <Factory className="h-5 w-5 text-amber-500" />
                      ) : item.category === "Solar Maintenance & AMC" ? (
                        <Wrench className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <Sun className="h-5 w-5 text-amber-500" />
                      )}
                      <h3 className="font-display text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                      {item.shortDescription}
                    </p>

                    {item.subsidy && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{item.subsidy}</span>
                      </div>
                    )}

                    {item.features && item.features.length > 0 && (
                      <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-slate-100">
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() =>
                        handleInquireOffering(
                          item.title,
                          item.category,
                          item.badge
                        )
                      }
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-[#0ea5e9] text-white text-xs font-bold py-3 transition-colors cursor-pointer"
                    >
                      <span>Inquire for {item.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Three Systems Comparison: On-Grid vs Off-Grid vs Hybrid */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
              Technology Options
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Which Solar System is Best for You?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Compare On-Grid, Off-Grid, and Hybrid configurations to choose the
              system matching your grid reliability and power needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9] bg-blue-50 px-2.5 py-1 rounded-md">
                Most Popular
              </span>
              <h3 className="text-base font-bold text-slate-900">
                1. On-Grid System (Grid-Tied)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directly connected to your electricity board (DISCOM) via a Bi-Directional
                Net Meter. Surplus power is exported to the grid for electricity bill credits.
              </p>
              <div className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <p>
                  <strong>Best for:</strong> Urban homes &amp; businesses with reliable grid
                </p>
                <p>
                  <strong>Battery required:</strong> No (Lowest initial cost)
                </p>
                <p>
                  <strong>Govt Subsidy:</strong> 100% Eligible under PM Surya Ghar
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                100% Power Backup
              </span>
              <h3 className="text-base font-bold text-slate-900">
                2. Off-Grid System (With Batteries)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates independently from the electricity grid. Stores solar energy in
                Lithium or Lead-Acid batteries to power your appliances 24x7 during cuts.
              </p>
              <div className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <p>
                  <strong>Best for:</strong> Remote areas, farms, frequent power outages
                </p>
                <p>
                  <strong>Battery required:</strong> Yes (Solar battery bank included)
                </p>
                <p>
                  <strong>Govt Subsidy:</strong> Not eligible for DISCOM subsidy
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                Best of Both Worlds
              </span>
              <h3 className="text-base font-bold text-slate-900">
                3. Hybrid System (Net Meter + Battery)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connected to DISCOM net-metering AND equipped with battery storage. Powers
                your home during power cuts and sells surplus power to grid during daytime.
              </p>
              <div className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-slate-100">
                <p>
                  <strong>Best for:</strong> High-end homes &amp; businesses wanting 0 downtime
                </p>
                <p>
                  <strong>Battery required:</strong> Yes + Grid Net Metering
                </p>
                <p>
                  <strong>Govt Subsidy:</strong> Subsidy applicable on on-grid component
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Step-by-Step Installation Process */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
              Zero Hassle Workflow
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-1">
              5 Steps from Free Survey to Zero Electricity Bill
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We handle 100% of the site assessment, structural engineering, DISCOM
              net meter paperwork, and subsidy documentation for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "Free Site Survey",
                desc: "Our solar engineer visits your site, measures rooftop shadow-free space, and analyzes your electricity bill.",
              },
              {
                step: "02",
                title: "Custom 3D Design",
                desc: "We design the optimal solar layout, select Tier-1 modules, and give you a transparent quotation with ROI.",
              },
              {
                step: "03",
                title: "DISCOM Approvals",
                desc: "Complete documentation filed on the National Portal for PM Surya Ghar and state electricity board approvals.",
              },
              {
                step: "04",
                title: "Pro Installation",
                desc: "Hot-dip galvanized structure, Tier-1 Mono PERC TopCon panels, surge protection (SPD), and earthing setup.",
              },
              {
                step: "05",
                title: "Net Meter & Subsidy",
                desc: "DISCOM installs Bi-Directional Net Meter. System turns ON and subsidy is credited directly to your bank account.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative"
              >
                <span className="font-display text-3xl font-black text-[#0ea5e9]/40 block">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Lead Capture & Site Survey Booking Form */}
      <section
        id="solar-quote-form"
        className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Get Started Today
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Book a Free Solar Site Survey &amp; Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Fill in your details below. Our senior solar engineer will contact
              you to analyze your electricity bill and schedule a free inspection.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {submitSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Site Survey Request Received!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you! Our technical solar advisor will review your requirements
                  and call you within 2 business hours with quote details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Ramesh Kumar Sharma"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Phone / WhatsApp Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      City / Location
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Jaipur, Sanganer"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyType: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#0ea5e9]"
                    >
                      <option value="Residential Home">Residential Home</option>
                      <option value="Commercial Building">
                        Commercial Building
                      </option>
                      <option value="Factory / Industrial">
                        Factory / Industrial
                      </option>
                      <option value="School / Hospital">School / Hospital</option>
                      <option value="Agriculture / Farm">
                        Agriculture / Farm
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Average Monthly Bill
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. ₹3,500"
                      value={formData.monthlyBill}
                      onChange={(e) =>
                        setFormData({ ...formData, monthlyBill: e.target.value })
                      }
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Desired Capacity (kW)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 3 kW or Not Sure"
                      value={formData.estimatedCapacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          estimatedCapacity: e.target.value,
                        })
                      }
                      className="bg-slate-900 border-slate-700 text-white text-xs h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Preferred System Type
                    </label>
                    <select
                      value={formData.systemType}
                      onChange={(e) =>
                        setFormData({ ...formData, systemType: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#0ea5e9]"
                    >
                      <option value="On-Grid (Net Metering)">
                        On-Grid (Net Metering)
                      </option>
                      <option value="Off-Grid (Battery Backup)">
                        Off-Grid (Battery Backup)
                      </option>
                      <option value="Hybrid (Grid + Battery)">
                        Hybrid (Grid + Battery)
                      </option>
                      <option value="Not Sure / Need Advice">
                        Not Sure / Need Advice
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Additional Message / Specific Requirements
                  </label>
                  <Textarea
                    rows={3}
                    placeholder="Tell us about your rooftop type (RCC roof, tin shed, open ground), electricity provider (DISCOM), or preferred time for call."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-amber-500 to-[#0ea5e9] hover:from-amber-400 hover:to-[#0284c7] text-slate-950 font-bold text-sm shadow-xl"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Submit Site Survey Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Solar FAQs */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
              Got Questions?
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Frequently Asked Questions About Solar
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What is the PM Surya Ghar Muft Bijli Yojana subsidy?",
                a: "The Government of India provides a direct subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and above rooftop solar systems. The subsidy is credited directly into your Aadhaar-linked bank account via Direct Benefit Transfer (DBT) within 30-45 days of net-meter installation.",
              },
              {
                q: "What is Net Metering and how does it reduce my bill?",
                a: "A Bi-Directional Net Meter records both the electricity you draw from the grid and the excess solar electricity you export to the grid. At the end of the billing cycle, your DISCOM bills you only for the net units consumed. If you export more than you consume, credits are carried forward to future months.",
              },
              {
                q: "How much rooftop space is required for a 3 kW solar plant?",
                a: "A standard 1 kW solar setup requires approximately 100 sq. ft. of shadow-free rooftop space. For a 3 kW system, you need approximately 250 - 300 sq. ft. of shadow-free roof area.",
              },
              {
                q: "What happens on cloudy or rainy days?",
                a: "Solar panels do not require direct sunlight to generate electricity; they work on ambient daylight and ultraviolet radiation. While generation decreases by 30-50% on heavily overcast or rainy days, your On-Grid system automatically draws grid power smoothly without any disruption.",
              },
              {
                q: "What is the lifespan and warranty of the solar panels?",
                a: "Tier-1 Mono PERC TopCon solar panels carry a 25 to 30-year linear power performance warranty (guaranteeing >80% generation efficiency even after 25 years). Grid inverters typically carry 5 to 10 years of replacement warranty.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all open:border-[#0ea5e9]/50 open:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between font-bold text-sm text-slate-900 list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SolarPageContent;
