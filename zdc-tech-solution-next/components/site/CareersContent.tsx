"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Upload,
} from "lucide-react";
import { jobOpenings, type JobOpening } from "@/data/company";
import { getJobs } from "@/service/job.service";
import { submitJobApplicationWithResume } from "@/service/jobApplication.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { Mail, Phone as PhoneIcon, Send } from "lucide-react";

type Job = JobOpening & { _id?: string; slug?: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-card shadow-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30";

export function CareersContent() {
  const companyInfo = useSiteContent();
  const [jobs, setJobs] = useState<Job[]>(jobOpenings);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let active = true;
    const loadJobs = async () => {
      try {
        const response = await getJobs();
        if (!active) return;
        const liveJobs = unwrapApiResponse<Job[]>(response) || [];
        if (liveJobs.length) setJobs(liveJobs);
      } catch (requestError) {
        if (active) setLoadError(getApiErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadJobs();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setSubmitted(false);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const resume = formData.get("resume");
    const errors: string[] = [];
    if (!selectedJob) errors.push("Select a position first.");
    if (!name) errors.push("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("Enter a valid email address.");
    if (!(resume instanceof File) || resume.size === 0)
      errors.push("Resume is required.");
    if (resume instanceof File && resume.size > 5 * 1024 * 1024)
      errors.push("Resume must be smaller than 5 MB.");
    if (errors.length) {
      setFormError(errors.join(" "));
      return;
    }

    const job = selectedJob;
    if (!job) return;
    formData.set("jobSlug", job.slug || job.id);
    formData.set("position", job.position);
    setIsSubmitting(true);
    try {
      await submitJobApplicationWithResume(formData);
      setSubmitted(true);
      form.reset();
    } catch (requestError) {
      setFormError(getApiErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Loading open positions...
            </p>
          )}
          {loadError && (
            <p className="mb-8 text-center text-sm text-amber-300">
              {loadError}
            </p>
          )}
          <div className="space-y-5">
            {jobs.map((job) => (
              <div
                key={job._id || job.slug || job.id}
                className="group rounded-2xl border border-border bg-card shadow-sm p-6 transition-all hover:border-primary/30"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {job.position}
                      </h3>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {job.department}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        {job.type}
                      </span>
                    </div>
                    <div 
                      className="mt-4 text-sm leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                    <details className="mt-4 group/details">
                      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
                        View full description{" "}
                        <ArrowRight className="h-4 w-4 transition-transform group-open/details:rotate-90" />
                      </summary>
                      <div className="mt-4 space-y-4 border-t border-border pt-4">
                        <JobList
                          title="Responsibilities"
                          items={job.responsibilities}
                        />
                        <JobList
                          title="Requirements"
                          items={job.requirements}
                        />
                      </div>
                    </details>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setSubmitted(false);
                      setFormError("");
                      setTimeout(() => {
                        document.getElementById("application")?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                    className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
                  >
                    Apply Now{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!jobs.length && (
            <p className="mt-8 text-center text-muted-foreground">
              There are no open positions right now. Please check back soon.
            </p>
          )}
        </div>
      </section>

      <section
        id="application"
        className="py-16 lg:py-24 bg-slate-50 relative"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Start Your Journey
            </span>
            <h2 className="font-display text-4xl font-extrabold text-[#0b1b3d]">
              Send Your <span className="text-[#0ea5e9]">Application</span>
            </h2>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-1 w-8 rounded-full bg-[#0ea5e9]" />
              <span className="h-1 w-12 rounded-full bg-[#0ea5e9]" />
              <span className="h-1 w-8 rounded-full bg-[#0ea5e9]" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-white shadow-2xl shadow-blue-900/10 border border-slate-100">
            {/* Form Section */}
            <div className="lg:w-3/5 p-8 sm:p-12 lg:p-16">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                  Job Application
                </span>
                <h3 className="text-2xl font-bold text-[#0b1b3d]">
                  We're Excited to Meet You
                </h3>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                  <h4 className="mt-4 text-xl font-bold text-[#0b1b3d]">
                    Application Submitted!
                  </h4>
                  <p className="mt-2 text-sm text-slate-500">
                    Thank you. We will review your application and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-xs font-bold text-[#0b1b3d]">
                      Full Name *
                      <input
                        name="name"
                        required
                        placeholder="Enter your full name"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0ea5e9] transition-all"
                      />
                    </label>
                    <label className="block text-xs font-bold text-[#0b1b3d]">
                      Email *
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0ea5e9] transition-all"
                      />
                    </label>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-xs font-bold text-[#0b1b3d]">
                      Phone *
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="XXXXXXXXXX"
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#0b1b3d] placeholder:text-slate-400 focus:border-[#0ea5e9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0ea5e9] transition-all"
                      />
                    </label>
                    <label className="block text-xs font-bold text-[#0b1b3d]">
                      Select Role *
                      <select
                        name="positionLabel"
                        required
                        value={selectedJob?.position || ""}
                        onChange={(event) =>
                          setSelectedJob(
                            jobs.find(
                              (job) => job.position === event.target.value,
                            ) || null,
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-[#0ea5e9] bg-white px-4 py-3 text-sm font-medium text-[#0b1b3d] focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230ea5e9'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 1rem center",
                          backgroundSize: "1.25em 1.25em",
                        }}
                      >
                        <option value="" disabled>
                          -- Choose a position --
                        </option>
                        {jobs.map((job) => (
                          <option
                            key={job._id || job.slug || job.id}
                            value={job.position}
                          >
                            {job.position}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  
                  <label className="block text-xs font-bold text-[#0b1b3d]">
                    Upload Resume/CV * (PDF/DOC, Max 5MB)
                    <div className="relative mt-2 flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <Upload className="h-5 w-5 text-[#0ea5e9]" />
                        <span className="text-sm font-medium text-[#0b1b3d]">
                          Click or drag to upload resume
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          PDF, DOC, DOCX
                        </span>
                        <div className="rounded-md bg-[#0ea5e9] px-4 py-1.5 text-xs font-bold text-white flex items-center gap-2">
                          <Upload className="h-3 w-3" /> Browse
                        </div>
                      </div>
                      <input
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </div>
                  </label>



                  {formError && (
                    <p className="text-sm text-red-500 font-medium" role="alert">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0ea5e9] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Side */}
            <div className="bg-gradient-to-br from-[#0b1b3d] to-blue-900 lg:w-2/5 p-10 lg:p-12 text-white relative overflow-hidden flex flex-col justify-center">
              {/* Decorative Curves */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
              <svg className="absolute top-0 right-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 Q50,100 100,0 L100,100 L0,100 Z" fill="url(#grad)" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0b1b3d" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative z-10 text-center">
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-wide">
                  Join Our Team
                </h3>
                
                <div className="mx-auto mt-10 mb-12 flex h-40 w-40 items-center justify-center rounded-full bg-white/10 p-2 shadow-2xl backdrop-blur-sm border border-white/20">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-inner relative overflow-hidden">
                    {companyInfo.logo?.url ? (
                       <img src={companyInfo.logo.url} alt="Logo" className="w-24 object-contain" />
                    ) : (
                      <span className="text-4xl font-black text-blue-900">ZDC</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20">
                    <div className="rounded-full bg-white/20 p-2">
                      <PhoneIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{companyInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20">
                    <div className="rounded-full bg-white/20 p-2">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium truncate">{companyInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-md border border-white/10 transition-colors hover:bg-white/20">
                    <div className="rounded-full bg-white/20 p-2">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium leading-tight">{companyInfo.headOffice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function JobList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary text-primary-foreground" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
