import { llmCall } from "./gateway";
import { buildWebStep2Messages } from "./prompts";
import { enrichSectionPrompt } from "./prompts.enrich";
import { sanitizeAndRepairWebSpec } from "../spec/repair";
import { MODES, Mode } from "./modes";
import { kv } from "@vercel/kv";

export async function createSiteSpec({ analysisJson, brand, vibe, mode }:{
  analysisJson: string; brand?: string; vibe?: string; mode: Mode;
}) {
  const cfg = MODES[mode];
  
  // A) Fast skeleton
  const skeleton = await llmCall({
    messages: buildWebStep2Messages({ analysisJson, brand, vibe: (vibe as any) }),
    temperature: cfg.temperature,
    max_tokens: Math.min(cfg.maxTokens, 700),
    timeoutMs: 3000,
  }).then(JSON.parse);

  // Validate & repair
  let spec = sanitizeAndRepairWebSpec(skeleton, { sectionCap: cfg.sectionCap, wordCap: cfg.wordCap });

  // B) Parallel enrichment (optional; don't block UI)
  // fire-and-forget; on server you could await with a hard timeout and return when done.
  void enrichSections(spec, cfg, vibe || "Neon Glass").then(updated => {
    // cache the enriched result for the project id (KV set). Client will re-fetch.
    // In a real implementation, you'd store this with the project ID
  }).catch(()=>{});

  return spec; // skeleton for immediate preview
}

async function enrichSections(spec: any, cfg: typeof MODES.quick | typeof MODES.deep, vibe: string) {
  const tasks: Promise<void>[] = [];
  for (const page of spec.creation.site.pages) {
    for (const sec of page.sections) {
      tasks.push(
        enrichOne(sec, cfg, page.title, vibe).catch(()=>{})
      );
    }
  }
  await Promise.race([
    Promise.allSettled(tasks).then(()=>{}),
    new Promise<void>(r => setTimeout(r, 2500)) // hard cap: don't block too long
  ]);
  return spec;
}

async function enrichOne(sec: any, cfg: any, pageTitle: string, vibe: string) {
  // tiny, targeted prompt—cheaper than re-gen whole site.
  try {
    const enrichedCopy = await llmCall({
      messages: [
        { role: "system", content: "You are a copywriter. Improve text concisely and professionally." },
        { role: "user", content: enrichSectionPrompt({ pageTitle, sectionKind: sec.kind, currentCopy: sec.copy, vibe }) }
      ],
      max_tokens: 150,
      timeoutMs: 1500,
      temperature: cfg.temperature + 0.1, // slightly more creative for enrichment
    });
    
    // Update the section with enriched copy
    sec.copy = enrichedCopy.trim();
    
    // Add image placeholder if missing
    if (!sec.img_placeholder && ["hero", "feature", "gallery"].includes(sec.kind)) {
      sec.img_placeholder = {
        w: 1200,
        h: 800,
        alt: `Illustrative ${sec.kind} image`,
        prompt: `Professional ${sec.kind} image for ${pageTitle} in ${vibe} style`
      };
    }
  } catch (error) {
    // Silently fail - we have the skeleton
    console.log("Enrichment failed for section:", sec.kind);
  }
}

// Cache management
export async function getCachedAnalysis(whatIf: string, vibe: string): Promise<any | null> {
  try {
    const cacheKey = `analysis:${Buffer.from(whatIf + vibe).toString('base64')}`;
    return await kv.get(cacheKey);
  } catch {
    return null;
  }
}

export async function setCachedAnalysis(whatIf: string, vibe: string, analysis: any): Promise<void> {
  try {
    const cacheKey = `analysis:${Buffer.from(whatIf + vibe).toString('base64')}`;
    await kv.setex(cacheKey, 86400, analysis); // 24h cache
  } catch {
    // Silently fail
  }
}
