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
  {
    label: "About Us",
    description: "Who We Are",
    href: "/about",
    icon: "Users",
  },
  {
    label: "Our Team",
    description: "Expert Professionals",
    href: "/team",
    icon: "Users",
  },
  {
    label: "Services",
    description: "Happy To Help You!",
    href: "/services",
    icon: "Layout",
  },
  {
    label: "Careers",
    description: "Join Our Team!",
    href: "/careers",
    icon: "Award",
  },
  {
    label: "Life At Company",
    description: "Work Culture",
    href: "/life-at-company",
    icon: "Heart",
  },
  {
    label: "Portfolio",
    description: "Our Projects",
    href: "/portfolio",
    icon: "Palette",
  },
  {
    label: "Case Studies",
    description: "Success Stories",
    href: "/case-studies",
    icon: "BookOpen",
  },
  {
    label: "Testimonials",
    description: "Client Feedback",
    href: "/testimonials",
    icon: "MessageSquare",
  },
  {
    label: "Clients",
    description: "Trusted Partners",
    href: "/clients",
    icon: "Building2",
  },
  {
    label: "Terms & Conditions",
    description: "Service Rules",
    href: "/terms-and-conditions",
    icon: "ShieldCheck",
  },
  {
    label: "Privacy Policy",
    description: "Data Protection",
    href: "/privacy-policy",
    icon: "ShieldCheck",
  },
  {
    label: "Refund Policy",
    description: "Payment Policy",
    href: "/refund-policy",
    icon: "BadgeCheck",
  },
];

const mainNav = [
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
          { label: "Digital Marketing", href: "/services/digital-marketing" },
          { label: "Social Media Marketing", href: "/services/digital-marketing" },
          { label: "Google & Meta Ads", href: "/services/digital-marketing" },
        ]
      },
      {
        title: "Web & Software",
        items: [
          { label: "Web Development", href: "/services/website-development" },
          { label: "Software Development", href: "/services/software-development" },
          { label: "E-Commerce Solutions", href: "/services/ecommerce-solutions" },
          { label: "CRM Development", href: "/services/software-development" },
        ]
      },
      {
        title: "Mobile & Cloud",
        items: [
          { label: "Mobile App Development", href: "/services/mobile-app-development" },
          { label: "iOS & Android Apps", href: "/services/mobile-app-development" },
          { label: "Cloud Services", href: "/services/cloud-services" },
          { label: "IT Consulting", href: "/services/it-consulting" },
        ]
      },
      {
        title: "Design & Support",
        items: [
          { label: "UI/UX Design", href: "/services/ui-ux-design" },
          { label: "Logo & Brand Design", href: "/services/ui-ux-design" },
          { label: "IT Support & Managed", href: "/services/it-consulting" },
          { label: "Software Testing", href: "/services/software-development" },
        ]
      }
    ]
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
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [navItems, setNavItems] = useState(mainNav);

  useEffect(() => {
    let active = true;
    const fetchServices = async () => {
      try {
        const res = await getServices();
        if (!active) return;
        const liveServices = unwrapApiResponse<Service[]>(res) || [];
        if (liveServices.length > 0) {
          const grouped = liveServices.reduce((acc, curr) => {
            const cat = curr.category || "Other Services";
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push({ label: curr.title, href: `/services/${curr.slug}` });
            return acc;
          }, {} as Record<string, { label: string; href: string }[]>);

          const megaMenuGroups = Object.keys(grouped).map((title) => ({
            title,
            items: grouped[title],
          }));

          setNavItems((current) =>
            current.map((item) => {
              if (item.label === "Services") {
                return { ...item, megaMenuGroups };
              }
              return item;
            }),
          );
        }
      } catch (err) {
        // Silently fail and keep default mainNav
      }
    };
    void fetchServices();
    return () => {
      active = false;
    };
  }, []);

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
          "fixed inset-x-0 top-0 z-[60] flex flex-col transition-all duration-500",
          scrolled ? "pt-4 px-4 sm:px-6 lg:px-8" : "pt-0 px-0"
        )}
      >
        <div 
          className={cn(
            "w-full transition-all duration-300 origin-top overflow-hidden hidden lg:block", 
            scrolled ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100"
          )}
        >
          <TopBar />
        </div>
        <nav 
          className={cn(
            "mx-auto flex w-full max-w-7xl items-center justify-between transition-all duration-500",
            scrolled 
              ? "h-16 rounded-full border border-white/10 bg-white/[0.04] px-5 sm:px-8 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
              : "h-20 lg:h-24 border-b border-white/5 bg-[#030917]/50 backdrop-blur-lg px-4 sm:px-6 lg:px-8"
          )}
        >
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={companyInfo?.logo?.url || "/logo/favi.png"}
              alt={`${companyInfo?.name || "ZDC Tech"} Logo`}
              width={40}
              height={40}
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <Image
              src="/logo/zdc.png"
              alt="ZDC Tech Global Solutions"
              width={180}
              height={46}
              className="h-9 w-auto object-contain hidden sm:block"
            />
          </Link>

          <ul className="hidden items-center gap-1.5 lg:flex">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  (item.children || item.isMegaMenu) && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {(item.children || item.isMegaMenu) ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                      isActive(item.href) || openDropdown === item.label
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
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
                      "rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-white/10 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                {(item.children || item.isMegaMenu) && openDropdown === item.label && (
                  <div
                    className={cn(
                      "absolute top-full pt-4",
                      item.label === "Company"
                        ? "left-1/2 -translate-x-1/2 w-[800px]"
                        : item.isMegaMenu
                        ? "left-1/2 -translate-x-1/2 w-[900px]"
                        : "left-1/2 -translate-x-1/2 w-64",
                    )}
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#060D1E]/95 p-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                      {item.label === "Company" && item.children ? (
                        <div className="flex gap-6">
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            {item.children.map((child: any) => {
                              const Icon = child.icon
                                ? getIcon(child.icon)
                                : null;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    "group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/5",
                                    pathname === child.href
                                      ? "bg-blue-500/10"
                                      : "",
                                  )}
                                >
                                  {Icon && (
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                  )}
                                  <div>
                                    <div
                                      className={cn(
                                        "text-sm font-semibold transition-colors group-hover:text-white",
                                        pathname === child.href
                                          ? "text-blue-400"
                                          : "text-slate-200",
                                      )}
                                    >
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <p className="mt-1 text-[11px] text-slate-500 transition-colors group-hover:text-slate-400">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Google Ads Space Placeholder */}
                          <div className="relative w-[240px] shrink-0 overflow-hidden rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-fuchsia-500/10 p-5 flex flex-col items-center justify-center text-center">
                            <div className="absolute inset-0 bg-white/[0.02]" />
                            <span className="relative z-10 rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-4">
                              Sponsored
                            </span>
                            <div className="relative z-10 font-bold text-white text-lg leading-tight">
                              Scale Your Vision
                            </div>
                            <p className="relative z-10 mt-3 text-xs text-blue-200/70">
                              Partner with ZDC Tech to build your next big thing.
                            </p>
                          </div>
                        </div>
                      ) : item.isMegaMenu && item.megaMenuGroups ? (
                        <div className="grid grid-cols-4 gap-8">
                          {item.megaMenuGroups.map((group: any) => (
                            <div key={group.title}>
                              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3">
                                {group.title}
                              </h4>
                              <ul className="space-y-1">
                                {group.items.map((child: any) => (
                                  <li key={child.label}>
                                    <Link
                                      href={child.href}
                                      className={cn(
                                        "block rounded-lg px-3 py-2 text-[13px] transition-colors",
                                        pathname === child.href
                                          ? "bg-blue-500/10 text-blue-400 font-medium"
                                          : "text-slate-400 hover:bg-white/5 hover:text-white",
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : item.children ? (
                        item.children.map((child: any) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-[13px] transition-colors",
                              pathname === child.href
                                ? "bg-blue-500/10 text-blue-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-white",
                            )}
                          >
                            {child.label}
                          </Link>
                        ))
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
              className="group relative inline-flex h-[42px] items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-6 text-[13px] font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              <span className="relative z-10">Start Project</span>
              <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <button
            className="rounded-full bg-white/5 p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
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
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
                <Link
                  href="/"
                  className="flex items-center gap-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/logo/favi.png"
                    alt="ZDC Tech Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                  <Image
                    src="/logo/zdc.png"
                    alt="ZDC Tech Global Solutions"
                    width={130}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-md p-2 text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      {(item.children || item.isMegaMenu) ? (
                        <>
                          <button
                            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white"
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
                                className="ml-4 space-y-1 overflow-hidden border-l border-white/10 pl-3"
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
                                                : "text-white/80 hover:text-primary",
                                            )}
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      ))
                                    )
                                  : item.children?.map((child: any) => (
                                      <li key={child.href}>
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "block rounded-lg px-3 py-2.5 text-sm",
                                            pathname === child.href
                                              ? "bg-primary/10 text-primary"
                                              : "text-white/80 hover:text-primary",
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
                            isActive(item.href) ? "text-primary" : "text-white",
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

              <div className="border-t border-white/10 p-4">
                <Link
                  href="/contact"
                  className="group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
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
