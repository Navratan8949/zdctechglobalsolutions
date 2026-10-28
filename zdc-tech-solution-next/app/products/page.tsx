import type { Metadata } from "next";
import { ProductsContent } from "@/components/site/ProductsContent";

export const metadata: Metadata = {
  title: "Our Products | Enterprise Software & Turnkey Platforms | ZDC Tech",
  description:
    "Explore enterprise-grade digital products crafted by ZDC Tech Global Solutions, including Cloud ERP, HRMS & Payroll, Omni-Channel E-Commerce, Intelligent CRM, and AI BI Platforms.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Our Products | Enterprise Software & Turnkey Platforms | ZDC Tech",
    description:
      "Explore enterprise-grade digital products crafted by ZDC Tech Global Solutions, including Cloud ERP, HRMS & Payroll, Omni-Channel E-Commerce, Intelligent CRM, and AI BI Platforms.",
    url: "https://zdctechglobalsolutions.com/products",
  },
};

export default function ProductsPage() {
  return <ProductsContent />;
}

