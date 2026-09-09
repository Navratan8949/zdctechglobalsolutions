"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAdminAuth,
  type AdminUser,
} from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";

export interface CommunicationItem {
  _id: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

interface DetailField<T extends CommunicationItem> {
  label: string;
  getValue: (item: T) => string;
  multiline?: boolean;
}

export interface AdminCommunicationConfig<T extends CommunicationItem> {
  title: string;
  description: string;
  singular: string;
  emptyMessage: string;
  statusOptions: string[];
  getAll: () => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
  update: (id: string, data: { status: string }) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getListLabel: (item: T) => string;
  getListDescription: (item: T) => string;
  detailFields: DetailField<T>[];
}

type ApiResponse<T> = { data?: T; message?: string };

function unwrap<T>(response: unknown): T {
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
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminCommunicationManager<T extends CommunicationItem>({
  config,
}: {
  config: AdminCommunicationConfig<T>;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [items, setItems] = useState<T[]>([]);
  const [selected, setSelected] = useState<T | null>(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = unwrap<T[]>(await config.getAll());
        setItems(data || []);
        if (data?.length) {
          setSelected(data[0]);
          setStatus(data[0].status);
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [config, isAuthLoading, isAuthenticated]);

  if (isAuthLoading || !isAuthenticated)
    return <LoadingPanel label="Loading admin session" />;

  const select = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<T>(await config.getById(id));
      setSelected(item);
      setStatus(item.status);
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<T>(await config.update(selected._id, { status }));
      setSelected(saved);
      setStatus(saved.status);
      setItems((current) =>
        current.map((item) => (item._id === saved._id ? saved : item)),
      );
      setFeedback(`${config.singular} updated successfully.`);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async () => {
    if (
      !selected ||
      !window.confirm(
        `Delete this ${config.singular.toLowerCase()}? This cannot be undone.`,
      )
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await config.remove(selected._id);
      const remaining = items.filter((item) => item._id !== selected._id);
      setItems(remaining);
      if (remaining.length) {
        await select(remaining[0]._id);
      } else {
        setSelected(null);
        setStatus(config.statusOptions[0] || "");
      }
      setFeedback(`${config.singular} deleted successfully.`);
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminShell user={user}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Inbox
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {config.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {config.description}
        </p>
      </div>
      {error && <Notice type="error">{error}</Notice>}
      {feedback && <Notice type="success">{feedback}</Notice>}
      {isLoading ? (
        <LoadingPanel label={`Loading ${config.title.toLowerCase()}`} />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-white">
                {config.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {items.length} received
              </p>
            </div>
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                {config.emptyMessage}
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => void select(item._id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${selected?._id === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {config.getListLabel(item)}
                      </p>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {config.getListDescription(item)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </aside>
          {selected ? (
            <form
              onSubmit={submit}
              className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
            >
              <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {config.getListLabel(selected)}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Received {formatDate(selected.createdAt)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => void remove()}
                  disabled={isSubmitting}
                  className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {config.detailFields.map((field) => (
                  <Detail
                    key={field.label}
                    label={field.label}
                    value={field.getValue(selected)}
                    multiline={field.multiline}
                  />
                ))}
              </div>
              <div className="mt-7 border-t border-white/10 pt-6">
                <label
                  className="mb-2 block text-sm font-medium text-white"
                  htmlFor={`${config.singular}-status`}
                >
                  Status
                </label>
                <select
                  id={`${config.singular}-status`}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                >
                  {config.statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
              Select an item to view its details.
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}

function Detail({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "sm:col-span-2" : ""}>
      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={`break-words text-sm text-white ${multiline ? "whitespace-pre-wrap rounded-lg border border-white/10 bg-white/[0.02] p-4 leading-6" : ""}`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
}
function Notice({
  type,
  children,
}: {
  type: "error" | "success";
  children: string;
}) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`mb-5 flex items-start gap-3 rounded-lg border p-4 text-sm ${type === "error" ? "border-red-400/25 bg-red-400/10 text-red-200" : "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"}`}
    >
      {type === "error" ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      {children}
    </div>
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
