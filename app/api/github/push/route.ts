import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = process.env.GITHUB_TOKEN;
    const { spec } = await req.json();
    
    if (!token) {
      // Return a downloadable zip instead (client can save/upload to GitHub)
      // In real impl, create repo -> commit scaffold -> return repo url.
      return NextResponse.json({ 
        mode: "zip", 
        note: "GitHub token is not set; returning zip instead." 
      });
    }
    
    // TODO: create repo via REST, push scaffold
    return NextResponse.json({ 
      mode: "github", 
      url: "https://github.com/..." 
    });
  } catch (error) {
    console.error('GitHub push error:', error);
    return NextResponse.json({ error: 'Failed to push to GitHub' }, { status: 500 });
  }
}
