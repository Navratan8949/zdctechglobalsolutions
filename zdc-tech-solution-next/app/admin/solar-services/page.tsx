"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  Eye,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  ExternalLink,
  Sun,
  Zap,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Home,
  Factory,
  Wrench,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { resolveImageUrl } from "@/lib/utils";
import {
  getAllSolarServicesAdmin,
  createSolarService,
  updateSolarService,
  deleteSolarService,
  seedDefaultSolarServices,
  type SolarServiceItem,
  type SolarServicePayload,
} from "@/service/solarService.service";

const fallbackSolarImage =
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1000&q=80";

const emptyDraft: SolarServicePayload = {
  title: "",
  slug: "",
  category: "Residential Solar",
  badge: "1 kW - 10 kW",
  capacity: "1 kW - 10 kW",
  shortDescription: "",
  fullDescription: "",
  image: {
    public_id: "",
    url: fallbackSolarImage,
  },
  fee: "Starting from ₹50,000 / kW",
  subsidy: "Up to ₹78,000 (PM Surya Ghar)",
  features: [""],
  popular: false,
  order: 0,
  isActive: true,
};

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

export default function AdminSolarServicesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const { isDark } = useAdminTheme();

  const [services, setServices] = useState<SolarServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SolarServicePayload>(emptyDraft);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllSolarServicesAdmin({
        category: categoryFilter !== "All" ? categoryFilter : undefined,
        search: searchQuery || undefined,
      });
      const raw = unwrap<any>(response);
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      setServices(list);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
    }
  }, [isAuthenticated, categoryFilter]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyDraft, order: services.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SolarServiceItem) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "Residential Solar",
      badge: item.badge || "1 kW - 10 kW",
      capacity: item.capacity || item.badge || "1 kW - 10 kW",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      image: item.image || { public_id: "", url: fallbackSolarImage },
      fee: item.fee || "Starting from ₹50,000 / kW",
      subsidy: item.subsidy || "Up to ₹78,000 (PM Surya Ghar)",
      features:
        item.features && item.features.length > 0 ? item.features : [""],
      popular: !!item.popular,
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(emptyDraft);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Package title is required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setFeedback(null);

    const payload: SolarServicePayload = {
      ...formData,
      slug:
        formData.slug.trim() ||
        formData.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-"),
      features: formData.features.filter((f) => f.trim().length > 0),
    };

    try {
      if (editingId) {
        await updateSolarService(editingId, payload);
        setFeedback("Solar offering updated successfully!");
      } else {
        await createSolarService(payload);
        setFeedback("New Solar offering added successfully!");
      }
      handleCloseModal();
      fetchServices();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This will permanently remove it from the website.`
      )
    ) {
      return;
    }

    setError(null);
    setFeedback(null);
    try {
      await deleteSolarService(id);
      setFeedback(`"${title}" deleted successfully.`);
      setServices((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !confirm(
        "This will reset all Solar Offerings to the standard 3 packages (Residential, Commercial, AMC). Continue?"
      )
    ) {
      return;
    }

    setIsSeeding(true);
    setError(null);
    setFeedback(null);
    try {
      await seedDefaultSolarServices();
      setFeedback("Standard Solar Offerings seeded successfully!");
      fetchServices();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSeeding(false);
    }
  };

  // Form Array Field Helpers
  const handleFeatureChange = (index: number, val: string) => {
    const next = [...formData.features];
    next[index] = val;
    setFormData({ ...formData, features: next });
  };

  const addFeatureRow = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeatureRow = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  // Filtered List
  const filtered = services.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.shortDescription?.toLowerCase().includes(q) ||
      item.badge?.toLowerCase().includes(q);
    const matchesCat =
      categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalCount = services.length;
  const activeCount = services.filter((s) => s.isActive).length;
  const residentialCount = services.filter(
    (s) => s.category === "Residential Solar"
  ).length;
  const commercialCount = services.filter(
    (s) => s.category === "Commercial & Industrial"
  ).length;

  return (
    <AdminShell user={user}>
      <div className={`space-y-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Solar Solutions Content</span>
            </div>
            <h1
              className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Solar Services &amp; Packages
            </h1>
            <p
              className={`mt-1 text-xs sm:text-sm max-w-2xl ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Upload, manage, and update solar offerings, custom banners, pricing, capacity tiers, and key specifications shown on the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/services/solar-panel-installation"
              target="_blank"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
              }`}
            >
              <ExternalLink className="h-3.5 w-3.5 text-amber-500" />
              <span>Live Solar Page</span>
            </Link>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className={`text-xs gap-1.5 ${
                isDark
                  ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{isSeeding ? "Seeding..." : "Seed Standard (3)"}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleOpenAdd}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add Solar Package</span>
            </Button>
          </div>
        </div>

        {/* Feedback / Error Alerts */}
        {feedback && (
          <div
            className={`flex items-center justify-between rounded-xl p-3.5 text-xs sm:text-sm border transition-all ${
              isDark
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{feedback}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {error && (
          <div
            className={`flex items-center justify-between rounded-xl p-3.5 text-xs sm:text-sm border transition-all ${
              isDark
                ? "bg-rose-950/40 border-rose-500/30 text-rose-300"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div
            className={`rounded-xl border p-4 transition-all ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Total Packages
              </span>
              <Layers className="h-4 w-4 text-amber-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {totalCount}
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-all ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-emerald-400" : "text-emerald-600"
                }`}
              >
                Active on Site
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              {activeCount}
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-all ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-sky-400" : "text-sky-600"
                }`}
              >
                Residential Home
              </span>
              <Home className="h-4 w-4 text-[#0ea5e9]" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-sky-400" : "text-sky-600"
              }`}
            >
              {residentialCount}
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-all ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium ${
                  isDark ? "text-purple-400" : "text-purple-600"
                }`}
              >
                Commercial &amp; C&amp;I
              </span>
              <Factory className="h-4 w-4 text-purple-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            >
              {commercialCount}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className={`rounded-xl border p-3 sm:p-4 space-y-3 transition-all ${
            isDark
              ? "bg-slate-900/60 border-slate-800"
              : "bg-white border-slate-200 shadow-xs"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search packages by title, capacity or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 text-xs sm:text-sm h-9 ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-500"
                    : "bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fetchServices}
                disabled={isLoading}
                className={`text-xs gap-1.5 h-9 ${
                  isDark
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
            {[
              "All",
              "Residential Solar",
              "Commercial & Industrial",
              "Solar Maintenance & AMC",
              "Agricultural Solar",
              "Off-Grid Battery System",
            ].map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-amber-500 text-white shadow-xs font-semibold"
                      : isDark
                      ? "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div
            className={`flex flex-col items-center justify-center p-16 rounded-xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p
              className={`mt-3 text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Loading solar offerings...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center p-16 text-center rounded-xl border ${
              isDark
                ? "bg-slate-900/60 border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <Sun className="h-12 w-12 text-slate-400 mb-3 stroke-[1.5]" />
            <h3
              className={`text-sm font-semibold ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              No solar packages found
            </h3>
            <p
              className={`text-xs max-w-sm mt-1 mb-4 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Click &quot;Seed Standard (3)&quot; to instantly populate the 3 verified solar offerings, or click &quot;Add Solar Package&quot; to create a custom one.
            </p>
            <Button
              onClick={handleSeedDefaults}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Seed Standard (3) Offerings
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const displayImg = resolveImageUrl(
                item.image?.url || fallbackSolarImage
              );
              return (
                <div
                  key={item._id}
                  className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                    isDark
                      ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                      : "bg-white border-slate-200 shadow-xs hover:border-[#0ea5e9]/50 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                      <Image
                        src={displayImg}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-amber-500 text-slate-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                          {item.badge || item.capacity || "1 kW - 10 kW"}
                        </span>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md border ${
                            item.isActive
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-slate-800/80 text-slate-400 border-slate-700"
                          }`}
                        >
                          {item.isActive ? "Active on Site" : "Draft / Inactive"}
                        </span>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3
                          className={`font-display text-base font-bold line-clamp-1 ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1 text-xs line-clamp-2 leading-relaxed ${
                            isDark ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {item.shortDescription}
                        </p>
                      </div>

                      {/* Pricing & Subsidy pills */}
                      <div
                        className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                          isDark
                            ? "bg-slate-800/50 border-slate-800 text-slate-300"
                            : "bg-slate-50 border-slate-100 text-slate-700"
                        }`}
                      >
                        {item.fee && (
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              Estimated Price:
                            </span>
                            <span className="font-bold text-amber-500">
                              {item.fee}
                            </span>
                          </div>
                        )}
                        {item.subsidy && (
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                              Govt Subsidy:
                            </span>
                            <span className="font-semibold text-emerald-500 text-[11px]">
                              {item.subsidy}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features Preview */}
                      {item.features && item.features.length > 0 && (
                        <div className="space-y-1 pt-1">
                          {item.features.slice(0, 3).map((feat, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate"
                            >
                              <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                          {item.features.length > 3 && (
                            <p className="text-[10px] text-slate-400 pl-4.5">
                              +{item.features.length - 3} more specs
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div
                    className={`p-3 border-t flex items-center justify-between gap-2 ${
                      isDark ? "border-slate-800/80" : "border-slate-100"
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">
                      /{item.slug}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(item)}
                        className={`text-xs gap-1 h-7 px-2.5 ${
                          isDark
                            ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item._id, item.title)}
                        className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 h-7 px-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Add / Edit Solar Offering */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
            <div
              className={`relative w-full max-w-2xl rounded-2xl border p-6 my-8 shadow-2xl transition-all ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-slate-100"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Sun className="h-5 w-5 text-amber-500" />
                <h2 className="font-display text-lg sm:text-xl font-bold">
                  {editingId ? "Edit Solar Offering" : "Add New Solar Package"}
                </h2>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Package Title *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Residential Rooftop Solar"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className={`w-full rounded-md border text-xs sm:text-sm px-3 py-2 font-medium ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-slate-200"
                          : "bg-white border-slate-300 text-slate-800"
                      }`}
                    >
                      <option value="Residential Solar">Residential Solar</option>
                      <option value="Commercial & Industrial">
                        Commercial &amp; Industrial
                      </option>
                      <option value="Solar Maintenance & AMC">
                        Solar Maintenance &amp; AMC
                      </option>
                      <option value="Agricultural Solar">
                        Agricultural Solar
                      </option>
                      <option value="Off-Grid Battery System">
                        Off-Grid Battery System
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Capacity / Badge *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 1 kW - 10 kW"
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: e.target.value,
                          capacity: e.target.value,
                        })
                      }
                      required
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Starting Price / Fee
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Starting from ₹50,000 / kW"
                      value={formData.fee}
                      onChange={(e) =>
                        setFormData({ ...formData, fee: e.target.value })
                      }
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Govt Subsidy / Benefit
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Up to ₹78,000 (PM Surya Ghar)"
                      value={formData.subsidy}
                      onChange={(e) =>
                        setFormData({ ...formData, subsidy: e.target.value })
                      }
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Image Upload using ImageUploadField */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Solar Package Banner Image (Upload or Cloudinary)
                  </label>
                  <ImageUploadField
                    publicId={formData.image?.public_id || ""}
                    url={formData.image?.url || fallbackSolarImage}
                    onChange={(publicId, url) =>
                      setFormData({
                        ...formData,
                        image: { public_id: publicId, url },
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Short Description *
                  </label>
                  <Textarea
                    placeholder="Brief description shown on cards (2-3 lines)..."
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    rows={2}
                    required
                    className="text-xs sm:text-sm"
                  />
                </div>

                {/* Key Features / Bullet points */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold">
                      Key Specifications &amp; Benefits (Bullet Points)
                    </label>
                    <button
                      type="button"
                      onClick={addFeatureRow}
                      className="text-xs text-amber-500 hover:underline font-semibold"
                    >
                      + Add Feature
                    </button>
                  </div>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {formData.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder="e.g. High efficiency Mono PERC & TopCon panels"
                          value={feat}
                          onChange={(e) =>
                            handleFeatureChange(idx, e.target.value)
                          }
                          className="text-xs h-8"
                        />
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeatureRow(idx)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) =>
                        setFormData({ ...formData, popular: e.target.checked })
                      }
                      className="rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>Highlight as Popular</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>Active (Visible on Website)</span>
                  </label>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingId ? "Update Package" : "Create Package"}</span>
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

