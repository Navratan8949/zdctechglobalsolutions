import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  ArrowRight,
  ChevronRight,
  Facebook,
} from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

// ── Navigation columns ──────────────────────────────────────────────────────

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Life at ZDC", href: "/life-at-company" },
  { label: "Careers", href: "/careers" },
];

const internationalServiceLinks = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "SEO Agency", href: "/services/seo" },
  { label: "Social Media Marketing", href: "/services/social-media" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Meta Ads", href: "/services/meta-ads" },
  { label: "Google My Business Profile", href: "/services/gmb" },
];

const testingLinks = [
  { label: "Software Testing", href: "/services/software-testing" },
  { label: "Security Testing", href: "/services/security-testing" },
  { label: "Performance Testing", href: "/services/performance-testing" },
];

const serviceLinks = [
  { label: "Website Design & Development", href: "/services/web-design" },
  { label: "Mobile App Development", href: "/services/mobile-app" },
  { label: "Custom Software Development", href: "/services/software" },
  { label: "HR and Payroll Management", href: "/services/hr-payroll" },
  { label: "E-Commerce Solutions", href: "/services/ecommerce" },
  { label: "UI/UX Design", href: "/services/ui-ux" },
  { label: "Logo & Brochure Design", href: "/services/logo-design" },
  { label: "Data Analytics & BI", href: "/services/data-analytics" },
  { label: "AI & Machine Learning", href: "/services/ai-ml" },
  { label: "IT Consulting", href: "/services/it-consulting" },
  { label: "IT Support & Managed Service", href: "/services/it-support" },
];

const jobLinks = [
  { label: "Android Developer", href: "/careers" },
  { label: "React Native Developer", href: "/careers" },
  { label: "Angular Developer", href: "/careers" },
  { label: "Node.Js Developer", href: "/careers" },
  { label: "Overseas Education Counselor", href: "/careers" },
  { label: "Automation Testing", href: "/careers" },
  { label: "Work From Home", href: "/careers" },
];

// ── Reusable link list ───────────────────────────────────────────────────────
function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-center text-[13px] text-slate-300 transition-colors duration-300 hover:text-white"
          >
            <ChevronRight className="mr-2 h-3.5 w-3.5 text-[#0ea5e9] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            <span className="-translate-x-4 transition-transform duration-300 group-hover:translate-x-0">
              {link.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// ── Footer heading ───────────────────────────────────────────────────────────
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mb-5">
      <h4 className="text-[14px] font-bold text-white tracking-wide uppercase">
        {children}
      </h4>
      <div className="mt-2 h-[2px] w-8 rounded-full bg-[#0ea5e9]" />
    </div>
  );
}

// ── Main Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  const companyInfo = useSiteContent();

  const socials = [
    {
      icon: Facebook,
      href: companyInfo.socials?.facebook || "#",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: companyInfo.socials?.linkedin || "#",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: companyInfo.socials?.twitter || "#",
      label: "Twitter",
    },
    { icon: Github, href: companyInfo.socials?.github || "#", label: "GitHub" },
    {
      icon: Instagram,
      href: companyInfo.socials?.instagram || "#",
      label: "Instagram",
    },
  ];

  return (
    <footer className="bg-[#0b1b3d] pt-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ── Top CTA Banner ─────────────────────────────── */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-[#0ea5e9] to-blue-600 p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to scale your business?
            </h2>
            <p className="mt-2 text-[15px] text-blue-50 max-w-2xl">
              Partner with ZDC Tech Global Solutions to build cutting-edge
              digital products that drive real growth.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white text-[#0b1b3d] px-8 font-bold tracking-wider uppercase text-[13px] transition-all hover:scale-105 hover:bg-slate-50 hover:shadow-lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* ── Grid Layout ──────────────────────────────────── */}
        <div className="grid gap-12 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-b border-slate-700 pb-16">
          {/* Col 1: Brand + Contact */}
          <div className="lg:col-span-2 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2">
                <Image
                  src={companyInfo?.logo?.url || "/logo/favi.png"}
                  alt="ZDC Tech Icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <Image
                src={companyInfo?.logoText?.url || "/logo/zdc.png"}
                alt={`${companyInfo?.name || "ZDC Tech"} Global Solutions`}
                width={140}
                height={34}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-6 text-[13px] leading-relaxed text-slate-300">
              A premium software development agency delivering enterprise-grade
              web, mobile, and custom solutions to visionary brands globally.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${companyInfo.email}`}
                className="flex items-start gap-3 text-[13px] text-slate-300 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 text-[#0ea5e9]" />
                <span>{companyInfo.email}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-start gap-3 text-[13px] text-slate-300 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 text-[#0ea5e9]" />
                <span>{companyInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-[13px] text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0ea5e9]" />
                <span className="leading-relaxed">
                  <span className="block text-white font-medium mb-1">
                    Head Office
                  </span>
                  {companyInfo.headOffice}
                </span>
              </div>
              {companyInfo.branchOffice && (
                <div className="flex items-start gap-3 text-[13px] text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0ea5e9]" />
                  <span className="leading-relaxed">
                    <span className="block text-white font-medium mb-1">
                      Branch Office
                    </span>
                    {companyInfo.branchOffice}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-[#0ea5e9] hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Company & Jobs */}
          <div className="lg:col-span-1">
            <div className="mb-10">
              <FooterHeading>Company</FooterHeading>
              <FooterLinkList links={companyLinks} />
            </div>
            <div>
              <FooterHeading>Jobs</FooterHeading>
              <FooterLinkList links={jobLinks} />
            </div>
          </div>

          {/* Col 3: International Service & Testing */}
          <div className="lg:col-span-1">
            <div className="mb-10">
              <FooterHeading>Int. Services</FooterHeading>
              <FooterLinkList links={internationalServiceLinks} />
            </div>
            <div>
              <FooterHeading>Testing</FooterHeading>
              <FooterLinkList links={testingLinks} />
            </div>
          </div>

          {/* Col 4: Services */}
          <div className="lg:col-span-1">
            <FooterHeading>Services</FooterHeading>
            <FooterLinkList links={serviceLinks} />
          </div>

          {/* Col 5: Support & Newsletter */}
          <div className="lg:col-span-1">
            <div className="mb-10">
              <FooterHeading>Support</FooterHeading>
              <FooterLinkList
                links={[
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Terms of Service", href: "/terms-and-conditions" },
                  { label: "Refund Policy", href: "/refund-policy" },
                ]}
              />
            </div>

            <div>
              <h5 className="text-[13px] font-bold text-white uppercase tracking-wider mb-3">
                Subscribe
              </h5>
              <div className="flex h-11 w-full overflow-hidden rounded-lg bg-slate-800 focus-within:ring-2 focus-within:ring-[#0ea5e9]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent px-3 text-[13px] text-white placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  aria-label="Subscribe"
                  className="flex h-full w-12 shrink-0 items-center justify-center bg-[#0ea5e9] text-white hover:bg-blue-500 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="flex items-center justify-center py-6">
          <p className="text-[13px] text-slate-400 text-center">
            &copy; {new Date().getFullYear()} ZDC Tech Global Solutions Pvt.
            Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
