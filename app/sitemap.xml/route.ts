import { NextResponse } from "next/server";
export function GET() {
  const urls = ["/", "/studio", "/gallery", "/profile"].map(
    (u) => `<url><loc>https://tablature.io${u}</loc></url>`
  );
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    { headers: { "content-type": "application/xml" } }
  );
}
