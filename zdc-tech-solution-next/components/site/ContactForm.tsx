"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { services } from "@/data/services";
import { submitContact } from "@/service/contact.service";
import { getServices } from "@/service/service.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";
import type { Service } from "@/data/services";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [serviceOptions, setServiceOptions] = useState(services);
  const [serviceLoadError, setServiceLoadError] = useState("");

  useEffect(() => {
    let active = true;
    const loadServices = async () => {
      try {
        const response = await getServices();
        if (!active) return;
        const liveServices = unwrapApiResponse<Service[]>(response) || [];
        if (liveServices.length) setServiceOptions(liveServices);
      } catch (requestError) {
        if (active) setServiceLoadError(getApiErrorMessage(requestError));
      }
    };
    void loadServices();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newErrors: Record<string, string> = {};
    if (!formData.get("name")?.toString().trim())
      newErrors.name = "Name is required";
    if (!formData.get("email")?.toString().trim())
      newErrors.email = "Email is required";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)
    )
      newErrors.email = "Please enter a valid email";
    if (!formData.get("message")?.toString().trim())
      newErrors.message = "Message is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        await submitContact(Object.fromEntries(formData.entries()));
        setSubmitted(true);
        form.reset();
      } catch (error) {
        const response = (
          error as { response?: { data?: { message?: string } } }
        ).response;
        setSubmitError(
          response?.data?.message ||
            "We could not send your message. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-foreground">
          Thank you!
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          We&apos;ll get back to you soon. Our team typically responds within 24
          hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-card shadow-sm px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Name *
          </label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            className={inputClasses}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Email *
          </label>
          <input
            name="email"
            type="email"
            placeholder="john@company.com"
            className={inputClasses}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Company
          </label>
          <input
            name="company"
            type="text"
            placeholder="Your company"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Service
          </label>
          <select name="service" className={inputClasses} defaultValue="">
            <option value="" className="bg-card">
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s.slug} value={s.title} className="bg-card">
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Budget
          </label>
          <select name="budget" className={inputClasses} defaultValue="">
            <option value="" className="bg-card">
              Select budget range
            </option>
            <option className="bg-card">Less than $5,000 (₹4 Lakhs)</option>
            <option className="bg-card">$5,000 - $15,000 (₹4L - ₹12L)</option>
            <option className="bg-card">$15,000 - $50,000 (₹12L - ₹40L)</option>
            <option className="bg-card">$50,000+ (₹40L+)</option>
          </select>
        </div>
      </div>
      {serviceLoadError && (
        <p className="text-xs text-amber-300">{serviceLoadError}</p>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Message *
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your project..."
          className={inputClasses}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all hover:scale-105 hover:bg-primary/90 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {submitError && (
        <p className="text-sm text-red-400" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
