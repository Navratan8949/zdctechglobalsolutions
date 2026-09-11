"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
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
import { IconPicker } from "@/components/admin/IconPicker";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createService,
  deleteService,
  getServiceById,
  getServiceBySlug,
  getServices,
  updateService,
} from "@/service/service.service";

interface ServiceItem {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image?: { public_id: string; url: string };
  category: string;
  heroHeadline: string;
  heroSubheadline: string;
  introduction: string;
  whatWeOffer: Array<{ title: string; description: string }>;
  keyFeatures: string[];
  technologies: string[];
  benefits: Array<{ title: string; description: string }>;
  whyChooseUs: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}

type ServiceDraft = Omit<ServiceItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: ServiceDraft = {
  slug: "",
  title: "",
  shortDescription: "",
  icon: "",
  category: "",
  heroHeadline: "",
  heroSubheadline: "",
  introduction: "",
  whatWeOffer: [],
  keyFeatures: [],
  technologies: [],
  benefits: [],
  whyChooseUs: [],
  faqs: [],
  relatedSlugs: [],
  status: "published",
};

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

function toDraft(service: ServiceItem): ServiceDraft {
  return {
    slug: service.slug || "",
    title: service.title || "",
    shortDescription: service.shortDescription || "",
    icon: service.icon || "",
    image: service.image,
    category: service.category || "",
    heroHeadline: service.heroHeadline || "",
    heroSubheadline: service.heroSubheadline || "",
    introduction: service.introduction || "",
    whatWeOffer: service.whatWeOffer || [],
    keyFeatures: service.keyFeatures || [],
    technologies: service.technologies || [],
    benefits: service.benefits || [],
    whyChooseUs: service.whyChooseUs || [],
    faqs: service.faqs || [],
    relatedSlugs: service.relatedSlugs || [],
    status: service.status || "published",
  };
}

function formatDate(date?: string) {
  if (!date) return "Not saved yet";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function ServicesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ServiceDraft>(emptyDraft);
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
    const loadServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = unwrap<ServiceItem[]>(await getServices());
        setServices(items || []);
        if (items?.length) {
          const first = items[0];
          setSelectedId(first._id);
          setDraft(toDraft(first));
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
    void loadServices();
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

  const selectService = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const service = unwrap<ServiceItem>(await getServiceById(id));
      setSelectedId(service._id);
      setDraft(toDraft(service));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const findBySlug = async () => {
    if (!slugLookup.trim()) return;
    setError(null);
    setFeedback(null);
    try {
      const service = unwrap<ServiceItem>(
        await getServiceBySlug(slugLookup.trim()),
      );
      setSelectedId(service._id);
      setDraft(toDraft(service));
      setFeedback("Service loaded by slug.");
    } catch (lookupError) {
      setError(getErrorMessage(lookupError));
    }
  };

  const updateField = <K extends keyof ServiceDraft>(
    field: K,
    value: ServiceDraft[K],
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

  const startNew = () => {
    setSelectedId(null);
    setDraft({
      ...emptyDraft,
      whatWeOffer: [],
      keyFeatures: [],
      technologies: [],
      benefits: [],
      whyChooseUs: [],
      faqs: [],
      relatedSlugs: [],
    });
    setError(null);
    setFeedback(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<ServiceItem>(
        selectedId
          ? await updateService(selectedId, draft)
          : await createService(draft),
      );
      setServices((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setDraft(toDraft(saved));
      setFeedback(
        selectedId
          ? "Service updated successfully."
          : "Service created successfully.",
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
      !window.confirm("Delete this service? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteService(selectedId);
      const remaining = services.filter((item) => item._id !== selectedId);
      setServices(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(toDraft(remaining[0]));
      } else {
        startNew();
      }
      setFeedback("Service deleted successfully.");
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
              Services
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create and maintain the services published on the company website.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startNew}
            className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Plus className="mr-2 h-4 w-4" /> New service
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
              aria-label="Loading services"
            />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Services</h2>
                  <p className="text-xs text-muted-foreground">
                    {services.length} saved
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startNew}
                  aria-label="Create new service"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4 flex gap-2">
                <Input
                  value={slugLookup}
                  onChange={(event) => setSlugLookup(event.target.value)}
                  placeholder="Find by slug"
                  aria-label="Find service by slug"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => void findBySlug()}
                  aria-label="Find service"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {services.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No services exist yet. Fill in the form to create the first
                  one.
                </p>
              ) : (
                <div className="space-y-2">
                  {services.map((service) => (
                    <button
                      key={service._id}
                      type="button"
                      onClick={() => void selectService(service._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === service._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {service.title || "Untitled service"}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {service.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {service.slug} · Updated{" "}
                        {formatDate(service.updatedAt || service.createdAt)}
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
                    {selectedId ? "Edit service" : "Create service"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All required fields from the service API are available
                    below.
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
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white">Short description</label>
                  <RichTextEditor
                    value={draft.shortDescription}
                    onChange={(value) => updateField("shortDescription", value)}
                    placeholder="Brief description of the service..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Icon</label>
                  <IconPicker
                    value={draft.icon}
                    onChange={(value) => updateField("icon", value)}
                  />
                </div>
                <div>
                  <ImageUploadField
                    label="Service Image"
                    publicId={draft.image?.public_id || ""}
                    url={draft.image?.url || ""}
                    onChange={(public_id, url) => {
                      if (!url) updateField("image", undefined);
                      else updateField("image", { public_id, url });
                    }}
                  />
                </div>
                <Field
                  label="Category"
                  value={draft.category}
                  onChange={(value) => updateField("category", value)}
                  required
                />
                <SelectField
                  label="Status"
                  value={draft.status}
                  onChange={(value) =>
                    updateField("status", value as ServiceDraft["status"])
                  }
                  options={["published", "draft"]}
                />
                <Field
                  label="Hero headline"
                  value={draft.heroHeadline}
                  onChange={(value) => updateField("heroHeadline", value)}
                  required
                />
                <Field
                  label="Hero subheadline"
                  value={draft.heroSubheadline}
                  onChange={(value) => updateField("heroSubheadline", value)}
                  required
                />
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white">Introduction</label>
                  <RichTextEditor
                    value={draft.introduction}
                    onChange={(value) => updateField("introduction", value)}
                    placeholder="Full introduction details..."
                  />
                </div>
              </div>
              <div className="mt-7 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <PairList
                  label="What we offer"
                  firstLabel="Title"
                  secondLabel="Description"
                  value={draft.whatWeOffer}
                  onChange={(value) => updateField("whatWeOffer", value)}
                />
                <PairList
                  label="Benefits"
                  firstLabel="Title"
                  secondLabel="Description"
                  value={draft.benefits}
                  onChange={(value) => updateField("benefits", value)}
                />
                <PairList
                  label="FAQs"
                  firstLabel="Question"
                  secondLabel="Answer"
                  value={draft.faqs.map(({ question, answer }) => ({
                    title: question,
                    description: answer,
                  }))}
                  onChange={(value) =>
                    updateField(
                      "faqs",
                      value.map(({ title, description }) => ({
                        question: title,
                        answer: description,
                      })),
                    )
                  }
                />
                <StringList
                  label="Key features"
                  value={draft.keyFeatures}
                  onChange={(value) => updateField("keyFeatures", value)}
                />
                <StringList
                  label="Technologies"
                  value={draft.technologies}
                  onChange={(value) => updateField("technologies", value)}
                />
                <StringList
                  label="Why choose us"
                  value={draft.whyChooseUs}
                  onChange={(value) => updateField("whyChooseUs", value)}
                />
                <StringList
                  label="Related slugs"
                  value={draft.relatedSlugs}
                  onChange={(value) => updateField("relatedSlugs", value)}
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
                      : "Create service"}
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
  const id = label.toLowerCase().replaceAll(" ", "-");
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
  const id = label.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
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
  const id = label.toLowerCase().replaceAll(" ", "-");
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

function PairList({
  label,
  firstLabel,
  secondLabel,
  value,
  onChange,
}: {
  label: string;
  firstLabel: string;
  secondLabel: string;
  value: Array<{ title: string; description: string }>;
  onChange: (value: Array<{ title: string; description: string }>) => void;
}) {
  return (
    <div className="space-y-3 md:col-span-2">
      <p className="text-sm font-semibold text-white">{label}</p>
      {value.map((item, index) => (
        <div
          key={`${label}-${index}`}
          className="grid gap-3 rounded-lg border border-white/10 p-3 md:grid-cols-[1fr_1.5fr_auto]"
        >
          <Input
            aria-label={`${label} ${index + 1} ${firstLabel}`}
            placeholder={firstLabel}
            value={item.title}
            onChange={(event) =>
              onChange(
                value.map((current, itemIndex) =>
                  itemIndex === index
                    ? { ...current, title: event.target.value }
                    : current,
                ),
              )
            }
          />
          <Textarea
            aria-label={`${label} ${index + 1} ${secondLabel}`}
            placeholder={secondLabel}
            value={item.description}
            onChange={(event) =>
              onChange(
                value.map((current, itemIndex) =>
                  itemIndex === index
                    ? { ...current, description: event.target.value }
                    : current,
                ),
              )
            }
            rows={2}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() =>
              onChange(value.filter((_, itemIndex) => itemIndex !== index))
            }
            aria-label={`Remove ${label} row ${index + 1}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { title: "", description: "" }])}
      >
        <Plus className="mr-2 h-4 w-4" /> Add row
      </Button>
    </div>
  );
}
