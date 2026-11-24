import type { Metadata } from "next";
import SolarPageContent from "@/components/site/SolarPageContent";

export const metadata: Metadata = {
  title:
    "Solar Panel Installation & Rooftop Solar Plant Services | PM Surya Ghar Subsidy | ZDC Tech",
  description:
    "Cut your electricity bills up to 90% with ZDC Tech Solar Solutions. Complete turnkey rooftop solar installation for homes, factories, and commercial buildings. Get up to ₹78,000 Central Govt Subsidy under PM Surya Ghar Muft Bijli Yojana with tier-1 panels, 25-year warranty & DISCOM net-metering approvals.",
  keywords: [
    "solar panel installation",
    "rooftop solar system",
    "PM Surya Ghar subsidy",
    "PM Surya Ghar Muft Bijli Yojana",
    "commercial solar plant",
    "residential solar panels",
    "net metering solar",
    "on grid solar system",
    "hybrid solar inverter",
    "ZDC Tech solar solutions",
  ],
  openGraph: {
    title: "Rooftop Solar Panel Installation & Govt Subsidy | ZDC Tech",
    description:
      "Save up to 90% on electricity bills with top-tier solar plant solutions. Free site survey, DISCOM liaisoning, up to ₹78,000 Govt subsidy.",
    type: "website",
  },
};

export default function SolarPanelInstallationPage() {
  return <SolarPageContent />;
}

