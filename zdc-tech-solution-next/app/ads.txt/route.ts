export const dynamic = "force-static";

export function GET() {
  return new Response(
    "google.com, pub-8757895657859713, DIRECT, f08c47fec0942fa0\n",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
}

