"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

const getErrorMessage = (error: unknown) => {
  const response = (error as { response?: { data?: { message?: string } } })
    .response;
  return response?.data?.message || "Unable to sign in. Please try again.";
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAdminAuth();
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <LockKeyhole className="h-7 w-7" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          ZDC Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Sign in to manage your company website.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="emailOrMobile" className="text-white/80">Email or mobile</Label>
            <Input
              id="emailOrMobile"
              autoComplete="username"
              value={emailOrMobile}
              onChange={(event) => setEmailOrMobile(event.target.value)}
              placeholder="admin@example.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200"
              required
            />
          </div>

          {errorMessage && (
            <p
              className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-red-200"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
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
