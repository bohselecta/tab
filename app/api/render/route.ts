import { NextResponse } from "next/server";
import { renderHtml } from "@/lib/render/html";

export async function POST(req: Request) {
  try {
    const { spec } = await req.json();
    const html = renderHtml(spec);
    return NextResponse.json({ html });
  } catch (error) {
    console.error('Render error:', error);
    return NextResponse.json({ error: 'Failed to render HTML' }, { status: 500 });
  }
}
