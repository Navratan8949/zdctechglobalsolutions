"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { companyInfo as fallbackCompanyInfo } from "@/data/company";
import { getCurrentSiteContent } from "@/service/siteContent.service";
import { unwrapApiResponse } from "@/lib/public-api";

interface SocialLinks {
  facebook?: string;
  linkedin: string;
  twitter: string;
  github: string;
  instagram: string;
}

export interface SiteContent {
  _id?: string;
  name: string;
  tagline: string;
  email: string;
  phone: string;
  headOffice: string;
  branchOffice: string;
  hours: string;
  logo?: { public_id: string; url: string };
  logoText?: { public_id: string; url: string };
  socials: SocialLinks;
}

const SiteContentContext = createContext<SiteContent>(fallbackCompanyInfo as any);

export function SiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteContent, setSiteContent] = useState<SiteContent>(fallbackCompanyInfo as any);

  useEffect(() => {
    let active = true;
    const fetchContent = async () => {
      try {
        const response = await getCurrentSiteContent();
        if (!active) return;
        const data = unwrapApiResponse<SiteContent>(response);
        if (data && data.name) {
          setSiteContent(data);
        }
      } catch (error) {
        console.error("Failed to fetch site content, using fallback.", error);
      }
    };
    void fetchContent();
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={siteContent}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
