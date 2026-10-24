import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/site/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zdctechglobalsolutions.com",
  ),
  title: {
    default: "ZDC Tech Global Solutions — Best IT Company in India, Jaipur & Rajasthan",
    template: "%s | ZDC Tech Global Solutions",
  },
  description:
    "ZDC Tech Global Solutions is the best IT company in Jaipur, Rajasthan & India. We deliver top-tier website development, mobile app development, SEO, digital marketing, and custom software solutions globally.",
  keywords: [
    "Best IT Company India",
    "Best IT Company in Jaipur",
    "Best IT Company in Rajasthan",
    "Top IT Company in Jaipur",
    "Top IT Companies in Rajasthan",
    "Best Software Development Company in Jaipur",
    "Best Software Development Company in India",
    "Software Development Agency Rajasthan",
    "Website Development Company in Jaipur",
    "Best Web Development Company in India",
    "Website Development Services Rajasthan",
    "Mobile App Development Company in Jaipur",
    "Mobile App Development Company in India",
    "Best SEO Agency in Jaipur",
    "Digital Marketing Company in Jaipur",
    "IT Consulting Firm Jaipur Rajasthan",
    "Custom Software Development Jaipur",
    "IT Services Jaipur Rajasthan India",
    "Top Software Development Agency",
    "Custom CRM Software",
    "UI/UX Design Agency",
    "Global Tech Solutions",
    "ZDC Tech Global Solutions",
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
    title: "ZDC Tech Global Solutions — Best IT Company in India, Jaipur & Rajasthan",
    description:
      "Partner with the best IT company in Jaipur, Rajasthan & India. We build high-performance websites, mobile apps, custom software, and digital solutions that accelerate business growth.",
    type: "website",
    url: "https://zdctechglobalsolutions.com",
    siteName: "ZDC Tech Global Solutions",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZDC Tech Global Solutions - Best IT Company in Jaipur, Rajasthan & India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZDC Tech Global Solutions — Best IT Company in India, Jaipur & Rajasthan",
    description:
      "Partner with the best IT company in Jaipur, Rajasthan & India. We build high-performance websites, mobile apps, custom software, and digital solutions that accelerate business growth.",
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
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4333082673656274');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4333082673656274&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              name: "ZDC Tech Global Solutions",
              alternateName: "ZDC Tech",
              url: "https://zdctechglobalsolutions.com",
              logo: "https://zdctechglobalsolutions.com/logo/zdc.png",
              description:
                "Best IT Company in Jaipur, Rajasthan & India offering custom software, website development, mobile app development, SEO, and digital marketing services.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jaipur",
                addressRegion: "Rajasthan",
                addressCountry: "India",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 7073551862",
                contactType: "customer service",
                areaServed: ["IN", "Global"],
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
