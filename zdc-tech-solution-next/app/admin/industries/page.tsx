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
import { IconPicker } from "@/components/admin/IconPicker";
import {
  createIndustry,
  deleteIndustry,
  getIndustries,
  getIndustryById,
  updateIndustry,
} from "@/service/industry.service";

interface IndustryItem {
  _id: string;
  name: string;
  icon: string;
  description: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
type IndustryDraft = Omit<IndustryItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { data?: T; message?: string };
const emptyDraft: IndustryDraft = {
  name: "",
  icon: "",
  description: "",
  status: "active",
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
function toDraft(item: IndustryItem): IndustryDraft {
  return {
    name: item.name || "",
    icon: item.icon || "",
    description: item.description || "",
    status: item.status || "active",
  };
}

export default function IndustriesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [items, setItems] = useState<IndustryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<IndustryDraft>(emptyDraft);
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
        const data = unwrap<IndustryItem[]>(await getIndustries());
        setItems(data || []);
        if (data?.length) {
          setSelectedId(data[0]._id);
          setDraft(toDraft(data[0]));
        }
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [isAuthLoading, isAuthenticated]);
  if (isAuthLoading || !isAuthenticated)
    return <LoadingPanel label="Loading admin session" />;
  const select = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<IndustryItem>(await getIndustryById(id));
      setSelectedId(item._id);
      setDraft(toDraft(item));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };
  const startNew = () => {
    setSelectedId(null);
    setDraft({ ...emptyDraft });
    setError(null);
    setFeedback(null);
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<IndustryItem>(
        selectedId
          ? await updateIndustry(selectedId, draft)
          : await createIndustry(draft),
      );
      setItems((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setDraft(toDraft(saved));
      setFeedback(
        selectedId
          ? "Industry updated successfully."
          : "Industry created successfully.",
      );
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };
  const remove = async () => {
    if (
      !selectedId ||
      !window.confirm("Delete this industry? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteIndustry(selectedId);
      const remaining = items.filter((item) => item._id !== selectedId);
      setItems(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(toDraft(remaining[0]));
      } else startNew();
      setFeedback("Industry deleted successfully.");
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AdminShell user={user}>
      <Header onNew={startNew} />
      {error && <Notice type="error">{error}</Notice>}
      {feedback && <Notice type="success">{feedback}</Notice>}
      {isLoading ? (
        <LoadingPanel label="Loading industries" />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">Industries</h2>
                <p className="text-xs text-muted-foreground">
                  {items.length} saved
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={startNew}
                aria-label="Create new industry"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                No industries exist yet.
              </p>
            ) : (
              <div className="space-y-2">
                {items.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => void select(item._id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {item.name || "Unnamed industry"}
                      </p>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {item.icon || "No icon"}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </aside>
          <form
            onSubmit={submit}
            className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
          >
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedId ? "Edit industry" : "Create industry"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  All Industry model fields are available below.
                </p>
              </div>
              {selectedId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => void remove()}
                  disabled={isSubmitting}
                  className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              )}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Name"
                value={draft.name}
                onChange={(value) =>
                  setDraft((current) => ({ ...current, name: value }))
                }
                required
              />
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Icon</label>
                <IconPicker
                  value={draft.icon}
                  onChange={(value) =>
                    setDraft((current) => ({ ...current, icon: value }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-sm font-medium text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={6}
                  required
                />
              </div>
              <SelectField
                label="Status"
                value={draft.status}
                onChange={(value) =>
                  setDraft((current) => ({
                    ...current,
                    status: value as IndustryDraft["status"],
                  }))
                }
                options={["active", "inactive"]}
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
                    : "Create industry"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </AdminShell>
  );
}

function Header({ onNew }: { onNew: () => void }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Workspace
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Industries
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage the industries used to describe your expertise.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onNew}
        className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
      >
        <Plus className="mr-2 h-4 w-4" /> New industry
      </Button>
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
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
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
