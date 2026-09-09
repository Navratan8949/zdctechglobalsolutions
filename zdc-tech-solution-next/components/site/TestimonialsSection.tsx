"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import {
  testimonials as fallbackTestimonials,
  type Testimonial,
} from "@/data/testimonials";
import { getTestimonials } from "@/service/testimonial.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadTestimonials = async () => {
      try {
        const response = await getTestimonials();
        if (!active) return;
        const liveItems = unwrapApiResponse<Testimonial[]>(response) || [];
        if (liveItems.length) setItems(liveItems);
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadTestimonials();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Do not just take our word for it. Here is what our clients have to say about working with us."
        />
        {error && (
          <p className="mt-8 text-center text-xs text-amber-300">{error}</p>
        )}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
          >
            View All Testimonials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
