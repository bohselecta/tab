"use client";
import { useState, useEffect } from "react";
import CopyButton from "@/components/CopyButton";
import HtmlPreview from "@/components/HtmlPreview";

export default function ProjectClient({ 
  initialSpec, 
  projectId, 
  initialHtml 
}: { 
  initialSpec: any; 
  projectId: string; 
  initialHtml: string;
}) {
  const [spec, setSpec] = useState(initialSpec);
  const [html, setHtml] = useState(initialHtml);

  // Poll for updates (progressive enrichment)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const r = await fetch(`/api/project/${projectId}?ts=${Date.now()}`, { cache: "no-store" });
        const updatedSpec = await r.json();
        setSpec(updatedSpec);
        
        // Re-render HTML if spec changed
        if (JSON.stringify(updatedSpec) !== JSON.stringify(spec)) {
          const htmlRes = await fetch("/api/render", { 
            method: "POST", 
            body: JSON.stringify({ spec: updatedSpec }),
            cache: "no-store"
          });
          const { html: newHtml } = await htmlRes.json();
          setHtml(newHtml);
        }
      } catch (error) {
        console.error("Failed to poll for updates:", error);
      }
    }, 2000);

    // Stop polling after 10 seconds
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [projectId, spec]);

  return (
    <div className="container pt-8 space-y-6">
      {/* Project Header */}
      <div className="glass p-5 rounded-xl2">
        <div className="flex items-center gap-3 mb-3">
          <span className={`w-3 h-3 rounded-full ${
            spec.mode === "video" ? "bg-video" : 
            spec.mode === "audio" ? "bg-audio" : "bg-web"
          }`} />
          <span className="badge uppercase">{spec.mode}</span>
        </div>
        <h1 className="h1">{spec.title}</h1>
        <p className="p mt-2">{spec.summary}</p>
        <div className="mt-4 flex gap-2">
          <CopyButton text={spec.summary} />
          <a 
            download={`${spec.title}.json`} 
            className="btn"
            href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(spec))}`}
          >
            Download JSON
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="glass p-4 rounded-xl2">
        <div className="flex gap-3 flex-wrap">
          <form action="/api/publish" method="post">
            <input type="hidden" name="id" value={spec.id} />
            <button className="btn btn-primary">Publish to Gallery</button>
          </form>
          <a href="/gallery" className="btn">View Gallery</a>
          <a href="/studio" className="btn">Back to Studio</a>
        </div>
      </div>

      {/* HTML Preview */}
      {html && (
        <div className="glass p-3 rounded-xl2">
          <h2 className="h2 mb-3">Live Preview</h2>
          <HtmlPreview html={html} />
        </div>
      )}

      {/* External Links */}
      <div className="glass p-4 rounded-xl2">
        <h3 className="h3">Finished Files</h3>
        <p className="p mt-1">Add links to your generated assets (video, audio, site deploys).</p>
        
        <form className="mt-3 flex gap-2" action={`/api/project/${projectId}/links`} method="post">
          <input 
            name="label" 
            placeholder="Label (e.g., 'Kling render')" 
            className="bg-transparent border px-3 py-2 rounded-md w-40" 
          />
          <input 
            name="url" 
            placeholder="https://…" 
            className="bg-transparent border px-3 py-2 rounded-md flex-1" 
          />
          <button className="btn btn-primary">Add</button>
        </form>
        
        {spec.links && spec.links.length > 0 && (
          <ul className="mt-3 space-y-2">
            {spec.links.map((link: any, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <a 
                  className="underline text-white/85 hover:text-white" 
                  href={link.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
