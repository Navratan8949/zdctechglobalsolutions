"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { TopBar } from "@/components/site/TopBar";
import { getIcon } from "@/lib/icons";
import { getServices } from "@/service/service.service";
import { unwrapApiResponse } from "@/lib/public-api";
import type { Service } from "@/data/services";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Life At Company", href: "/life-at-company" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Clients", href: "/clients" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
  isMegaMenu?: boolean;
  megaMenuGroups?: {
    title: string;
    items: {
      label: string;
      href: string;
    }[];
  }[];
};

const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Company", href: "/about", children: companyLinks },
  {
    label: "Services",
    href: "/services",
    isMegaMenu: true,
    megaMenuGroups: [
      {
        title: "Online Marketing",
        items: [
          { label: "SEO Services", href: "/services/seo" },
          { label: "Social Media Marketing", href: "/services/social-media" },
          { label: "Google Ads", href: "/services/google-ads" },
          { label: "Meta Ads", href: "/services/meta-ads" },
          { label: "Google My Business Profile", href: "/services/gmb" },
          { label: "Digital Marketing", href: "/services/digital-marketing" },
        ],
      },
      {
        title: "Web Design & Development",
        items: [
          { label: "Web Design & Development", href: "/services/web-design" },
          {
            label: "CRM Software Development",
            href: "/services/crm-development",
          },
          { label: "Software Development", href: "/services/software" },
          {
            label: "Educational Web Portal",
            href: "/services/educational-portal",
          },
          {
            label: "Restaurant Web Portal",
            href: "/services/restaurant-portal",
          },
          { label: "Health Care Portal", href: "/services/healthcare-portal" },
          {
            label: "Travel Portal Development",
            href: "/services/travel-portal",
          },
          { label: "Real Estate Portal", href: "/services/real-estate-portal" },
          { label: "E-Commerce Website", href: "/services/ecommerce" },
        ],
      },
      {
        title: "Mobile Application",
        items: [
          { label: "Mobile App Development", href: "/services/mobile-app" },
          { label: "Windows App Development", href: "/services/windows-app" },
          { label: "Xamarine App Development", href: "/services/xamarin" },
          { label: "Native App Development", href: "/services/native-app" },
          { label: "Hybrid App Development", href: "/services/hybrid-app" },
        ],
      },
      {
        title: "Our Service",
        items: [
          { label: "IT Consulting", href: "/services/it-consulting" },
          { label: "Data Analytics & BI", href: "/services/data-analytics" },
          { label: "AI & Machine Learning", href: "/services/ai-ml" },
          {
            label: "IT Support & Managed Service",
            href: "/services/it-support",
          },
          { label: "Logo Design", href: "/services/logo-design" },
          { label: "UI/UX Design", href: "/services/ui-ux" },
          { label: "Brochure Design", href: "/services/brochure-design" },
        ],
      },
      {
        title: "Software",
        items: [
          { label: "HR and Payroll Software", href: "/services/hr-payroll" },
          { label: "Jewellery Software", href: "/services/jewellery-software" },
          { label: "CRM Software", href: "/services/crm-software" },
          {
            label: "Real Estate Software",
            href: "/services/real-estate-software",
          },
          { label: "Inventory Management", href: "/services/inventory" },
          {
            label: "Hospital Management",
            href: "/services/hospital-management",
          },
          { label: "School Management", href: "/services/school-management" },
        ],
      },
      {
        title: "Testing",
        items: [
          { label: "Software Testing", href: "/services/software-testing" },
          { label: "Security Testing", href: "/services/security-testing" },
          {
            label: "Performance Testing",
            href: "/services/performance-testing",
          },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const companyInfo = useSiteContent();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const [navItems, setNavItems] = useState(mainNav);

  // Navbar currently uses static mainNav structure to preserve the exact mega menu grouping.
  // Dynamic fetching was removed to prevent overriding the extensive static menu with partial DB data.

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] flex flex-col transition-all duration-500 bg-white",
          scrolled ? "shadow-md" : "shadow-sm",
        )}
      >
        <div
          className={cn(
            "w-full transition-all duration-300 origin-top overflow-hidden hidden lg:block border-b border-gray-100",
            scrolled ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100",
          )}
        >
          <TopBar />
        </div>
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={companyInfo?.logo?.url || "/logo/favi.png"}
              alt={`${companyInfo?.name || "ZDC Tech"} Logo`}
              width={40}
              height={40}
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <Image
              src={companyInfo?.logoText?.url || "/logo/zdc.png"}
              alt={`${companyInfo?.name || "ZDC Tech"} Global Solutions`}
              width={180}
              height={46}
              className="h-7 sm:h-9 w-auto object-contain brightness-0"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  (item.children || item.isMegaMenu) &&
                  setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children || item.isMegaMenu ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 py-2 text-[13px] font-bold uppercase tracking-widest transition-colors",
                      isActive(item.href) || openDropdown === item.label
                        ? "text-[#0ea5e9]"
                        : "text-[#0b1b3d] hover:text-[#0ea5e9]",
                    )}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        openDropdown === item.label && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "py-2 text-[13px] font-bold uppercase tracking-widest transition-colors",
                      isActive(item.href)
                        ? "text-[#0ea5e9]"
                        : "text-[#0b1b3d] hover:text-[#0ea5e9]",
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {(item.children || item.isMegaMenu) &&
                  openDropdown === item.label && (
                    <div
                      className={cn(
                        "absolute top-full pt-4",
                        item.isMegaMenu
                          ? "left-1/2 -translate-x-1/2 w-[1100px]"
                          : item.children && item.children.length > 6
                            ? "left-0 w-[420px]"
                            : "left-0 w-56",
                      )}
                    >
                      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                        {item.isMegaMenu && item.megaMenuGroups ? (
                          <div className="columns-4 gap-8 p-4">
                            {item.megaMenuGroups.map(
                              (group: any, index: number) => (
                                <div
                                  key={group.title}
                                  className={cn(
                                    "break-inside-avoid",
                                    index > 0 && "mt-8",
                                  )}
                                >
                                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0ea5e9] mb-4 border-b border-gray-100 pb-3">
                                    {group.title}
                                  </h4>
                                  <ul className="space-y-1">
                                    {group.items.map((child: any) => (
                                      <li key={child.label}>
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "block rounded-md px-3 py-2 text-[12px] font-semibold transition-colors",
                                            pathname === child.href
                                              ? "bg-blue-50 text-[#0ea5e9]"
                                              : "text-slate-600 hover:bg-slate-50 hover:text-[#0b1b3d]",
                                          )}
                                        >
                                          {child.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ),
                            )}
                          </div>
                        ) : item.children ? (
                          <div
                            className={cn(
                              "grid gap-1",
                              item.children.length > 6
                                ? "grid-cols-2"
                                : "flex flex-col",
                            )}
                          >
                            {item.children.map((child: any) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "block rounded-md px-4 py-3 text-[13px] font-semibold transition-colors",
                                  pathname === child.href
                                    ? "bg-blue-50 text-[#0ea5e9]"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0b1b3d]",
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex h-[40px] items-center justify-center rounded-full bg-[#0ea5e9] px-6 text-[12px] font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-[#0284c7]"
            >
              CALL NOW
            </Link>
          </div>

          <button
            className="rounded-full bg-card shadow-sm p-2.5 text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src={companyInfo?.logo?.url || "/logo/favi.png"}
                    alt="ZDC Tech Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src={companyInfo?.logoText?.url || "/logo/zdc.png"}
                    alt={`${companyInfo?.name || "ZDC Tech"} Global Solutions`}
                    width={130}
                    height={30}
                    className="h-6 w-auto object-contain brightness-0"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-md p-2 text-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      {item.children || item.isMegaMenu ? (
                        <>
                          <button
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground"
                            onClick={() =>
                              setOpenMobileSubmenu(
                                openMobileSubmenu === item.label
                                  ? null
                                  : item.label,
                              )
                            }
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transition-transform",
                                openMobileSubmenu === item.label &&
                                  "rotate-180",
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {openMobileSubmenu === item.label && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 space-y-1 overflow-hidden border-l border-border pl-3"
                              >
                                {item.isMegaMenu && item.megaMenuGroups
                                  ? item.megaMenuGroups.flatMap((group: any) =>
                                      group.items.map((child: any) => (
                                        <li key={child.href}>
                                          <Link
                                            href={child.href}
                                            className={cn(
                                              "block rounded-lg px-3 py-2.5 text-sm",
                                              pathname === child.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-foreground/80 hover:text-primary",
                                            )}
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      )),
                                    )
                                  : item.children?.map((child: any) => (
                                      <li key={child.href}>
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "block rounded-lg px-3 py-2.5 text-sm",
                                            pathname === child.href
                                              ? "bg-primary/10 text-primary"
                                              : "text-foreground/80 hover:text-primary",
                                          )}
                                          onClick={() => setMobileOpen(false)}
                                        >
                                          {child.label}
                                        </Link>
                                      </li>
                                    ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-3 py-3 text-base font-medium",
                            isActive(item.href)
                              ? "text-primary"
                              : "text-foreground",
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border p-4">
                <Link
                  href="/contact"
                  className="group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {companyInfo.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
