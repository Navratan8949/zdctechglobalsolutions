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
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  { label: "Services", href: "/admin/services", icon: Settings2 },
  { label: "Portfolio", href: "/admin/portfolio", icon: BriefcaseBusiness },
  {
    label: "Case studies",
    href: "/admin/case-studies",
    icon: BriefcaseBusiness,
  },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Jobs", href: "/admin/jobs", icon: BriefcaseBusiness },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Building2 },
  { label: "Industries", href: "/admin/industries", icon: Building2 },
  { label: "Technologies", href: "/admin/technologies", icon: Cpu },
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
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "text-muted-foreground hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
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
    <aside className="flex h-full min-h-0 w-72 shrink-0 flex-col border-r border-white/10 bg-card/95 px-4 py-5 backdrop-blur-xl">
      <div className="flex shrink-0 items-center justify-between px-2">
        <Link
          href="/admin"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
            Z
          </span>
          <span>
            <span className="block font-display text-sm font-bold tracking-wide text-white">
              ZDC ADMIN
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Control center
            </span>
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav
        className="mt-9 min-h-0 flex-1 space-y-7 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/15"
        aria-label="Admin navigation"
      >
        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Workspace
          </p>
          <div className="space-y-1">
            {primaryNavigation.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                onNavigate={onClose}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            Inbox
          </p>
          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                onNavigate={onClose}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="shrink-0 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-3">
          <Avatar className="h-9 w-9 border border-primary/30">
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.fullName || "Administrator"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-muted-foreground transition-colors hover:text-white"
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
    <div className="min-h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:flex">
        <Sidebar
          user={user}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />
      </div>
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

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-background/85 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-sm font-medium text-white">
                Good to see you, {user?.fullName?.split(" ")[0] || "Admin"}
              </p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Here is your website at a glance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden border-emerald-500/30 bg-emerald-500/10 text-emerald-300 sm:inline-flex"
            >
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Admin session active
            </Badge>
            <Avatar className="h-8 w-8 border border-white/10 lg:hidden">
              <AvatarFallback className="bg-primary/15 text-xs text-primary">
                {getInitials(user)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-7 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
