"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  Eye,
  Layers,
  Loader2,
  Package,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  ExternalLink,
  Zap,
  Cloud,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { IconPicker } from "@/components/admin/IconPicker";
import { resolveImageUrl } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import {
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  seedDefaultProducts,
} from "@/service/product.service";

export interface ProductItem {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  badge: string;
  icon: string;
  features: string[];
  metrics: string;
  deployment: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type ProductDraft = Omit<ProductItem, "_id" | "createdAt" | "updatedAt">;

const emptyDraft: ProductDraft = {
  title: "",
  slug: "",
  tagline: "",
  category: "Enterprise ERP",
  description: "",
  image: {
    public_id: "",
    url: "",
  },
  badge: "Flagship Suite",
  icon: "Building2",
  features: [
    "Multi-entity financial accounting & automated tax",
    "Warehouse management with real-time stock optimization",
    "Executive KPI dashboards with predictive forecasting",
  ],
  metrics: "45% Reduction in Admin Overhead",
  deployment: "Cloud-Ready & Customizable",
  ctaText: "Request Demo",
  ctaLink: "/contact",
  order: 0,
  isActive: true,
  isFeatured: false,
};

const standardCategories = [
  "Enterprise ERP",
  "HRMS & Workforce",
  "CRM & Sales",
  "E-Commerce",
  "AI & Analytics",
  "Healthcare",
  "EdTech & Education",
  "Custom Platforms",
];

const fallbackProductImage =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

export default function AdminProductsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Confirm State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Seeding State
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: any = await getAllProductsAdmin();
      const list = response?.data || response || [];
      setProducts(Array.isArray(list) ? list : []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      void loadProducts();
    }
  }, [isAuthLoading, isAuthenticated]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setDraft({
      ...emptyDraft,
      order: products.length + 1,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: ProductItem) => {
    setEditingId(product._id);
    setDraft({
      title: product.title || "",
      slug: product.slug || "",
      tagline: product.tagline || "",
      category: product.category || "Enterprise ERP",
      description: product.description || "",
      image: {
        public_id: product.image?.public_id || "",
        url: product.image?.url || "",
      },
      badge: product.badge || "",
      icon: product.icon || "Layers",
      features: Array.isArray(product.features) && product.features.length > 0
        ? [...product.features]
        : [""],
      metrics: product.metrics || "",
      deployment: product.deployment || "Cloud-Ready & Customizable",
      ctaText: product.ctaText || "Request Demo",
      ctaLink: product.ctaLink || "/contact",
      order: product.order || 0,
      isActive: product.isActive !== undefined ? product.isActive : true,
      isFeatured: Boolean(product.isFeatured),
    });
    setIsFormOpen(true);
  };

  const handleFeatureChange = (index: number, val: string) => {
    setDraft((prev) => {
      const next = [...prev.features];
      next[index] = val;
      return { ...prev, features: next };
    });
  };

  const handleAddFeature = () => {
    setDraft((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setDraft((prev) => {
      const next = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: next.length > 0 ? next : [""] };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      const cleanedFeatures = draft.features
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        ...draft,
        features: cleanedFeatures,
        image: {
          public_id: draft.image?.public_id || "",
          url: (draft.image?.url || "").trim(),
        },
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setFeedback("Product updated successfully!");
      } else {
        await createProduct(payload);
        setFeedback("Product created successfully!");
      }

      setIsFormOpen(false);
      await loadProducts();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to save product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    setError(null);
    setFeedback(null);
    try {
      await deleteProduct(deletingId);
      setFeedback("Product deleted successfully");
      setDeletingId(null);
      await loadProducts();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (product: ProductItem) => {
    try {
      await updateProduct(product._id, {
        isActive: !product.isActive,
      });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, isActive: !p.isActive } : p
        )
      );
    } catch (err: any) {
      setError("Failed to update status");
    }
  };

  const handleSeedDefaults = async () => {
    if (!confirm("Are you sure you want to restore the 8 default products? This will reset all current product entries.")) {
      return;
    }
    setIsSeeding(true);
    setError(null);
    setFeedback(null);
    try {
      await seedDefaultProducts();
      setFeedback("Default products restored successfully!");
      await loadProducts();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to seed default products");
    } finally {
      setIsSeeding(false);
    }
  };

  const categories = ["All", ...standardCategories];

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(p.features) &&
        p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesQuery;
  });

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const PreviewIcon = getIcon(draft.icon || "Layers");
  const previewImage =
    resolveImageUrl(draft.image?.url) || fallbackProductImage;

  return (
    <AdminShell user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Portfolio &amp; Solutions
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Products &amp; Platforms
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Manage your dynamic turnkey enterprise digital products, software suites, capability highlights, and mockup images.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="border-white/10 hover:bg-white/5"
            >
              {isSeeding ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Restore Defaults
            </Button>
            <Button
              type="button"
              onClick={handleOpenCreate}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {feedback && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-lg border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {feedback}
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-card/60 p-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products by title, feature, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border border-white/10 bg-card/70">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-card/40 p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold text-white">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery || selectedCategory !== "All"
                ? "Try clearing your search filters or add a new product."
                : "Get started by clicking Add Product or Restore Defaults above."}
            </p>
            <Button
              type="button"
              onClick={handleOpenCreate}
              className="mt-4 bg-primary text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add First Product
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const Icon = getIcon(product.icon || "Layers");
              const imgUrl =
                resolveImageUrl(product.image?.url) || fallbackProductImage;

              return (
                <div
                  key={product._id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 ${
                    product.isActive
                      ? "border-white/10 bg-card/80 hover:border-primary/40 hover:shadow-xl"
                      : "border-white/5 bg-card/30 opacity-75"
                  }`}
                >
                  {/* Top Image Preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                    <img
                      src={imgUrl}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-600/90 px-2.5 py-1 text-[11px] font-bold text-white shadow backdrop-blur-sm">
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-bold text-white shadow backdrop-blur-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(product)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                          product.isActive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                        title="Click to toggle active status"
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </button>
                    </div>

                    {/* Title Overlay in bottom of image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-md">
                        <Icon className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-bold text-white drop-shadow">
                          {product.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-medium text-primary">
                      {product.tagline}
                    </p>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    {/* Features Preview */}
                    <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Key Capabilities ({product.features?.length || 0}):
                      </p>
                      {product.features?.slice(0, 2).map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metric & Deployment */}
                    {(product.metrics || product.deployment) && (
                      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px]">
                        {product.metrics && (
                          <span className="font-semibold text-emerald-400 flex items-center gap-1">
                            <Zap className="h-3 w-3" /> {product.metrics}
                          </span>
                        )}
                        {product.deployment && (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Cloud className="h-3 w-3" /> {product.deployment}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs text-muted-foreground">
                        Order: #{product.order}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(product)}
                          className="h-8 border-white/10 bg-white/5 hover:bg-white/10 text-white"
                        >
                          <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeletingId(product._id)}
                          className="h-8 bg-red-600/80 hover:bg-red-600"
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

        {/* Delete Confirmation Modal */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white">Delete Product</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Are you sure you want to delete this product? This action cannot be undone and will remove it from the website.
              </p>
              <div className="mt-6 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeletingId(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Delete Product
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Create / Edit Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80 p-3 sm:p-6 backdrop-blur-md">
            <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-white/10 bg-card shadow-2xl overflow-hidden">
              {/* Fixed Header */}
              <div className="shrink-0 flex items-center justify-between border-b border-white/10 px-6 py-4 sm:py-5 bg-card/95 backdrop-blur-sm z-10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {editingId ? "Edit Product" : "Add New Product"}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Configure the product details, uploaded screenshot/mockup, category, highlights, and demo links.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Container with Internal Scroll */}
              <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden min-h-0">
                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Product Title *
                    </label>
                    <Input
                      value={draft.title}
                      onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                      placeholder="e.g. ZDC Enterprise One"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      URL Slug
                    </label>
                    <Input
                      value={draft.slug}
                      onChange={(e) => setDraft((p) => ({ ...p, slug: e.target.value }))}
                      placeholder="e.g. zdc-enterprise-one (auto generated if empty)"
                    />
                  </div>

                  {/* Tagline */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Tagline / Subtitle
                    </label>
                    <Input
                      value={draft.tagline}
                      onChange={(e) => setDraft((p) => ({ ...p, tagline: e.target.value }))}
                      placeholder="e.g. All-in-one scalable cloud enterprise resource planning suite"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Category *
                    </label>
                    <select
                      value={draft.category}
                      onChange={(e) => setDraft((p) => ({ ...p, category: e.target.value }))}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      required
                    >
                      {standardCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-slate-900 text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Badge / Tag
                    </label>
                    <Input
                      value={draft.badge}
                      onChange={(e) => setDraft((p) => ({ ...p, badge: e.target.value }))}
                      placeholder="e.g. Flagship Suite, Most Popular, High Growth"
                    />
                  </div>

                  {/* Product Image Upload */}
                  <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h3 className="text-sm font-bold text-white mb-1">
                      Product Preview Mockup / Screenshot
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      Upload an image from your computer, or enter a direct image URL.
                    </p>
                    <ImageUploadField
                      publicId={draft.image.public_id}
                      url={draft.image.url}
                      onChange={(publicId, url) => {
                        setDraft((prev) => ({
                          ...prev,
                          image: { public_id: publicId, url },
                        }));
                      }}
                      label="Product Mockup Image"
                    />
                    <div className="mt-3">
                      <label className="text-xs text-muted-foreground block mb-1">
                        Or enter direct image URL (Unsplash, Pexels, CDN):
                      </label>
                      <Input
                        type="url"
                        value={draft.image.url}
                        onChange={(e) =>
                          setDraft((prev) => ({
                            ...prev,
                            image: { ...prev.image, url: e.target.value },
                          }))
                        }
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>

                  {/* Icon Picker */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Product Icon
                    </label>
                    <IconPicker
                      value={draft.icon}
                      onChange={(iconName) => setDraft((p) => ({ ...p, icon: iconName }))}
                    />
                  </div>

                  {/* Metrics */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Metric Highlight
                    </label>
                    <Input
                      value={draft.metrics}
                      onChange={(e) => setDraft((p) => ({ ...p, metrics: e.target.value }))}
                      placeholder="e.g. 45% Reduction in Admin Overhead"
                    />
                  </div>

                  {/* Deployment Mode */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Deployment Type
                    </label>
                    <Input
                      value={draft.deployment}
                      onChange={(e) => setDraft((p) => ({ ...p, deployment: e.target.value }))}
                      placeholder="e.g. Cloud-Ready & Customizable, SaaS / On-Premise"
                    />
                  </div>

                  {/* CTA Text */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Button CTA Text
                    </label>
                    <Input
                      value={draft.ctaText}
                      onChange={(e) => setDraft((p) => ({ ...p, ctaText: e.target.value }))}
                      placeholder="e.g. Request ERP Demo"
                    />
                  </div>

                  {/* CTA Link */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Button CTA Link
                    </label>
                    <Input
                      value={draft.ctaLink}
                      onChange={(e) => setDraft((p) => ({ ...p, ctaLink: e.target.value }))}
                      placeholder="e.g. /contact?product=zdc-enterprise-one"
                    />
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Display Order (Sort)
                    </label>
                    <Input
                      type="number"
                      value={draft.order}
                      onChange={(e) => setDraft((p) => ({ ...p, order: parseInt(e.target.value, 10) || 0 }))}
                      placeholder="1, 2, 3..."
                    />
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="isActiveToggle"
                      checked={draft.isActive}
                      onChange={(e) => setDraft((p) => ({ ...p, isActive: e.target.checked }))}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isActiveToggle" className="text-sm font-semibold text-white cursor-pointer">
                      Publish Product (Visible on Website)
                    </label>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white">
                      Full Description *
                    </label>
                    <Textarea
                      rows={3}
                      value={draft.description}
                      onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Detailed overview of what the product does and business value it provides..."
                      required
                    />
                  </div>

                  {/* Dynamic Key Capabilities */}
                  <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Key Capabilities &amp; Features
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Bullet points highlighting the major features of this platform.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddFeature}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Capability
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {draft.features.map((feat, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          <Input
                            value={feat}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder={`Capability #${index + 1}`}
                            required
                          />
                          {draft.features.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-red-400 hover:bg-red-400/10 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview Card */}
                  <div className="md:col-span-2 rounded-xl border border-white/10 bg-slate-900/60 p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                      <Eye className="h-4 w-4" /> Live Card Preview
                    </div>
                    <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-card overflow-hidden shadow-2xl">
                      <div className="relative aspect-[16/9] w-full bg-slate-950">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold text-white">
                            {draft.category}
                          </span>
                          {draft.badge && (
                            <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white">
                              {draft.badge}
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-md">
                            <PreviewIcon className="h-4 w-4" />
                          </div>
                          <span className="truncate text-sm font-bold text-white">
                            {draft.title || "Product Title"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-xs font-semibold text-primary">
                          {draft.tagline || "Product tagline goes here"}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {draft.description || "Product description preview..."}
                        </p>
                        <Button className="w-full mt-3 bg-primary text-white text-xs h-9">
                          {draft.ctaText || "Request Demo"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Fixed Footer at bottom */}
                <div className="shrink-0 flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4 bg-card/95 backdrop-blur-sm z-10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {editingId ? "Save Changes" : "Create Product"}
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

