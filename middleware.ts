import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const WINDOW_MS = 15000; // 15s
const LIMIT = 10;        // 10 req / 15s / IP
const buckets = new Map<string, { n: number; t: number }>();

export function middleware(req: NextRequest) {
  // Keep fake auth from earlier
  const res = NextResponse.next();
  if (!req.cookies.get("fake-user")) {
    res.cookies.set("fake-user", "guest@tablature.io", { 
      path: "/", 
      maxAge: 60 * 60 * 24 * 30 
    });
  }

  // Skip static & assets
  const p = req.nextUrl.pathname;
  if (p.startsWith("/_next") || p.startsWith("/favicon") || p.endsWith(".png") || p.startsWith("/robots") || p.startsWith("/sitemap")) return res;

  // Rate limit AI endpoints
  if (p.startsWith("/api/generate") || p.startsWith("/api/render")) {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anon";
    const now = Date.now();
    const b = buckets.get(ip) ?? { n: 0, t: now };
    if (now - b.t > WINDOW_MS) { b.n = 0; b.t = now; }
    b.n++; buckets.set(ip, b);
    if (b.n > LIMIT) return new NextResponse("Rate limit exceeded", { status: 429 });
  }
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
