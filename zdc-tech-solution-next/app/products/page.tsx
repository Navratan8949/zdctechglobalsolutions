import type { Metadata } from "next";
import { ProductsContent } from "@/components/site/ProductsContent";
import { getProducts } from "@/service/product.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { products as fallbackProducts, type ProductItem } from "@/data/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default async function ProductsPage() {
  const raw = await getProducts().catch(() => null);
  const liveProducts = unwrapApiResponse<ProductItem[]>(raw);
  const initialProducts =
    Array.isArray(liveProducts) && liveProducts.length > 0
      ? liveProducts
      : fallbackProducts;

  return <ProductsContent initialProducts={initialProducts} />;
}
