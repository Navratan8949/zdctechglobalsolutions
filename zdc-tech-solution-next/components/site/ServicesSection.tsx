"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { services as fallbackServices, type Service } from "@/data/services";
import { getServices } from "@/service/service.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { getIcon } from "@/lib/icons";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ServicesSection() {
  const [items, setItems] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    let active = true;
    const fetchServices = async () => {
      try {
        const res = await getServices();
        if (!active) return;
        const liveServices = unwrapApiResponse<Service[]>(res) || [];
        if (liveServices.length > 0) setItems(liveServices);
      } catch (err) {
        // Fallback already set
      }
    };
    void fetchServices();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative py-20 lg:py-28">
      {/* Static top accent line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Built for Digital Growth"
          description="From websites to enterprise software, we offer a full spectrum of digital services."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
                    {/* Radial bg — pure CSS, no JS */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(280px circle at 50% 0%, rgba(99,102,241,0.07), transparent 70%)",
                      }}
                    />

                    {/* Top row: icon + arrow */}
                    <div className="relative flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                        }}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </div>

                    {/* Text */}
                    <div className="relative mt-5">
                      <h3 className="font-display text-base font-semibold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Learn more */}
                    <div className="relative mt-5 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </div>

                    {/* Bottom border — CSS transition-[width], no JS/Framer */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-primary to-secondary transition-[width] duration-300 group-hover:w-full" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-primary/40 hover:bg-white/10"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
