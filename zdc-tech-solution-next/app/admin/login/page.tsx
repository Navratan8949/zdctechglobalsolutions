"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";

const getErrorMessage = (error: unknown) => {
  const response = (error as { response?: { data?: { message?: string } } })
    .response;
  return response?.data?.message || "Unable to sign in. Please try again.";
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAdminAuth();
  const { isDark } = useAdminTheme();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(emailOrMobile, password);
      router.replace("/admin");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
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
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 transition-colors duration-200 ${
        isDark ? "bg-[#080f1e]" : "bg-[#f8fafc]"
      }`}
    >
      {/* Top right theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <AdminThemeToggle />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <section
        className={`relative z-10 w-full max-w-md rounded-3xl border p-8 shadow-2xl backdrop-blur-xl sm:p-10 transition-colors duration-200 ${
          isDark
            ? "border-white/10 bg-black/40"
            : "border-slate-200 bg-white/90 shadow-slate-200/50"
        }`}
      >
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary border border-primary/20 shadow-sm">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          ZDC Admin
        </p>
        <h1
          className={`mt-2 font-display text-3xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Welcome back
        </h1>
        <p
          className={`mt-2 text-sm leading-6 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Sign in to manage your company website.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label
              htmlFor="emailOrMobile"
              className={isDark ? "text-slate-300" : "text-slate-700"}
            >
              Email or mobile
            </Label>
            <Input
              id="emailOrMobile"
              autoComplete="username"
              value={emailOrMobile}
              onChange={(event) => setEmailOrMobile(event.target.value)}
              placeholder="admin@example.com"
              className={`transition-all duration-200 ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
              }`}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className={isDark ? "text-slate-300" : "text-slate-700"}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`transition-all duration-200 ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
              }`}
              required
            />
          </div>

          {errorMessage && (
            <p
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-400"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </section>
    </main>
  );
}
