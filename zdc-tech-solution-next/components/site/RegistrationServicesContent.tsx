"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck,
  Clock,
  ExternalLink,
  X,
  Send,
  Loader2,
  HelpCircle,
  FileText,
  PhoneCall,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  Landmark,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import {
  fallbackRegistrationServices,
  type RegistrationServiceItem,
} from "@/data/registrationServices";
import { getRegistrationServices } from "@/service/registrationService.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";
import { submitRegistrationApplication } from "@/service/registrationApplication.service";

export function RegistrationServicesContent({
  initialServices,
}: {
  initialServices?: RegistrationServiceItem[];
}) {
  const [services, setServices] = useState<RegistrationServiceItem[]>(
    Array.isArray(initialServices) && initialServices.length > 0
      ? initialServices
      : fallbackRegistrationServices
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Detailed Modal for a specific certificate/service
  const [selectedService, setSelectedService] =
    useState<RegistrationServiceItem | null>(null);

  // Application / Inquiry Form State
  const [applicationModalService, setApplicationModalService] =
    useState<RegistrationServiceItem | null>(null);
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    serviceTitle: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(initialServices) && initialServices.length > 0) {
      setServices(initialServices);
    }
  }, [initialServices]);

  // Client-side fetch to ensure live sync with admin
  useEffect(() => {
    let active = true;
    const fetchFresh = async () => {
      try {
        const res: any = await getRegistrationServices();
        if (!active) return;
        const data = unwrapApiResponse<RegistrationServiceItem[]>(res);
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        // preserve initial state
      }
    };
    void fetchFresh();
    return () => {
      active = false;
    };
  }, []);

  const filteredServices = services.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.shortDescription?.toLowerCase().includes(q) ||
      item.governmentBody?.toLowerCase().includes(q) ||
      item.benefits?.some((b) => b.toLowerCase().includes(q)) ||
      item.documentsRequired?.some((d) => d.toLowerCase().includes(q))
    );
  });

  const handleOpenApply = (item: RegistrationServiceItem) => {
    setApplicationModalService(item);
    setApplyForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      serviceTitle: item.title,
      message: `Hi, I want to apply for ${item.title} (${item.category}). Please connect with required checklist and fee details.`,
    });
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRegistrationApplication({
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone,
        city: applyForm.city,
        serviceTitle: applyForm.serviceTitle,
        category: applicationModalService?.category || "Other",
        message: applyForm.message,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setApplicationModalService(null);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err: any) {
      setSubmitError(
        err?.response?.data?.message ||
          "Failed to submit application. Please reach out via WhatsApp or call directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Page Hero Banner */}
      <PageHero
        eyebrow="LEGAL REGISTRATION &amp; CERTIFICATION SERVICES"
        title="Start Your NGO or Business in India"
        description="Complete government registration, legal drafting, licensing, tax exemption, and compliance solutions for NGOs, Trusts, Societies, and Corporate Companies. Backed by certified Legal and Financial Experts."
      />

      {/* 2. Key Trust Highlights Bar */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#0ea5e9]">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0b1b3d]">
                  100% Online Filing
                </p>
                <p className="text-[11px] text-slate-500">
                  Paperless documentation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0b1b3d]">
                  CA / CS Verification
                </p>
                <p className="text-[11px] text-slate-500">
                  Official legal scrutiny
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0b1b3d]">
                  Govt Portal Approvals
                </p>
                <p className="text-[11px] text-slate-500">
                  MCA, Income Tax &amp; NITI Aayog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 sm:p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0b1b3d]">
                  Guaranteed Timelines
                </p>
                <p className="text-[11px] text-slate-500">
                  Fast-track certificate delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Main Featured Hubs (NGO vs Company) */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* NGO Hub Card */}
            <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-200/60 bg-gradient-to-br from-white via-blue-50/30 to-sky-50/50 p-7 shadow-sm transition-all hover:shadow-md">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                  <Award className="h-3.5 w-3.5" />
                  <span>Category 1</span>
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#0b1b3d]">
                  NGO &amp; Non-Profit Registration
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Everything you need to launch and run an NGO: Public Trusts, Societies, Section 8 Non-Profit Companies, along with mandatory tax exemption certificates (12A/12AB, 80G), NITI Aayog Darpan ID, CSR-1 registration, and FCRA international funding approvals.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Trust Deed",
                    "Society Act 1860",
                    "Section 8 MCA",
                    "12A / 12AB Exemption",
                    "80G Tax Deduction",
                    "NGO Darpan ID",
                    "CSR-1 Approval",
                    "FCRA Foreign Aid",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-blue-100 shadow-xs"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  8 Comprehensive NGO Certifications
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("NGO Registration");
                    document
                      .getElementById("services-catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0ea5e9] px-4 py-2 text-xs font-bold text-white hover:bg-[#0284c7] transition-all"
                >
                  <span>Explore NGO Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Company Hub Card */}
            <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50 p-7 shadow-sm transition-all hover:shadow-md">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Category 2</span>
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-[#0b1b3d]">
                  Company &amp; Business Registration
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Incorporate your dream commercial venture with the Ministry of Corporate Affairs (MCA). Full incorporation services for Private Limited Companies, LLPs, One Person Companies (OPC), GSTIN licensing, MSME Udyam, Trademark IP protection, and Startup India recognition.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Private Limited (Pvt Ltd)",
                    "LLP Partnership",
                    "One Person Co (OPC)",
                    "GST Registration",
                    "MSME / Udyam",
                    "Startup India DPIIT",
                    "Trademark (™/®)",
                    "Import Export (IEC)",
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-emerald-100 shadow-xs"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  8 Core Business Incorporations
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("Company Registration");
                    document
                      .getElementById("services-catalog")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-all"
                >
                  <span>Explore Company Services</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filter Toolbar & Services Catalog Grid */}
      <section id="services-catalog" className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-[#0ea5e9]">
                ALL GOVERNMENT REGISTRATIONS &amp; CERTIFICATES
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-4xl">
                Choose Your Legal Registration Service
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Click on any certificate to view required documents, benefits, step-by-step government filing procedure, and submit your application.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by certificate name, authority (MCA, Income Tax), or keyword..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-10 text-sm text-[#0b1b3d] shadow-sm transition-all focus:border-[#0ea5e9] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/10"
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

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "All Registration Services", value: "All" },
                {
                  label: "NGO Registration (Trust, Society, 12A/80G, CSR)",
                  value: "NGO Registration",
                },
                {
                  label: "Company Registration (Pvt Ltd, LLP, GST, MSME)",
                  value: "Company Registration",
                },
              ].map((tab) => {
                const isSelected = activeCategory === tab.value;
                const count =
                  tab.value === "All"
                    ? services.length
                    : services.filter((s) => s.category === tab.value).length;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveCategory(tab.value)}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#0ea5e9] text-white shadow-md shadow-[#0ea5e9]/25 scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : "bg-white text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Cards Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => {
                const img =
                  service.sampleCertificateImage?.url ||
                  "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80";
                const isNgo = service.category === "NGO Registration";

                return (
                  <motion.div
                    key={service._id || service.slug || index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-[#0ea5e9]/50 hover:shadow-xl transition-all"
                  >
                    {/* Certificate Sample Preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <img
                        src={resolveImageUrl(img)}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md ${
                            isNgo ? "bg-blue-600/90" : "bg-emerald-600/90"
                          }`}
                        >
                          {service.category}
                        </span>
                      </div>

                      {/* Processing Time Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                          <Clock className="h-3 w-3 text-sky-400" />
                          <span>{service.processingTime}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                          {service.governmentBody}
                        </p>
                        <h3 className="font-display text-base sm:text-lg font-bold line-clamp-1 drop-shadow-sm text-white">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-5 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {service.shortDescription}
                      </p>

                      {/* Key Benefits Preview */}
                      {Array.isArray(service.benefits) &&
                        service.benefits.length > 0 && (
                          <div className="space-y-1.5 rounded-xl bg-slate-50 p-3 border border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              Top Benefits:
                            </p>
                            {service.benefits.slice(0, 2).map((b, bIdx) => (
                              <div
                                key={bIdx}
                                className="flex items-start gap-1.5 text-xs text-slate-700 font-medium leading-snug"
                              >
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0ea5e9]" />
                                <span className="line-clamp-1">{b}</span>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Fee Preview & Required Documents Pill */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block leading-none">
                            Govt &amp; Service Fee
                          </span>
                          <span className="font-bold text-[#0b1b3d]">
                            {service.fee || "Starting from ₹1,999"}
                          </span>
                        </div>

                        <span className="text-[11px] font-semibold text-[#0ea5e9] bg-blue-50 px-2 py-1 rounded-md">
                          {service.documentsRequired?.length || 5} Documents Needed
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-[#0b1b3d] hover:border-[#0ea5e9] hover:text-[#0ea5e9] hover:bg-blue-50/40 transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenApply(service)}
                          className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#0ea5e9] py-2.5 text-xs font-bold text-white shadow-md shadow-[#0ea5e9]/20 hover:bg-[#0284c7] transition-all"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold text-slate-700">
                No matching registration services found.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-[#0ea5e9] px-4 py-2 text-xs font-bold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Document Checklist Comparison Section (Directly from Screenshot 7) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#0ea5e9]">
              DOCUMENTATION PREPARATION GUIDE
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-4xl">
              Essential Documents Required
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Prepare these standard documents beforehand to complete your application filing smoothly within 24 to 48 hours.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* NGO Documents Checklist */}
            <div className="rounded-3xl border border-blue-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-[#0ea5e9]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0b1b3d]">
                    NGO / Trust / Society Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Required for Trustees, Settlors, and Governing Body Members
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Aadhar Card",
                    desc: "All Trustees / Governing Council members",
                  },
                  {
                    title: "PAN Card",
                    desc: "Mandatory for all founding signatories",
                  },
                  {
                    title: "Passport Photographs",
                    desc: "2 color photographs of each member",
                  },
                  {
                    title: "Mobile & Email ID",
                    desc: "Linked with Aadhar for OTP signature",
                  },
                  {
                    title: "Personal Address Proof",
                    desc: "Voter ID / Driving License / Passport",
                  },
                  {
                    title: "Registered Office Proof",
                    desc: "Latest Electricity Bill or Water Bill",
                  },
                  {
                    title: "Landlord NOC / Rent Deed",
                    desc: "No Objection Certificate on stamp paper",
                  },
                  {
                    title: "Members / Trustees List",
                    desc: "Addresses, designations & occupation info",
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-100"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0ea5e9]" />
                    <div>
                      <p className="text-xs font-bold text-[#0b1b3d]">
                        {doc.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Documents Checklist */}
            <div className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0b1b3d]">
                    Company / Pvt Ltd / LLP Checklist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Required for Directors, Shareholders, and Designated Partners
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Director Aadhar Card",
                    desc: "Mandatory identity proof for all directors",
                  },
                  {
                    title: "Director PAN Card",
                    desc: "Required for DIN allotment & MCA SPICe+",
                  },
                  {
                    title: "Director Photos",
                    desc: "Clear passport-sized color photos",
                  },
                  {
                    title: "Director Bank Statement",
                    desc: "Under 2 months old with current residential address",
                  },
                  {
                    title: "Director Contact Info",
                    desc: "Active Email & Phone for MCA OTP triggers",
                  },
                  {
                    title: "Company Office Utility Bill",
                    desc: "Electricity / Gas / Water bill (under 2 months)",
                  },
                  {
                    title: "Registered Office NOC",
                    desc: "Property owner NOC + Rent agreement",
                  },
                  {
                    title: "Company MOA & AOA",
                    desc: "Charter objects & rules (drafted by our team)",
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-100"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-[#0b1b3d]">
                        {doc.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How Our Process Works (Directly from Screenshot 6) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#0ea5e9]">
              FAST &amp; TRANSPARENT EXECUTION
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0b1b3d] sm:text-4xl">
              How Our Registration Process Works
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              5 seamless steps from initial consultation to government certificate handover.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Contact & Consultation",
                desc: "Connect with our legal advisors to select the ideal non-profit or commercial entity structure.",
              },
              {
                step: "02",
                title: "Document Verification",
                desc: "Send your basic KYC and address proofs for scrutiny by certified Chartered Accountants & Lawyers.",
              },
              {
                step: "03",
                title: "Government Application Filing",
                desc: "Our legal team drafts customized deeds, MOA, AOA, and files digital forms on MCA/Income Tax portals.",
              },
              {
                step: "04",
                title: "Government Approval & Scrutiny",
                desc: "We coordinate with Sub-Registrar / MCA officers and promptly resolve any clarification requests.",
              },
              {
                step: "05",
                title: "Certificate Delivery",
                desc: "Receive your official Certificate of Registration, PAN, TAN, and bank account setup kit digitally.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
              >
                <span className="text-3xl font-black text-[#0ea5e9]/30">
                  {item.step}
                </span>
                <h4 className="mt-2 font-display text-base font-bold text-[#0b1b3d]">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us? (Directly from Screenshot 5) */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#38bdf8]">
              WHY CLIENTS TRUST US
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Why Choose ZDC Tech Registration Services?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Reliable, professional, and completely transparent corporate advisory.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-[#38bdf8] mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Professional Assistance
              </h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Managed by experienced Chartered Accountants (CA), Company Secretaries (CS), and legal advocates.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-4">
                <FileCheck className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Complete Documentation Support
              </h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Zero hassle for you. We draft all Trust Deeds, MOA, AOA, Bylaws, Affidavits, and government forms.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 mb-4">
                <Landmark className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Transparent Service Charges
              </h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Clear breakdown of government challan fees and professional charges with zero hidden surprises.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-white">
                Post-Registration Compliance
              </h4>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Annual return filings, bookkeeping, ITR filing, Form 10BD donation records, and trademark renewal support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA */}
      <CTASection
        title="Ready to Register Your NGO or Company?"
        description="Connect directly with our legal advisors today. We evaluate your requirements, verify your documentation, and begin the official registration process immediately."
        primaryLabel="Apply for Registration"
        primaryHref="/contact"
        secondaryLabel="Talk to Expert"
        secondaryHref="/contact"
      />

      {/* ============================================================== */}
      {/* 9. DETAILED SERVICE & DOCUMENTS MODAL (SCREENSHOT 6 & 7)       */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 max-h-[92vh] overflow-y-auto space-y-6"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${
                      selectedService.category === "NGO Registration"
                        ? "bg-blue-600"
                        : "bg-emerald-600"
                    }`}
                  >
                    {selectedService.category}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    • {selectedService.governmentBody}
                  </span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-[#0b1b3d]">
                  {selectedService.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  {selectedService.shortDescription}
                </p>
              </div>

              {/* Sample Certificate Graphic */}
              {selectedService.sampleCertificateImage?.url && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 aspect-[21/9] relative">
                  <img
                    src={resolveImageUrl(
                      selectedService.sampleCertificateImage.url
                    )}
                    alt={selectedService.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white">
                    Sample Certificate Format
                  </div>
                </div>
              )}

              {/* What is this Certificate? */}
              {selectedService.fullDescription && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    About This Registration / Certificate:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedService.fullDescription}
                  </p>
                </div>
              )}

              {/* Key Benefits */}
              {Array.isArray(selectedService.benefits) &&
                selectedService.benefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9] mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>Key Advantages &amp; Benefits:</span>
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedService.benefits.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 font-medium bg-blue-50/40 p-2.5 rounded-lg border border-blue-100/60"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0ea5e9]" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Required Documents */}
              {Array.isArray(selectedService.documentsRequired) &&
                selectedService.documentsRequired.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-2 flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-[#0ea5e9]" />
                      <span>Required Documents Checklist:</span>
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedService.documentsRequired.map((doc, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                        >
                          <span className="font-bold text-[#0ea5e9]">
                            {i + 1}.
                          </span>
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Step by Step Process */}
              {Array.isArray(selectedService.processSteps) &&
                selectedService.processSteps.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Government Application Process:
                    </h4>
                    <div className="space-y-1.5">
                      {selectedService.processSteps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-[#0ea5e9]">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Estimated Timeline:{" "}
                  <strong className="text-[#0b1b3d]">
                    {selectedService.processingTime}
                  </strong>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 sm:flex-initial rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const s = selectedService;
                      setSelectedService(null);
                      handleOpenApply(s);
                    }}
                    className="flex-1 sm:flex-initial rounded-xl bg-[#0ea5e9] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0284c7] transition-all"
                  >
                    Apply for this Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 10. ONLINE APPLICATION / INQUIRY MODAL                         */}
      {/* ============================================================== */}
      <AnimatePresence>
        {applicationModalService && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplicationModalService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 max-h-[92vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setApplicationModalService(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0ea5e9]">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>Online Registration Application</span>
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#0b1b3d]">
                  Apply for {applicationModalService.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your basic contact details. Our senior legal consultant will reach out with the document checklist and start the filing process.
                </p>
              </div>

              {submitSuccess ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">
                    Application Received Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Our compliance expert will contact you within 2 business hours via Call / WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.name}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, name: e.target.value })
                      }
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] focus:border-[#0ea5e9] focus:outline-none focus:ring-3 focus:ring-[#0ea5e9]/10"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applyForm.phone}
                        onChange={(e) =>
                          setApplyForm({ ...applyForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] focus:border-[#0ea5e9] focus:outline-none focus:ring-3 focus:ring-[#0ea5e9]/10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applyForm.email}
                        onChange={(e) =>
                          setApplyForm({ ...applyForm, email: e.target.value })
                        }
                        placeholder="ramesh@example.com"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] focus:border-[#0ea5e9] focus:outline-none focus:ring-3 focus:ring-[#0ea5e9]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={applyForm.city}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, city: e.target.value })
                      }
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] focus:border-[#0ea5e9] focus:outline-none focus:ring-3 focus:ring-[#0ea5e9]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                      Selected Registration Service
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={applyForm.serviceTitle}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#0ea5e9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b1b3d] uppercase tracking-wider mb-1">
                      Additional Message / Query (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={applyForm.message}
                      onChange={(e) =>
                        setApplyForm({ ...applyForm, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-[#0b1b3d] focus:border-[#0ea5e9] focus:outline-none focus:ring-3 focus:ring-[#0ea5e9]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0ea5e9]/25 hover:bg-[#0284c7] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Registration Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

