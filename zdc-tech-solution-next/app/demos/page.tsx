import type { Metadata } from "next";
import { DemosContent } from "@/components/site/DemosContent";
import { getDemos } from "@/service/demo.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { fallbackDemos, type DemoItem } from "@/data/demos";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Live Demos & Interactive Prototypes | ZDC Tech Global Solutions",
  description:
    "Test live enterprise applications, cloud ERPs, e-commerce marketplaces, hospital portals, and HR systems crafted by ZDC Tech. Explore with instant demo credentials.",
  alternates: {
    canonical: "/demos",
  },
  openGraph: {
    title: "Live Demos & Interactive Prototypes | ZDC Tech Global Solutions",
    description:
      "Test live enterprise applications, cloud ERPs, e-commerce marketplaces, hospital portals, and HR systems crafted by ZDC Tech. Explore with instant demo credentials.",
    url: "https://zdctechglobalsolutions.com/demos",
  },
};

export default async function DemosPage() {
  const raw = await getDemos().catch(() => null);
  const liveDemos = unwrapApiResponse<DemoItem[]>(raw);
  const initialDemos =
    Array.isArray(liveDemos) && liveDemos.length > 0
      ? liveDemos
      : fallbackDemos;

  return <DemosContent initialDemos={initialDemos} />;
}

