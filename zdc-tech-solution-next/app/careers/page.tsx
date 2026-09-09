import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { CareersContent } from "@/components/site/CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join ZDC Tech Global Solutions. Explore open positions for developers, designers and marketing professionals. Build your career with a team that values excellence.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build Your Career at ZDC Tech Global Solutions"
        description="We are a team of passionate professionals who love what we do. If you are driven by curiosity and excellence, you will feel right at home."
      />

      <CareersContent />

      <CTASection />
    </>
  );
}
