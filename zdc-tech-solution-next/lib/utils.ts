import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves an image URL safely from:
 * - A direct string URL ("http://...", "/public/uploads/...", etc.)
 * - An object containing { url, secure_url }
 * - Fixes legacy port mismatches (e.g., localhost:8000 -> localhost:8002)
 * - Prepends backend origin to relative /public/ uploads.
 */
export function resolveImageUrl(src: any): string {
  if (!src) return "";
  let url = "";

  if (typeof src === "string") {
    url = src.trim();
  } else if (src && typeof src === "object") {
    url = (src.url || src.secure_url || "").trim();
  }

  if (!url) return "";

  // Fix legacy or accidental port 8000 to active backend port 8002
  if (url.includes("localhost:8000")) {
    url = url.replace("localhost:8000", "localhost:8002");
  }

  // If accessing from LAN / IP or custom host, replace localhost with current host
  if (
    typeof window !== "undefined" &&
    window.location.hostname &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1" &&
    url.includes("localhost:8002")
  ) {
    url = url.replace("localhost:8002", `${window.location.hostname}:8002`);
  }

  // Prepend backend origin if relative path like /public/uploads/... or public/uploads/...
  if (url.startsWith("/public/") || url.startsWith("public/")) {
    const rawApi =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";
    const origin = rawApi.replace(/\/api\/v1\/?$/, "");
    url = `${origin}/${url.replace(/^\/+/, "")}`;
  } else if (url.startsWith("/uploads/") || url.startsWith("uploads/")) {
    const rawApi =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";
    const origin = rawApi.replace(/\/api\/v1\/?$/, "");
    url = `${origin}/public/${url.replace(/^\/+/, "")}`;
  } else if (
    !url.startsWith("http://") &&
    !url.startsWith("https://") &&
    !url.startsWith("data:") &&
    !url.startsWith("blob:") &&
    !url.startsWith("/") &&
    /\.(png|jpe?g|webp|svg|gif|ico)$/i.test(url)
  ) {
    const rawApi =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";
    const origin = rawApi.replace(/\/api\/v1\/?$/, "");
    url = `${origin}/public/uploads/${url}`;
  }

  return url;
}
