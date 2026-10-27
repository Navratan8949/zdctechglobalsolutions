"use client";

import { Moon, Sun } from "lucide-react";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";

interface AdminThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export function AdminThemeToggle({
  showLabel = true,
  className = "",
}: AdminThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useAdminTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
        isDark
          ? "border-white/10 bg-white/[0.05] text-slate-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
          : "border-slate-300 bg-slate-100 text-slate-700 hover:border-slate-400 hover:bg-slate-200 hover:text-slate-900 shadow-xs"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-blue-400 transition-transform duration-200 group-hover:rotate-12" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500 transition-transform duration-200 group-hover:rotate-45" />
        )}
      </div>

      {showLabel && (
        <span className="capitalize tracking-wide">
          {isDark ? "Dark mode" : "Light mode"}
        </span>
      )}

      {/* Mini switch indicator */}
      <span
        className={`ml-1 flex h-4 w-7 items-center rounded-full p-0.5 transition-colors duration-200 ${
          isDark ? "bg-slate-700" : "bg-blue-600"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full bg-white shadow-xs transition-transform duration-200 ${
            isDark ? "translate-x-0" : "translate-x-3"
          }`}
        />
      </span>
    </button>
  );
}
