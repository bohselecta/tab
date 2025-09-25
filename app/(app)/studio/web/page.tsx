"use client";
import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import CopyButton from "@/components/CopyButton";
import ModeToggle from "@/components/ModeToggle";
import { Toast, useToast } from "@/components/Toast";

export default function WebStudio() {
  const [whatIf, setWhatIf] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [creation, setCreation] = useState<any>(null);
  const [brand, setBrand] = useState("");
  const [vibe, setVibe] = useState<"Modern Minimal"|"Neon Glass"|"Editorial Serif"|"Playful Pastel"|"Dark Pro">("Neon Glass");
  const [mode, setMode] = useState<"quick" | "deep">("quick");
  const [loading, setLoading] = useState(false);
  const { msg, setMsg } = useToast();

  async function analyze() {
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ mode:"web", step:1, input:{ what_if: whatIf }})
      });
      const { specDelta } = await r.json();
      setAnalysis(specDelta.analysis);
      setMsg("Analysis complete");
    } catch (error) {
      setMsg("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function makeSite() {
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          mode:"web", step:2,
          input:{ analysis, brand, vibe, mode }
        })
      });
      const { specDelta } = await r.json();
      setCreation(specDelta.creation);
      setMsg("Site generated");
    } catch (error) {
      setMsg("Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toast msg={msg} />
      <div className="max-w-5xl mx-auto p-6 space-y-6">
      <GlassCard>
        <h2 className="text-2xl font-semibold">Web — Step 1: Analyze</h2>
        <div className="mt-4 flex gap-2">
          <input value={whatIf} onChange={e=>setWhatIf(e.target.value)}
            placeholder="Describe a product, event, or world—be specific. We'll design a site you can preview and ship." className="w-full bg-transparent border px-3 py-2 rounded-md" />
          <button 
            onClick={analyze} 
            disabled={loading || !whatIf.trim()}
            className="px-4 py-2 bg-web/40 border rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        {analysis && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="font-medium">Market Angle</h3>
              <p className="opacity-80">{analysis.market_angle}</p>
              <div className="mt-2"><CopyButton text={analysis.market_angle} /></div>
            </GlassCard>
            <GlassCard>
              <h3 className="font-medium">Story Hook</h3>
              <p className="opacity-80">{analysis.story_hook}</p>
              <div className="mt-2"><CopyButton text={analysis.story_hook} /></div>
            </GlassCard>
            <GlassCard className="md:col-span-2">
              <h3 className="font-medium">Target Personas</h3>
              <ul className="list-disc pl-5 opacity-80">
                {analysis.persona_notes?.map((note:string)=> <li key={note}>{note}</li>)}
              </ul>
            </GlassCard>
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <h2 className="text-2xl font-semibold">Step 2: Generate Site</h2>
        
            {/* Mode Toggle */}
            <div className="mt-3 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Generation Mode:</span>
                <ModeToggle value={mode} onChange={setMode} />
              </div>
              <p className="text-xs opacity-60 mt-1">
                {mode === "quick" ? "Fewer sections, faster generation" : "More sections, richer content"}
              </p>
            </div>

        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <input value={brand} onChange={e=>setBrand(e.target.value)} 
            placeholder="Brand name (e.g. AquaDrive, HydroMotion)"
            className="bg-transparent border px-3 py-2 rounded-md" />
          <select value={vibe} onChange={e=>setVibe(e.target.value as any)} className="bg-transparent border px-3 py-2 rounded-md">
            {["Modern Minimal","Neon Glass","Editorial Serif","Playful Pastel","Dark Pro"].map(v=> <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <button 
          onClick={makeSite} 
          disabled={loading || !analysis}
          className="mt-3 px-4 py-2 bg-web/40 border rounded-md text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Site"}
        </button>

        {creation?.site && (
          <div className="mt-5 space-y-4">
            <GlassCard>
              <h3 className="font-medium">Site: {creation.site.brand}</h3>
              <div className="mt-2">
                <h4 className="text-sm font-medium opacity-70">SEO</h4>
                <p className="text-sm opacity-80 mt-1">{creation.site.seo.title}</p>
                <p className="text-sm opacity-80">{creation.site.seo.description}</p>
              </div>
            </GlassCard>
            
            <div className="space-y-3">
              <h3 className="font-medium">Pages</h3>
              {creation.site.pages.map((page: any, index: number) => (
                <GlassCard key={index}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{page.title}</h4>
                      <p className="text-sm opacity-70">/{page.path}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {page.sections.map((section: any, sectionIndex: number) => (
                      <div key={sectionIndex} className="border border-glassStroke rounded-md p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium opacity-60 bg-glass px-2 py-1 rounded">
                            {section.kind.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm opacity-80">{section.copy}</p>
                        {section.img_placeholder && (
                          <div className="mt-2 text-xs opacity-60">
                            Image: {section.img_placeholder.w}×{section.img_placeholder.h} - {section.img_placeholder.alt}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
      </div>
    </>
  );
}
