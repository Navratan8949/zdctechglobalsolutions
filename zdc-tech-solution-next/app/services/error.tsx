"use client";

import { PublicRouteError } from "@/components/site/PublicRouteError";

export default function Error({ reset }: { reset: () => void }) {
  return <PublicRouteError reset={reset} />;
}
