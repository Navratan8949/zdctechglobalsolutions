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
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from "@/service/blog.service";

interface BlogMedia {
  public_id: string;
  url: string;
}
interface BlogAuthor {
  name: string;
  role: string;
  avatar: BlogMedia;
}
interface BlogContentSection {
  heading: string;
  paragraphs: string[];
}
interface BlogItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  readingTime: string;
  coverImage: BlogMedia;
  author: BlogAuthor;
  featured: boolean;
  content: BlogContentSection[];
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}

type BlogDraft = Omit<
  BlogItem,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "date"
  | "coverImage"
  | "author"
  | "content"
> & {
  date: string;
  coverImage: BlogMedia;
  author: BlogAuthor;
  content: BlogContentSection[];
};
type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: BlogDraft = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  date: "",
  readingTime: "",
  coverImage: { public_id: "", url: "" },
  author: { name: "", role: "", avatar: { public_id: "", url: "" } },
  featured: false,
  content: [],
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

function toDateInput(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
}

function toDraft(item: BlogItem): BlogDraft {
  return {
    slug: item.slug || "",
    title: item.title || "",
    excerpt: item.excerpt || "",
    category: item.category || "",
    date: toDateInput(item.date),
    readingTime: item.readingTime || "",
    coverImage: {
      public_id: item.coverImage?.public_id || "",
      url: item.coverImage?.url || "",
    },
    author: {
      name: item.author?.name || "",
      role: item.author?.role || "",
      avatar: {
        public_id: item.author?.avatar?.public_id || "",
        url: item.author?.avatar?.url || "",
      },
    },
    featured: Boolean(item.featured),
    content: item.content || [],
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

export default function BlogPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<BlogDraft>(emptyDraft);
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
    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const items = unwrap<BlogItem[]>(await getBlogs());
        setBlogs(items || []);
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
    void loadBlogs();
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

  function setEditor(item: BlogItem | null) {
    const nextDraft = item
      ? toDraft(item)
      : {
          ...emptyDraft,
          coverImage: { ...emptyDraft.coverImage },
          author: {
            ...emptyDraft.author,
            avatar: { ...emptyDraft.author.avatar },
          },
          content: [],
        };
    setDraft(nextDraft);
  }

  const selectBlog = async (id: string) => {
    setError(null);
    setFeedback(null);
    try {
      const item = unwrap<BlogItem>(await getBlogById(id));
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
      const item = unwrap<BlogItem>(await getBlogBySlug(slugLookup.trim()));
      setSelectedId(item._id);
      setEditor(item);
      setFeedback("Blog post loaded by slug.");
    } catch (lookupError) {
      setError(getErrorMessage(lookupError));
    }
  };

  const updateField = <K extends keyof BlogDraft>(
    field: K,
    value: BlogDraft[K],
  ) => setDraft((current) => ({ ...current, [field]: value }));
  const updateCoverImage = (field: keyof BlogMedia, value: string) =>
    setDraft((current) => ({
      ...current,
      coverImage: { ...current.coverImage, [field]: value },
    }));
  const updateAuthor = (field: "name" | "role", value: string) =>
    setDraft((current) => ({
      ...current,
      author: { ...current.author, [field]: value },
    }));
  const updateAvatar = (field: keyof BlogMedia, value: string) =>
    setDraft((current) => ({
      ...current,
      author: {
        ...current.author,
        avatar: { ...current.author.avatar, [field]: value },
      },
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
      const payload: BlogDraft = {
        ...draft,
        date: draft.date ? new Date(draft.date).toISOString() : "",
      };
      const saved = unwrap<BlogItem>(
        selectedId
          ? await updateBlog(selectedId, payload)
          : await createBlog(payload),
      );
      setBlogs((current) =>
        selectedId
          ? current.map((item) => (item._id === saved._id ? saved : item))
          : [saved, ...current],
      );
      setSelectedId(saved._id);
      setEditor(saved);
      setFeedback(
        selectedId
          ? "Blog post updated successfully."
          : "Blog post created successfully.",
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
      !window.confirm("Delete this blog post? This cannot be undone.")
    )
      return;
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteBlog(selectedId);
      const remaining = blogs.filter((item) => item._id !== selectedId);
      setBlogs(remaining);
      if (remaining.length) {
        setSelectedId(remaining[0]._id);
        setEditor(remaining[0]);
      } else startNew();
      setFeedback("Blog post deleted successfully.");
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
              Blog
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Create and maintain articles published on the company website.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={startNew}
            className="w-fit border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <Plus className="mr-2 h-4 w-4" /> New post
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
              aria-label="Loading blog posts"
            />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl border border-white/10 bg-card/70 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">Posts</h2>
                  <p className="text-xs text-muted-foreground">
                    {blogs.length} saved
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={startNew}
                  aria-label="Create new blog post"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4 flex gap-2">
                <Input
                  value={slugLookup}
                  onChange={(event) => setSlugLookup(event.target.value)}
                  placeholder="Find by slug"
                  aria-label="Find blog post by slug"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => void findBySlug()}
                  aria-label="Find blog post"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {blogs.length === 0 ? (
                <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm leading-6 text-muted-foreground">
                  No blog posts exist yet. Fill in the form to create the first
                  one.
                </p>
              ) : (
                <div className="space-y-2">
                  {blogs.map((item) => (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => void selectBlog(item._id)}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${selectedId === item._id ? "border-primary/50 bg-primary/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-white">
                          {item.title || "Untitled post"}
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
                    {selectedId ? "Edit blog post" : "Create blog post"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    All fields from the Blog API are available below.
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
                  label="Category"
                  value={draft.category}
                  onChange={(value) => updateField("category", value)}
                  required
                />
                <Field
                  label="Reading time"
                  value={draft.readingTime}
                  onChange={(value) => updateField("readingTime", value)}
                  required
                />
                <Field
                  label="Publication date"
                  type="datetime-local"
                  value={draft.date}
                  onChange={(value) => updateField("date", value)}
                />
                <SelectField
                  label="Status"
                  value={draft.status}
                  onChange={(value) =>
                    updateField("status", value as BlogDraft["status"])
                  }
                  options={["published", "draft"]}
                />
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white">Excerpt</label>
                  <RichTextEditor
                    value={draft.excerpt}
                    onChange={(value) => updateField("excerpt", value)}
                    placeholder="Brief excerpt..."
                  />
                </div>
              </div>
              <div className="mt-7 grid gap-5 border-t border-white/10 pt-6 md:grid-cols-2">
                <label className="flex items-center gap-3 text-sm font-medium text-white">
                  <input
                    type="checkbox"
                    checked={draft.featured}
                    onChange={(event) =>
                      updateField("featured", event.target.checked)
                    }
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                  />{" "}
                  Featured post
                </label>
                <div className="md:col-span-2">
                  <ImageUploadField
                    publicId={draft.coverImage.public_id}
                    url={draft.coverImage.url}
                    onChange={(publicId, url) => updateField("coverImage", { public_id: publicId, url })}
                    label="Cover Image"
                  />
                </div>
                <div className="md:col-span-2">
                  <p className="mb-3 text-sm font-semibold text-white">
                    Author
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Author name"
                      value={draft.author.name}
                      onChange={(value) => updateAuthor("name", value)}
                    />
                    <Field
                      label="Author role"
                      value={draft.author.role}
                      onChange={(value) => updateAuthor("role", value)}
                    />
                    <div className="md:col-span-2">
                      <ImageUploadField
                        publicId={draft.author.avatar.public_id}
                        url={draft.author.avatar.url}
                        onChange={(publicId, url) => { updateAvatar("public_id", publicId); updateAvatar("url", url); }}
                        label="Author Avatar"
                      />
                    </div>
                  </div>
                </div>
                <ContentSections
                  value={draft.content}
                  onChange={(value) => updateField("content", value)}
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
                      : "Create post"}
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
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  const id = label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
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
function ContentSections({
  value,
  onChange,
}: {
  value: BlogContentSection[];
  onChange: (value: BlogContentSection[]) => void;
}) {
  return (
    <div className="space-y-4 md:col-span-2">
      <p className="text-sm font-semibold text-white">Content sections</p>
      {value.map((section, sectionIndex) => (
        <div
          key={`content-section-${sectionIndex}`}
          className="space-y-3 rounded-lg border border-white/10 p-4"
        >
          <div className="flex gap-2">
            <Input
              aria-label={`Content section ${sectionIndex + 1} heading`}
              placeholder="Section heading"
              value={section.heading}
              onChange={(event) =>
                onChange(
                  value.map((current, index) =>
                    index === sectionIndex
                      ? { ...current, heading: event.target.value }
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
                onChange(value.filter((_, index) => index !== sectionIndex))
              }
              aria-label={`Remove content section ${sectionIndex + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <div
              key={`content-section-${sectionIndex}-paragraph-${paragraphIndex}`}
              className="flex gap-2"
            >
              <div className="flex-1">
                <RichTextEditor
                  value={paragraph}
                  onChange={(val) =>
                    onChange(
                      value.map((current, index) =>
                        index === sectionIndex
                          ? {
                              ...current,
                              paragraphs: current.paragraphs.map(
                                (item, itemIndex) =>
                                  itemIndex === paragraphIndex
                                    ? val
                                    : item,
                              ),
                            }
                          : current,
                      ),
                    )
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange(
                    value.map((current, index) =>
                      index === sectionIndex
                        ? {
                            ...current,
                            paragraphs: current.paragraphs.filter(
                              (_, itemIndex) => itemIndex !== paragraphIndex,
                            ),
                          }
                        : current,
                    ),
                  )
                }
                aria-label={`Remove paragraph ${paragraphIndex + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange(
                value.map((current, index) =>
                  index === sectionIndex
                    ? { ...current, paragraphs: [...current.paragraphs, ""] }
                    : current,
                ),
              )
            }
          >
            <Plus className="mr-2 h-4 w-4" /> Add paragraph
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { heading: "", paragraphs: [""] }])}
      >
        <Plus className="mr-2 h-4 w-4" /> Add section
      </Button>
    </div>
  );
}
