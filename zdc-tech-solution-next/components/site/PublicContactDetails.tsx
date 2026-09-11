"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function PublicContactDetails() {
  const details = useSiteContent();

  return (
    <div className="mt-12 space-y-8">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-sm">
          <Mail className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Email Us</h3>
          <p className="mt-1 text-sm text-blue-100/70">{details.email}</p>
          <p className="mt-1 text-sm text-blue-100/70">
            careers@zdctechglobalsolutions.com
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-sm">
          <Phone className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Call Us</h3>
          <p className="mt-1 text-sm text-blue-100/70">{details.phone}</p>
          <p className="mt-1 text-sm text-blue-100/70">{details.hours}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-sm">
          <MapPin className="h-5 w-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Visit Us</h3>
          <p className="mt-1 text-sm text-blue-100/70">
            {details.headOffice}
          </p>
          {details.branchOffice && (
            <p className="mt-1 text-sm text-blue-100/70">
              {details.branchOffice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
