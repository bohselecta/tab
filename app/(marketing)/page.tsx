import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <section className="container pt-16">
        <div className="glass px-8 py-10 rounded-xl2">
          <p className="badge">Creator Toolkit</p>
          <h1 className="mt-3 h1">Plan. Generate. Ship.</h1>
          <p className="p mt-3 max-w-2xl">
            Tablature turns vague ideas into precise, copy-ready plans for <b>video</b>, <b>audio</b>, and <b>web</b>.
            Explore directions, then paste into your favorite AI tools—or push a scaffold to GitHub.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/studio" className="btn btn-primary">Start Creating</Link>
            <Link href="/gallery" className="btn">Explore Gallery</Link>
          </div>
        </div>
      </section>

      <section className="container mt-10 grid md:grid-cols-3 gap-6">
        <Card title="Video" tone="cy" desc="Deconstruct any show or film. Generate a pilot with scenes and beats, plus ready-to-paste prompts." />
        <Card title="Audio" tone="pk" desc="Analyze an artist or track. Get a distinct song brief with optional lyrics and generator prompts." />
        <Card title="Web" tone="gn" desc="Ask "what if…?" Generate a multi-page site spec and live HTML preview; push a repo scaffold." />
      </section>

      <section className="container mt-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl2">
            <h2 className="h2">Why Tablature</h2>
            <ul className="mt-3 space-y-2 text-white/85">
              <li>• Structured flows that keep you moving.</li>
              <li>• Design protocol for stylish, accessible layouts.</li>
              <li>• Copy-ready outputs with strict schemas.</li>
              <li>• Autosave—every run, safely stored in your account.</li>
            </ul>
          </div>
          <div className="glass p-6 rounded-xl2">
            <h2 className="h2">How it works</h2>
            <ol className="mt-3 space-y-2 text-white/85">
              <li>1. Pick Video, Audio, or Web.</li>
              <li>2. Run analysis, then create.</li>
              <li>3. Copy prompts or export.</li>
              <li>4. Publish to Gallery when you're ready.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ title, tone, desc }:{ title:string; tone:"cy"|"pk"|"gn"; desc:string }) {
  const color = tone==="cy" ? "border-[#08B0D5]" : tone==="pk" ? "border-[#F632B3]" : "border-[#7CFF8C]";
  return (
    <div className={`glass p-6 rounded-xl2 border ${color}`}>
      <h3 className="h3">{title}</h3>
      <p className="p mt-2">{desc}</p>
      <div className="mt-4">
        <span className="badge">Copy-ready</span>
      </div>
    </div>
  );
}
