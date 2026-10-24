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
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[#0b1b3d] hover:text-[#0ea5e9] transition-colors uppercase tracking-wide"
            >
              {companyInfo.email}
              <span className="sr-only"> (Opens Gmail compose)</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {companyInfo.socials?.facebook && companyInfo.socials.facebook !== "#" ? (
            <a
              href={companyInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[#0ea5e9] hover:text-blue-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </a>
          ) : (
            <span
              className="text-slate-400 opacity-60 cursor-default"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </span>
          )}

          {companyInfo.socials?.linkedin && companyInfo.socials.linkedin !== "#" ? (
            <a
              href={companyInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[#0ea5e9] hover:text-blue-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          ) : (
            <span
              className="text-slate-400 opacity-60 cursor-default"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </span>
          )}

          {companyInfo.socials?.instagram && companyInfo.socials.instagram !== "#" ? (
            <a
              href={companyInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[#e1306c] hover:text-pink-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </a>
          ) : (
            <span
              className="text-[#e1306c] opacity-60 cursor-default"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </span>
          )}

          <a
            href={`https://wa.me/${(companyInfo.socials?.whatsapp || companyInfo.phone || "").replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-[#25D366] hover:text-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
            <span className="sr-only">WhatsApp Chat</span>
          </a>

          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email Us via Gmail</span>
          </a>
        </div>
      </div>
    </div>
  );
}
