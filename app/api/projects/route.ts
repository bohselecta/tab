import { NextResponse } from "next/server";
import { getUserProjects, saveProject } from "@/lib/store/kv";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const items = await getUserProjects(userId);
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const spec = await req.json();
    await saveProject(spec, userId);
    return NextResponse.json({ ok: true, id: spec.id });
  } catch (error) {
    console.error('Save project error:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
