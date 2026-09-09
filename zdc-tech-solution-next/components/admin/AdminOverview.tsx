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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogs } from "@/service/blog.service";
import { getContacts } from "@/service/contact.service";
import { getPortfolios } from "@/service/portfolio.service";
import { getServices } from "@/service/service.service";
import { getSiteContents } from "@/service/siteContent.service";
import { getTeamMembers } from "@/service/team.service";

interface ApiListResponse {
  data?: unknown;
}

interface DashboardCard {
  key: string;
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
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
    label: "Site content",
    description: "Pages and global settings",
    href: "/admin/site-content",
    icon: Building2,
    load: getSiteContents,
  },
  {
    key: "services",
    label: "Services",
    description: "What your company offers",
    href: "/admin/services",
    icon: Settings2,
    load: getServices,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    description: "Published work and case studies",
    href: "/admin/portfolio",
    icon: BriefcaseBusiness,
    load: getPortfolios,
  },
  {
    key: "blog",
    label: "Blog posts",
    description: "Articles and announcements",
    href: "/admin/blog",
    icon: FileText,
    load: getBlogs,
  },
  {
    key: "team",
    label: "Team members",
    description: "People featured on the site",
    href: "/admin/team",
    icon: Users,
    load: getTeamMembers,
  },
  {
    key: "contacts",
    label: "Messages",
    description: "Contact form submissions",
    href: "/admin/contacts",
    icon: MessageSquare,
    load: getContacts,
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

  const hasLoadedData = dashboardCards.some(
    (card) => results[card.key]?.state === "success",
  );

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Overview
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            A live summary of the content and messages managed through your
            admin workspace.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BarChart3 className="h-4 w-4 text-primary" /> Content operations
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => void loadDashboard()}
            disabled={isRefreshing}
            aria-label="Refresh dashboard"
            title="Refresh dashboard"
            className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-lg border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Some dashboard data is unavailable.</p>
            <p className="mt-1 text-amber-200/80">{errors.join(" ")}</p>
          </div>
        </div>
      )}

      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="Content resources"
      >
        {dashboardCards.map(({ key, label, description, href, icon: Icon }) => {
          const result = results[key];
          const isLoading = result?.state === "loading";
          const isError = result?.state === "error";
          return (
            <Link
              key={key}
              href={href}
              className="group rounded-xl border border-white/10 bg-card/70 p-5 transition-colors hover:border-primary/40 hover:bg-card"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`text-xs ${isError ? "text-amber-300" : "text-muted-foreground"}`}
                >
                  {isLoading ? (
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-label={`Loading ${label}`}
                    />
                  ) : isError ? (
                    "Unavailable"
                  ) : (
                    "Connected"
                  )}
                </span>
              </div>
              <h2 className="mt-5 text-base font-semibold text-white">
                {label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isError ? "bg-amber-400" : "bg-primary/70"}`}
                  />
                  {isLoading
                    ? "Loading records"
                    : isError
                      ? "Could not load records"
                      : `${result.count} ${result.count === 1 ? "record" : "records"}`}
                </span>
                <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-6 rounded-xl border border-dashed border-primary/25 bg-primary/[0.04] p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Publishing workspace
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {hasLoadedData
                ? "Your connected modules are reporting live records from the API."
                : "Waiting for the admin API to return your workspace data."}
            </p>
          </div>
          <span className="w-fit rounded-md bg-white/10 px-2.5 py-1 text-xs text-muted-foreground">
            Live API summary
          </span>
        </div>
      </section>
    </div>
  );
}
