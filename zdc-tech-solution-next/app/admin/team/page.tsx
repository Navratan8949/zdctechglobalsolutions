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
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createTeamMember,
  deleteTeamMember,
  getTeamMemberById,
  getTeamMembers,
  updateTeamMember,
} from "@/service/team.service";

interface TeamItem {
  _id: string;
  name: string;
  position: string;
  description: string;
  image: { public_id: string; url: string };
  socials: { linkedin: string; twitter: string; github: string };
  order: number;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
type TeamDraft = Omit<TeamItem, "_id" | "createdAt" | "updatedAt">;
type ApiResponse<T> = { data?: T; message?: string };
const emptyDraft: TeamDraft = {
  name: "",
  position: "",
  description: "",
  image: { public_id: "", url: "" },
  socials: { linkedin: "", twitter: "", github: "" },
  order: 0,
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
function toDraft(item: TeamItem): TeamDraft {
  return {
    name: item.name || "",
    position: item.position || "",
    description: item.description || "",
    image: {
      public_id: item.image?.public_id || "",
      url: item.image?.url || "",
    },
    socials: {
      linkedin: item.socials?.linkedin || "",
      twitter: item.socials?.twitter || "",
      github: item.socials?.github || "",
    },
    order: item.order || 0,
    status: item.status || "active",
  };
}

export default function TeamPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [items, setItems] = useState<TeamItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TeamDraft>(emptyDraft);
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
        const data = unwrap<TeamItem[]>(await getTeamMembers());
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
      const item = unwrap<TeamItem>(await getTeamMemberById(id));
      setSelectedId(item._id);
      setDraft(toDraft(item));
    } catch (selectError) {
      setError(getErrorMessage(selectError));
    }
  };
  const startNew = () => {
    setSelectedId(null);
    setDraft({
      ...emptyDraft,
      image: { ...emptyDraft.image },
      socials: { ...emptyDraft.socials },
    });
    setError(null);
    setFeedback(null);
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const saved = unwrap<TeamItem>(
        selectedId
          ? await updateTeamMember(selectedId, draft)
          : await createTeamMember(draft),
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
          ? "Team member updated successfully."
          : "Team member created successfully.",
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
      !window.confirm("Delete this team member? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteTeamMember(selectedId);
      const remaining = items.filter((item) => item._id !== selectedId);
      setItems(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setDraft(toDraft(remaining[0]));
      } else startNew();
      setFeedback("Team member deleted successfully.");
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setIsSubmitting(false);
    }
  };
  const update = <K extends keyof TeamDraft>(field: K, value: TeamDraft[K]) =>
    setDraft((current) => ({ ...current, [field]: value }));
  return (
    <AdminShell user={user}>
      <ResourceHeader
        title="Team"
        description="Manage the people featured on your company website."
        onNew={startNew}
      />
      {error && <Notice type="error">{error}</Notice>}
      {feedback && <Notice type="success">{feedback}</Notice>}
      {isLoading ? (
        <LoadingPanel label="Loading team members" />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <List
            title="Team members"
            items={items}
            selectedId={selectedId}
            onSelect={(id) => void select(id)}
            label={(item) => item.name || "Unnamed member"}
            detail={(item) => item.position || "No position"}
            onNew={startNew}
            empty="No team members exist yet."
          />
          <form
            onSubmit={submit}
            className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7"
          >
            <FormHeading
              title={selectedId ? "Edit team member" : "Create team member"}
              onDelete={selectedId ? () => void remove() : undefined}
              disabled={isSubmitting}
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Name"
                value={draft.name}
                onChange={(value) => update("name", value)}
                required
              />
              <Field
                label="Position"
                value={draft.position}
                onChange={(value) => update("position", value)}
                required
              />
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-white">Description</label>
                <RichTextEditor
                  value={draft.description}
                  onChange={(value) => update("description", value)}
                  placeholder="Bio or description..."
                />
              </div>
              <div className="md:col-span-2">
                <ImageUploadField
                  publicId={draft.image.public_id}
                  url={draft.image.url}
                  onChange={(publicId, url) => update("image", { public_id: publicId, url })}
                  label="Profile Image"
                />
              </div>
              <Field
                label="LinkedIn"
                value={draft.socials.linkedin}
                onChange={(value) =>
                  update("socials", { ...draft.socials, linkedin: value })
                }
              />
              <Field
                label="Twitter"
                value={draft.socials.twitter}
                onChange={(value) =>
                  update("socials", { ...draft.socials, twitter: value })
                }
              />
              <Field
                label="GitHub"
                value={draft.socials.github}
                onChange={(value) =>
                  update("socials", { ...draft.socials, github: value })
                }
              />
              <NumberField
                label="Display order"
                value={draft.order}
                onChange={(value) => update("order", value)}
              />
              <SelectField
                label="Status"
                value={draft.status}
                onChange={(value) =>
                  update("status", value as TeamDraft["status"])
                }
                options={["active", "inactive"]}
              />
            </div>
            <SubmitButton
              isSubmitting={isSubmitting}
              hasSelection={Boolean(selectedId)}
            />
          </form>
        </div>
      )}
    </AdminShell>
  );
}

function ResourceHeader({
  title,
  description,
  onNew,
}: {
  title: string;
  description: string;
  onNew: () => void;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Workspace
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onNew}
        className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
      >
        <Plus className="mr-2 h-4 w-4" /> New{" "}
        {title.toLowerCase().replace(/s$/, "")}
      </Button>
    </div>
  );
}
function List<T extends { _id: string }>({
  title,
  items,
  selectedId,
  onSelect,
  label,
  detail,
  onNew,
  empty,
}: {
  title: string;
  items: T[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  label: (item: T) => string;
  detail: (item: T) => string;
  onNew: () => void;
  empty: string;
}) {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p className="text-xs text-muted-foreground">{items.length} saved</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onNew}
          aria-label={`Create new ${title}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
          {empty}
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item._id}
              type="button"
              onClick={() => onSelect(item._id)}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
            >
              <p className="truncate text-sm font-medium text-white">
                {label(item)}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {detail(item)}
              </p>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
function FormHeading({
  title,
  onDelete,
  disabled,
}: {
  title: string;
  onDelete?: () => void;
  disabled: boolean;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          All Team model fields are available below.
        </p>
      </div>
      {onDelete && (
        <Button
          type="button"
          variant="ghost"
          onClick={onDelete}
          disabled={disabled}
          className="w-fit text-red-300 hover:bg-red-400/10 hover:text-red-200"
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      )}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
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
        rows={4}
      />
    </div>
  );
}
function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-white"
        htmlFor="display-order"
      >
        {label}
      </label>
      <Input
        id="display-order"
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
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
function SubmitButton({
  isSubmitting,
  hasSelection,
}: {
  isSubmitting: boolean;
  hasSelection: boolean;
}) {
  return (
    <div className="mt-7 flex justify-end border-t border-white/10 pt-5">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {isSubmitting
          ? "Saving..."
          : hasSelection
            ? "Save changes"
            : "Create team member"}
      </Button>
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
