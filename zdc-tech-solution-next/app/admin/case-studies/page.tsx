"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Search,
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
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudyById,
  getCaseStudyBySlug,
  getCaseStudies,
  updateCaseStudy,
} from "@/service/caseStudy.service";

interface CaseStudyImage {
  public_id: string;
  url: string;
}
interface CaseStudyResult {
  label: string;
  value: string;
}
interface CaseStudyItem {
  _id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  results: CaseStudyResult[];
  image: CaseStudyImage;
  heroHeadline: string;
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}
type CaseStudyDraft = Omit<CaseStudyItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: CaseStudyDraft = {
  slug: "",
  title: "",
  client: "",
  industry: "",
  challenge: "",
  solution: "",
  features: [],
  technologies: [],
  results: [],
  image: { public_id: "", url: "" },
  heroHeadline: "",
  status: "published",
};

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    response.data !== undefined
  )
    return response.data as T;
  return response as T;
}

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

function toDraft(item: CaseStudyItem): CaseStudyDraft {
  return {
    slug: item.slug || "",
    title: item.title || "",
    client: item.client || "",
    industry: item.industry || "",
    challenge: item.challenge || "",
    solution: item.solution || "",
    features: item.features || [],
    technologies: item.technologies || [],
    results: item.results || [],
    image: {
      public_id: item.image?.public_id || "",
      url: item.image?.url || "",
    },
    heroHeadline: item.heroHeadline || "",
    status: item.status || "published",
  };
}

function formatDate(value?: string) {
  if (!value) return "Not saved yet";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function CaseStudiesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<CaseStudyDraft>(emptyDraft);
  const [slugLookup, setSlugLookup] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    const loadCaseStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = unwrap<CaseStudyItem[]>(await getCaseStudies());
        setCaseStudies(items || []);
        if (items?.length) {
          setSelectedId(items[0]._id);
          setEditor(items[0]);
        } else {
          setSelectedId(null);
          setEditor(null);
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };
    void loadCaseStudies();
  }, [isAuthLoading, isAuthenticated]);

  if (isAuthLoading || !isAuthenticated)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2
          className="h-6 w-6 animate-spin text-primary"
          aria-label="Loading"
        />
      </div>
    );

  function setEditor(item: CaseStudyItem | null) {
    const nextDraft = item
      ? toDraft(item)
      : {
          ...emptyDraft,
          image: { ...emptyDraft.image },
          features: [],
          technologies: [],
          results: [],
        };
    setDraft(nextDraft);
  }

  const selectCaseStudy = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<CaseStudyItem>(await getCaseStudyById(id));
      setSelectedId(item._id);
      setEditor(item);
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const findBySlug = async () => {
    if (!slugLookup.trim()) return;
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<CaseStudyItem>(
        await getCaseStudyBySlug(slugLookup.trim()),
      );
      setSelectedId(item._id);
      setEditor(item);
      setFeedback("Case study loaded by slug.");
    } catch (lookupError) {
      setError(getErrorMessage(lookupError));
    }
  };

  const updateField = <K extends keyof CaseStudyDraft>(
    field: K,
    value: CaseStudyDraft[K],
  ) => {
    setDraft((current) => {
      const updates: any = { [field]: value };
      
      // Auto-generate slug when title changes
      if (field === "title") {
        const titleStr = value as string;
        const oldSlug = current.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const shouldUpdateSlug = !current.slug || current.slug === oldSlug;
        if (shouldUpdateSlug) {
          updates.slug = titleStr.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        }
      }
      
      return { ...current, ...updates };
    });
  };
  const updateImage = (field: keyof CaseStudyImage, value: string) =>
    setDraft((current) => ({
      ...current,
      image: { ...current.image, [field]: value },
    }));
  const startNew = () => {
    setSelectedId(null);
    setEditor(null);
    setError(null);
    setFeedback(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const payload: CaseStudyDraft = draft;
      const saved = unwrap<CaseStudyItem>(
        selectedId
          ? await updateCaseStudy(selectedId, payload)
          : await createCaseStudy(payload),
      );
      setCaseStudies((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setEditor(saved);
      setFeedback(
        selectedId
          ? "Case study updated successfully."
          : "Case study created successfully.",
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
      !window.confirm("Delete this case study? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteCaseStudy(selectedId);
      const remaining = caseStudies.filter((item) => item._id !== selectedId);
      setCaseStudies(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setEditor(remaining[0]);
      } else startNew();
      setFeedback("Case study deleted successfully.");
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
              Case Studies
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create and maintain the client stories published on the company
              website.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startNew}
            className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Plus className="mr-2 h-4 w-4" /> New case study
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
              aria-label="Loading case studies"
            />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Case studies
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {caseStudies.length} saved
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startNew}
                  aria-label="Create new case study"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4 flex gap-2">
                <Input
                  value={slugLookup}
                  onChange={(event) => setSlugLookup(event.target.value)}
                  placeholder="Find by slug"
                  aria-label="Find case study by slug"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => void findBySlug()}
                  aria-label="Find case study"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {caseStudies.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No case studies exist yet. Fill in the form to create the
                  first one.
                </p>
              ) : (
                <div className="space-y-2">
                  {caseStudies.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => void selectCaseStudy(item._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {item.title || "Untitled case study"}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {item.slug} · Updated{" "}
                        {formatDate(item.updatedAt || item.createdAt)}
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
                    {selectedId ? "Edit case study" : "Create case study"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All fields from the CaseStudy API are available below.
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
                <Field
                  label="Title"
                  value={draft.title}
                  onChange={(value) => updateField("title", value)}
                  required
                />
                <Field
                  label="Slug"
                  value={draft.slug}
                  onChange={(value) => updateField("slug", value)}
                  required
                />
                <Field
                  label="Client"
                  value={draft.client}
                  onChange={(value) => updateField("client", value)}
                  required
                />
                <Field
                  label="Industry"
                  value={draft.industry}
                  onChange={(value) => updateField("industry", value)}
                  required
                />
                <Field
                  label="Hero headline"
                  value={draft.heroHeadline}
                  onChange={(value) => updateField("heroHeadline", value)}
                  required
                />
                <SelectField
                  label="Status"
                  value={draft.status}
                  onChange={(value) =>
                    updateField("status", value as CaseStudyDraft["status"])
                  }
                  options={["published", "draft"]}
                />
                <TextField
                  label="Challenge"
                  value={draft.challenge}
                  onChange={(value) => updateField("challenge", value)}
                  required
                />
                <TextField
                  label="Solution"
                  value={draft.solution}
                  onChange={(value) => updateField("solution", value)}
                  required
                />
              </div>
              <div className="mt-7 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <ImageUploadField
                    publicId={draft.image.public_id}
                    url={draft.image.url}
                    onChange={(publicId, url) => { updateImage("public_id", publicId); updateImage("url", url); }}
                    label="Case Study Image"
                  />
                </div>
                <StringList
                  label="Features"
                  value={draft.features}
                  onChange={(value) => updateField("features", value)}
                />
                <StringList
                  label="Technologies"
                  value={draft.technologies}
                  onChange={(value) => updateField("technologies", value)}
                />
                <ResultList
                  value={draft.results}
                  onChange={(value) => updateField("results", value)}
                />
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
                      : "Create case study"}
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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}
function TextField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        required={required}
      />
    </div>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
function StringList({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-white">{label}</p>
      {value.map((item, index) => (
        <div key={`${label}-${index}`} className="flex items-center gap-2">
          <Input
            aria-label={`${label} item ${index + 1}`}
            value={item}
            onChange={(event) =>
              onChange(
                value.map((current, itemIndex) =>
                  itemIndex === index ? event.target.value : current,
                ),
              )
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              onChange(value.filter((_, itemIndex) => itemIndex !== index))
            }
            aria-label={`Remove ${label} item ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="mr-2 h-4 w-4" /> Add item
      </Button>
    </div>
  );
}

function ResultList({
  value,
  onChange,
}: {
  value: CaseStudyResult[];
  onChange: (value: CaseStudyResult[]) => void;
}) {
  return (
    <div className="space-y-3 md:col-span-2">
      <p className="text-sm font-semibold text-white">Results</p>
      {value.map((item, index) => (
        <div
          key={`result-${index}`}
          className="grid gap-3 rounded-lg border border-white/10 p-3 md:grid-cols-[1fr_1fr_auto]"
        >
          <Input
            aria-label={`Result ${index + 1} label`}
            placeholder="Label"
            value={item.label}
            onChange={(event) =>
              onChange(
                value.map((current, itemIndex) =>
                  itemIndex === index
                    ? { ...current, label: event.target.value }
                    : current,
                ),
              )
            }
          />
          <Input
            aria-label={`Result ${index + 1} value`}
            placeholder="Value"
            value={item.value}
            onChange={(event) =>
              onChange(
                value.map((current, itemIndex) =>
                  itemIndex === index
                    ? { ...current, value: event.target.value }
                    : current,
                ),
              )
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              onChange(value.filter((_, itemIndex) => itemIndex !== index))
            }
            aria-label={`Remove result ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { label: "", value: "" }])}
      >
        <Plus className="mr-2 h-4 w-4" /> Add row
      </Button>
    </div>
  );
}
