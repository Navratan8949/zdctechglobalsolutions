import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | ZDC Tech Global Solutions",
  description:
    "Thoughts, trends, and practical advice from our team of technology experts at ZDC Tech Global Solutions.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Insights | ZDC Tech Global Solutions",
    description:
      "Thoughts, trends, and practical advice from our team of technology experts at ZDC Tech Global Solutions.",
    url: "https://zdctechglobalsolutions.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
