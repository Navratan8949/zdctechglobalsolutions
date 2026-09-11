"use client";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function TopBar() {
  const companyInfo = useSiteContent();
  return (
    <div className="w-full text-xs font-semibold py-2 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#0ea5e9]" />
            <span className="text-[#0b1b3d] uppercase tracking-wide">
              {companyInfo.headOffice}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#0ea5e9]" />
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-[#0b1b3d] hover:text-[#0ea5e9] transition-colors uppercase tracking-wide"
            >
              {companyInfo.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={companyInfo.socials?.facebook || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0ea5e9] hover:text-blue-700 transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={companyInfo.socials?.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0ea5e9] hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={companyInfo.socials?.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e1306c] hover:text-pink-700 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
