"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import {
  testimonials as fallbackTestimonials,
  type Testimonial,
} from "@/data/testimonials";
import { getTestimonials } from "@/service/testimonial.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <section className="relative py-16 lg:py-24 bg-[#0b1b3d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[12px] font-black uppercase tracking-widest text-blue-300 mb-2">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white inline-block relative pb-4">
            What Our Clients Say
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-[#0ea5e9]" />
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-blue-100 mx-auto">
            Do not just take our word for it. Here is what our clients have to
            say about working with us.
          </p>
        </div>

        {error && (
          <p className="mb-8 text-center text-xs text-amber-500">{error}</p>
        )}

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 sm:-ml-8">
            {items.map((testimonial, index) => (
              <CarouselItem
                key={`${testimonial.name}-${index}`}
                className="pl-4 sm:pl-8 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-blue-200/30 bg-transparent text-blue-200 hover:bg-blue-900/50 hover:text-white" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-blue-200/30 bg-transparent text-blue-200 hover:bg-blue-900/50 hover:text-white" />
          </div>
        </Carousel>

        {/* <div className="mt-16 text-center">
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-3 rounded-full bg-white border border-gray-200 px-8 py-4 text-[14px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(14,165,233,0.1)] hover:text-[#0ea5e9]"
          >
            View All Testimonials
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-[#0ea5e9]">
              <ArrowRight className="h-4 w-4 text-[#0ea5e9] group-hover:text-white" strokeWidth={2.5} />
            </div>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
