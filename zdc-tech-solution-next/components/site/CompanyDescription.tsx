import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CompanyDescription() {
  return (
    <section className="py-20 lg:py-28 border-y border-white/5 relative overflow-hidden">
      <div className="absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight">
              Web Design & Development <br />
              <span className="text-primary">Service in Indore</span>
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                As a trusted{" "}
                <strong>Website Development Company in Indore</strong>, we help
                businesses build a strong online presence with modern,
                responsive, and performance-focused website solutions tailored
                for startups, brands, and growing companies globally.
              </p>
              <p>
                Our team specializes in custom website development, UI/UX
                design, eCommerce websites, business portals, and SEO-friendly
                web solutions designed to improve user experience, online
                visibility, and lead generation.
              </p>
              <p>
                Recognized as the{" "}
                <strong>Best Web Design Agency in Indore</strong>, our focus is
                on creating fast, scalable, and conversion-driven websites that
                support long-term business growth. From custom software systems
                to mobile applications, we also deliver innovative technology
                solutions as a trusted
                <strong> Software Development Company</strong> for businesses
                across multiple industries.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
              <Image
                src="/images/og-image.jpg"
                alt="Web Design Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B101F]/80 to-transparent mix-blend-multiply" />
            </div>
            {/* Decorative Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
