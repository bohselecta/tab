import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { sanitizeForPublic } from "@/lib/util/sanitize";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const spec: any = await kv.get(`p:${id}`);
    if (!spec) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }
    
    // Sanitize before publishing to gallery
    const pub = sanitizeForPublic(spec);
    await kv.set(`p:${id}`, pub); // overwrite saved copy with sanitized version for gallery
    await kv.sadd("gallery:ids", `p:${id}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Failed to publish project' }, { status: 500 });
  }
}
