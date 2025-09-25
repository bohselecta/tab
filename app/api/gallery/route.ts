import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const ids: string[] = (await kv.smembers("gallery:ids")) || [];
  const specs = await kv.mget(...ids);
  return NextResponse.json({ items: specs?.filter(Boolean) ?? [] });
}