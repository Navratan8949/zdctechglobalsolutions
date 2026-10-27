"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import {
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileText,
  Loader2,
  MessageSquare,
  RefreshCw,
  Settings2,
  Users,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getBlogs } from "@/service/blog.service";
import { getContacts } from "@/service/contact.service";
import { getPortfolios } from "@/service/portfolio.service";
import { getServices } from "@/service/service.service";
import { getSiteContents } from "@/service/siteContent.service";
import { getTeamMembers } from "@/service/team.service";
import { getWhyChooseUs } from "@/service/whyChooseUs.service";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";

interface ApiListResponse {
  data?: unknown;
}

interface DashboardCard {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
  load: () => Promise<unknown>;
}

type CardState = "loading" | "success" | "error";

interface DashboardResult {
  state: CardState;
  count: number | null;
}

const dashboardCards: DashboardCard[] = [
  {
    key: "site-content",
    label: "Site Content",
    description: "Pages and global settings",
    href: "/admin/site-content",
    icon: Building2,
    color: "#6366f1",
    load: getSiteContents,
  },
  {
    key: "services",
    label: "Services",
    description: "What your company offers",
    href: "/admin/services",
    icon: Settings2,
    color: "#2563eb",
    load: getServices,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    description: "Published work and case studies",
    href: "/admin/portfolio",
    icon: BriefcaseBusiness,
    color: "#7c3aed",
    load: getPortfolios,
  },
  {
    key: "blog",
    label: "Blog Posts",
    description: "Articles and announcements",
    href: "/admin/blog",
    icon: FileText,
    color: "#0891b2",
    load: getBlogs,
  },
  {
    key: "team",
    label: "Team Members",
    description: "People featured on the site",
    href: "/admin/team",
    icon: Users,
    color: "#059669",
    load: getTeamMembers,
  },
  {
    key: "contacts",
    label: "Messages",
    description: "Contact form submissions",
    href: "/admin/contacts",
    icon: MessageSquare,
    color: "#d97706",
    load: getContacts,
  },
  {
    key: "why-choose-us",
    label: "Why Choose Us",
    description: "Company selling points",
    href: "/admin/why-choose-us",
    icon: CheckCircle,
    color: "#dc2626",
    load: getWhyChooseUs,
  },
];

function unwrapList(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    Array.isArray((response as ApiListResponse).data)
  ) {
    return (response as ApiListResponse).data as unknown[];
  }
  return [];
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return error instanceof Error ? error.message : "Request failed";
}

export function AdminOverview() {
  const { isDark } = useAdminTheme();
  const [results, setResults] = useState<Record<string, DashboardResult>>(() =>
    Object.fromEntries(
      dashboardCards.map((c) => [c.key, { state: "loading", count: null }]),
    ),
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboard = async () => {
    setIsRefreshing(true);
    setResults(
      Object.fromEntries(
        dashboardCards.map((c) => [c.key, { state: "loading", count: null }]),
      ),
    );

    const nextResults: Record<string, DashboardResult> = {};
    const nextErrors: string[] = [];

    await Promise.all(
      dashboardCards.map(async (card) => {
        try {
          const response = await card.load();
          nextResults[card.key] = {
            state: "success",
            count: unwrapList(response).length,
          };
        } catch (error) {
          nextResults[card.key] = { state: "error", count: null };
          nextErrors.push(`${card.label}: ${getErrorMessage(error)}`);
        }
      }),
    );

    setResults(nextResults);
    setErrors(nextErrors);
    setIsRefreshing(false);
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const totalRecords = dashboardCards.reduce((acc, card) => {
    const r = results[card.key];
    return r?.state === "success" && r.count ? acc + r.count : acc;
  }, 0);

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1 text-blue-500">
            Overview
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A live summary of all your website content.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadDashboard()}
          disabled={isRefreshing}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:opacity-50 ${
            isDark
              ? "bg-blue-600/15 border border-blue-600/30 text-blue-400 hover:bg-blue-600/25"
              : "bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 shadow-xs"
          }`}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats bar */}
      <div
        className={`mb-6 flex items-center gap-4 rounded-xl px-5 py-4 transition-colors ${
          isDark
            ? "bg-blue-600/10 border border-blue-600/20"
            : "bg-blue-50/80 border border-blue-100 shadow-xs"
        }`}
      >
        <TrendingUp className="h-5 w-5 shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {totalRecords} total records across all modules
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {dashboardCards.filter((c) => results[c.key]?.state === "success").length} of{" "}
            {dashboardCards.length} modules connected
          </p>
        </div>
        <span
          className={`ml-auto rounded-md px-2.5 py-1 text-[11px] font-semibold ${
            isDark
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          Live
        </span>
      </div>

      {/* Error notice */}
      {errors.length > 0 && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl p-4 text-sm bg-amber-500/10 border border-amber-500/20 text-amber-500"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Some data is unavailable</p>
            <p className="mt-1 text-xs opacity-80">{errors.join(" ")}</p>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map(({ key, label, description, href, icon: Icon, color }) => {
          const result = results[key];
          const isLoading = result?.state === "loading";
          const isError = result?.state === "error";

          return (
            <Link
              key={key}
              href={href}
              className={`group relative overflow-hidden rounded-xl p-5 transition-all duration-200 border ${
                isDark
                  ? "bg-white/[0.03] border-white/[0.07] hover:border-blue-500/30 hover:bg-blue-500/5"
                  : "bg-white border-slate-200 shadow-xs hover:border-blue-500/40 hover:shadow-md hover:bg-blue-50/20"
              }`}
            >
              {/* Icon */}
              <div
                style={{
                  backgroundColor: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>

              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {label}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {description}
              </p>

              {/* Footer */}
              <div
                className={`mt-4 flex items-center justify-between pt-3 border-t ${
                  isDark ? "border-white/[0.06]" : "border-slate-100"
                }`}
              >
                <span className="flex items-center gap-1.5 text-xs">
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color }} />
                  ) : isError ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span className="text-amber-500">Unavailable</span>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {result.count} {result.count === 1 ? "record" : "records"}
                      </span>
                    </>
                  )}
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
                  style={{ color }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
