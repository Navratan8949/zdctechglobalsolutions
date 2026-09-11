import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CTASection } from "@/components/site/CTASection";
import { type LifeAtCompanySection } from "@/data/company";
import { getLifeAtCompany } from "@/service/lifeAtCompany.service";
import { getIcon } from "@/lib/icons";
import { unwrapApiResponse } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Life at Company",
  description:
    "Discover the culture, environment and activities that make ZDC Tech Global Solutions a great place to work and grow your career.",
};

const galleryImages = [
  {
    src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Team collaboration session",
  },
  {
    src: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Team meeting and brainstorming",
  },
  {
    src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Office workspace",
  },
  {
    src: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Team working together",
  },
  {
    src: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Company event",
  },
  {
    src: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    alt: "Learning and development session",
  },
];

export default async function LifeAtCompanyPage() {
  const res = await getLifeAtCompany();
  const lifeAtCompany: LifeAtCompanySection[] = unwrapApiResponse<LifeAtCompanySection[]>(res) || [];

  return (
    <>
      <PageHero
        eyebrow="Life at Company"
        title="Where Great People Build Great Things"
        description="At ZDC Tech Global Solutions, we believe that the best work happens when people are supported, challenged and valued. Here is what life looks like inside our team."
      />

      {/* Culture Sections */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {lifeAtCompany.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.title}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-card/40 p-6 transition-all hover:border-primary/30 hover:bg-card/70"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-primary/15 to-secondary/15 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Glimpses of Life at ZDC Tech Global Solutions"
            description="A look at our workspace, events and the people who make it all happen."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[3/2] overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 text-xs font-medium text-white/80">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <CTASection
        title="Ready to Join the Team?"
        description="Explore our open positions and start your journey with ZDC Tech Global Solutions today."
        primaryLabel="View Open Positions"
        primaryHref="/careers"
        secondaryLabel="Learn About Us"
        secondaryHref="/about"
      /> */}
    </>
  );
}
