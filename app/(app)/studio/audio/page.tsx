"use client";
import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import CopyButton from "@/components/CopyButton";

export default function AudioStudio() {
  const [refTitle, setRefTitle] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [creation, setCreation] = useState<any>(null);
  const [generalizedStyle, setGeneralizedStyle] = useState("");

  async function analyze() {
    const r = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ mode:"audio", step:1, input:{ reference: refTitle }})
    });
    const { specDelta } = await r.json();
    setAnalysis(specDelta.analysis);
  }

  async function makeSong() {
    const r = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        mode:"audio", step:2,
        input:{ analysis, generalized_style: generalizedStyle }
      })
    });
    const { specDelta } = await r.json();
    setCreation(specDelta.creation);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <GlassCard>
        <h2 className="text-2xl font-semibold">Audio — Step 1: Analyze</h2>
        <div className="mt-4 flex gap-2">
          <input value={refTitle} onChange={e=>setRefTitle(e.target.value)}
            placeholder="Enter an artist, album, or song…" className="w-full bg-transparent border px-3 py-2 rounded-md" />
          <button onClick={analyze} className="px-4 py-2 bg-audio/40 border rounded-md">Analyze</button>
        </div>
        {analysis && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <GlassCard>
              <h3 className="font-medium">Sonic Signature</h3>
              <p className="opacity-80">{analysis.sonic_signature}</p>
              <div className="mt-2"><CopyButton text={analysis.sonic_signature} /></div>
            </GlassCard>
            <GlassCard>
              <h3 className="font-medium">Tempo & Energy</h3>
              <p className="opacity-80">{analysis.tempo_energy}</p>
              <div className="mt-2"><CopyButton text={analysis.tempo_energy} /></div>
            </GlassCard>
            <GlassCard className="md:col-span-2">
              <h3 className="font-medium">Why it works</h3>
              <p className="opacity-80">{analysis.why_it_works}</p>
              <div className="mt-2"><CopyButton text={analysis.why_it_works} /></div>
            </GlassCard>
          </div>
        )}
      </GlassCard>

      <GlassCard>
        <h2 className="text-2xl font-semibold">Step 2: Generate Song</h2>
        <div className="mt-3">
          <input value={generalizedStyle} onChange={e=>setGeneralizedStyle(e.target.value)} 
            placeholder="Generalized style (e.g. 'like Bon Iver but with electronic elements')"
            className="w-full bg-transparent border px-3 py-2 rounded-md" />
        </div>
        <button onClick={makeSong} className="mt-3 px-4 py-2 bg-audio/40 border rounded-md">Generate Song</button>

        {creation?.lyrics && (
          <div className="mt-5 space-y-4">
            <GlassCard>
              <h3 className="font-medium">Lyrics</h3>
              <div className="whitespace-pre-line opacity-80">{creation.lyrics.full}</div>
              <div className="mt-2"><CopyButton text={creation.lyrics.full || ''} /></div>
            </GlassCard>
            {creation.lyrics.parts && (
              <GlassCard>
                <h3 className="font-medium">Song Structure</h3>
                <div className="space-y-2">
                  {Object.entries(creation.lyrics.parts).map(([section, lyrics]) => (
                    <div key={section} className="border border-glassStroke rounded-md p-3">
                      <h4 className="font-medium text-sm opacity-70">{section}</h4>
                      <p className="text-sm opacity-80 mt-1">{lyrics}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
