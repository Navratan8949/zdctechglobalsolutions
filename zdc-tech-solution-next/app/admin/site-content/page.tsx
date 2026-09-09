"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createSiteContent,
  deleteSiteContent,
  getCurrentSiteContent,
  getSiteContentById,
  getSiteContents,
  updateSiteContent,
} from "@/service/siteContent.service";

interface SocialLinks {
  linkedin: string;
  twitter: string;
  github: string;
  instagram: string;
}

interface SiteContent {
  _id: string;
  name: string;
  tagline: string;
  email: string;
  phone: string;
  headOffice: string;
  branchOffice: string;
  hours: string;
  logo: { public_id: string; url: string };
  socials: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
}

type SiteContentDraft = Omit<SiteContent, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: SiteContentDraft = {
  name: "",
  tagline: "",
  email: "",
  phone: "",
  headOffice: "",
  branchOffice: "",
  hours: "",
  logo: { public_id: "", url: "" },
  socials: { linkedin: "", twitter: "", github: "", instagram: "" },
};

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
}

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    response.data !== undefined
  ) {
    return response.data as T;
  }
  return response as T;
}

function toDraft(content: SiteContent): SiteContentDraft {
  return {
    name: content.name || "",
    tagline: content.tagline || "",
    email: content.email || "",
    phone: content.phone || "",
    headOffice: content.headOffice || "",
    branchOffice: content.branchOffice || "",
    hours: content.hours || "",
    logo: {
      public_id: content.logo?.public_id || "",
      url: content.logo?.url || ""
    },
    socials: {
      linkedin: content.socials?.linkedin || "",
      twitter: content.socials?.twitter || "",
      github: content.socials?.github || "",
      instagram: content.socials?.instagram || "",
    },
  };
}

function formatDate(date?: string) {
  if (!date) return "Not saved yet";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function SiteContentPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<SiteContentDraft>(emptyDraft);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;

    const loadContents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = unwrap<SiteContent[]>(await getSiteContents());
        setContents(response || []);
        if (response?.length) {
          const current = unwrap<SiteContent>(await getCurrentSiteContent());
          const initial = current?._id ? current : response[0];
          setSelectedId(initial._id);
          setDraft(toDraft(initial));
        } else {
          setSelectedId(null);
          setDraft(emptyDraft);
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };

    void loadContents();
  }, [isAuthLoading, isAuthenticated]);

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2
          className="h-6 w-6 animate-spin text-primary"
          aria-label="Loading"
        />
      </div>
    );
  }

  const selectContent = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const content = unwrap<SiteContent>(await getSiteContentById(id));
      setSelectedId(content._id);
      setDraft(toDraft(content));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const updateDraft = (field: keyof SiteContentDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const updateSocial = (field: keyof SocialLinks, value: string) => {
    setDraft((current) => ({
      ...current,
      socials: { ...current.socials, [field]: value },
    }));
  };

  const updateLogo = (field: "public_id" | "url", value: string) => {
    setDraft((current) => ({
      ...current,
      logo: { ...current.logo, [field]: value },
    }));
  };

  const startNew = () => {
    setSelectedId(null);
    setDraft(emptyDraft);
    setError(null);
    setFeedback(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const response = selectedId
        ? unwrap<SiteContent>(await updateSiteContent(selectedId, draft))
        : unwrap<SiteContent>(await createSiteContent(draft));
      const saved = response;
      setContents((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setDraft(toDraft(saved));
      setFeedback(
        selectedId
          ? "Site content updated successfully."
          : "Site content created successfully.",
      );
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !selectedId ||
      !window.confirm("Delete this site content record? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteSiteContent(selectedId);
      const remaining = contents.filter((item) => item._id !== selectedId);
      setContents(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(toDraft(remaining[0]));
      } else {
        startNew();
      }
      setFeedback("Site content deleted successfully.");
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell user={user}>
      <div>
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Workspace
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Site content
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage the company details and social links displayed across the
              public website.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startNew}
            className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Plus className="mr-2 h-4 w-4" /> New record
          </Button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {feedback && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {feedback}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
            <Loader2
              className="h-6 w-6 animate-spin text-primary"
              aria-label="Loading site content"
            />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Records</h2>
                  <p className="text-xs text-muted-foreground">
                    {contents.length} saved
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startNew}
                  aria-label="Create new record"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {contents.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No site content exists yet. Fill in the form to create the
                  first record.
                </p>
              ) : (
                <div className="space-y-2">
                  {contents.map((content) => (
                    <button
                      key={content._id}
                      type="button"
                      onClick={() => void selectContent(content._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === content._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <p className="truncate text-sm font-medium text-white">
                        {content.name || "Untitled record"}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        Updated{" "}
                        {formatDate(content.updatedAt || content.createdAt)}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </aside>

            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
            >
              <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {selectedId ? "Edit record" : "Create record"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    These values are used by company pages and contact surfaces.
                  </p>
                </div>
                {selectedId && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void handleDelete()}
                    disabled={isSubmitting}
                    className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                )}
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <ImageUploadField
                    publicId={draft.logo.public_id}
                    url={draft.logo.url}
                    onChange={(publicId, url) => { updateLogo("public_id", publicId); updateLogo("url", url); }}
                    label="Company Logo"
                  />
                </div>
                <Field
                  label="Company name"
                  value={draft.name}
                  onChange={(value) => updateDraft("name", value)}
                  required
                />
                <Field
                  label="Tagline"
                  value={draft.tagline}
                  onChange={(value) => updateDraft("tagline", value)}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={draft.email}
                  onChange={(value) => updateDraft("email", value)}
                  required
                />
                <Field
                  label="Phone"
                  value={draft.phone}
                  onChange={(value) => updateDraft("phone", value)}
                />
                <Field
                  label="Head office"
                  value={draft.headOffice}
                  onChange={(value) => updateDraft("headOffice", value)}
                />
                <Field
                  label="Business hours"
                  value={draft.hours}
                  onChange={(value) => updateDraft("hours", value)}
                />
                <div className="md:col-span-2">
                  <label
                    className="mb-2 block text-sm font-medium text-white"
                    htmlFor="branchOffice"
                  >
                    Branch office
                  </label>
                  <Textarea
                    id="branchOffice"
                    value={draft.branchOffice}
                    onChange={(event) =>
                      updateDraft("branchOffice", event.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-7 border-t border-white/10 pt-6">
                <h3 className="mb-4 text-sm font-semibold text-white">
                  Social links
                </h3>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="LinkedIn"
                    value={draft.socials.linkedin}
                    onChange={(value) => updateSocial("linkedin", value)}
                  />
                  <Field
                    label="Twitter"
                    value={draft.socials.twitter}
                    onChange={(value) => updateSocial("twitter", value)}
                  />
                  <Field
                    label="GitHub"
                    value={draft.socials.github}
                    onChange={(value) => updateSocial("github", value)}
                  />
                  <Field
                    label="Instagram"
                    value={draft.socials.instagram}
                    onChange={(value) => updateSocial("instagram", value)}
                  />
                </div>
              </div>
              <div className="mt-7 flex justify-end border-t border-white/10 pt-5">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isSubmitting
                    ? "Saving..."
                    : selectedId
                      ? "Save changes"
                      : "Create record"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}
