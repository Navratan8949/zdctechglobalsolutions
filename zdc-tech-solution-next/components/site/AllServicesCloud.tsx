"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getServices } from "@/service/service.service";
import { services as fallbackServices } from "@/data/services";

interface ServiceItem {
  _id?: string;
  slug: string;
  title: string;
}

type ApiResponse = { data?: ServiceItem[] } | ServiceItem[];

function unwrap(res: ApiResponse): ServiceItem[] {
  if (Array.isArray(res)) return res;
  if (
    res &&
    typeof res === "object" &&
    "data" in res &&
    Array.isArray(res.data)
  )
    return res.data;
  return [];
}

export function AllServicesCloud() {
  const [items, setItems] = useState<ServiceItem[]>(
    fallbackServices as ServiceItem[],
  );

  useEffect(() => {
    getServices()
      .then((res) => {
        const list = unwrap(res as ApiResponse);
        if (list.length > 0) setItems(list);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading matching the screenshot */}
        <div className="text-center mb-12 flex flex-col items-center">
          <h2
            className="text-2xl sm:text-3xl font-bold uppercase tracking-wide"
            style={{ color: "#000000ff" }}
          >
            Complete Service Offerings
          </h2>
          <div
            className="h-1 w-32 mt-4"
            style={{ backgroundColor: "#2dd4bf" }}
          ></div>
        </div>

        {/* White container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {items.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border border-slate-200/60 shadow-sm"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
