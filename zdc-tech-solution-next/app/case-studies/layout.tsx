import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Client Success Stories | ZDC Tech Global Solutions",
  description:
    "Explore case studies from ZDC Tech Global Solutions. See how our web, mobile, and custom software engineering drives business impact.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies & Client Success Stories | ZDC Tech Global Solutions",
    description:
      "Explore case studies from ZDC Tech Global Solutions. See how our web, mobile, and custom software engineering drives business impact.",
    url: "https://zdctechglobalsolutions.com/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
