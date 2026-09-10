"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { ContactPopup } from "@/components/site/ContactPopup";
import { FloatingContactButton } from "@/components/site/FloatingContactButton";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) return <>{children}</>;

  return (
    <SiteContentProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
      <ContactPopup />
      <FloatingContactButton />
    </SiteContentProvider>
  );
}
