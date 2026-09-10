"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function PublicContactDetails() {
  const details = useSiteContent();

  return (
    <div className="mt-12 space-y-8">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-card/50">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Email Us</h3>
          <p className="mt-1 text-sm text-muted-foreground">{details.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            careers@zdctechglobalsolutions.com
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-card/50">
          <Phone className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Call Us</h3>
          <p className="mt-1 text-sm text-muted-foreground">{details.phone}</p>
          <p className="mt-1 text-sm text-muted-foreground">{details.hours}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-card/50">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Visit Us</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {details.headOffice}
          </p>
          {details.branchOffice && (
            <p className="mt-1 text-sm text-muted-foreground">
              {details.branchOffice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
