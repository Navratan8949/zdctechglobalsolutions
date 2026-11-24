"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
  ExternalLink,
  Save,
  Sun,
  Zap,
  Home,
  Building2,
  Factory,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllSolarInquiries,
  updateSolarInquiry,
  deleteSolarInquiry,
  type SolarInquiryItem,
} from "@/service/solarInquiry.service";

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
  new: {
    bg: "bg-amber-500/10",
    text: "text-amber-500 dark:text-amber-400",
    border: "border-amber-500/30",
    label: "New Lead",
  },
  survey_scheduled: {
    bg: "bg-sky-500/10",
    text: "text-sky-500 dark:text-sky-400",
    border: "border-sky-500/30",
    label: "Survey Scheduled",
  },
  quotation_sent: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-500 dark:text-indigo-400",
    border: "border-indigo-500/30",
    label: "Quotation Sent",
  },
  in_installation: {
    bg: "bg-purple-500/10",
    text: "text-purple-500 dark:text-purple-400",
    border: "border-purple-500/30",
    label: "In Installation",
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

export default function SolarInquiriesAdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const { isDark } = useAdminTheme();

  const [inquiries, setInquiries] = useState<SolarInquiryItem[]>([]);
  const [selectedInquiry, setSelectedInquiry] =
    useState<SolarInquiryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All");

  // Editing state for selected inquiry
  const [editStatus, setEditStatus] = useState<string>("new");
  const [editAdminNotes, setEditAdminNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllSolarInquiries();
      const raw = unwrap<any>(response);
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.data)
        ? raw.data
        : [];
      setInquiries(list);
      if (list.length > 0 && !selectedInquiry) {
        setSelectedInquiry(list[0]);
        setEditStatus(list[0].status || "new");
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
      fetchInquiries();
    }
  }, [isAuthenticated]);

  const handleSelectInquiry = (item: SolarInquiryItem) => {
    setSelectedInquiry(item);
    setEditStatus(item.status || "new");
    setEditAdminNotes(item.adminNotes || "");
    setFeedback(null);
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    setError(null);
    setFeedback(null);

    try {
      await updateSolarInquiry(selectedInquiry._id, {
        status: editStatus,
        adminNotes: editAdminNotes,
      });
      setFeedback("Inquiry status and notes updated successfully!");

      setInquiries((prev) =>
        prev.map((item) =>
          item._id === selectedInquiry._id
            ? { ...item, status: editStatus as any, adminNotes: editAdminNotes }
            : item
        )
      );

      setSelectedInquiry((prev) =>
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
        `Are you sure you want to delete inquiry from "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setError(null);
    setFeedback(null);
    try {
      await deleteSolarInquiry(id);
      setFeedback(`Solar inquiry from "${name}" deleted successfully.`);
      const remaining = inquiries.filter((item) => item._id !== id);
      setInquiries(remaining);
      if (selectedInquiry?._id === id) {
        setSelectedInquiry(remaining[0] || null);
        if (remaining[0]) {
          setEditStatus(remaining[0].status || "new");
          setEditAdminNotes(remaining[0].adminNotes || "");
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  // Filtered List
  const filtered = inquiries.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.fullName?.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.city?.toLowerCase().includes(q) ||
      item.state?.toLowerCase().includes(q) ||
      item.propertyType?.toLowerCase().includes(q) ||
      item.systemType?.toLowerCase().includes(q) ||
      item.monthlyBill?.toLowerCase().includes(q) ||
      item.estimatedCapacity?.toLowerCase().includes(q) ||
      item.message?.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    const matchesProperty =
      propertyFilter === "All" || item.propertyType === propertyFilter;

    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((a) => a.status === "new").length;
  const surveyScheduledCount = inquiries.filter(
    (a) => a.status === "survey_scheduled"
  ).length;
  const inProgressCount = inquiries.filter(
    (a) => a.status === "quotation_sent" || a.status === "in_installation"
  ).length;
  const completedCount = inquiries.filter((a) => a.status === "completed").length;

  return (
    <AdminShell user={user}>
      <div className={`space-y-6 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>Solar Leads &amp; Surveys</span>
            </div>
            <h1
              className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Solar Installation Inquiries
            </h1>
            <p
              className={`mt-1 text-xs sm:text-sm max-w-2xl ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Manage solar rooftop requests, free site surveys, bill savings calculations, and installation statuses.
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
              <span>View Solar Page</span>
            </Link>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fetchInquiries}
              disabled={isLoading}
              className={`text-xs gap-1.5 ${
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
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
                Total Leads
              </span>
              <Sun className="h-4 w-4 text-amber-500" />
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
                  isDark ? "text-amber-400" : "text-amber-600"
                }`}
              >
                New Inquiries
              </span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {newCount}
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
                Survey Scheduled
              </span>
              <Compass className="h-4 w-4 text-sky-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-sky-400" : "text-sky-600"
              }`}
            >
              {surveyScheduledCount}
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
                Quoted / Installing
              </span>
              <Zap className="h-4 w-4 text-purple-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-purple-400" : "text-purple-600"
              }`}
            >
              {inProgressCount}
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 transition-all col-span-2 sm:col-span-1 ${
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
                Completed Plants
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p
              className={`mt-2 text-2xl font-bold tracking-tight ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              {completedCount}
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
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search leads by client name, phone, city, kW capacity, or message..."
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

            {/* Property Type Filter */}
            <div className="sm:w-56">
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className={`w-full h-9 rounded-md border text-xs px-2.5 font-medium transition-colors ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-200"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                <option value="All">All Property Types</option>
                <option value="Residential Home">Residential Home</option>
                <option value="Commercial Building">Commercial Building</option>
                <option value="Factory / Industrial">Factory / Industrial</option>
                <option value="School / Hospital">School / Hospital</option>
                <option value="Agriculture / Farm">Agriculture / Farm</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span
              className={`text-xs font-semibold mr-1.5 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Status:
            </span>
            {[
              { id: "All", label: "All Statuses" },
              { id: "new", label: "New Leads" },
              { id: "survey_scheduled", label: "Survey Scheduled" },
              { id: "quotation_sent", label: "Quotation Sent" },
              { id: "in_installation", label: "In Installation" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" },
            ].map((chip) => {
              const active = statusFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setStatusFilter(chip.id)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-amber-500 text-white shadow-xs font-semibold"
                      : isDark
                      ? "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left List Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Inquiries List ({filtered.length})
              </span>
              {filtered.length < inquiries.length && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                    setPropertyFilter("All");
                  }}
                  className="text-xs text-amber-500 hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {isLoading ? (
              <div
                className={`flex flex-col items-center justify-center p-12 rounded-xl border ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
                <p
                  className={`mt-2 text-xs ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Loading solar inquiries...
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className={`flex flex-col items-center justify-center p-12 text-center rounded-xl border ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <Sun className="h-10 w-10 text-slate-400 mb-2 stroke-[1.5]" />
                <h3
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  No solar inquiries found
                </h3>
                <p
                  className={`text-xs max-w-xs mt-1 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {searchQuery ||
                  statusFilter !== "All" ||
                  propertyFilter !== "All"
                    ? "Try clearing the search or filters to view other inquiries."
                    : "When users request a solar quote on the website, their details appear here."}
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {filtered.map((item) => {
                  const isSelected = selectedInquiry?._id === item._id;
                  const st =
                    statusBadgeStyles[item.status || "new"] ||
                    statusBadgeStyles.new;

                  return (
                    <div
                      key={item._id}
                      onClick={() => handleSelectInquiry(item)}
                      className={`cursor-pointer rounded-xl border p-3.5 transition-all text-left ${
                        isSelected
                          ? isDark
                            ? "bg-slate-800/90 border-amber-500/80 shadow-md ring-1 ring-amber-500/30"
                            : "bg-amber-50/50 border-amber-400 shadow-md ring-1 ring-amber-400/30"
                          : isDark
                          ? "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-sm font-bold truncate ${
                                isDark ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {item.fullName}
                            </h4>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${st.bg} ${st.text} ${st.border}`}
                            >
                              {st.label}
                            </span>
                          </div>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Phone className="h-3 w-3 text-slate-400" />
                              {item.phone}
                            </span>
                            {item.city && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                {item.city}
                                {item.state ? `, ${item.state}` : ""}
                              </span>
                            )}
                          </div>
                        </div>

                        {item.estimatedCapacity && (
                          <div className="shrink-0 text-right">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                              <Zap className="w-3 h-3 text-amber-500" />
                              {item.estimatedCapacity}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {item.propertyType || "Residential"}
                          </span>
                          {item.monthlyBill && (
                            <>
                              <span>•</span>
                              <span>Bill: {item.monthlyBill}</span>
                            </>
                          )}
                        </div>

                        <span className="text-slate-400 dark:text-slate-500 text-[10px]">
                          {item.createdAt ? formatDate(item.createdAt) : ""}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-7">
            {selectedInquiry ? (
              <div
                className={`rounded-xl border transition-all sticky top-20 overflow-hidden ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Header of Detail */}
                <div
                  className={`p-5 border-b flex flex-wrap items-center justify-between gap-4 ${
                    isDark
                      ? "border-slate-800 bg-slate-900/40"
                      : "border-slate-100 bg-slate-50/70"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-xl font-bold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {selectedInquiry.fullName}
                      </h2>
                      {(() => {
                        const st =
                          statusBadgeStyles[
                            selectedInquiry.status || "new"
                          ] || statusBadgeStyles.new;
                        return (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${st.bg} ${st.text} ${st.border}`}
                          >
                            {st.label}
                          </span>
                        );
                      })()}
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Received on: {formatDate(selectedInquiry.createdAt)}
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Call Button */}
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-xs"
                      title="Direct Phone Call"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Call</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(
                        `Hello ${selectedInquiry.fullName}, Greetings from ZDC Tech Solar Solutions! Regarding your inquiry for ${
                          selectedInquiry.propertyType || "Rooftop Solar Plant"
                        }${
                          selectedInquiry.estimatedCapacity
                            ? ` (${selectedInquiry.estimatedCapacity})`
                            : ""
                        }. We would like to assist you with the site survey, subsidy documentation, and customized quotation.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                      title="Open WhatsApp Chat"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {selectedInquiry.email && (
                      <a
                        href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                          `ZDC Tech Solar Inquiry - ${selectedInquiry.propertyType || "Rooftop Solar"}`
                        )}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          isDark
                            ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                        title="Send Email"
                      >
                        <Mail className="h-3.5 w-3.5 text-amber-500" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  {/* Lead Information */}
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Client Contact Details
                    </h3>
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-xl border ${
                        isDark
                          ? "bg-slate-800/40 border-slate-800"
                          : "bg-slate-50/70 border-slate-100"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Full Name
                        </span>
                        <span
                          className={`text-sm font-semibold mt-0.5 block ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {selectedInquiry.fullName}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Phone / WhatsApp
                        </span>
                        <span
                          className={`text-sm font-semibold font-mono mt-0.5 block ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {selectedInquiry.phone}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Email Address
                        </span>
                        <span
                          className={`text-sm font-medium mt-0.5 block break-all ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {selectedInquiry.email || (
                            <span className="text-slate-400 italic">
                              Not provided
                            </span>
                          )}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Location (City / State)
                        </span>
                        <span
                          className={`text-sm font-medium mt-0.5 block ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {selectedInquiry.city ? (
                            <>
                              {selectedInquiry.city}
                              {selectedInquiry.state
                                ? `, ${selectedInquiry.state}`
                                : ""}
                            </>
                          ) : (
                            <span className="text-slate-400 italic">
                              Not provided
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Solar System & Technical Requirements */}
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Solar Project Requirements
                    </h3>
                    <div
                      className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border ${
                        isDark
                          ? "bg-slate-800/40 border-slate-800"
                          : "bg-slate-50/70 border-slate-100"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Property Type
                        </span>
                        <span
                          className={`text-sm font-bold mt-0.5 block ${
                            isDark ? "text-amber-400" : "text-amber-600"
                          }`}
                        >
                          {selectedInquiry.propertyType || "Residential Home"}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Desired System Type
                        </span>
                        <span
                          className={`text-xs font-semibold mt-0.5 block ${
                            isDark ? "text-slate-200" : "text-slate-800"
                          }`}
                        >
                          {selectedInquiry.systemType || "Not Sure / Need Advice"}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Monthly Electricity Bill
                        </span>
                        <span
                          className={`text-sm font-bold mt-0.5 block ${
                            isDark ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        >
                          {selectedInquiry.monthlyBill || "Not specified"}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Estimated Plant Capacity
                        </span>
                        <span
                          className={`text-sm font-bold mt-0.5 block ${
                            isDark ? "text-amber-400" : "text-amber-600"
                          }`}
                        >
                          {selectedInquiry.estimatedCapacity || "To be surveyed"}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Available Roof Area
                        </span>
                        <span
                          className={`text-sm font-semibold mt-0.5 block ${
                            isDark ? "text-slate-200" : "text-slate-800"
                          }`}
                        >
                          {selectedInquiry.roofArea || "Not specified"}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`text-[11px] font-medium block ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          Govt Subsidy Eligibility
                        </span>
                        <span className="text-xs font-semibold text-emerald-500 mt-0.5 block">
                          Up to ₹78,000 (PM Surya Ghar)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Client Message */}
                  {selectedInquiry.message && (
                    <div>
                      <h3
                        className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        Client Inquiry Note / Questions
                      </h3>
                      <div
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                          isDark
                            ? "bg-slate-800/30 border-slate-800 text-slate-300"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        {selectedInquiry.message}
                      </div>
                    </div>
                  )}

                  {/* Status & Admin Notes Update Form */}
                  <div
                    className={`p-4 rounded-xl border space-y-4 ${
                      isDark
                        ? "bg-slate-800/60 border-slate-700/80"
                        : "bg-amber-50/30 border-amber-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          isDark ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        <Save className="h-3.5 w-3.5" />
                        Update Status &amp; Internal Notes
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Admin Only
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label
                          className={`block text-xs font-semibold mb-1 ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Application Status
                        </label>
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className={`w-full rounded-lg border text-xs sm:text-sm px-3 py-2 font-medium transition-colors ${
                            isDark
                              ? "bg-slate-900 border-slate-700 text-slate-200"
                              : "bg-white border-slate-300 text-slate-800"
                          }`}
                        >
                          <option value="new">New Lead</option>
                          <option value="survey_scheduled">
                            Survey Scheduled
                          </option>
                          <option value="quotation_sent">Quotation Sent</option>
                          <option value="in_installation">
                            In Installation
                          </option>
                          <option value="completed">Completed / Installed</option>
                          <option value="cancelled">Cancelled / Dropped</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className={`block text-xs font-semibold mb-1 ${
                            isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                        >
                          Internal Staff Notes
                        </label>
                        <Textarea
                          value={editAdminNotes}
                          onChange={(e) => setEditAdminNotes(e.target.value)}
                          placeholder="e.g. Survey engineer assigned for Thursday 2 PM. Shadow-free roof area ~450 sq ft. Net-metering application submitted to DISCOM..."
                          rows={3}
                          className={`text-xs sm:text-sm ${
                            isDark
                              ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                              : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <Button
                          type="button"
                          onClick={handleUpdateStatusAndNotes}
                          disabled={isUpdating}
                          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs gap-1.5 h-8 px-4"
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="h-3.5 w-3.5" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              selectedInquiry._id,
                              selectedInquiry.fullName
                            )
                          }
                          className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1 h-8"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete Lead</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
                  Select a Solar Inquiry
                </h3>
                <p
                  className={`text-xs max-w-sm mt-1 ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Click on any client inquiry from the left list to view their contact information, system requirement, and update status.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

