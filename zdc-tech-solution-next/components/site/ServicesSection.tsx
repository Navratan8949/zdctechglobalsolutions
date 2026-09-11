"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { services as fallbackServices, type Service } from "@/data/services";
import { getServices } from "@/service/service.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { getIcon } from "@/lib/icons";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MAIN_SERVICE_SLUGS = [
  "google-ads",
  "meta-ads",
  "mobile-app",
  "social-media",
  "crm-development",
  "web-design",
  "software",
  "it-consulting"
];

export function ServicesSection() {
  const [items, setItems] = useState<Service[]>(fallbackServices.filter(s => MAIN_SERVICE_SLUGS.includes(s.slug)));

  useEffect(() => {
    let active = true;
    const fetchServices = async () => {
      try {
        const res = await getServices();
        if (!active) return;
        const liveServices = unwrapApiResponse<Service[]>(res) || [];
        if (liveServices.length > 0) {
          const mainLive = liveServices.filter(s => MAIN_SERVICE_SLUGS.includes(s.slug));
          setItems(mainLive.length > 0 ? mainLive : liveServices.slice(0, 8));
        }
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
    <section className="relative py-16 lg:py-20 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#0b1b3d] inline-block relative pb-4">
            OUR SERVICES
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-[#0ea5e9]" />
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(0, 8).map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="relative h-full overflow-hidden rounded-lg bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-6 py-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,64,175,0.2)] flex flex-col items-center text-center">
                    {/* Water Fill Effect Background */}
                    <div className="absolute bottom-0 left-0 right-0 h-0 bg-[#1e40af] transition-all duration-500 ease-out group-hover:h-full z-0" />

                    <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#0ea5e9] transition-all duration-500 group-hover:scale-110 mb-6 group-hover:bg-white/20 overflow-hidden">
                      {service.image?.url ? (
                        <img 
                          src={service.image.url} 
                          alt={service.title} 
                          className="w-12 h-12 object-contain transition-transform duration-500"
                        />
                      ) : (
                        <Icon className="h-8 w-8 text-white" />
                      )}
                    </div>

                    <h3 className="relative z-10 text-[15px] font-bold uppercase tracking-wide text-[#0b1b3d] group-hover:text-white transition-colors duration-300 mb-4">
                      {service.title}
                    </h3>

                    <p className="relative z-10 text-[13px] leading-relaxed text-slate-500 group-hover:text-blue-100 transition-colors duration-300 line-clamp-4">
                      {service.shortDescription}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
