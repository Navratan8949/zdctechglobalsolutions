"use client";

import { PageHero } from "@/components/site/PageHero";
import { useEffect, useState } from "react";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CTASection } from "@/components/site/CTASection";
import { services as fallbackServices, type Service } from "@/data/services";
import { getServices } from "@/service/service.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getServices()
      .then((response) => {
        if (!active) return;
        setItems(unwrapApiResponse<Service[]>(response) || []);
      })
      .catch((requestError) => {
        if (!active) return;
        setItems(fallbackServices);
        setError(getApiErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital Services for Every Business Need"
        description="From concept to deployment, we offer a comprehensive suite of services to help your business thrive in the digital age."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Loading services...
            </p>
          )}
          {error && (
            <p className="mb-8 text-center text-sm text-amber-300">{error}</p>
          )}
          {!loading && items.length === 0 && (
            <p className="mb-8 text-center text-muted-foreground">
              No published services are available yet.
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* <CTASection /> */}
    </>
  );
}
