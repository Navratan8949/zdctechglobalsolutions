"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { getCurrentSiteContent } from "@/service/siteContent.service";
import { unwrapApiResponse } from "@/lib/public-api";
import { resolveImageUrl } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

const fallbackImageUrl =
  "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";

export function AboutCompanySection({ initialAbout }: { initialAbout?: any }) {
  const siteContent = useSiteContent();
  const [liveAbout, setLiveAbout] = useState<any>(initialAbout || null);
  const [imageError, setImageError] = useState(false);

  // Sync if initialAbout updates from SSR or parent
  useEffect(() => {
    if (initialAbout) {
      setLiveAbout(initialAbout);
    }
  }, [initialAbout]);

  // Sync if global siteContent context loads updated about data
  useEffect(() => {
    if (siteContent?.about?.image?.url) {
      setLiveAbout(siteContent.about);
    }
  }, [siteContent?.about]);

  // Always fetch fresh content on client mount to ensure latest admin edits appear immediately
  useEffect(() => {
    let active = true;
    getCurrentSiteContent()
      .then((res: any) => {
        if (!active) return;
        const data = unwrapApiResponse<any>(res);
        if (data?.about) {
          setLiveAbout(data.about);
        }
      })
      .catch(() => {
        // Silently preserve initialAbout on network error
      });
    return () => {
      active = false;
    };
  }, []);

  // Priority: live fetched/state -> initialAbout prop -> context -> fallback object
  const about = liveAbout || initialAbout || siteContent?.about || {};

  const rawUrl =
    typeof about?.image === "string"
      ? about.image
      : about?.image?.url || about?.image?.secure_url || "";

  // Reset image error whenever URL changes
  useEffect(() => {
    setImageError(false);
  }, [rawUrl]);

  const resolvedUrl = rawUrl ? resolveImageUrl(rawUrl) : "";
  const displayImage = !imageError && resolvedUrl ? resolvedUrl : fallbackImageUrl;

  const badgeNumber = about?.badgeNumber || "20+";
  const badgeText = about?.badgeText || "Expert Professionals";
  const eyebrow = about?.eyebrow || "WHO WE ARE";
  const title = about?.title || "A Technology Company Built on Trust and Excellence";
  const description1 =
    about?.description1 ||
    "ZDC Tech Global Solutions was founded with a simple belief: technology should solve real problems, not create new ones. Since 2019, we have been helping businesses across industries leverage digital solutions to streamline operations, reach more customers, and grow faster.";
  const description2 =
    about?.description2 ||
    "What started as a small team of passionate engineers has grown into a full-service technology company with expertise across web, mobile, software, and cloud. We have delivered over 100 projects for more than 50 clients, from startups to enterprises.";
  const highlights =
    Array.isArray(about?.highlights) && about.highlights.length > 0
      ? about.highlights
      : [
          "Transparent communication at every step",
          "Solutions aligned with your business goals",
          "Long-term partnerships built on quality",
        ];

  const missionTitle = about?.missionTitle || "Our Mission";
  const missionDescription =
    about?.missionDescription ||
    "To empower businesses with innovative digital solutions that drive growth, efficiency and competitive advantage. We exist to turn complex problems into elegant software that people love to use.";
  const MissionIcon = getIcon(about?.missionIcon || "Rocket");

  const visionTitle = about?.visionTitle || "Our Vision";
  const visionDescription =
    about?.visionDescription ||
    "To be the most trusted technology partner for businesses worldwide, recognized for engineering excellence, honest partnerships and solutions that stand the test of time.";
  const VisionIcon = getIcon(about?.visionIcon || "TrendingUp");

  return (
    <>
      {/* Company Introduction */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative lg:pr-8">
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-xl bg-slate-100 aspect-[4/3]">
                <img
                  key={displayImage}
                  src={displayImage}
                  alt={title}
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover transition-all duration-300"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 sm:right-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl font-black text-[#0ea5e9]">
                  {badgeNumber}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0b1b3d] leading-tight">
                    {badgeText.includes(" ") ? (
                      <>
                        {badgeText.split(" ")[0]}
                        <br />
                        {badgeText.split(" ").slice(1).join(" ")}
                      </>
                    ) : (
                      badgeText
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-black uppercase tracking-widest text-[#0ea5e9] mb-3">
                {eyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0b1b3d] leading-tight mb-6">
                {title}
              </h2>
              <div className="space-y-4 text-[16px] leading-relaxed text-slate-500">
                <p>{description1}</p>
                <p>{description2}</p>
                <ul className="space-y-3 pt-4">
                  {highlights.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[15px] font-semibold text-[#0b1b3d]"
                    >
                      <CheckCircle2
                        className="h-5 w-5 text-[#0ea5e9]"
                        strokeWidth={2.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <MissionIcon className="h-7 w-7 text-[#0ea5e9]" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0b1b3d]">
                {missionTitle}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
                {missionDescription}
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                <VisionIcon className="h-7 w-7 text-[#0ea5e9]" strokeWidth={2.5} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[#0b1b3d]">
                {visionTitle}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
                {visionDescription}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
