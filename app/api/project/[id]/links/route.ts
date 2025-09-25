import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const form = await req.formData();
  const label = String(form.get("label") || "").slice(0, 80);
  const url = String(form.get("url") || "").slice(0, 2048);
  
  if (!/^https?:\/\//.test(url)) {
    return NextResponse.json({ ok: false, msg: "Bad URL" }, { status: 400 });
  }
  
  const spec: any = await kv.get(`p:${params.id}`);
  if (!spec) return NextResponse.json({ ok: false }, { status: 404 });
  
  spec.links = [...(spec.links || []), { label, url }];
  await kv.set(`p:${params.id}`, spec);
  
  return NextResponse.json({ ok: true });
}
