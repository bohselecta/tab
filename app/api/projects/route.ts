import { NextResponse } from "next/server";
import { getUserProjects, saveProject } from "@/lib/store/kv";
import { getFakeUser } from "@/lib/auth/fake";

export async function GET() {
  try {
    const user = getFakeUser();
    const items = await getUserProjects(user);
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const spec = await req.json();
    await saveProject(spec);
    return NextResponse.json({ ok: true, id: spec.id });
  } catch (error) {
    console.error('Save project error:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
