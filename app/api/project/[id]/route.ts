import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const spec = await kv.get(`p:${params.id}`);
  if (!spec) return NextResponse.json({ error: "404" }, { status: 404 });
  return NextResponse.json(spec);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const spec = await req.json();
  await kv.set(`p:${params.id}`, spec);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await kv.del(`p:${params.id}`);
  await kv.srem("gallery:ids", `p:${params.id}`);
  return NextResponse.json({ ok: true });
}