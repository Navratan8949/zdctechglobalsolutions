import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | ZDC Tech Global Solutions",
  description:
    "See what our clients have to say about working with ZDC Tech Global Solutions.",
  openGraph: {
    title: "Testimonials | ZDC Tech Global Solutions",
    description:
      "See what our clients have to say about working with ZDC Tech Global Solutions.",
    url: "https://zdctechglobalsolutions.com/testimonials",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
