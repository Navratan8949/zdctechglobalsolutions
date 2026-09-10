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
  ExternalLink,
} from "lucide-react";
import { HeroParticles } from "@/components/site/HeroParticles";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

// ── Navigation columns ──────────────────────────────────────────────────────

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Clients", href: "/clients" },
  { label: "Life at ZDC", href: "/life-at-company" },
  { label: "Careers", href: "/careers" },
];

const serviceLinks = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "Custom Software", href: "/services/software-development" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "E-Commerce Solutions", href: "/services/ecommerce-solutions" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "SEO Services", href: "/services/seo" },
  { label: "Cloud Services", href: "/services/cloud-services" },
  { label: "IT Consulting", href: "/services/it-consulting" },
];

const resourceLinks = [
  { label: "Blog & Insights", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

// ── Reusable link list ───────────────────────────────────────────────────────
function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-6 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group relative flex items-center text-[13px] text-slate-400 transition-all duration-300 hover:text-white"
          >
            <ChevronRight className="absolute left-0 h-3.5 w-3.5 text-blue-500 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
            <span className="transition-transform duration-300 group-hover:translate-x-5">
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
    <div className="relative">
      <h4 className="text-[15px] font-bold text-white">{children}</h4>
      <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
    </div>
  );
}

// ── Main Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  const companyInfo = useSiteContent();

  const socials = [
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
    <footer className="relative mt-20 overflow-hidden bg-[#030917] pt-20 sm:pt-28">
      {/* Background gradients */}
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* Top Border Glow */}
      <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <HeroParticles id="footer-particles" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        {/* ── Top CTA Banner ─────────────────────────────── */}
        <div className="mb-20 rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-md relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-fuchsia-500/10 opacity-50" />
          <div className="relative z-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to scale your business?
            </h2>
            <p className="mt-4 text-base text-slate-400 max-w-2xl">
              Partner with ZDC Tech Global Solutions to build cutting-edge
              digital products that drive real growth and outpace the
              competition.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-blue-600 px-8 font-semibold text-white transition-all hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)]"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-12 lg:gap-8 lg:grid-cols-12 border-b border-white/10 pb-16">
          {/* ── Col 1: Brand + contact ─────────────────────── */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Image
                  src="/logo/favi.png"
                  alt="ZDC Tech Icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <Image
                src={companyInfo?.logo?.url || "/logo/zdc.png"}
                alt={`${companyInfo?.name || "ZDC Tech Global Solutions"} Logo`}
                width={140}
                height={34}
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 text-[14px] leading-relaxed text-slate-400">
              A premium software development agency delivering enterprise-grade
              web, mobile, and custom solutions to visionary brands globally.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                >
                  <Icon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2: Company ──────────────────────────────── */}
          <div className="lg:col-span-2">
            <FooterHeading>Company</FooterHeading>
            <FooterLinkList links={companyLinks} />
          </div>

          {/* ── Col 3: Services ─────────────────────────────── */}
          <div className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <FooterLinkList links={serviceLinks} />
          </div>

          {/* ── Col 4: Contact & Newsletter ───────────────── */}
          <div className="lg:col-span-3">
            <FooterHeading>Get in Touch</FooterHeading>

            <div className="mt-6 space-y-4">
              <a
                href={`mailto:${companyInfo.email}`}
                className="group flex items-start gap-3 text-[13px] text-slate-400 transition-colors hover:text-white"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 mt-1">{companyInfo.email}</span>
              </a>
              <a
                href={`tel:${companyInfo.phone}`}
                className="group flex items-start gap-3 text-[13px] text-slate-400 transition-colors hover:text-white"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 mt-1">{companyInfo.phone}</span>
              </a>
              <div className="group flex items-start gap-3 text-[13px] text-slate-400">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="flex-1 leading-relaxed mt-1">
                  <span className="block text-white font-medium mb-1">
                    Head Office
                  </span>
                  {companyInfo.headOffice}
                </span>
              </div>

              {companyInfo.branchOffice && (
                <div className="group flex items-start gap-3 text-[13px] text-slate-400 mt-2">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/10 text-fuchsia-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 leading-relaxed mt-1">
                    <span className="block text-white font-medium mb-1">
                      Branch Office
                    </span>
                    {companyInfo.branchOffice}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <h5 className="text-[13px] font-semibold text-white">
                Subscribe to Newsletter
              </h5>
              <div className="mt-3 flex h-10 w-full overflow-hidden rounded-lg border border-white/10 bg-black/20 focus-within:border-blue-500/50 transition-colors">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent px-3 text-[13px] text-white placeholder:text-slate-600 focus:outline-none"
                />
                <button
                  aria-label="Subscribe"
                  className="flex h-full w-10 shrink-0 items-center justify-center bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-[13px] text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ZDC Tech Global Solutions Pvt.
            Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[13px] text-slate-500">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
