import type { ReactNode } from "react";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark" style={{ colorScheme: "dark" }}>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </div>
  );
}
