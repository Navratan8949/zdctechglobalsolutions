"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyInfo } from "@/data/company";
import { getCurrentSiteContent } from "@/service/siteContent.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

interface SiteContent {
  email?: string;
  phone?: string;
  headOffice?: string;
  branchOffice?: string;
  hours?: string;
}

export function PublicContactDetails() {
  const [details, setDetails] = useState(companyInfo);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadSiteContent = async () => {
      try {
        const response = await getCurrentSiteContent();
        if (!active) return;
        const liveContent = unwrapApiResponse<SiteContent>(response);
        if (liveContent) {
          setDetails((current) => ({
            ...current,
            email: liveContent.email || current.email,
            phone: liveContent.phone || current.phone,
            headOffice: liveContent.headOffice || current.headOffice,
            branchOffice: liveContent.branchOffice || current.branchOffice,
            hours: liveContent.hours || current.hours,
          }));
        }
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadSiteContent();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mt-12 space-y-8">
      {error && <p className="text-xs text-amber-300">{error}</p>}
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
