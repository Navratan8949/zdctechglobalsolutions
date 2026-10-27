"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AdminTheme = "dark" | "light";

interface AdminThemeContextType {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "zdc_admin_theme";

export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read persisted theme from localStorage
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as AdminTheme | null;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      } else {
        // Default to dark for admin panel
        setThemeState("dark");
      }
    } catch {
      // In case localStorage is blocked
      setThemeState("dark");
    } finally {
      setMounted(true);
    }
  }, []);

  const setTheme = (newTheme: AdminTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <AdminThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark,
      }}
    >
      <div
        className={`${isDark ? "dark admin-theme-dark" : "light admin-theme-light"} min-h-screen transition-colors duration-200`}
        style={{ colorScheme: theme }}
        data-admin-theme={theme}
      >
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider");
  }
  return context;
}
