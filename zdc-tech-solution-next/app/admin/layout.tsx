import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </AdminThemeProvider>
  );
}
