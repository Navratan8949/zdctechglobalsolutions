"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  DatabaseBackup,
  Download,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { getDatabaseBackup } from "@/service/backup.service";

interface BackupPayload {
  success?: boolean;
  backupDate: string;
  collections: number;
  data: Record<string, unknown[]>;
}
type ApiResponse<T> = { data?: T; message?: string };
const sensitiveKeys =
  /password|token|secret|authorization|reset|refresh|apikey|api_key/i;

function unwrap<T>(response: ApiResponse<T> | T): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response &&
    response.data !== undefined
  )
    return response.data as T;
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
function sanitize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !sensitiveKeys.test(key))
        .map(([key, child]) => [key, sanitize(child)]),
    );
  return value;
}

export default function BackupPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAdminAuth();
  const [backup, setBackup] = useState<BackupPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthLoading, isAuthenticated, router]);
  if (isAuthLoading || !isAuthenticated)
    return <LoadingPanel label="Loading admin session" />;

  const fetchBackup = async () => {
    if (
      !window.confirm(
        "Fetch a database backup now? This may contain sensitive operational data and should be handled securely.",
      )
    )
      return;
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      setBackup(unwrap<BackupPayload>(await getDatabaseBackup()));
      setFeedback(
        "Backup fetched successfully. Review the summary before downloading.",
      );
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };
  const downloadBackup = () => {
    if (!backup) return;
    try {
      const safeBackup = {
        ...backup,
        data: sanitize(backup.data) as Record<string, unknown[]>,
      };
      const blob = new Blob([JSON.stringify(safeBackup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `zdc-database-backup-${backup.backupDate.slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setFeedback(
        "Safe backup download started. Sensitive fields were omitted.",
      );
    } catch (downloadError) {
      setError(getErrorMessage(downloadError));
    }
  };
  return (
    <AdminShell user={user}>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Operations
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Database backup
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Fetch a read-only database snapshot and download a sanitized JSON
          copy.
        </p>
      </div>
      {error && <Notice type="error">{error}</Notice>}
      {feedback && <Notice type="success">{feedback}</Notice>}
      <section className="rounded-xl border border-white/10 bg-card/70 p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <DatabaseBackup className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-white">
                Backup snapshot
              </h2>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              The API fetch is admin-protected. A confirmation is required
              before every fetch, and download output excludes fields whose
              names indicate passwords, tokens, secrets, or credentials.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => void fetchBackup()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DatabaseBackup className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Fetching..." : "Fetch backup"}
          </Button>
        </div>
        {backup && (
          <div className="mt-7 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            <Summary
              label="Backup date"
              value={new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(backup.backupDate))}
            />
            <Summary label="Collections" value={String(backup.collections)} />
            <Summary
              label="Records"
              value={String(
                Object.values(backup.data || {}).reduce(
                  (total, collection) =>
                    total + (Array.isArray(collection) ? collection.length : 0),
                  0,
                ),
              )}
            />
            <div className="sm:col-span-3">
              <Button type="button" variant="outline" onClick={downloadBackup}>
                <Download className="mr-2 h-4 w-4" /> Download safe JSON
              </Button>
            </div>
          </div>
        )}
      </section>
    </AdminShell>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
function Notice({
  type,
  children,
}: {
  type: "error" | "success";
  children: string;
}) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`mb-5 flex items-start gap-3 rounded-lg border p-4 text-sm ${type === "error" ? "border-red-400/25 bg-red-400/10 text-red-200" : "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"}`}
    >
      {type === "error" ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      {children}
    </div>
  );
}
function LoadingPanel({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2
        className="h-6 w-6 animate-spin text-primary"
        aria-label={label}
      />
    </div>
  );
}
