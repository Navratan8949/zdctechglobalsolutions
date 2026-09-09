"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useAdminAuth,
  type AdminUser,
} from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconPicker } from "@/components/admin/IconPicker";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export type ResourceStatus = "active" | "inactive";

export interface AdminResourceItem {
  _id: string;
  [key: string]: unknown;
}

type FieldType = "text" | "textarea" | "select" | "number" | "array" | "icon" | "image" | "richtext";

export interface ResourceField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface AdminResourceConfig<T extends AdminResourceItem> {
  title: string;
  description: string;
  singular: string;
  fields: ResourceField[];
  emptyDraft: Record<string, unknown>;
  getAll: () => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
  create: (draft: Record<string, unknown>) => Promise<unknown>;
  update: (id: string, draft: Record<string, unknown>) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  toDraft: (item: T) => Record<string, unknown>;
  getListLabel: (item: T) => string;
  getListDescription?: (item: T) => string;
}

type ApiResponse<T> = { data?: T; message?: string };

function unwrap<T>(response: unknown): T {
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

function getNestedValue(draft: Record<string, unknown>, key: string) {
  return key.split(".").reduce<unknown>((value, part) => {
    return value && typeof value === "object"
      ? (value as Record<string, unknown>)[part]
      : undefined;
  }, draft);
}

function setNestedValue(
  draft: Record<string, unknown>,
  key: string,
  value: unknown,
) {
  const parts = key.split(".");
  const nextDraft = { ...draft };
  let target = nextDraft;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      target[part] = value;
    } else {
      target[part] = {
        ...(target[part] as Record<string, unknown> | undefined),
      };
      target = target[part] as Record<string, unknown>;
    }
  });
  return nextDraft;
}

export function AdminResourceManager<T extends AdminResourceItem>({
  config,
}: {
  config: AdminResourceConfig<T>;
}) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [items, setItems] = useState<T[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({
    ...config.emptyDraft,
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
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = unwrap<T[]>(await config.getAll());
        setItems(data || []);
        if (data?.length) {
          setSelectedId(data[0]._id);
          setDraft(config.toDraft(data[0]));
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
      setSelectedId(item._id);
      setDraft(config.toDraft(item));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };

  const startNew = () => {
    setSelectedId(null);
    setDraft({ ...config.emptyDraft });
    setError(null);
    setFeedback(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<T>(
        selectedId
          ? await config.update(selectedId, draft)
          : await config.create(draft),
      );
      setItems((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setDraft(config.toDraft(saved));
      setFeedback(
        selectedId
          ? `${config.singular} updated successfully.`
          : `${config.singular} created successfully.`,
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
      !window.confirm(
        `Delete this ${config.singular.toLowerCase()}? This cannot be undone.`,
      )
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await config.remove(selectedId);
      const remaining = items.filter((item) => item._id !== selectedId);
      setItems(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(config.toDraft(remaining[0]));
      } else {
        startNew();
      }
      setFeedback(`${config.singular} deleted successfully.`);
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key: string, value: unknown) =>
    setDraft((current) => setNestedValue(current, key, value));

  return (
    <AdminShell user={user}>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Workspace
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {config.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {config.description}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={startNew}
          className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
        >
          <Plus className="mr-2 h-4 w-4" /> New {config.singular.toLowerCase()}
        </Button>
      </div>
      {error && <Notice type="error">{error}</Notice>}
      {feedback && <Notice type="success">{feedback}</Notice>}
      {isLoading ? (
        <LoadingPanel label={`Loading ${config.title.toLowerCase()}`} />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {config.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {items.length} saved
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={startNew}
                aria-label={`Create new ${config.singular.toLowerCase()}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {items.length === 0 ? (
              <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                No {config.title.toLowerCase()} exist yet.
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
                        {config.getListLabel(item)}
                      </p>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        {String(item.status || "active")}
                      </span>
                    </div>
                    {config.getListDescription && (
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {config.getListDescription(item)}
                      </p>
                    )}
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
                  {selectedId
                    ? `Edit ${config.singular.toLowerCase()}`
                    : `Create ${config.singular.toLowerCase()}`}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  All model fields are available below.
                </p>
              </div>
              {selectedId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={startNew}
                  className="w-fit text-muted-foreground"
                >
                  <X className="mr-2 h-4 w-4" /> Cancel edit
                </Button>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {config.fields.map((field) => (
                <ResourceFieldInput
                  key={field.key}
                  field={field}
                  value={getNestedValue(draft, field.key)}
                  onChange={(value) => updateField(field.key, value)}
                />
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5">
              <div>
                {selectedId && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void remove()}
                    disabled={isSubmitting}
                    className="text-red-300 hover:bg-red-400/10 hover:text-red-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                )}
              </div>
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
                    : `Create ${config.singular.toLowerCase()}`}
              </Button>
            </div>
          </form>
        </div>
      )}
    </AdminShell>
  );
}

function ResourceFieldInput({
  field,
  value,
  onChange,
}: {
  field: ResourceField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const id = field.key.replaceAll(".", "-");
  const stringValue =
    typeof value === "string" || typeof value === "number" ? String(value) : "";
  if (field.type === "array") {
    const values = Array.isArray(value) ? value.map(String) : [""];
    return (
      <div className="sm:col-span-2">
        <label
          className="mb-2 block text-sm font-medium text-white"
          htmlFor={`${id}-0`}
        >
          {field.label}
        </label>
        <div className="space-y-2">
          {values.map((item, index) => (
            <div key={`${id}-${index}`} className="flex gap-2">
              <Input
                id={`${id}-${index}`}
                value={item}
                required={field.required}
                placeholder={field.placeholder}
                onChange={(event) => {
                  const next = [...values];
                  next[index] = event.target.value;
                  onChange(next);
                }}
              />
              {values.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    onChange(
                      values.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                  aria-label={`Remove ${field.label} item`}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange([...values, ""])}
          >
            <Plus className="mr-2 h-4 w-4" /> Add item
          </Button>
        </div>
      </div>
    );
  }
  if (field.type === "icon") {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
          {field.label}
        </label>
        <IconPicker value={stringValue} onChange={onChange} />
      </div>
    );
  }
  if (field.type === "image") {
    const objValue = (value as any) || {};
    const url = typeof value === "string" ? value : (objValue.url || "");
    const publicId = typeof value === "string" ? value : (objValue.public_id || "");
    return (
      <div className="md:col-span-2">
        <ImageUploadField
          publicId={publicId}
          url={url}
          onChange={(public_id, newUrl) => {
            // Provide an object for standard {public_id, url} pairs
            onChange({ public_id, url: newUrl });
          }}
          label={field.label}
        />
      </div>
    );
  }
  if (field.type === "richtext") {
    return (
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
          {field.label}
        </label>
        <RichTextEditor value={stringValue} onChange={onChange} placeholder={field.placeholder} />
      </div>
    );
  }
  if (field.type === "select")
    return (
      <div>
        <label
          className="mb-2 block text-sm font-medium text-white"
          htmlFor={id}
        >
          {field.label}
        </label>
        <select
          id={id}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  if (field.type === "textarea")
    return (
      <div className="sm:col-span-2">
        <label
          className="mb-2 block text-sm font-medium text-white"
          htmlFor={id}
        >
          {field.label}
        </label>
        <Textarea
          id={id}
          value={stringValue}
          required={field.required}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    );
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white" htmlFor={id}>
        {field.label}
      </label>
      <Input
        id={id}
        type={field.type}
        min={field.min}
        max={field.max}
        value={stringValue}
        required={field.required}
        placeholder={field.placeholder}
        onChange={(event) =>
          onChange(
            field.type === "number"
              ? Number(event.target.value)
              : event.target.value,
          )
        }
      />
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
