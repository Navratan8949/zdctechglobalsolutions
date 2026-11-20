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
  FileCheck,
  Building2,
  Clock,
  Landmark,
  Layers,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ArrowUpRight,
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
  getAllRegistrationServicesAdmin,
  createRegistrationService,
  updateRegistrationService,
  deleteRegistrationService,
  seedDefaultRegistrationServices,
} from "@/service/registrationService.service";
import { type RegistrationServiceItem } from "@/data/registrationServices";

type RegistrationDraft = Omit<
  RegistrationServiceItem,
  "_id" | "id" | "createdAt" | "updatedAt"
>;

const emptyDraft: RegistrationDraft = {
  title: "",
  slug: "",
  category: "NGO Registration",
  shortDescription: "",
  fullDescription: "",
  sampleCertificateImage: {
    public_id: "",
    url: "",
  },
  governmentBody: "",
  processingTime: "7 - 10 Working Days",
  fee: "Starting from ₹4,999",
  benefits: [""],
  documentsRequired: [""],
  processSteps: [""],
  popular: false,
  order: 0,
  isActive: true,
};

const fallbackCertImage =
  "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80";

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

export default function AdminRegistrationServicesPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const { isDark } = useAdminTheme();

  const [services, setServices] = useState<RegistrationServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegistrationDraft>(emptyDraft);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [previewItem, setPreviewItem] = useState<RegistrationServiceItem | null>(
    null
  );

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllRegistrationServicesAdmin();
      const raw = unwrap<any>(response);
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.items)
        ? raw.items
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
  }, [isAuthenticated]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      ...emptyDraft,
      benefits: [""],
      documentsRequired: [""],
      processSteps: [""],
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: RegistrationServiceItem) => {
    setEditingId(item._id || item.id || null);
    setFormData({
      title: item.title || "",
      slug: item.slug || "",
      category: item.category || "NGO Registration",
      shortDescription: item.shortDescription || "",
      fullDescription: item.fullDescription || "",
      sampleCertificateImage: {
        public_id: item.sampleCertificateImage?.public_id || "",
        url: item.sampleCertificateImage?.url || "",
      },
      governmentBody: item.governmentBody || "",
      processingTime: item.processingTime || "7 - 10 Working Days",
      fee: item.fee || "Starting from ₹4,999",
      benefits:
        Array.isArray(item.benefits) && item.benefits.length > 0
          ? [...item.benefits]
          : [""],
      documentsRequired:
        Array.isArray(item.documentsRequired) && item.documentsRequired.length > 0
          ? [...item.documentsRequired]
          : [""],
      processSteps:
        Array.isArray(item.processSteps) && item.processSteps.length > 0
          ? [...item.processSteps]
          : [""],
      popular: Boolean(item.popular),
      order: typeof item.order === "number" ? item.order : 0,
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(emptyDraft);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    setIsSaving(true);
    setError(null);
    setFeedback(null);

    // Clean empty lines from array fields
    const cleanedDraft = {
      ...formData,
      slug:
        formData.slug.trim() ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      benefits: formData.benefits.map((b) => b.trim()).filter(Boolean),
      documentsRequired: formData.documentsRequired
        .map((d) => d.trim())
        .filter(Boolean),
      processSteps: formData.processSteps.map((p) => p.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        await updateRegistrationService(editingId, cleanedDraft);
        setFeedback("Registration service updated successfully!");
      } else {
        await createRegistrationService(cleanedDraft);
        setFeedback("Registration service created successfully!");
      }
      handleCloseForm();
      await fetchServices();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setError(null);
    setFeedback(null);
    try {
      await deleteRegistrationService(id);
      setFeedback(`"${title}" deleted successfully.`);
      await fetchServices();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !confirm(
        "Do you want to initialize/reset the 16 standard NGO & Company Registration services? Existing records will be refreshed."
      )
    ) {
      return;
    }

    setIsSeeding(true);
    setError(null);
    setFeedback(null);
    try {
      const res = await seedDefaultRegistrationServices();
      const count = unwrap<any>(res)?.count || 16;
      setFeedback(`Successfully seeded standard registration services (${count} records).`);
      await fetchServices();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSeeding(false);
    }
  };

  // Dynamic Array Handlers
  const handleArrayChange = (
    field: "benefits" | "documentsRequired" | "processSteps",
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const copy = [...prev[field]];
      copy[index] = value;
      return { ...prev, [field]: copy };
    });
  };

  const handleAddArrayItem = (
    field: "benefits" | "documentsRequired" | "processSteps"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveArrayItem = (
    field: "benefits" | "documentsRequired" | "processSteps",
    index: number
  ) => {
    setFormData((prev) => {
      const copy = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: copy.length > 0 ? copy : [""] };
    });
  };

  // Filtered Services
  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.governmentBody?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || srv.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const ngoCount = services.filter((s) => s.category === "NGO Registration").length;
  const companyCount = services.filter(
    (s) => s.category === "Company Registration"
  ).length;

  return (
    <AdminShell user={user}>
      <div className={`space-y-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        {/* Top Header Banner */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9]">
              Legal &amp; Certification
            </p>
            <h1
              className={`mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              NGO &amp; Company Registrations
            </h1>
            <p
              className={`mt-1 text-xs sm:text-sm max-w-2xl ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage government registration catalogs, document checklists, and review
              submitted client applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/contacts"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#0ea5e9]" />
              <span>View Inquiries / Applications</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>

            <Link
              href="/registration-services"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
              }`}
            >
              <Eye className="h-3.5 w-3.5 text-emerald-500" />
              <span>View Public Page</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <div
              className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <span>Total Services</span>
              <Layers className="h-4 w-4 text-[#0ea5e9]" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {services.length}
            </p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Active &amp; inactive offerings
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <div
              className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <span>NGO Registrations</span>
              <Landmark className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-500">{ngoCount}</p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Trust, Society, 12A/80G, CSR-1
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <div
              className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <span>Company Registrations</span>
              <Building2 className="h-4 w-4 text-blue-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-500">{companyCount}</p>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Pvt Ltd, LLP, GST, MSME, TM
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 flex flex-col justify-center gap-2 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <Button
              onClick={handleOpenAdd}
              className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-xs shadow-md shadow-[#0ea5e9]/20"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Registration
            </Button>
            <Button
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              variant="outline"
              className={`w-full text-xs font-medium ${
                isDark
                  ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                  : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              {isSeeding ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-[#0ea5e9]" />
              )}
              Restore Standard (16)
            </Button>
          </div>
        </div>

        {/* Feedback / Alert */}
        {feedback && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-600 dark:text-emerald-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <span>{feedback}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-emerald-600 dark:text-emerald-400 hover:opacity-80 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-red-600 dark:text-red-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 dark:text-red-400 hover:opacity-80 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Tabs Bar */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border transition-colors ${
            isDark
              ? "bg-slate-900/60 border-slate-800"
              : "bg-white border-slate-200 shadow-xs"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {(["All", "NGO Registration", "Company Registration"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? "bg-[#0ea5e9] text-white font-bold shadow-md shadow-[#0ea5e9]/20"
                      : isDark
                      ? "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {cat === "All" ? "All Services" : cat}
                </button>
              )
            )}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title, authority, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 h-9 text-xs transition-colors ${
                isDark
                  ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-[#0ea5e9]"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0ea5e9]"
              }`}
            />
          </div>
        </div>

        {/* List / Cards Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#0ea5e9] mb-3" />
            <p className="text-sm">Loading registration services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div
            className={`text-center py-16 border border-dashed rounded-2xl ${
              isDark
                ? "border-slate-800 bg-slate-900/30"
                : "border-slate-200 bg-slate-50/60"
            }`}
          >
            <FileCheck className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3
              className={`text-base font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              No registration services found
            </h3>
            <p
              className={`text-sm mt-1 max-w-sm mx-auto ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {searchQuery
                ? `No results matching "${searchQuery}". Try a different search.`
                : "No registration services available. Click 'Add Registration' or 'Restore Standard' to seed 16 services."}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Button
                onClick={handleOpenAdd}
                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add First Service
              </Button>
              <Button
                onClick={handleSeedDefaults}
                variant="outline"
                className={`text-xs ${
                  isDark
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Restore 16 Standard Services
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => {
              const id = service._id || service.id || "";
              const isNgo = service.category === "NGO Registration";
              const certImg =
                resolveImageUrl(service.sampleCertificateImage?.url) ||
                fallbackCertImage;

              return (
                <div
                  key={id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                    service.isActive
                      ? isDark
                        ? "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                        : "border-slate-200 bg-white hover:border-[#0ea5e9]/50 shadow-xs hover:shadow-md"
                      : isDark
                      ? "border-red-950/40 bg-slate-950/40 opacity-70"
                      : "border-red-200 bg-red-50/30 opacity-75"
                  }`}
                >
                  <div>
                    {/* Thumbnail & Header */}
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900 group">
                      <Image
                        src={certImg}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isNgo
                              ? "bg-emerald-600/90 text-white"
                              : "bg-blue-600/90 text-white"
                          }`}
                        >
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                            <Sparkles className="h-2.5 w-2.5" /> Popular
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            service.isActive
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {service.isActive ? "Active" : "Disabled"}
                        </span>
                      </div>

                      {/* Title on preview */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <h4 className="text-sm font-bold text-white line-clamp-1">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-cyan-300 font-medium line-clamp-1">
                          {service.governmentBody || "Govt Authority"}
                        </p>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-3">
                      <p
                        className={`text-xs line-clamp-2 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {service.shortDescription}
                      </p>

                      <div
                        className={`grid grid-cols-2 gap-2 text-[11px] pt-1 border-t ${
                          isDark
                            ? "border-slate-800 text-slate-300"
                            : "border-slate-100 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#0ea5e9]" />
                          <span className="truncate">{service.processingTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5 justify-end font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="truncate">{service.fee}</span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between text-[11px] p-2 rounded-lg border ${
                          isDark
                            ? "bg-slate-950/60 border-slate-800/80 text-slate-400"
                            : "bg-slate-50 border-slate-200/80 text-slate-600"
                        }`}
                      >
                        <span>
                          Docs:{" "}
                          <strong
                            className={isDark ? "text-white" : "text-slate-900"}
                          >
                            {service.documentsRequired?.length || 0}
                          </strong>
                        </span>
                        <span>
                          Benefits:{" "}
                          <strong
                            className={isDark ? "text-white" : "text-slate-900"}
                          >
                            {service.benefits?.length || 0}
                          </strong>
                        </span>
                        <span>
                          Steps:{" "}
                          <strong
                            className={isDark ? "text-white" : "text-slate-900"}
                          >
                            {service.processSteps?.length || 0}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div
                    className={`p-3 border-t flex items-center justify-between gap-2 ${
                      isDark
                        ? "bg-slate-950/80 border-slate-800"
                        : "bg-slate-50/90 border-slate-100"
                    }`}
                  >
                    <button
                      onClick={() => setPreviewItem(service)}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${
                        isDark
                          ? "text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
                          : "text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5 text-[#0ea5e9]" /> View
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(service)}
                        className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${
                          isDark
                            ? "text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
                            : "text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs"
                        }`}
                      >
                        <Edit className="h-3.5 w-3.5 text-blue-500" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id, service.title)}
                        className={`px-2.5 py-1 text-xs rounded-md transition-all flex items-center gap-1 ${
                          isDark
                            ? "text-red-400 hover:text-white hover:bg-red-600"
                            : "text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-100"
                        }`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Add / Edit Registration Service */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div
              className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl transition-colors ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 text-[#0ea5e9]">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {editingId
                        ? "Edit Registration Service"
                        : "Add New Registration Service"}
                    </h3>
                    <p
                      className={`text-xs ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Configure legal certification details, checklists, fees, and
                      guidelines.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseForm}
                  className={`rounded-lg p-1.5 transition-colors ${
                    isDark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-5 space-y-6">
                {/* 1. Core Category & Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
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
                      className={`w-full h-10 px-3 rounded-lg border text-xs focus:outline-none focus:border-[#0ea5e9] ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    >
                      <option value="NGO Registration">NGO Registration</option>
                      <option value="Company Registration">
                        Company Registration
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Service / Certificate Title *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Trust Registration Certificate / Pvt Ltd Company"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                {/* 2. Slug, Authority, Timeline, Fee */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Slug (URL key)
                    </label>
                    <Input
                      type="text"
                      placeholder="auto-generated from title"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Government Body
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. MCA, Income Tax, NITI Aayog"
                      value={formData.governmentBody}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          governmentBody: e.target.value,
                        })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Processing Time
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 7 - 10 Working Days"
                      value={formData.processingTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          processingTime: e.target.value,
                        })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Starting Fee
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Starting from ₹4,999"
                      value={formData.fee}
                      onChange={(e) =>
                        setFormData({ ...formData, fee: e.target.value })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                {/* 3. Short & Full Description */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Short Description (Card summary) *
                    </label>
                    <Textarea
                      rows={2}
                      placeholder="Brief overview shown on cards and listings..."
                      value={formData.shortDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortDescription: e.target.value,
                        })
                      }
                      required
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Full In-Depth Description
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Comprehensive details, legal eligibility, act/section references, and compliance guidelines..."
                      value={formData.fullDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullDescription: e.target.value,
                        })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>
                </div>

                {/* 4. Certificate Preview Image */}
                <div
                  className={`space-y-2 rounded-xl border p-4 ${
                    isDark
                      ? "border-slate-800 bg-slate-950/60"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Sample Certificate / Portal Image
                      </h4>
                      <p
                        className={`text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Upload or provide a high-resolution sample certificate or
                        Govt portal banner.
                      </p>
                    </div>
                  </div>
                  <ImageUploadField
                    publicId={formData.sampleCertificateImage?.public_id || ""}
                    url={formData.sampleCertificateImage?.url || ""}
                    onChange={(publicId, url) =>
                      setFormData({
                        ...formData,
                        sampleCertificateImage: { public_id: publicId, url },
                      })
                    }
                    label="Sample Certificate Preview"
                  />
                </div>

                {/* 5. Key Benefits (Dynamic List) */}
                <div
                  className={`space-y-2 rounded-xl border p-4 ${
                    isDark
                      ? "border-slate-800 bg-slate-950/60"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Key Benefits &amp; Advantages
                      </h4>
                      <p
                        className={`text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Bullet points explaining why clients need this certificate.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleAddArrayItem("benefits")}
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${
                        isDark
                          ? "border-slate-700 bg-slate-800 text-cyan-300 hover:bg-slate-700"
                          : "border-slate-200 bg-white text-[#0ea5e9] hover:bg-slate-50 shadow-xs"
                      }`}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Benefit
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder={`Benefit #${idx + 1}`}
                          value={benefit}
                          onChange={(e) =>
                            handleArrayChange("benefits", idx, e.target.value)
                          }
                          className={`text-xs ${
                            isDark
                              ? "bg-slate-900 border-slate-800 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("benefits", idx)}
                          className="p-2 rounded text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Documents Checklist (Dynamic List) */}
                <div
                  className={`space-y-2 rounded-xl border p-4 ${
                    isDark
                      ? "border-slate-800 bg-slate-950/60"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Required Documents Checklist
                      </h4>
                      <p
                        className={`text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Specific documents needed from the client to apply.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleAddArrayItem("documentsRequired")}
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${
                        isDark
                          ? "border-slate-700 bg-slate-800 text-emerald-300 hover:bg-slate-700"
                          : "border-slate-200 bg-white text-emerald-600 hover:bg-slate-50 shadow-xs"
                      }`}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Document
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.documentsRequired.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder={`Document #${idx + 1} (e.g. Aadhar & PAN Card)`}
                          value={doc}
                          onChange={(e) =>
                            handleArrayChange(
                              "documentsRequired",
                              idx,
                              e.target.value
                            )
                          }
                          className={`text-xs ${
                            isDark
                              ? "bg-slate-900 border-slate-800 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveArrayItem("documentsRequired", idx)
                          }
                          className="p-2 rounded text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Process Steps (Dynamic List) */}
                <div
                  className={`space-y-2 rounded-xl border p-4 ${
                    isDark
                      ? "border-slate-800 bg-slate-950/60"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`text-xs font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Step-by-Step Approval Process
                      </h4>
                      <p
                        className={`text-[11px] ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Step-by-step workflow from documentation to certificate
                        delivery.
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleAddArrayItem("processSteps")}
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${
                        isDark
                          ? "border-slate-700 bg-slate-800 text-blue-300 hover:bg-slate-700"
                          : "border-slate-200 bg-white text-blue-600 hover:bg-slate-50 shadow-xs"
                      }`}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Step
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {formData.processSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder={`Step #${idx + 1} (e.g. Free Consultation & Document Collection)`}
                          value={step}
                          onChange={(e) =>
                            handleArrayChange("processSteps", idx, e.target.value)
                          }
                          className={`text-xs ${
                            isDark
                              ? "bg-slate-900 border-slate-800 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveArrayItem("processSteps", idx)
                          }
                          className="p-2 rounded text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Toggles & Order */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Display Order (Ascending)
                    </label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white"
                          : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="popular-check"
                      checked={formData.popular}
                      onChange={(e) =>
                        setFormData({ ...formData, popular: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                    />
                    <label
                      htmlFor="popular-check"
                      className={`text-xs font-semibold cursor-pointer ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Mark as Popular / Featured
                    </label>
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="active-check"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="active-check"
                      className={`text-xs font-semibold cursor-pointer ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Service is Active (Visible on Website)
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div
                  className={`flex items-center justify-end gap-3 pt-4 border-t ${
                    isDark ? "border-slate-800" : "border-slate-200"
                  }`}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseForm}
                    className={`text-xs ${
                      isDark
                        ? "border-slate-800 text-slate-300 hover:bg-slate-800"
                        : "border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-xs shadow-md shadow-[#0ea5e9]/20"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    )}
                    {editingId ? "Save Changes" : "Create Service"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Preview Certificate Details */}
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <div
              className={`relative w-full max-w-2xl rounded-2xl border p-6 shadow-2xl transition-colors ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <div
                className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      previewItem.category === "NGO Registration"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                        : "bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {previewItem.category}
                  </span>
                  <h3
                    className={`text-base font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {previewItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className={`rounded-lg p-1.5 transition-colors ${
                    isDark
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900">
                  <Image
                    src={
                      resolveImageUrl(previewItem.sampleCertificateImage?.url) ||
                      fallbackCertImage
                    }
                    alt={previewItem.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p
                  className={`text-xs ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  {previewItem.fullDescription || previewItem.shortDescription}
                </p>

                <div
                  className={`grid grid-cols-3 gap-3 p-3 rounded-xl border text-xs ${
                    isDark
                      ? "bg-slate-950 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Authority
                    </span>
                    <span
                      className={`font-medium ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {previewItem.governmentBody}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Timeline
                    </span>
                    <span className="text-[#0ea5e9] font-medium">
                      {previewItem.processingTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">
                      Starting Fee
                    </span>
                    <span className="text-emerald-500 font-bold">
                      {previewItem.fee}
                    </span>
                  </div>
                </div>

                <div>
                  <h4
                    className={`text-xs font-bold mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    Required Documents Checklist
                  </h4>
                  <ul
                    className={`space-y-1.5 text-xs ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {previewItem.documentsRequired?.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`mt-5 pt-3 border-t flex justify-end ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <Button
                  onClick={() => setPreviewItem(null)}
                  className={`text-xs ${
                    isDark
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
