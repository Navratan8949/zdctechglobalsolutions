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
  Calendar,
  Pin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { resolveImageUrl } from "@/lib/utils";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "@/service/post.service";

interface PostMedia {
  public_id: string;
  url: string;
}

interface PostAuthor {
  name: string;
  role: string;
  avatar: PostMedia;
}

export interface PostItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image?: PostMedia | string;
  author?: {
    name: string;
    role: string;
    avatar?: PostMedia | string;
  };
  tags: string[];
  date: string;
  status: "draft" | "published";
  pinned: boolean;
  likes: number;
  createdAt?: string;
  updatedAt?: string;
}

type PostDraft = Omit<
  PostItem,
  "_id" | "createdAt" | "updatedAt" | "image" | "author" | "tags" | "likes"
> & {
  image: PostMedia;
  author: PostAuthor;
  tags: string;
  likes?: number;
};

type ApiResponse<T> = { success?: boolean; data?: T; message?: string };

const emptyDraft: PostDraft = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  category: "Daily Update",
  date: new Date().toISOString().slice(0, 10),
  status: "published",
  pinned: false,
  image: { public_id: "", url: "" },
  author: {
    name: "ZDC Tech Team",
    role: "Admin",
    avatar: { public_id: "", url: "" },
  },
  tags: "Daily, Tech, Updates",
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

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function AdminPostsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PostDraft>(emptyDraft);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      const items = unwrap<PostItem[]>(res) || [];
      setPosts(items);

      if (items.length > 0 && !selectedId) {
        selectPost(items[0]);
      } else if (items.length === 0) {
        handleNew();
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to load posts",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      void loadPosts();
    }
  }, [user]);

  const selectPost = (item: PostItem) => {
    setSelectedId(item._id);

    const normalizedImage: PostMedia =
      typeof item.image === "string"
        ? { public_id: "", url: resolveImageUrl(item.image) }
        : item.image
        ? {
            public_id: item.image.public_id || "",
            url: resolveImageUrl(item.image.url),
          }
        : { public_id: "", url: "" };

    const authorAvatar: PostMedia =
      item.author?.avatar
        ? typeof item.author.avatar === "string"
          ? { public_id: "", url: resolveImageUrl(item.author.avatar) }
          : {
              public_id: item.author.avatar.public_id || "",
              url: resolveImageUrl(item.author.avatar.url),
            }
        : { public_id: "", url: "" };

    setDraft({
      title: item.title,
      slug: item.slug,
      content: item.content || "",
      excerpt: item.excerpt || "",
      category: item.category || "Daily Update",
      date: item.date ? item.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      status: item.status || "published",
      pinned: !!item.pinned,
      image: normalizedImage,
      author: {
        name: item.author?.name || "ZDC Tech Team",
        role: item.author?.role || "Admin",
        avatar: authorAvatar,
      },
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
    });
    setFeedback(null);
  };

  const handleNew = () => {
    setSelectedId(null);
    setDraft({
      ...emptyDraft,
      date: new Date().toISOString().slice(0, 10),
    });
    setFeedback(null);
  };

  const handleTitleChange = (val: string) => {
    setDraft((prev) => ({
      ...prev,
      title: val,
      slug: !selectedId ? slugify(val) : prev.slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) {
      setFeedback({ type: "error", message: "Title is required" });
      return;
    }
    if (!draft.content.trim()) {
      setFeedback({ type: "error", message: "Content is required" });
      return;
    }

    try {
      setSaving(true);
      setFeedback(null);

      const payload = {
        title: draft.title.trim(),
        slug: draft.slug.trim() || slugify(draft.title),
        content: draft.content,
        excerpt: draft.excerpt.trim(),
        category: draft.category.trim() || "Daily Update",
        date: draft.date || new Date().toISOString(),
        status: draft.status,
        pinned: draft.pinned,
        image: draft.image,
        author: draft.author,
        tags: draft.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (selectedId) {
        const res = await updatePost(selectedId, payload);
        const updated = unwrap<PostItem>(res);
        setPosts((prev) =>
          prev.map((p) => (p._id === selectedId ? updated : p))
        );
        setFeedback({ type: "success", message: "Post updated successfully!" });
      } else {
        const res = await createPost(payload);
        const created = unwrap<PostItem>(res);
        setPosts((prev) => [created, ...prev]);
        setSelectedId(created._id);
        setFeedback({ type: "success", message: "Post created successfully!" });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to save post",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setDeleting(true);
      await deletePost(selectedId);
      const remaining = posts.filter((p) => p._id !== selectedId);
      setPosts(remaining);
      if (remaining.length > 0) {
        selectPost(remaining[0]);
      } else {
        handleNew();
      }
      setFeedback({ type: "success", message: "Post deleted successfully" });
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to delete post",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isAuthLoading || (!user && loading)) {
    return (
      <AdminShell user={user}>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell user={user}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Post List */}
        <div className="space-y-4 lg:col-span-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-bold text-foreground">
              Posts ({posts.length})
            </h2>
            <Button
              size="sm"
              onClick={handleNew}
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-card border-border"
              />
            </div>
            <div className="flex gap-1.5">
              {(["all", "published", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="max-h-[720px] space-y-2.5 overflow-y-auto pr-1">
            {loading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary mb-2" />
                Loading posts...
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No posts found. Click &quot;New Post&quot; to create one.
              </div>
            ) : (
              filteredPosts.map((item) => {
                const isSelected = item._id === selectedId;
                return (
                  <div
                    key={item._id}
                    onClick={() => selectPost(item)}
                    className={`group cursor-pointer rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
                        {item.category || "Daily Update"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.pinned && (
                          <Pin className="h-3 w-3 text-amber-500 fill-amber-500" />
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            item.status === "published"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-start gap-3">
                      {resolveImageUrl(item.image) ? (
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/40 flex items-center justify-center">
                          <img
                            src={resolveImageUrl(item.image)}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-foreground line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                          {item.excerpt || item.content?.replace(/<[^>]*>/g, "")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.date || item.createdAt || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {item.slug && item.status === "published" && (
                        <Link
                          href={`/posts/${item.slug}`}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-0.5 text-primary hover:underline"
                        >
                          View <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Editor Form */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6"
          >
            {/* Header Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {selectedId ? "Edit Post" : "Create New Daily Post"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selectedId
                    ? "Modify and update your daily post content"
                    : "Draft and publish a fresh daily post to your site"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedId && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleting || saving}
                    className="border-rose-500/30 text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                  >
                    {deleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    <span className="ml-1.5 hidden sm:inline">Delete</span>
                  </Button>
                )}

                <Button
                  type="submit"
                  size="sm"
                  disabled={saving || deleting}
                  className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  <span>{selectedId ? "Update Post" : "Publish Post"}</span>
                </Button>
              </div>
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`flex items-center gap-2 rounded-xl p-3.5 text-sm ${
                  feedback.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            {/* Title & Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Post Title *
                </label>
                <Input
                  required
                  placeholder="e.g. Exciting New Product Launch Today"
                  value={draft.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-background border-border text-foreground font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  URL Slug
                </label>
                <Input
                  required
                  placeholder="post-url-slug"
                  value={draft.slug}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  className="bg-background border-border text-foreground font-mono text-xs"
                />
              </div>
            </div>

            {/* Category, Date, Status */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Category
                </label>
                <Input
                  list="post-categories"
                  placeholder="e.g. Daily Update"
                  value={draft.category}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="bg-background border-border text-foreground"
                />
                <datalist id="post-categories">
                  <option value="Daily Update" />
                  <option value="Tech Insight" />
                  <option value="Company News" />
                  <option value="Announcement" />
                  <option value="Engineering" />
                  <option value="Hiring & Careers" />
                  <option value="Client Success" />
                </datalist>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Post Date
                </label>
                <Input
                  type="date"
                  value={draft.date}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      status: e.target.value as "published" | "draft",
                    }))
                  }
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Pinned & Author Info */}
            <div className="grid gap-4 sm:grid-cols-3 items-end">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Author Name
                </label>
                <Input
                  placeholder="e.g. ZDC Tech Team"
                  value={draft.author.name}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      author: { ...prev.author, name: e.target.value },
                    }))
                  }
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Author Role
                </label>
                <Input
                  placeholder="e.g. Lead Engineer"
                  value={draft.author.role}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      author: { ...prev.author, role: e.target.value },
                    }))
                  }
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-background">
                <input
                  type="checkbox"
                  id="post-pinned"
                  checked={draft.pinned}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, pinned: e.target.checked }))
                  }
                  className="h-4 w-4 rounded text-primary focus:ring-primary"
                />
                <label
                  htmlFor="post-pinned"
                  className="text-xs font-semibold text-foreground cursor-pointer flex items-center gap-1"
                >
                  <Pin className="h-3.5 w-3.5 text-amber-500" />
                  Pin this post to top
                </label>
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Cover / Featured Image
              </label>
              <ImageUploadField
                publicId={draft.image.public_id}
                url={draft.image.url}
                onChange={(publicId, url) =>
                  setDraft((prev) => ({
                    ...prev,
                    image: { public_id: publicId, url },
                  }))
                }
                label="Upload Post Image"
              />
            </div>

            {/* Excerpt / Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Short Excerpt / Preview Summary
              </label>
              <Textarea
                rows={2}
                placeholder="A brief summary for previews and social share snippets..."
                value={draft.excerpt}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                className="bg-background border-border text-foreground resize-none"
              />
            </div>

            {/* Rich Content */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Post Content *
              </label>
              <RichTextEditor
                value={draft.content}
                onChange={(val) => setDraft((prev) => ({ ...prev, content: val }))}
                placeholder="Write your daily post, announcements, technical insights, and updates..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tags (Comma separated)
              </label>
              <Input
                placeholder="Daily, Update, Product, Innovation"
                value={draft.tags}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, tags: e.target.value }))
                }
                className="bg-background border-border text-foreground"
              />
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
