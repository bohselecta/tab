import { clerkMiddleware } from "@clerk/nextjs/server";

// Public paths that do NOT require auth (landing, gallery, docs, etc)
export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/gallery(.*)",
    "/docs(.*)",
    "/terms",
    "/privacy",
    "/api/render",
    "/api/gallery",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
});

// Next.js matcher (apply to all routes by default)
export const config = {
  matcher: ["/((?!_next|.*\\..*|api/webhooks).*)"],
};
