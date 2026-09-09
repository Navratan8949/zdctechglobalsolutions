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
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <section className="relative w-full max-w-md rounded-2xl border border-white/10 bg-card/90 p-8 shadow-2xl backdrop-blur sm:p-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          ZDC Admin
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign in to manage your company website.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="emailOrMobile">Email or mobile</Label>
            <Input
              id="emailOrMobile"
              autoComplete="username"
              value={emailOrMobile}
              onChange={(event) => setEmailOrMobile(event.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
