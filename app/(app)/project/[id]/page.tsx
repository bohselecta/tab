import CopyButton from "@/components/CopyButton";
import HtmlPreview from "@/components/HtmlPreview";
import ProjectClient from "./ProjectClient";

export default async function Project({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/project/${params.id}`, { cache: "no-store" });
  
  if (!res.ok) {
    return (
      <div className="container pt-20 text-center">
        <div className="glass p-8 rounded-xl2 max-w-md mx-auto">
          <h1 className="h1 mb-4">Project Not Found</h1>
          <p className="p mb-6">This project doesn't exist or has been deleted.</p>
          <a href="/studio" className="btn btn-primary">Back to Studio</a>
        </div>
      </div>
    );
  }
  
  const spec = await res.json();
  
  // Get HTML preview
  let html = "";
  try {
    const htmlRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/render`, { 
      method: "POST", 
      body: JSON.stringify({ spec }),
      cache: "no-store"
    });
    const { html: renderedHtml } = await htmlRes.json();
    html = renderedHtml;
  } catch (error) {
    console.error("Failed to render HTML:", error);
  }

  return (
    <ProjectClient initialSpec={spec} projectId={params.id} initialHtml={html} />
  );
}