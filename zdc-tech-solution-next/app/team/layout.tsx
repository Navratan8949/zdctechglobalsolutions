import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the talented engineers, designers and strategists at ZDC Tech Global Solutions who build digital solutions that move businesses forward.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
