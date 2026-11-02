"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  Eye,
  Loader2,
  PlaySquare,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  ExternalLink,
  KeyRound,
  Check,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { resolveImageUrl } from "@/lib/utils";
import {
  getAllDemosAdmin,
  createDemo,
  updateDemo,
  deleteDemo,
  seedDefaultDemos,
} from "@/service/demo.service";
import { type DemoItem, type DemoCredential } from "@/data/demos";

type DemoDraft = Omit<DemoItem, "_id" | "id" | "createdAt" | "updatedAt">;

const emptyDraft: DemoDraft = {
  title: "",
  demoType: "Web Application",
  description: "",
  image: {
    public_id: "",
    url: "",
  },
  liveUrl: "",
  credentials: [
    {
      role: "Admin",
      username: "admin@zdc.com",
      password: "Admin@2026",
      notes: "",
    },
  ],
  order: 0,
  isActive: true,
};

const fallbackImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

function unwrap<T>(response: any): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    (response as any).data !== undefined
  ) {
    return (response as any).data as T;
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

export default function AdminDemosPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();

  const [demos, setDemos] = useState<DemoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DemoDraft>(emptyDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const loadDemos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = unwrap<DemoItem[]>(await getAllDemosAdmin());
      setDemos(Array.isArray(res) ? res : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      void loadDemos();
    }
  }, [isAuthenticated]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setDraft({ ...emptyDraft });
    setIsFormOpen(true);
    setError(null);
    setFeedback(null);
  };

  const handleOpenEdit = (item: DemoItem) => {
    setEditingId(item._id || item.id || null);
    const imgObj =
      typeof item.image === "object" && item.image
        ? {
            public_id: item.image.public_id || "",
            url: item.image.url || "",
          }
        : {
            public_id: "",
            url: typeof item.image === "string" ? item.image : "",
          };

    setDraft({
      title: item.title || "",
      demoType: item.demoType || "Web Application",
      description: item.description || "",
      image: imgObj,
      liveUrl: item.liveUrl || "",
      credentials:
        Array.isArray(item.credentials) && item.credentials.length > 0
          ? item.credentials.map((c) => ({
              role: c.role || "Admin",
              username: c.username || "",
              password: c.password || "",
              notes: c.notes || "",
            }))
          : [
              {
                role: "Admin",
                username: "admin@zdc.com",
                password: "Admin@2026",
                notes: "",
              },
            ],
      order: item.order ?? 0,
      isActive: item.isActive !== false,
    });
    setIsFormOpen(true);
    setError(null);
    setFeedback(null);
  };

  const handleSaveDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      if (!draft.title.trim()) {
        throw new Error("Demo title is required");
      }
      if (!draft.description.trim()) {
        throw new Error("Description is required");
      }
      if (!draft.liveUrl.trim()) {
        throw new Error("Live Demo URL is required");
      }

      if (editingId) {
        const updated = unwrap<DemoItem>(await updateDemo(editingId, draft));
        setDemos((prev) =>
          prev.map((item) =>
            (item._id || item.id) === editingId ? updated : item
          )
        );
        setFeedback("Demo project updated successfully!");
      } else {
        const created = unwrap<DemoItem>(await createDemo(draft));
        setDemos((prev) => [created, ...prev]);
        setFeedback("New demo project added successfully!");
      }
      setIsFormOpen(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDemo = async (id: string, title: string) => {
    if (!window.confirm(`Delete demo "${title}"? This cannot be undone.`)) {
      return;
    }
    setError(null);
    setFeedback(null);
    try {
      await deleteDemo(id);
      setDemos((prev) => prev.filter((item) => (item._id || item.id) !== id));
      setFeedback("Demo deleted successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !window.confirm(
        "Reset and seed default demo projects with test credentials? Existing demos will be replaced."
      )
    ) {
      return;
    }
    setIsSeeding(true);
    setError(null);
    setFeedback(null);
    try {
      const res = unwrap<DemoItem[]>(await seedDefaultDemos());
      setDemos(Array.isArray(res) ? res : []);
      setFeedback("Seeded default demo projects!");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSeeding(false);
    }
  };

  // Credential handlers
  const handleAddCredential = () => {
    setDraft((prev) => ({
      ...prev,
      credentials: [
        ...prev.credentials,
        {
          role: "User",
          username: "user@zdc.com",
          password: "User@2026",
          notes: "",
        },
      ],
    }));
  };

  const handleUpdateCredential = (
    index: number,
    field: keyof DemoCredential,
    value: string
  ) => {
    setDraft((prev) => {
      const updated = [...prev.credentials];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, credentials: updated };
    });
  };

  const handleRemoveCredential = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index),
    }));
  };

  const filteredDemos = demos.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.demoType?.toLowerCase().includes(q) ||
      item.liveUrl?.toLowerCase().includes(q)
    );
  });

  return (
    <AdminShell user={user}>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Company Portfolio
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Live Demo Projects
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground max-w-3xl">
              Add and manage live demo projects with title, description, image, demo type, live URL, and test credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/demos"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Public /demos</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSeeding}
              onClick={handleSeedDefaults}
              className="border-white/10 hover:bg-white/5 text-xs"
            >
              <RefreshCw
                className={`mr-1.5 h-3.5 w-3.5 ${isSeeding ? "animate-spin" : ""}`}
              />
              Seed Defaults
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleOpenCreate}
              className="bg-primary hover:bg-primary/90 text-white text-xs font-bold"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add New Demo
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex-1">{error}</div>
            <button
              onClick={() => setError(null)}
              className="text-red-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {feedback && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="flex-1">{feedback}</div>
            <button
              onClick={() => setFeedback(null)}
              className="text-emerald-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Search Toolbar */}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-card/60 p-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, demo type, URL..."
              className="pl-9 bg-white/5 border-white/10 text-xs text-white"
            />
          </div>

          <span className="text-xs text-muted-foreground">
            Total: <strong>{filteredDemos.length}</strong> demos
          </span>
        </div>

        {/* Demos Cards Grid */}
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredDemos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-card/50 p-12 text-center">
            <PlaySquare className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-3 text-base font-bold text-white">
              No demo projects found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {searchQuery
                ? "No demos matched your search."
                : "Click 'Add New Demo' to add your first live project."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDemos.map((item) => {
              const id = item._id || item.id || "";
              const rawImg =
                typeof item.image === "string"
                  ? item.image
                  : item.image?.url || "";
              const resolvedImg = rawImg
                ? resolveImageUrl(rawImg)
                : fallbackImage;

              const creds = Array.isArray(item.credentials)
                ? item.credentials
                : [];

              return (
                <div
                  key={id}
                  className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card/70 transition-all hover:border-white/20"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                    <img
                      src={resolvedImg}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm border border-white/10">
                        {item.demoType || "Web App"}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          item.isActive
                            ? "bg-emerald-500/80 text-white"
                            : "bg-amber-500/80 text-white"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-bold text-sm text-white line-clamp-1 drop-shadow-sm">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-4 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>

                    {/* Live URL */}
                    <div className="rounded-lg bg-white/[0.03] p-2 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                        {item.liveUrl}
                      </span>
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-semibold"
                      >
                        <span>Open</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    {/* Credentials Preview */}
                    {creds.length > 0 && (
                      <div className="rounded-lg bg-blue-500/10 p-2.5 border border-blue-500/20 text-xs space-y-1.5">
                        <div className="flex items-center gap-1 font-bold text-[11px] text-sky-300">
                          <KeyRound className="h-3.5 w-3.5" />
                          <span>Credentials ({creds.length})</span>
                        </div>
                        {creds.map((c, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between text-[11px] text-slate-300 font-mono"
                          >
                            <span className="text-muted-foreground">
                              {c.role || "Admin"}:
                            </span>
                            <span className="truncate max-w-[170px]">
                              {c.username} / {c.password}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/5">
                      <span className="text-[10px] text-muted-foreground">
                        Order #{item.order ?? 0}
                      </span>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(item)}
                          className="h-7 px-2 text-xs text-white hover:bg-white/10"
                        >
                          <Edit className="mr-1 h-3.5 w-3.5 text-primary" /> Edit
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDemo(id, item.title)}
                          className="h-7 px-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* ADD / EDIT MODAL                                               */}
        {/* ============================================================== */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />

            <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingId ? "Edit Demo Project" : "Add Demo Project"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enter Title, Description, Image, Demo Type, Live URL, and Test Credentials.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDemo} className="space-y-5">
                {/* 1. Title */}
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                    Demo Title *
                  </label>
                  <Input
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({ ...draft, title: e.target.value })
                    }
                    placeholder="e.g. Multi-Vendor E-Commerce Platform"
                    required
                  />
                </div>

                {/* 2. Demo Type & Live URL */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                      Demo Type *
                    </label>
                    <Input
                      value={draft.demoType || ""}
                      onChange={(e) =>
                        setDraft({ ...draft, demoType: e.target.value })
                      }
                      placeholder="e.g. E-Commerce, ERP, Healthcare, Web App"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                      Live URL *
                    </label>
                    <Input
                      type="url"
                      value={draft.liveUrl}
                      onChange={(e) =>
                        setDraft({ ...draft, liveUrl: e.target.value })
                      }
                      placeholder="https://demo.example.com"
                      required
                    />
                  </div>
                </div>

                {/* 3. Description */}
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                    Description *
                  </label>
                  <Textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                    placeholder="Describe the application features and workflows..."
                    required
                  />
                </div>

                {/* 4. Image Upload */}
                <div>
                  <ImageUploadField
                    publicId={
                      (typeof draft.image === "object"
                        ? draft.image?.public_id
                        : "") || ""
                    }
                    url={
                      (typeof draft.image === "object"
                        ? draft.image?.url
                        : draft.image) || ""
                    }
                    onChange={(publicId, url) => {
                      setDraft((prev) => ({
                        ...prev,
                        image: { public_id: publicId, url },
                      }));
                    }}
                    label="Demo Screenshot / Image"
                  />
                  <div className="mt-2">
                    <label className="text-[11px] text-muted-foreground block mb-1">
                      Or direct image URL:
                    </label>
                    <Input
                      type="url"
                      value={
                        (typeof draft.image === "object"
                          ? draft.image?.url
                          : draft.image) || ""
                      }
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          image: {
                            public_id:
                              (typeof prev.image === "object"
                                ? prev.image?.public_id
                                : "") || "",
                            url: e.target.value,
                          },
                        }))
                      }
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                {/* 5. Credentials Manager */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                        Test Credentials
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        Add test logins for visitors (e.g. Admin, Customer, Doctor).
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddCredential}
                      className="border-white/10 hover:bg-white/5 text-xs"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add Credential
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {draft.credentials.map((cred, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-sky-400">
                            Login #{idx + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={draft.credentials.length <= 1}
                            onClick={() => handleRemoveCredential(idx)}
                            className="h-6 px-1.5 text-xs text-muted-foreground hover:text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                          <div>
                            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">
                              Role
                            </label>
                            <Input
                              value={cred.role}
                              onChange={(e) =>
                                handleUpdateCredential(
                                  idx,
                                  "role",
                                  e.target.value
                                )
                              }
                              placeholder="Admin"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">
                              Username / Email *
                            </label>
                            <Input
                              value={cred.username}
                              onChange={(e) =>
                                handleUpdateCredential(
                                  idx,
                                  "username",
                                  e.target.value
                                )
                              }
                              placeholder="admin@zdc.com"
                              required
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold text-muted-foreground uppercase block mb-1">
                              Password *
                            </label>
                            <Input
                              value={cred.password}
                              onChange={(e) =>
                                handleUpdateCredential(
                                  idx,
                                  "password",
                                  e.target.value
                                )
                              }
                              placeholder="Admin@2026"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Display Order & Active */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-4">
                  <div className="w-36">
                    <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1">
                      Display Order
                    </label>
                    <Input
                      type="number"
                      value={draft.order}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs font-medium text-white cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      checked={draft.isActive}
                      onChange={(e) =>
                        setDraft({ ...draft, isActive: e.target.checked })
                      }
                      className="rounded border-white/20 bg-slate-800 text-primary"
                    />
                    <span>Active (Visible on Website)</span>
                  </label>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    className="border-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="mr-1.5 h-4 w-4" />
                        {editingId ? "Update Demo" : "Create Demo"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
