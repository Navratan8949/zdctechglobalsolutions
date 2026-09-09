"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  adminLogin,
  getCurrentUser,
  logout as logoutAdmin,
} from "@/service/auth.service";

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  role: "admin";
}

interface AdminAuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrMobile: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined,
);

const clearStoredToken = () => {
  if (typeof window !== "undefined") localStorage.removeItem("token");
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem("token")) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch {
        clearStoredToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void restoreSession();
  }, []);

  const login = async (emailOrMobile: string, password: string) => {
    try {
      const response = await adminLogin(emailOrMobile, password);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      throw error;
    } finally {
      clearStoredToken();
      setUser(null);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return context;
}
