"use client";
import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import CopyButton from "@/components/CopyButton";
import { autosaveSpec } from "@/lib/store/autosave";

export default function VideoStudio() {
  const [refTitle, setRefTitle] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [creation, setCreation] = useState<any>(null);
  const [setting, setSetting] = useState("");
  const [genre, setGenre] = useState("Drama");
  const [subject, setSubject] = useState("");
  const [spec, setSpec] = useState<any>(null);

  async function analyze() {
    const r = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ mode:"video", step:1, input:{ reference: refTitle }})
    });
    const { specDelta } = await r.json();
    setAnalysis(specDelta.analysis);
  }

  async function makePilot() {
    const r = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        mode:"video", step:2,
        input:{ analysis, setting, genre, subject }
      })
    });
    const { specDelta } = await r.json();
    setCreation(specDelta.creation);
    
    // Autosave the complete spec
    const finalSpec = {
      id: crypto.randomUUID(),
      mode: "video",
      title: refTitle,
      summary: analysis?.why_it_works ?? "",
      createdAt: new Date().toISOString(),
      step: 2,
      analysis,
      creation: specDelta.creation,
    };
    setSpec(finalSpec);
    autosaveSpec(finalSpec);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <GlassCard>
        <h2 className="text-2xl font-semibold">Video — Step 1: Analyze</h2>
        <div className="mt-4 flex gap-2">
          <input value={refTitle} onChange={e=>setRefTitle(e.target.value)}
            placeholder="Enter a TV show or movie…" className="w-full bg-transparent border px-3 py-2 rounded-md" />
          <button onClick={analyze} className="px-4 py-2 bg-video/40 border rounded-md">Analyze</button>
        </div>
        {analysis && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="h3">Why it works</h3>
              <p className="p mt-1 text-white/85">{analysis.why_it_works}</p>
              <div className="mt-2">
                <CopyButton text={analysis.why_it_works} />
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="h3">Themes / Motifs / Dynamics</h3>
              <ul className="list-disc pl-5 text-white/85">
                {analysis.meta_themes?.map((t:string)=> <li key={t}>{t}</li>)}
                {analysis.motifs?.map((t:string)=> <li key={t}>{t}</li>)}
              </ul>
            </GlassCard>
          </div>
        )}
        
        {analysis && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={makePilot} className="btn btn-primary">Use This</button>
            <button onClick={analyze} className="btn">Regenerate</button>
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <h2 className="text-2xl font-semibold">Step 2: Generate Pilot</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          <input value={setting} onChange={e=>setSetting(e.target.value)} placeholder="Setting (e.g. Austin, TX 1994)"
            className="bg-transparent border px-3 py-2 rounded-md" />
          <select value={genre} onChange={e=>setGenre(e.target.value)} className="bg-transparent border px-3 py-2 rounded-md">
            {["Drama","Comedy","Thriller","Sci-Fi","Fantasy","Documentary"].map(g=> <option key={g} value={g}>{g}</option>)}
          </select>
          <input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Main idea / subject"
            className="bg-transparent border px-3 py-2 rounded-md" />
        </div>
        <button onClick={makePilot} className="mt-3 btn btn-primary">Generate Pilot</button>

        {creation?.pilot && (
          <div className="mt-5 space-y-4">
            <GlassCard>
              <h3 className="h3">Logline</h3>
              <p className="p mt-1 text-white/85">{creation.pilot.logline}</p>
              <div className="mt-2">
                <CopyButton text={creation.pilot.logline} />
              </div>
            </GlassCard>
            <GlassCard>
              <h3 className="h3">Outline</h3>
              <ul className="list-decimal pl-5 text-white/85">
                {creation.pilot.outline.map((b:string,i:number)=> <li key={i}>{b}</li>)}
              </ul>
            </GlassCard>
          </div>
        )}
        
        {spec && (
          <div className="text-sm text-white/70 mt-2">
            Saved to your account • <a href="/profile" className="underline">View profile</a>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
