"use client";

export function PublicRouteError({ reset }: { reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">
        This content could not be loaded
      </h1>
      <p className="mt-3 text-muted-foreground">
        Please try again, or return to the section overview.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Try again
      </button>
    </section>
  );
}
