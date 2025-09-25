"use client";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import ModePills from "@/components/ModePills";

export default function StudioPage() {
  const modes = [
    {
      id: "video",
      title: "Video",
      description: "Analyze shows and movies, then generate pilot concepts with AI-ready prompts",
      color: "video",
      href: "/studio/video"
    },
    {
      id: "audio", 
      title: "Audio",
      description: "Deconstruct music references and create original songs with lyrics and production notes",
      color: "audio",
      href: "/studio/audio"
    },
    {
      id: "web",
      title: "Web",
      description: "Turn 'what if' concepts into complete website specifications and code scaffolds",
      color: "web", 
      href: "/studio/web"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Tablature Studio</h1>
        <p className="text-lg opacity-80">Choose your creative mode and start building</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <Link key={mode.id} href={mode.href}>
            <GlassCard className="h-full hover:bg-glassStroke transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{mode.title}</h2>
                <ModePills mode={mode.id as any} />
              </div>
              
              <p className="opacity-80 mb-4">{mode.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-60">Start creating →</span>
                <div className={`w-2 h-2 rounded-full bg-${mode.color} group-hover:scale-125 transition-transform`} />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <GlassCard className="mt-8">
        <h3 className="text-lg font-semibold mb-3">How it works</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Step 1: Analysis</h4>
            <p className="text-sm opacity-80">
              Input a reference work (show, song, or concept) and our AI will deconstruct 
              its core elements, themes, and what makes it compelling.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Step 2: Creation</h4>
            <p className="text-sm opacity-80">
              Provide additional context and generate original content with AI-ready 
              prompts, structured outputs, and export options.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
