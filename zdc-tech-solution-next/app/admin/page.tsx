"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/admin/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2
          className="h-6 w-6 animate-spin text-primary"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <AdminShell user={user}>
      <AdminOverview />
    </AdminShell>
  );
}
