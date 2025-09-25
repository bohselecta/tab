import { AnySpec } from "@/lib/spec/types";

export function renderHtml(spec: AnySpec): string {
  const baseHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${spec.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .glass {
      background: rgba(255,255,255,0.06);
      backdrop-filter: saturate(120%) blur(12px);
      border: 1px solid rgba(255,255,255,0.12);
      box-shadow: 0 1px 0 0 rgba(255,255,255,0.06) inset, 0 12px 40px rgba(0,0,0,0.45);
      border-radius: 16px;
    }
  </style>
</head>
<body class="bg-ink text-white min-h-screen">
  <div class="container mx-auto px-4 py-8">
    <div class="glass p-8 mb-8">
      <h1 class="text-4xl font-bold mb-4">${spec.title}</h1>
      <p class="text-lg opacity-80 mb-4">${spec.summary}</p>
      <div class="flex gap-2">
        <span class="px-3 py-1 rounded-full text-sm font-medium ${
          spec.mode === 'video' ? 'bg-video text-white' :
          spec.mode === 'audio' ? 'bg-audio text-white' :
          'bg-web text-black'
        }">${spec.mode.toUpperCase()}</span>
        <span class="px-3 py-1 rounded-full text-sm bg-glass text-white">Step ${spec.step}</span>
      </div>
    </div>`;

  let contentHtml = "";

  if (spec.mode === "video") {
    contentHtml = renderVideoContent(spec);
  } else if (spec.mode === "audio") {
    contentHtml = renderAudioContent(spec);
  } else if (spec.mode === "web") {
    contentHtml = renderWebContent(spec);
  }

  return baseHtml + contentHtml + `
  </div>
</body>
</html>`;
}

function renderVideoContent(spec: any): string {
  let html = `<div class="glass p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4">Analysis</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold mb-2">Meta Themes</h3>
        <ul class="list-disc list-inside space-y-1">`;
  
  spec.analysis.meta_themes.forEach((theme: string) => {
    html += `<li>${theme}</li>`;
  });
  
  html += `</ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Dynamics</h3>
        <ul class="list-disc list-inside space-y-1">`;
  
  spec.analysis.dynamics.forEach((dynamic: string) => {
    html += `<li>${dynamic}</li>`;
  });
  
  html += `</ul>
      </div>
    </div>
    <div class="mt-4">
      <h3 class="text-lg font-semibold mb-2">Why It Works</h3>
      <p class="opacity-90">${spec.analysis.why_it_works}</p>
    </div>
  </div>`;

  if (spec.creation) {
    html += `<div class="glass p-6">
      <h2 class="text-2xl font-bold mb-4">Pilot</h2>
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Logline</h3>
        <p class="opacity-90">${spec.creation.pilot.logline}</p>
      </div>
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Outline</h3>
        <ol class="list-decimal list-inside space-y-1">`;
    
    spec.creation.pilot.outline.forEach((beat: string) => {
      html += `<li>${beat}</li>`;
    });
    
    html += `</ol>
      </div>
    </div>`;
  }

  return html;
}

function renderAudioContent(spec: any): string {
  let html = `<div class="glass p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4">Analysis</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold mb-2">Sonic Signature</h3>
        <p class="opacity-90">${spec.analysis.sonic_signature}</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Tempo & Energy</h3>
        <p class="opacity-90">${spec.analysis.tempo_energy}</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Why It Works</h3>
        <p class="opacity-90">${spec.analysis.why_it_works}</p>
      </div>
    </div>
  </div>`;

  if (spec.creation?.lyrics) {
    html += `<div class="glass p-6">
      <h2 class="text-2xl font-bold mb-4">Lyrics</h2>
      <div class="whitespace-pre-line opacity-90">${spec.creation.lyrics.full || ''}</div>
    </div>`;
  }

  return html;
}

function renderWebContent(spec: any): string {
  let html = `<div class="glass p-6 mb-6">
    <h2 class="text-2xl font-bold mb-4">Analysis</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold mb-2">Market Angle</h3>
        <p class="opacity-90">${spec.analysis.market_angle}</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Story Hook</h3>
        <p class="opacity-90">${spec.analysis.story_hook}</p>
      </div>
    </div>
  </div>`;

  if (spec.creation?.site) {
    html += `<div class="glass p-6">
      <h2 class="text-2xl font-bold mb-4">Site: ${spec.creation.site.brand}</h2>
      <div class="space-y-4">`;
    
    spec.creation.site.pages.forEach((page: any) => {
      html += `<div class="border border-glassStroke rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-2">${page.title}</h3>
        <p class="text-sm opacity-70 mb-2">/${page.path}</p>`;
      
      page.sections.forEach((section: any) => {
        html += `<div class="mt-2 p-2 bg-glass rounded">
          <span class="text-xs font-medium opacity-60">${section.kind.toUpperCase()}</span>
          <p class="text-sm mt-1">${section.copy}</p>
        </div>`;
      });
      
      html += `</div>`;
    });
    
    html += `</div>
    </div>`;
  }

  return html;
}
