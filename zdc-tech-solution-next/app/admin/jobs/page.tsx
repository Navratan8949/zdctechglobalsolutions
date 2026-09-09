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
import {
  createJob,
  deleteJob,
  getJobById,
  getJobBySlug,
  getJobs,
  updateJob,
} from "@/service/job.service";

interface JobItem {
  _id: string;
  slug: string;
  position: string;
  experience: string;
  location: string;
  type: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  status: "open" | "closed";
  createdAt?: string;
  updatedAt?: string;
}

type JobDraft = Omit<JobItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: JobDraft = {
  slug: "",
  position: "",
  experience: "",
  location: "",
  type: "",
  department: "",
  description: "",
  responsibilities: [],
  requirements: [],
  status: "open",
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

function toDraft(job: JobItem): JobDraft {
  return {
    slug: job.slug || "",
    position: job.position || "",
    experience: job.experience || "",
    location: job.location || "",
    type: job.type || "",
    department: job.department || "",
    description: job.description || "",
    responsibilities: job.responsibilities || [],
    requirements: job.requirements || [],
    status: job.status || "open",
  };
}

function formatDate(value?: string) {
  if (!value) return "Not saved yet";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function JobsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<JobDraft>(emptyDraft);
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
    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = unwrap<JobItem[]>(await getJobs());
        setJobs(items || []);
        if (items?.length) {
          setSelectedId(items[0]._id);
          setDraft(toDraft(items[0]));
        } else {
          setSelectedId(null);
          setDraft({ ...emptyDraft });
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };
    void loadJobs();
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

  const selectJob = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const job = unwrap<JobItem>(await getJobById(id));
      setSelectedId(job._id);
      setDraft(toDraft(job));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const findBySlug = async () => {
    if (!slugLookup.trim()) return;
    setError(null);
    setFeedback(null);
    try {
      const job = unwrap<JobItem>(await getJobBySlug(slugLookup.trim()));
      setSelectedId(job._id);
      setDraft(toDraft(job));
      setFeedback("Job loaded by slug.");
    } catch (lookupError) {
      setError(getErrorMessage(lookupError));
    }
  };

  const updateField = <K extends keyof JobDraft>(
    field: K,
    value: JobDraft[K],
  ) => setDraft((current) => ({ ...current, [field]: value }));
  const startNew = () => {
    setSelectedId(null);
    setDraft({ ...emptyDraft, responsibilities: [], requirements: [] });
    setError(null);
    setFeedback(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<JobItem>(
        selectedId
          ? await updateJob(selectedId, draft)
          : await createJob(draft),
      );
      setJobs((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setDraft(toDraft(saved));
      setFeedback(
        selectedId ? "Job updated successfully." : "Job created successfully.",
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
      !window.confirm("Delete this job? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteJob(selectedId);
      const remaining = jobs.filter((item) => item._id !== selectedId);
      setJobs(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(toDraft(remaining[0]));
      } else startNew();
      setFeedback("Job deleted successfully.");
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
              Jobs
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create and maintain the roles shown on the careers page.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startNew}
            className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Plus className="mr-2 h-4 w-4" /> New job
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
          <LoadingPanel label="Loading jobs" />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Jobs</h2>
                  <p className="text-xs text-muted-foreground">
                    {jobs.length} saved
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startNew}
                  aria-label="Create new job"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4 flex gap-2">
                <Input
                  value={slugLookup}
                  onChange={(event) => setSlugLookup(event.target.value)}
                  placeholder="Find by slug"
                  aria-label="Find job by slug"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => void findBySlug()}
                  aria-label="Find job"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {jobs.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No jobs exist yet. Fill in the form to create the first one.
                </p>
              ) : (
                <div className="space-y-2">
                  {jobs.map((job) => (
                    <button
                      key={job._id}
                      type="button"
                      onClick={() => void selectJob(job._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === job._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {job.position || "Untitled job"}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {job.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {job.slug} · Updated{" "}
                        {formatDate(job.updatedAt || job.createdAt)}
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
                    {selectedId ? "Edit job" : "Create job"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All fields from the Job model are available below.
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
                  label="Position"
                  value={draft.position}
                  onChange={(value) => updateField("position", value)}
                  required
                />
                <Field
                  label="Slug"
                  value={draft.slug}
                  onChange={(value) => updateField("slug", value)}
                  required
                />
                <Field
                  label="Experience"
                  value={draft.experience}
                  onChange={(value) => updateField("experience", value)}
                  required
                />
                <Field
                  label="Location"
                  value={draft.location}
                  onChange={(value) => updateField("location", value)}
                  required
                />
                <Field
                  label="Type"
                  value={draft.type}
                  onChange={(value) => updateField("type", value)}
                  required
                />
                <Field
                  label="Department"
                  value={draft.department}
                  onChange={(value) => updateField("department", value)}
                  required
                />
                <SelectField
                  label="Status"
                  value={draft.status}
                  onChange={(value) =>
                    updateField("status", value as JobDraft["status"])
                  }
                  options={["open", "closed"]}
                />
                <TextField
                  label="Description"
                  value={draft.description}
                  onChange={(value) => updateField("description", value)}
                  required
                />
                <ArrayField
                  label="Responsibilities"
                  value={draft.responsibilities}
                  onChange={(value) => updateField("responsibilities", value)}
                  required
                />
                <ArrayField
                  label="Requirements"
                  value={draft.requirements}
                  onChange={(value) => updateField("requirements", value)}
                  required
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
                      : "Create job"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function LoadingPanel({ label }: { label: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
      <Loader2
        className="h-6 w-6 animate-spin text-primary"
        aria-label={label}
      />
    </div>
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
function ArrayField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {label}{" "}
        <span className="text-xs font-normal text-muted-foreground">
          (one item per line)
        </span>
      </label>
      <Textarea
        id={id}
        value={value.join("\n")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
        rows={6}
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
