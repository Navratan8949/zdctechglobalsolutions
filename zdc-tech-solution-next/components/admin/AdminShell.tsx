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
  Newspaper,
  Info,
  Package,
} from "lucide-react";
import {
  useAdminAuth,
  type AdminUser,
} from "@/components/admin/AdminAuthProvider";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";

interface AdminNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const primaryNavigation: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Site content", href: "/admin/site-content", icon: Building2 },
  { label: "About Us", href: "/admin/about", icon: Info },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Stats", href: "/admin/stats", icon: Settings2 },
  { label: "Process Steps", href: "/admin/process", icon: ClipboardList },
  { label: "Core Values", href: "/admin/core-values", icon: Star },
  { label: "Life at Company", href: "/admin/life-at-company", icon: Users },
  { label: "Services", href: "/admin/services", icon: Settings2 },
  { label: "Projects", href: "/admin/portfolio", icon: BriefcaseBusiness },
  {
    label: "Case studies",
    href: "/admin/case-studies",
    icon: BriefcaseBusiness,
  },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Daily Posts", href: "/admin/posts", icon: Newspaper },
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
  {
    label: "Applications",
    href: "/admin/job-applications",
    icon: ClipboardList,
  },
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
  isDark,
}: {
  item: AdminNavItem;
  onNavigate: () => void;
  isDark: boolean;
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
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
          : isDark
            ? "text-slate-400 hover:bg-slate-800/60 hover:text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 transition-colors ${
          isActive
            ? "text-white"
            : isDark
              ? "text-slate-400 group-hover:text-white"
              : "text-slate-500 group-hover:text-slate-900"
        }`}
      />
      <span>{item.label}</span>
      {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-75" />}
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
  const { isDark } = useAdminTheme();

  return (
    <aside
      className={`flex h-full min-h-0 w-64 shrink-0 flex-col px-3 py-4 transition-colors duration-200 ${
        isDark
          ? "bg-[#0f1729] border-r border-white/[0.08]"
          : "bg-white border-r border-slate-200 shadow-sm"
      }`}
    >
      {/* Logo & Close Button */}
      <div className="flex items-center justify-between px-2 mb-6">
        <Link
          href="/admin"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <span
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white shadow-md"
          >
            Z
          </span>
          <div>
            <p
              className={`text-sm font-bold tracking-wide ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              ZDC Admin
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Control Panel
            </p>
          </div>
        </Link>
        <button
          className={`lg:hidden p-1 rounded-md transition-colors ${
            isDark
              ? "text-slate-400 hover:text-white hover:bg-slate-800"
              : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
          }`}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation List */}
      <nav
        className="flex-1 overflow-y-auto space-y-5 pr-1"
        aria-label="Admin navigation"
      >
        <div>
          <p
            className={`px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Workspace
          </p>
          <div className="space-y-0.5">
            {primaryNavigation.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                onNavigate={onClose}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
        <div>
          <p
            className={`px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Inbox
          </p>
          <div className="space-y-0.5">
            {secondaryNavigation.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                onNavigate={onClose}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* User Card & Logout */}
      <div
        className={`shrink-0 pt-3 mt-3 border-t ${
          isDark ? "border-white/[0.08]" : "border-slate-200"
        }`}
      >
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
            isDark
              ? "bg-white/[0.04] text-white"
              : "bg-slate-50 text-slate-900 border border-slate-100"
          }`}
        >
          <div
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-xs"
          >
            {getInitials(user)}
          </div>
          <div className="min-w-0 flex-1">
            <p
              className={`truncate text-xs font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {user?.fullName || "Administrator"}
            </p>
            <p className="truncate text-[10px] text-slate-400">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className={`transition-colors p-1 rounded-md ${
              isDark
                ? "text-slate-400 hover:text-red-400 hover:bg-slate-800/80"
                : "text-slate-500 hover:text-red-500 hover:bg-red-50"
            }`}
            aria-label="Log out"
            title="Log out"
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
  const { isDark } = useAdminTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.replace("/admin/login");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? "bg-[#080f1e] text-slate-100" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
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

      {/* Main content wrapper */}
      <div className="lg:pl-64">
        {/* Top Header Bar */}
        <header
          className={`sticky top-0 z-30 flex h-14 items-center justify-between px-4 sm:px-6 backdrop-blur-md transition-colors duration-200 border-b ${
            isDark
              ? "bg-[#080f1e]/90 border-white/[0.08]"
              : "bg-white/90 border-slate-200 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              className={`lg:hidden p-1.5 rounded-lg transition-colors ${
                isDark
                  ? "text-slate-400 hover:text-white hover:bg-slate-800"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
              }`}
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Welcome, {user?.fullName?.split(" ")[0] || "Admin"} 👋
              </p>
              <p
                className={`hidden text-[11px] sm:block ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                ZDC Tech Global Solutions — Control Panel
              </p>
            </div>
          </div>

          {/* Top Actions: Theme Switcher + Status + User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <AdminThemeToggle />

            {/* Session Indicator */}
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>

            {/* Mobile Avatar */}
            <div
              style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white lg:hidden shadow-xs"
            >
              {getInitials(user)}
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
