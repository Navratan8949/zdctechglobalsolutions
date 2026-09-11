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

type Job = JobOpening & { _id?: string; slug?: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-card shadow-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30";

export function CareersContent() {
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
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
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
        className="border-t border-border py-16 lg:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Apply to Join Us
            </h2>
            <p className="mt-3 text-muted-foreground">
              Share your details and resume with our hiring team.
            </p>
          </div>
          {submitted ? (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-green-400" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                Application submitted
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you. We will review your application and get back to you.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-8"
            >
              <label className="block text-sm font-medium text-foreground">
                Position *
                <select
                  name="positionLabel"
                  value={selectedJob?.position || ""}
                  onChange={(event) =>
                    setSelectedJob(
                      jobs.find((job) => job.position === event.target.value) ||
                        null,
                    )
                  }
                  className={`${inputClasses} mt-2`}
                >
                  <option value="" className="bg-card">
                    Select a position
                  </option>
                  {jobs.map((job) => (
                    <option
                      key={job._id || job.slug || job.id}
                      value={job.position}
                      className="bg-card"
                    >
                      {job.position}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-foreground">
                  Name *
                  <input
                    name="name"
                    required
                    className={`${inputClasses} mt-2`}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  Email *
                  <input
                    name="email"
                    type="email"
                    required
                    className={`${inputClasses} mt-2`}
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-foreground">
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    className={`${inputClasses} mt-2`}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  Resume *
                  <span className="relative mt-2 flex cursor-pointer items-center gap-2 ${inputClasses}">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      Choose PDF or DOC
                    </span>
                    <input
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </span>
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-foreground">
                  Portfolio URL
                  <input
                    name="portfolioUrl"
                    type="url"
                    className={`${inputClasses} mt-2`}
                  />
                </label>
                <label className="text-sm font-medium text-foreground">
                  LinkedIn URL
                  <input
                    name="linkedinUrl"
                    type="url"
                    className={`${inputClasses} mt-2`}
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-foreground">
                Cover letter
                <textarea
                  name="coverLetter"
                  rows={5}
                  className={`${inputClasses} mt-2`}
                />
              </label>
              {formError && (
                <p className="text-sm text-red-400" role="alert">
                  {formError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
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
