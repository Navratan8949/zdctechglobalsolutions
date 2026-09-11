import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/site/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zdctechglobalsolutions.com",
  ),
  title: {
    default: "ZDC Tech Global Solutions — Best IT Company & Software Development Agency",
    template: "%s | ZDC Tech Global Solutions",
  },
  description:
    "ZDC Tech Global Solutions is the best IT company offering world-class website development, mobile app development, SEO, digital marketing, and custom software solutions globally.",
  keywords: [
    "Best IT Company",
    "Top Software Development Agency",
    "Website Development Services",
    "Mobile App Development Company",
    "Best SEO Agency",
    "Digital Marketing Experts",
    "Custom CRM Software",
    "UI/UX Design Agency",
    "IT Consulting Firm",
    "Global Tech Solutions",
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
    title: "ZDC Tech Global Solutions — Best IT Company & Software Development Agency",
    description:
      "Partner with the best IT company. We build high-performance websites, mobile apps, custom software, and digital solutions that accelerate business growth.",
    type: "website",
    url: "https://zdctechglobalsolutions.com",
    siteName: "ZDC Tech Global Solutions",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZDC Tech Global Solutions - Best IT Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZDC Tech Global Solutions — Best IT Company & Software Development Agency",
    description:
      "Partner with the best IT company. We build high-performance websites, mobile apps, custom software, and digital solutions that accelerate business growth.",
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
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1DQD719M6E" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1DQD719M6E');
          `}
        </Script>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
