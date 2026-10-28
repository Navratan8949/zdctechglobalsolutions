"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
  Eye,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  getCurrentSiteContent,
  updateSiteContent,
  createSiteContent,
} from "@/service/siteContent.service";
import { resolveImageUrl } from "@/lib/utils";

interface AboutState {
  image: { public_id: string; url: string };
  badgeNumber: string;
  badgeText: string;
  eyebrow: string;
  title: string;
  description1: string;
  description2: string;
  highlights: string[];
  missionTitle: string;
  missionDescription: string;
  missionIcon: string;
  visionTitle: string;
  visionDescription: string;
  visionIcon: string;
}

const defaultAboutState: AboutState = {
  image: {
    public_id: "",
    url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  },
  badgeNumber: "20+",
  badgeText: "Expert Professionals",
  eyebrow: "WHO WE ARE",
  title: "A Technology Company Built on Trust and Excellence",
  description1:
    "ZDC Tech Global Solutions was founded with a simple belief: technology should solve real problems, not create new ones. Since 2019, we have been helping businesses across industries leverage digital solutions to streamline operations, reach more customers, and grow faster.",
  description2:
    "What started as a small team of passionate engineers has grown into a full-service technology company with expertise across web, mobile, software, and cloud. We have delivered over 100 projects for more than 50 clients, from startups to enterprises.",
  highlights: [
    "Transparent communication at every step",
    "Solutions aligned with your business goals",
    "Long-term partnerships built on quality",
  ],
  missionTitle: "Our Mission",
  missionDescription:
    "To empower businesses with innovative digital solutions that drive growth, efficiency and competitive advantage. We exist to turn complex problems into elegant software that people love to use.",
  missionIcon: "Rocket",
  visionTitle: "Our Vision",
  visionDescription:
    "To be the most trusted technology partner for businesses worldwide, recognized for engineering excellence, honest partnerships and solutions that stand the test of time.",
  visionIcon: "TrendingUp",
};

export default function AdminAboutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [siteContentId, setSiteContentId] = useState<string | null>(null);
  const [rawSiteContent, setRawSiteContent] = useState<any>({});
  const [about, setAbout] = useState<AboutState>(defaultAboutState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;

    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: any = await getCurrentSiteContent();
        const data = response?.data || response;
        if (data && data._id) {
          setSiteContentId(data._id);
          setRawSiteContent(data);
          if (data.about) {
            const rawImg = data.about.image;
            const imgUrl =
              typeof rawImg === "string"
                ? rawImg
                : rawImg?.url || defaultAboutState.image.url;
            const imgPublicId =
              typeof rawImg === "object" ? rawImg?.public_id || "" : "";
            setAbout({
              image: {
                public_id: imgPublicId,
                url: imgUrl,
              },
              badgeNumber:
                data.about.badgeNumber || defaultAboutState.badgeNumber,
              badgeText:
                data.about.badgeText || defaultAboutState.badgeText,
              eyebrow: data.about.eyebrow || defaultAboutState.eyebrow,
              title: data.about.title || defaultAboutState.title,
              description1:
                data.about.description1 || defaultAboutState.description1,
              description2:
                data.about.description2 || defaultAboutState.description2,
              highlights:
                Array.isArray(data.about.highlights) &&
                data.about.highlights.length > 0
                  ? data.about.highlights
                  : defaultAboutState.highlights,
              missionTitle:
                data.about.missionTitle || defaultAboutState.missionTitle,
              missionDescription:
                data.about.missionDescription ||
                defaultAboutState.missionDescription,
              missionIcon:
                data.about.missionIcon || defaultAboutState.missionIcon,
              visionTitle:
                data.about.visionTitle || defaultAboutState.visionTitle,
              visionDescription:
                data.about.visionDescription ||
                defaultAboutState.visionDescription,
              visionIcon:
                data.about.visionIcon || defaultAboutState.visionIcon,
            });
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load site content");
      } finally {
        setIsLoading(false);
      }
    };

    void loadContent();
  }, [isAuthLoading, isAuthenticated]);

  const updateField = (field: keyof AboutState, value: any) => {
    setAbout((prev) => ({ ...prev, [field]: value }));
  };

  const updateHighlight = (index: number, value: string) => {
    setAbout((prev) => {
      const updated = [...prev.highlights];
      updated[index] = value;
      return { ...prev, highlights: updated };
    });
  };

  const addHighlight = () => {
    setAbout((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlight = (index: number) => {
    setAbout((prev) => {
      const updated = prev.highlights.filter((_, i) => i !== index);
      return {
        ...prev,
        highlights: updated.length > 0 ? updated : [""],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      const cleanedHighlights = about.highlights
        .map((h) => h.trim())
        .filter(Boolean);

      const aboutPayload = {
        ...about,
        highlights:
          cleanedHighlights.length > 0
            ? cleanedHighlights
            : defaultAboutState.highlights,
      };

      const { _id, createdAt, updatedAt, __v, ...restContent } = rawSiteContent || {};

      const payload = {
        ...restContent,
        about: aboutPayload,
      };

      let res: any;
      if (siteContentId) {
        res = await updateSiteContent(siteContentId, payload);
      } else {
        res = await createSiteContent(payload);
        if (res?.data?._id) setSiteContentId(res.data._id);
      }

      const savedData = res?.data || res;
      if (savedData) {
        setRawSiteContent(savedData);
        if (savedData._id) setSiteContentId(savedData._id);
        if (savedData.about) {
          const rawImg = savedData.about.image;
          const imgUrl =
            typeof rawImg === "string"
              ? rawImg
              : rawImg?.url || defaultAboutState.image.url;
          const imgPublicId =
            typeof rawImg === "object" ? rawImg?.public_id || "" : "";
          setAbout({
            ...defaultAboutState,
            ...savedData.about,
            image: {
              public_id: imgPublicId,
              url: imgUrl,
            },
            highlights:
              Array.isArray(savedData.about.highlights) &&
              savedData.about.highlights.length > 0
                ? savedData.about.highlights
                : defaultAboutState.highlights,
          });
        }
      }

      setFeedback("About Us section updated successfully!");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to update About Us section.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <AdminShell user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Page Management
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            About Us Settings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage the About Us page content, team photo, floating badge, key highlights, and mission/vision values.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {feedback && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {feedback}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Who We Are & Team Image */}
            <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">
                Company Introduction (&ldquo;Who We Are&rdquo;)
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                This is the primary section with the team photo and company story displayed on the About Us page.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Image Upload */}
                <div className="md:col-span-2">
                  <ImageUploadField
                    publicId={about.image.public_id}
                    url={about.image.url}
                    onChange={(publicId, url) => {
                      setAbout((prev) => ({
                        ...prev,
                        image: { public_id: publicId, url },
                      }));
                    }}
                    label="About Us Team Photo / Section Image"
                  />
                  <div className="mt-2">
                    <label className="text-xs text-muted-foreground block mb-1">
                      Or direct Image URL (e.g. from Pexels, Unsplash, or CDN)
                    </label>
                    <Input
                      type="url"
                      value={about.image.url}
                      onChange={(e) =>
                        setAbout((prev) => ({
                          ...prev,
                          image: { ...prev.image, url: e.target.value },
                        }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Floating Badge Number / Metric
                  </label>
                  <Input
                    value={about.badgeNumber}
                    onChange={(e) => updateField("badgeNumber", e.target.value)}
                    placeholder="e.g. 20+"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Floating Badge Label
                  </label>
                  <Input
                    value={about.badgeText}
                    onChange={(e) => updateField("badgeText", e.target.value)}
                    placeholder="e.g. Expert Professionals"
                    required
                  />
                </div>

                {/* Eyebrow and Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Section Eyebrow
                  </label>
                  <Input
                    value={about.eyebrow}
                    onChange={(e) => updateField("eyebrow", e.target.value)}
                    placeholder="e.g. WHO WE ARE"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Main Heading / Title
                  </label>
                  <Input
                    value={about.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="e.g. A Technology Company Built on Trust and Excellence"
                    required
                  />
                </div>

                {/* Descriptions */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Story Paragraph 1
                  </label>
                  <Textarea
                    value={about.description1}
                    onChange={(e) => updateField("description1", e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Story Paragraph 2
                  </label>
                  <Textarea
                    value={about.description2}
                    onChange={(e) => updateField("description2", e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                {/* Key Highlights / Bullet Checklist */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-white">
                        Checklist Highlights
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Points with checkmarks displayed under the story paragraphs.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addHighlight}
                      className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
                    >
                      <Plus className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      Add Highlight
                    </Button>
                  </div>

                  <div className="space-y-2.5">
                    {about.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#0ea5e9]" />
                        <Input
                          value={item}
                          onChange={(e) => updateHighlight(idx, e.target.value)}
                          placeholder={`Highlight #${idx + 1}...`}
                          className="flex-1"
                        />
                        {about.highlights.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeHighlight(idx)}
                            className="h-9 w-9 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Mission & Vision */}
            <div className="rounded-xl border border-white/10 bg-card/70 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">
                Mission &amp; Vision
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cards displayed beneath the company introduction on the About Us page.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Mission */}
                <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Our Mission Card
                  </h3>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Mission Title
                    </label>
                    <Input
                      value={about.missionTitle}
                      onChange={(e) => updateField("missionTitle", e.target.value)}
                      placeholder="e.g. Our Mission"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Mission Lucide Icon Name
                    </label>
                    <Input
                      value={about.missionIcon}
                      onChange={(e) => updateField("missionIcon", e.target.value)}
                      placeholder="e.g. Rocket"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Mission Description
                    </label>
                    <Textarea
                      value={about.missionDescription}
                      onChange={(e) =>
                        updateField("missionDescription", e.target.value)
                      }
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Vision */}
                <div className="space-y-4 rounded-lg border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Our Vision Card
                  </h3>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Vision Title
                    </label>
                    <Input
                      value={about.visionTitle}
                      onChange={(e) => updateField("visionTitle", e.target.value)}
                      placeholder="e.g. Our Vision"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Vision Lucide Icon Name
                    </label>
                    <Input
                      value={about.visionIcon}
                      onChange={(e) => updateField("visionIcon", e.target.value)}
                      placeholder="e.g. TrendingUp"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white">
                      Vision Description
                    </label>
                    <Textarea
                      value={about.visionDescription}
                      onChange={(e) =>
                        updateField("visionDescription", e.target.value)
                      }
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Snippet */}
            <div className="rounded-xl border border-white/10 bg-card/40 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <Eye className="h-4 w-4 text-primary" />
                Live Preview of Floating Badge &amp; Image
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg bg-slate-900">
                  <img
                    src={resolveImageUrl(about.image.url) || defaultAboutState.image.url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 rounded-xl bg-white p-3 shadow-lg flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg font-black text-[#0ea5e9]">
                      {about.badgeNumber || "20+"}
                    </div>
                    <p className="text-xs font-bold text-[#0b1b3d] leading-tight">
                      {about.badgeText || "Expert Professionals"}
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0ea5e9]">
                    {about.eyebrow}
                  </p>
                  <h3 className="text-lg font-bold text-white">
                    {about.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {about.description1}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-36 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save About Us
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </AdminShell>
  );
}

