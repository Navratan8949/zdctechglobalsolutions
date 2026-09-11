import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin } from "lucide-react";
import { PublicContactDetails } from "@/components/site/PublicContactDetails";

export const metadata: Metadata = {
  title: "Contact Us | Connect with the Best IT Company",
  description:
    "Contact ZDC Tech Global Solutions, the best IT company for custom software, web development, and digital marketing. Get a free consultation today.",
  openGraph: {
    title: "Contact ZDC Tech Global Solutions - Best IT Company",
    description:
      "Contact ZDC Tech Global Solutions, the best IT company for custom software, web development, and digital marketing. Get a free consultation today.",
    url: "https://zdctechglobalsolutions.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0b1b3d]">
        {/* Decorative Grid Background */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div> */}
        {/* <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#0ea5e9] opacity-[0.25] blur-[120px]"></div> */}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
            {/* Left Side: Content & Info */}
            <div className="pt-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0ea5e9] shadow-sm mb-6">
                Contact Us
              </div>
              <h1 className="font-display text-4xl font-bold text-white sm:text-5xl leading-tight">
                Let's Build <br className="hidden sm:block" /> Something
                Together
              </h1>
              <p className="mt-6 text-lg text-blue-100/80 leading-relaxed max-w-lg">
                Whether you have a clear vision or just a rough idea, we'd love
                to hear about it. Fill out the form and our team will reach out
                to schedule a discovery call.
              </p>

              <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <PublicContactDetails />
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="relative">
              {/* Decorative blobs behind the card */}
              <div className="absolute -inset-4 bg-[#0ea5e9]/20 rounded-[2.5rem] blur-xl opacity-50"></div>

              <div className="relative rounded-3xl border border-border bg-white p-8 sm:p-12 shadow-2xl">
                <h3 className="text-2xl font-bold text-[#0b1b3d] mb-6">
                  Send us a message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Google Map */}
      <section className="h-[500px] w-full relative">
        <iframe
          src="https://maps.google.com/maps?q=Deulgaon%20Raja,%20Buldhana,%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale-[20%] contrast-[1.1]"
        />
      </section>
    </>
  );
}
