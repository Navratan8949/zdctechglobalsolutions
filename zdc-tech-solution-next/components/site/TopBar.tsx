import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";
import { companyInfo } from "@/data/company";

export function TopBar() {
  return (
    <div className="w-full text-slate-300 py-2 border-b border-white/5 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-medium">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{companyInfo.headOffice}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <a href={`mailto:${companyInfo.email}`} className="hover:text-primary transition-colors">
              {companyInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-primary" />
            <a href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-primary transition-colors">
              {companyInfo.phone}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={companyInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href={companyInfo.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
