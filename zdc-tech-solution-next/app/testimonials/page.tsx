"use client";

import { PageHero } from "@/components/site/PageHero";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import {
  testimonials as fallbackTestimonials,
  type Testimonial,
} from "@/data/testimonials";
import { getTestimonials } from "@/service/testimonial.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";
export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
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
        if (!active) return;
        setError(getApiErrorMessage(requestError));
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadTestimonials();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Don't just take our word for it. Here is what our clients have to say about working with us."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Success Stories"
            title="Real Results, Real Impact"
            description="We are proud of the work we do and the relationships we build with our clients."
          />
          {loading && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Loading testimonials...
            </p>
          )}
          {error && (
            <p className="mt-8 text-center text-sm text-amber-300">{error}</p>
          )}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
