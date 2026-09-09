import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin } from "lucide-react";
import { PublicContactDetails } from "@/components/site/PublicContactDetails";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ZDC Tech Global Solutions. Let us discuss how we can help your business grow with custom technology solutions.",
  openGraph: {
    title: "Contact ZDC Tech Global Solutions",
    description:
      "Get in touch with ZDC Tech Global Solutions. Let us discuss how we can help your business grow with custom technology solutions.",
    url: "https://zdctechglobalsolutions.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Build Something Together"
        description="Whether you have a clear vision or just a rough idea, we'd love to hear about it. Drop us a message and we'll get back to you within 24 hours."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Fill out the form and our team will reach out to schedule a
                discovery call. We'll discuss your requirements, timeline and
                budget.
              </p>

              <PublicContactDetails />
            </div>

            <div className="rounded-3xl border border-white/10 bg-card/30 p-6 sm:p-10 backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-card/50 relative border-t border-white/10 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
        <div className="text-center z-20">
          <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Interactive Map Placeholder</p>
        </div>
      </section>
    </>
  );
}
