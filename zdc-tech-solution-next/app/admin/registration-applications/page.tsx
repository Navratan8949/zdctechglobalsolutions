"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck,
  Filter,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
  ExternalLink,
  Save,
  CheckCircle,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllRegistrationApplications,
  updateRegistrationApplication,
  deleteRegistrationApplication,
  type RegistrationApplicationItem,
} from "@/service/registrationApplication.service";

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

function formatDate(value?: string) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const statusBadgeStyles: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/30",
    label: "Pending",
  },
  in_review: {
    bg: "bg-sky-500/10",
    text: "text-sky-500 dark:text-sky-400",
    border: "border-sky-500/30",
    label: "In Review",
  },
  contacted: {
    bg: "bg-blue-500/10",
    text: "text-blue-500 dark:text-blue-400",
    border: "border-blue-500/30",
    label: "Contacted",
  },
  in_progress: {
    bg: "bg-purple-500/10",
    text: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/30",
    label: "In Progress",
  },
  completed: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-500/30",
    label: "Completed",
  },
  cancelled: {
    bg: "bg-rose-500/10",
    text: "text-rose-500 dark:text-rose-400",
    border: "border-rose-500/30",
    label: "Cancelled",
  },
};

export default function RegistrationApplicationsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const { isDark } = useAdminTheme();

  const [applications, setApplications] = useState<RegistrationApplicationItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<RegistrationApplicationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Editing state for selected application
  const [editStatus, setEditStatus] = useState<string>("pending");
  const [editAdminNotes, setEditAdminNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllRegistrationApplications();
      const raw = unwrap<any>(response);
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      setApplications(list);
      if (list.length > 0 && !selectedApp) {
        setSelectedApp(list[0]);
        setEditStatus(list[0].status || "pending");
        setEditAdminNotes(list[0].adminNotes || "");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  const handleSelectApplication = (item: RegistrationApplicationItem) => {
    setSelectedApp(item);
    setEditStatus(item.status || "pending");
    setEditAdminNotes(item.adminNotes || "");
    setFeedback(null);
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedApp) return;
    setIsUpdating(true);
    setError(null);
    setFeedback(null);

    try {
      const res = await updateRegistrationApplication(selectedApp._id, {
        status: editStatus,
        adminNotes: editAdminNotes,
      });
      const updated = unwrap<any>(res);
      setFeedback("Application status and notes updated successfully!");

      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApp._id
            ? { ...app, status: editStatus as any, adminNotes: editAdminNotes }
            : app
        )
      );

      setSelectedApp((prev) =>
        prev
          ? { ...prev, status: editStatus as any, adminNotes: editAdminNotes }
          : null
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete application from "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setError(null);
    setFeedback(null);
    try {
      await deleteRegistrationApplication(id);
      setFeedback(`Application from "${name}" deleted successfully.`);
      const remaining = applications.filter((app) => app._id !== id);
      setApplications(remaining);
      if (selectedApp?._id === id) {
        setSelectedApp(remaining[0] || null);
        if (remaining[0]) {
          setEditStatus(remaining[0].status || "pending");
          setEditAdminNotes(remaining[0].adminNotes || "");
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // Filtered List
  const filtered = applications.filter((app) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.name?.toLowerCase().includes(q) ||
      app.phone?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.city?.toLowerCase().includes(q) ||
      app.serviceTitle?.toLowerCase().includes(q) ||
      app.message?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || app.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Metrics
  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const inProgressCount = applications.filter(
    (a) => a.status === "in_progress" || a.status === "in_review" || a.status === "contacted"
  ).length;
  const completedCount = applications.filter((a) => a.status === "completed").length;

  return (
    <AdminShell user={user}>
      <div className={`space-y-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0ea5e9]">
              Inquiries &amp; Leads
            </p>
            <h1
              className={`mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Registration Applications
            </h1>
            <p
              className={`mt-1 text-xs sm:text-sm max-w-2xl ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Dedicated dashboard for client applications submitted for NGO and Company
              registrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/registration-services"
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all border ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs"
              }`}
            >
              <FileCheck className="h-3.5 w-3.5 text-[#0ea5e9]" />
              <span>Manage Services Catalog</span>
            </Link>

            <Button
              onClick={fetchApplications}
              variant="outline"
              size="sm"
              className={`text-xs ${
                isDark
                  ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Total Applications
            </span>
            <p
              className={`mt-2 text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {totalCount}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">From website portal</p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
              Pending Action
            </span>
            <p className="mt-2 text-2xl font-bold text-amber-500">{pendingCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Requires follow-up</p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              In Progress
            </span>
            <p className="mt-2 text-2xl font-bold text-blue-500">{inProgressCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Filing &amp; documents</p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-colors ${
              isDark
                ? "border-slate-800 bg-slate-900/60"
                : "border-slate-200 bg-white shadow-xs"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
              Completed
            </span>
            <p className="mt-2 text-2xl font-bold text-emerald-500">{completedCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Certificates issued</p>
          </div>
        </div>

        {/* Feedback / Error */}
        {feedback && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-600 dark:text-emerald-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
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
              <AlertCircle className="h-4 w-4 shrink-0" />
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

        {/* Filter & Search Bar */}
        <div
          className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-xl border transition-colors ${
            isDark
              ? "bg-slate-900/60 border-slate-800"
              : "bg-white border-slate-200 shadow-xs"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Tabs */}
            {(["All", "pending", "in_progress", "completed"] as const).map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize ${
                    statusFilter === st
                      ? "bg-[#0ea5e9] text-white font-bold shadow-xs"
                      : isDark
                      ? "bg-slate-800 text-slate-400 hover:text-white"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {st === "All"
                    ? "All Status"
                    : st === "in_progress"
                    ? "In Progress"
                    : st}
                </button>
              )
            )}

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`h-7 px-2.5 rounded-lg border text-xs focus:outline-none ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-slate-200"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <option value="All">All Categories</option>
              <option value="NGO Registration">NGO Registrations</option>
              <option value="Company Registration">Company Registrations</option>
            </select>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search name, phone, city, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 h-8 text-xs transition-colors ${
                isDark
                  ? "bg-slate-950 border-slate-700 text-white placeholder-slate-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
              }`}
            />
          </div>
        </div>

        {/* Master-Detail Workspace Layout */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#0ea5e9] mb-3" />
            <p className="text-sm">Loading applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className={`text-center py-16 border border-dashed rounded-2xl ${
              isDark
                ? "border-slate-800 bg-slate-900/30"
                : "border-slate-200 bg-slate-50/60"
            }`}
          >
            <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3
              className={`text-base font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              No registration applications found
            </h3>
            <p
              className={`text-xs mt-1 max-w-sm mx-auto ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {searchQuery || statusFilter !== "All" || categoryFilter !== "All"
                ? "No applications matching the active filters. Try clearing search or status."
                : "When users apply for NGO or Company registrations on your website, their submissions will appear here in detail."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Applications List (5 cols) */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[800px] overflow-y-auto pr-1">
              {filtered.map((item) => {
                const isSelected = selectedApp?._id === item._id;
                const statusMeta =
                  statusBadgeStyles[item.status] || statusBadgeStyles.pending;

                return (
                  <div
                    key={item._id}
                    onClick={() => handleSelectApplication(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? "border-[#0ea5e9] ring-2 ring-[#0ea5e9]/20 " +
                          (isDark ? "bg-slate-800/80" : "bg-blue-50/50")
                        : isDark
                        ? "border-slate-800 bg-slate-900/60 hover:bg-slate-800/50"
                        : "border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4
                          className={`text-sm font-bold line-clamp-1 ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#0ea5e9] font-medium line-clamp-1 mt-0.5">
                          {item.serviceTitle}
                        </p>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {item.phone}
                      </span>
                      {item.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.city}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{item.category || "Registration"}</span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Application In-Depth Details (7 cols) */}
            {selectedApp ? (
              <div
                className={`lg:col-span-7 rounded-2xl border p-6 transition-colors ${
                  isDark
                    ? "border-slate-800 bg-slate-900/80"
                    : "border-slate-200 bg-white shadow-xs"
                }`}
              >
                {/* Header of Detail Pane */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-200 dark:border-slate-800 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          selectedApp.category === "NGO Registration"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {selectedApp.category || "Registration"}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Received on {formatDate(selectedApp.createdAt)}
                      </span>
                    </div>
                    <h2
                      className={`text-xl font-bold mt-1 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {selectedApp.name}
                    </h2>
                  </div>

                  {/* Quick Action CTA Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Direct WhatsApp Link */}
                    {selectedApp.phone && (
                      <a
                        href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                        title="Open WhatsApp chat with client"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {/* Direct Call Link */}
                    {selectedApp.phone && (
                      <a
                        href={`tel:${selectedApp.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-bold transition-all shadow-xs"
                        title="Call applicant directly"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call</span>
                      </a>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={() =>
                        handleDelete(selectedApp._id, selectedApp.name)
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete this application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Information Grid: Focused specifically on Registration */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "border-slate-800 bg-slate-950/60"
                        : "border-slate-100 bg-slate-50/80"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Applicant Full Name
                    </span>
                    <p
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      <User className="h-4 w-4 text-[#0ea5e9]" />
                      {selectedApp.name}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "border-slate-800 bg-slate-950/60"
                        : "border-slate-100 bg-slate-50/80"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Phone / WhatsApp Number
                    </span>
                    <p
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      <Phone className="h-4 w-4 text-emerald-500" />
                      {selectedApp.phone}
                    </p>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "border-slate-800 bg-slate-950/60"
                        : "border-slate-100 bg-slate-50/80"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="text-sm font-semibold text-[#0ea5e9] hover:underline flex items-center gap-2 truncate"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="truncate">{selectedApp.email}</span>
                    </a>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "border-slate-800 bg-slate-950/60"
                        : "border-slate-100 bg-slate-50/80"
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      City / State
                    </span>
                    <p
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-rose-500" />
                      {selectedApp.city || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Applied Service Banner */}
                <div className="mt-4 p-4 rounded-xl border border-[#0ea5e9]/30 bg-[#0ea5e9]/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0ea5e9]">
                      Selected Registration Service
                    </span>
                    <h3
                      className={`text-base font-bold mt-0.5 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {selectedApp.serviceTitle}
                    </h3>
                  </div>
                  <FileCheck className="h-6 w-6 text-[#0ea5e9] shrink-0" />
                </div>

                {/* Client's Message / Requirements */}
                <div className="mt-4">
                  <span className="text-xs font-semibold text-slate-400 block mb-1.5">
                    Client's Note / Requirements:
                  </span>
                  <div
                    className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isDark
                        ? "border-slate-800 bg-slate-950/80 text-slate-300"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {selectedApp.message || "No additional message submitted."}
                  </div>
                </div>

                {/* Status & Admin Notes Update Form */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        className={`text-xs font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Application Processing Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className={`w-full h-10 px-3 rounded-lg border text-xs font-semibold focus:outline-none focus:border-[#0ea5e9] ${
                          isDark
                            ? "bg-slate-950 border-slate-800 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-900"
                        }`}
                      >
                        <option value="pending">Pending (New)</option>
                        <option value="in_review">In Review (Documents checking)</option>
                        <option value="contacted">Contacted (Spoke with client)</option>
                        <option value="in_progress">In Progress (Filed on Portal)</option>
                        <option value="completed">Completed (Certificate Issued)</option>
                        <option value="cancelled">Cancelled / Ineligible</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        className={`text-xs font-bold ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Quick Action
                      </label>
                      <Button
                        onClick={handleUpdateStatusAndNotes}
                        disabled={isUpdating}
                        className="w-full h-10 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold text-xs shadow-md shadow-[#0ea5e9]/20"
                      >
                        {isUpdating ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                        ) : (
                          <Save className="h-4 w-4 mr-1.5" />
                        )}
                        Save Status &amp; Remarks
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-xs font-bold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Internal Legal Remarks &amp; Progress Notes (Admin Only)
                    </label>
                    <Textarea
                      rows={3}
                      placeholder="e.g. Spoke to client on 20th Nov. Aadhar, PAN and Electricity bill received. Trust deed drafting in progress."
                      value={editAdminNotes}
                      onChange={(e) => setEditAdminNotes(e.target.value)}
                      className={`text-xs ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                          : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

