import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function CompanyDescription() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div>
              <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
                WHO WE ARE
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0b1b3d] leading-[1.15]">
                Global IT Company & <br />
                <span className="text-[#0ea5e9]">Software Development Agency</span>
              </h2>
            </div>

            <p className="text-[16px] leading-relaxed text-slate-500">
              As a trusted Global IT Company, we help businesses build a strong online presence with modern, responsive, and performance-focused solutions tailored for startups, brands, and growing enterprises worldwide.
            </p>

            <ul className="space-y-4">
              {[
                "Custom UI/UX & Website Development",
                "Scalable eCommerce & Business Portals",
                "SEO-Friendly & Conversion-Driven Design",
                "Mobile Applications & Software Systems"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] font-semibold text-[#0b1b3d]">
                  <CheckCircle2 className="h-5 w-5 text-[#0ea5e9]" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[14px] leading-relaxed text-slate-400 italic border-l-2 border-gray-100 pl-4">
              Recognized as the Best Web Design Agency in Indore, we also deliver innovative technology solutions as a leading Software Development Company.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full bg-white border border-gray-200 px-8 py-4 text-[13px] font-bold uppercase tracking-wider text-[#0b1b3d] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(14,165,233,0.1)] hover:text-[#0ea5e9]"
              >
                Learn More About Us
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 transition-colors group-hover:bg-[#0ea5e9]">
                  <ArrowRight className="h-4 w-4 text-[#0ea5e9] group-hover:text-white" strokeWidth={2.5} />
                </div>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative z-10 lg:pl-4">
            {/* Background offset shape */}
            <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl bg-blue-50 sm:-translate-x-6 sm:translate-y-6" />
            
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border-4 border-white shadow-xl">
              <Image
                src="/images/og-image.jpg"
                alt="Web Design Team"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -left-6 sm:-left-10 rounded-2xl bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl font-black text-[#0ea5e9]">
                5+
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#0b1b3d]">Years of</p>
                <p className="text-[14px] font-bold text-slate-500">Experience</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
