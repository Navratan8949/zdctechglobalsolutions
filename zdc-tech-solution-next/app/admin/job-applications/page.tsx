"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteJobApplication,
  getJobApplicationById,
  getJobApplications,
  updateJobApplication,
} from "@/service/jobApplication.service";

type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";
interface ApplicationItem {
  _id: string;
  job?:
    | {
        slug?: string;
        position?: string;
        department?: string;
        location?: string;
        type?: string;
      }
    | string
    | null;
  jobSlug: string;
  position: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  linkedinUrl: string;
  coverLetter: string;
  resume: string;
  status: ApplicationStatus;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}
type ApplicationDraft = Pick<ApplicationItem, "status" | "notes">;
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

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

function formatDate(value?: string) {
  if (!value) return "Not saved yet";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function safeExternalUrl(value?: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function jobLabel(application: ApplicationItem) {
  if (application.position) return application.position;
  if (
    application.job &&
    typeof application.job === "object" &&
    application.job.position
  )
    return application.job.position;
  return application.jobSlug || "General application";
}

export default function JobApplicationsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<ApplicationItem | null>(null);
  const [draft, setDraft] = useState<ApplicationDraft>({
    status: "new",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    const loadApplications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = unwrap<ApplicationItem[]>(await getJobApplications());
        setApplications(items || []);
        if (items?.length) {
          setSelectedId(items[0]._id);
          setSelected(items[0]);
          setDraft({ status: items[0].status, notes: items[0].notes || "" });
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };
    void loadApplications();
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

  const selectApplication = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<ApplicationItem>(await getJobApplicationById(id));
      setSelectedId(item._id);
      setSelected(item);
      setDraft({ status: item.status, notes: item.notes || "" });
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedId) return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<ApplicationItem>(
        await updateJobApplication(selectedId, draft),
      );
      setSelected(saved);
      setApplications((current) =>
        current.map((item) =>
          item._id === saved._id ? { ...item, ...saved } : item,
        ),
      );
      setDraft({ status: saved.status, notes: saved.notes || "" });
      setFeedback("Application updated successfully.");
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !selectedId ||
      !window.confirm("Delete this application? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteJobApplication(selectedId);
      const remaining = applications.filter((item) => item._id !== selectedId);
      setApplications(remaining);
      if (remaining.length) await selectApplication(remaining[0]._id);
      else {
        setSelectedId(null);
        setSelected(null);
      }
      setFeedback("Application deleted successfully.");
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell user={user}>
      <div>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Inbox
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Job Applications
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review applicants, update hiring status, and keep internal notes.
          </p>
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
          <LoadingPanel />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4">
                <h2 className="text-sm font-semibold text-white">
                  Applications
                </h2>
                <p className="text-xs text-muted-foreground">
                  {applications.length} received
                </p>
              </div>
              {applications.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No job applications have been received.
                </p>
              ) : (
                <div className="space-y-2">
                  {applications.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => void selectApplication(item._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {item.name}
                        </p>
                        <span className="text-[10px] uppercase text-muted-foreground">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {jobLabel(item)} · {formatDate(item.createdAt)}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </aside>
            {selected ? (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
              >
                <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {selected.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {jobLabel(selected)} · Received{" "}
                      {formatDate(selected.createdAt)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void handleDelete()}
                    disabled={isSubmitting}
                    className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
                <section className="grid gap-5 md:grid-cols-2">
                  <Detail label="Email" value={selected.email} />
                  <Detail label="Phone" value={selected.phone} />
                  <Detail label="Position" value={jobLabel(selected)} />
                  <Detail label="Job slug" value={selected.jobSlug} />
                  <Detail
                    label="Portfolio"
                    value={selected.portfolioUrl}
                    link
                  />
                  <Detail label="LinkedIn" value={selected.linkedinUrl} link />
                </section>
                <section className="mt-7 border-t border-white/10 pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    Resume
                  </h3>
                  {safeExternalUrl(selected.resume) ? (
                    <a
                      href={safeExternalUrl(selected.resume)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      Open resume <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No safe resume link is available.
                    </p>
                  )}
                </section>
                <section className="mt-7 border-t border-white/10 pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-white">
                    Cover letter
                  </h3>
                  <p className="whitespace-pre-wrap rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-muted-foreground">
                    {selected.coverLetter || "No cover letter provided."}
                  </p>
                </section>
                <div className="mt-7 grid gap-5 border-t border-white/10 pt-6">
                  <SelectField
                    label="Status"
                    value={draft.status}
                    onChange={(value) =>
                      setDraft((current) => ({
                        ...current,
                        status: value as ApplicationStatus,
                      }))
                    }
                    options={[
                      "new",
                      "reviewing",
                      "shortlisted",
                      "rejected",
                      "hired",
                    ]}
                  />
                  <div>
                    <label
                      className="mb-2 block text-sm font-medium text-white"
                      htmlFor="application-notes"
                    >
                      Internal notes
                    </label>
                    <Textarea
                      id="application-notes"
                      value={draft.notes}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      rows={5}
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
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-white/15 bg-card/50 p-6 text-sm text-muted-foreground">
                Select an application to view its details.
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

function LoadingPanel() {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
      <Loader2
        className="h-6 w-6 animate-spin text-primary"
        aria-label="Loading applications"
      />
    </div>
  );
}
function Detail({
  label,
  value,
  link = false,
}: {
  label: string;
  value?: string;
  link?: boolean;
}) {
  const safeUrl = value ? safeExternalUrl(value) : "";
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {link && safeUrl ? (
        <a
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-sm text-primary hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="break-words text-sm text-white">
          {value || "Not provided"}
        </p>
      )}
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
