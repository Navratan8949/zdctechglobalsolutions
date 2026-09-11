"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ComponentType, type ReactNode } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  ClipboardList,
  DatabaseBackup,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings2,
  Star,
  Cpu,
  Users,
  X,
  CheckCircle,
  Shield,
} from "lucide-react";
import {
  useAdminAuth,
  type AdminUser,
} from "@/components/admin/AdminAuthProvider";

interface AdminNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const primaryNavigation: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Site content", href: "/admin/site-content", icon: Building2 },
  { label: "Stats", href: "/admin/stats", icon: Settings2 },
  { label: "Process Steps", href: "/admin/process", icon: ClipboardList },
  { label: "Core Values", href: "/admin/core-values", icon: Star },
  { label: "Life at Company", href: "/admin/life-at-company", icon: Users },
  { label: "Services", href: "/admin/services", icon: Settings2 },
  { label: "Portfolio", href: "/admin/portfolio", icon: BriefcaseBusiness },
  { label: "Case studies", href: "/admin/case-studies", icon: BriefcaseBusiness },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Jobs", href: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Industries", href: "/admin/industries", icon: Building2 },
  { label: "Technologies", href: "/admin/technologies", icon: Cpu },
  { label: "Why Choose Us", href: "/admin/why-choose-us", icon: CheckCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
];

const secondaryNavigation: AdminNavItem[] = [
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { label: "Subscribers", href: "/admin/subscribers", icon: MessageSquare },
  { label: "Applications", href: "/admin/job-applications", icon: ClipboardList },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Database backup", href: "/admin/backup", icon: DatabaseBackup },
];

function getInitials(user: AdminUser | null) {
  if (!user) return "AD";
  return user.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function NavigationLink({
  item,
  onNavigate,
}: {
  item: AdminNavItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    item.href === "/admin"
      ? pathname === item.href
      : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
          : "text-slate-400 hover:bg-slate-700/60 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
      {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />}
    </Link>
  );
}

function Sidebar({
  user,
  onClose,
  onLogout,
}: {
  user: AdminUser | null;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <aside
      style={{ backgroundColor: "#0f1729", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      className="flex h-full min-h-0 w-64 shrink-0 flex-col px-3 py-4"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-2 mb-6">
        <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
          <span
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white shadow-lg"
          >
            Z
          </span>
          <div>
            <p className="text-sm font-bold text-white tracking-wide">ZDC Admin</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Control Panel</p>
          </div>
        </Link>
        <button
          className="lg:hidden text-slate-400 hover:text-white"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto space-y-5 pr-1" aria-label="Admin navigation">
        <div>
          <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Workspace
          </p>
          <div className="space-y-0.5">
            {primaryNavigation.map((item) => (
              <NavigationLink key={item.href} item={item} onNavigate={onClose} />
            ))}
          </div>
        </div>
        <div>
          <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Inbox
          </p>
          <div className="space-y-0.5">
            {secondaryNavigation.map((item) => (
              <NavigationLink key={item.href} item={item} onNavigate={onClose} />
            ))}
          </div>
        </div>
      </nav>

      {/* User */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="shrink-0 pt-3 mt-3"
      >
        <div
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5"
        >
          <div
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          >
            {getInitials(user)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {user?.fullName || "Administrator"}
            </p>
            <p className="truncate text-[10px] text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-slate-500 hover:text-red-400 transition-colors"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser | null;
  children?: ReactNode;
}) {
  const router = useRouter();
  const { logout } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <div style={{ backgroundColor: "#080f1e", minHeight: "100vh", color: "white" }}>
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:flex">
        <Sidebar
          user={user}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <button
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close navigation"
          />
          <div className="fixed inset-y-0 left-0 z-50 flex lg:hidden">
            <Sidebar
              user={user}
              onClose={() => setIsSidebarOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header
          style={{
            backgroundColor: "rgba(8,15,30,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
          className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 sm:px-6"
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-semibold text-white">
                Welcome, {user?.fullName?.split(" ")[0] || "Admin"} 👋
              </p>
              <p className="hidden text-[11px] text-slate-500 sm:block">
                ZDC Tech Global Solutions — Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Session active
            </span>
            <div
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white lg:hidden"
            >
              {getInitials(user)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
