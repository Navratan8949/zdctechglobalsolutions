import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { homeFaqs } from "@/data/company";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to frequently asked questions about ZDC Tech Global Solutions services and process.",
};

export default function FAQsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services, process and technology expertise."
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Need To Know"
            title="Answers for Your Next Step"
            description="If you cannot find what you are looking for, contact our team and we will be happy to help."
          />
          <div className="mt-12">
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
