"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
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

interface ApiListResponse {
  data?: unknown;
}

interface DashboardCard {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
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
    description: "Reasons to partner with us",
    href: "/admin/why-choose-us",
    icon: CheckCircle,
    color: "#dc2626",
    load: getWhyChooseUs,
  },
];

const initialResults = Object.fromEntries(
  dashboardCards.map((card) => [card.key, { state: "loading", count: null }]),
) as Record<string, DashboardResult>;

function unwrapList(response: unknown): unknown[] {
  if (Array.isArray(response)) return response;
  if (response && typeof response === "object" && "data" in response) {
    const data = (response as ApiListResponse).data;
    return Array.isArray(data) ? data : [];
  }
  return [];
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return error instanceof Error
    ? error.message
    : "Some dashboard data could not be loaded.";
}

export function AdminOverview() {
  const [results, setResults] =
    useState<Record<string, DashboardResult>>(initialResults);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboard = async () => {
    setIsRefreshing(true);
    setResults(initialResults);
    setErrors([]);

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
          <p style={{ color: "#60a5fa" }} className="text-[11px] font-semibold uppercase tracking-widest mb-1">
            Overview
          </p>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: "#64748b" }}>
            A live summary of all your website content.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadDashboard()}
          disabled={isRefreshing}
          style={{
            backgroundColor: "rgba(37,99,235,0.15)",
            border: "1px solid rgba(37,99,235,0.3)",
            color: "#60a5fa",
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-125 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats bar */}
      <div
        style={{
          backgroundColor: "rgba(37,99,235,0.08)",
          border: "1px solid rgba(37,99,235,0.15)",
        }}
        className="mb-6 flex items-center gap-4 rounded-xl px-5 py-4"
      >
        <TrendingUp className="h-5 w-5 shrink-0" style={{ color: "#60a5fa" }} />
        <div>
          <p className="text-sm font-semibold text-white">
            {totalRecords} total records across all modules
          </p>
          <p className="text-[11px]" style={{ color: "#64748b" }}>
            {dashboardCards.filter((c) => results[c.key]?.state === "success").length} of{" "}
            {dashboardCards.length} modules connected
          </p>
        </div>
        <span
          style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#34d399" }}
          className="ml-auto rounded-md px-2.5 py-1 text-[11px] font-medium"
        >
          Live
        </span>
      </div>

      {/* Error notice */}
      {errors.length > 0 && (
        <div
          style={{
            backgroundColor: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            color: "#fbbf24",
          }}
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl p-4 text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Some data is unavailable</p>
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
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              className="group relative overflow-hidden rounded-xl p-5 transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/5"
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

              <h2 className="text-sm font-semibold text-white">{label}</h2>
              <p className="mt-0.5 text-xs" style={{ color: "#64748b" }}>
                {description}
              </p>

              {/* Footer */}
              <div
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                className="mt-4 flex items-center justify-between pt-3"
              >
                <span className="flex items-center gap-1.5 text-xs">
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color }} />
                  ) : isError ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span style={{ color: "#fbbf24" }}>Unavailable</span>
                    </>
                  ) : (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <span style={{ color: "#94a3b8" }}>
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
