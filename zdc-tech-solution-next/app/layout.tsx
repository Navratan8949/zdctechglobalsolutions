import "./globals.css";
import type { Metadata } from "next";
import { SiteChrome } from "@/components/site/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "ZDC Tech Global Solutions — Software Development & IT Solutions",
    template: "%s | ZDC Tech Global Solutions",
  },
  description:
    "ZDC Tech Global Solutions builds websites, mobile apps, custom software and digital solutions that move your business forward.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "UI/UX design",
    "cloud services",
    "IT consulting",
    "digital marketing",
  ],

  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ZDC Tech Global Solutions — Software Development & IT Solutions",
    description:
      "We build websites, mobile apps, custom software and digital solutions that move your business forward.",
    type: "website",
    url: "https://zdctechglobalsolutions.com",
    siteName: "ZDC Tech Global Solutions",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg", // Assuming we have an OG image
        width: 1200,
        height: 630,
        alt: "ZDC Tech Global Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZDC Tech Global Solutions — Software Development & IT Solutions",
    description:
      "We build websites, mobile apps, custom software and digital solutions that move your business forward.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
