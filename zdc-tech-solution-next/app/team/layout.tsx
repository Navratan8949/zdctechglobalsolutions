import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | ZDC Tech Global Solutions",
  description:
    "Meet the talented engineers, designers and strategists at ZDC Tech Global Solutions who build digital solutions that move businesses forward.",
  alternates: {
    canonical: "/team",
  },
  openGraph: {
    title: "Our Team | ZDC Tech Global Solutions",
    description:
      "Meet the talented engineers, designers and strategists at ZDC Tech Global Solutions who build digital solutions that move businesses forward.",
    url: "https://zdctechglobalsolutions.com/team",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
