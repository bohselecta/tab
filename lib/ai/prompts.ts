// High-discipline prompt pack for Tablature.io
// Works with OpenAI-compatible chat APIs via Vercel AI Gateway (Fireworks primary).

// ---------- Shared Utilities ----------
export type ChatMsg = { role: "system"|"user"|"assistant"; content: string };

export const JSON_MINIFIED_ONLY = `
Return ONLY minified JSON. No prose, no markdown, no backticks.
Do not include fields not in schema. Do not include explanations or reasoning.
`.trim();

export const STYLE_GUIDE_SHORTNESS = `
Be concrete and terse. Sentences max ~18 words. Bullets 3–8 items. Avoid redundancy.
Use plain language. No filler. No metaphors unless asked.
`.trim();

export const HIDDEN_THINKING_RULE = `
You may use a private scratchpad. Never reveal chain-of-thought, plans, or intermediate notes.
Only return final JSON per schema.
`.trim();

export const COPYRIGHT_SAFETY = `
Do not output copyrighted lyrics or script dialogue verbatim beyond 90 characters total.
Paraphrase and generalize. For prompts to external AIs, use brand-agnostic phrasing.
`.trim();

export const OUTPUT_QUALITY_RUBRIC = `
Before finalizing, internally self-check:
- Factual clarity (0-1): are terms concrete and usable?
- Structure completeness (0-1): all required fields present?
- Actionability (0-1): can a user copy-paste and proceed?
Fix issues silently, then output JSON.
`.trim();

// ---------- Web Design Protocol (compact but powerful) ----------
export const WEB_DESIGN_PROTOCOL = `
WEB DESIGN PROTOCOL v1.1 (Compact)
A. GRID & TYPE
- Container: mobile fluid; desktop content width ~1100–1200px; 12-col grid (80–96px columns, 16–24px gutters).
- Breakpoints: sm ≤640, md ≤768, lg ≤1024, xl ≤1280. Mobile-first.
- Type scale (fallback): 12,14,16,18,20,24,30,36,48. Line-height: 1.4–1.6 body, 1.2–1.3 headings.

B. LAYOUT PATTERNS (choose 1–2 per page)
- HERO: Statement, Split (copy+image), Product billboard.
- CONTENT: Z-pattern landing, F-pattern article, Two-column marketing, Feature grid (2x2 or 3x2).
- NAV: Top sticky minimal; collapse to hamburger on mobile.
- DOCS: Sidebar nav + content.
- COMMERCE: Pricing tiers (3–4 cols), Comparison table, FAQ accordion.
- SOCIAL PROOF: Testimonials strip, Logo wall.

C. COMPONENTS & RULES
- CTAs: primary then secondary; never more than 2 per section.
- Forms: label above input, 44px min hit area, inline error text.
- Images: lazy-load; provide ALT that describes intent. Use placeholders with target w/h.
- Accessibility: WCAG AA contrast; visible focus states; keyboard navigation.
- Motion: soft fades/translate; 200–300ms; respect prefers-reduced-motion.
- SEO: semantic HTML (h1 per page), meta title ≤60 chars, meta desc 140–160 chars.
- Performance: initial CSS+JS < 200KB; defer non-critical; avoid auto-playing video.

D. MOBILE FIRST
- Single-column sections; stack media after copy; keep CTAs above the fold when possible.

E. DESIGN VIBES (pick one)
- Modern Minimal, Neon Glass (dark liquid glass), Editorial Serif, Playful Pastel, Dark Pro.

F. COPY TONE
- Clear, confident, specific benefits. Avoid clichés. Prefer verbs.

Return pages built from sections with allowed kinds:
"hero" | "feature" | "cta" | "faq" | "pricing" | "gallery" | "comparison" | "testimonial" | "custom"
`.trim();

// ---------- VIDEO Protocol ----------
export const VIDEO_PROTOCOL = `
VIDEO ANALYSIS/GENERATION v1.0
Focus: meta-themes, narrative devices, motifs, pacing/tension dynamics, "why it works".
Creation: pilot logline, 8–12 beat outline, 6–12 scenes (slug + action-focused description).
`.trim();

// ---------- AUDIO Protocol ----------
export const AUDIO_PROTOCOL = `
AUDIO ANALYSIS/GENERATION v1.0
Focus: sonic signature (timbre/instrumentation), chords/keys (roman numerals allowed), tempo/energy, structure.
Creation: generalized style brief (distinct), optional lyrics (parts + full), brand-agnostic prompts for audio AIs.
`.trim();

// ---------- Base System Prompts ----------
export const SYSTEM_BASE = `
You are a meticulous creative systems writer for product, film/tv, music, and web.
Follow schemas exactly. Prefer lists over paragraphs. Keep outputs compact and ready to paste.
${STYLE_GUIDE_SHORTNESS}
${HIDDEN_THINKING_RULE}
${COPYRIGHT_SAFETY}
${OUTPUT_QUALITY_RUBRIC}
`.trim();

export const SYSTEM_WEB = `
${SYSTEM_BASE}
You are also a senior product designer. Apply the WEB DESIGN PROTOCOL strictly.
Use allowed section kinds only. Provide realistic ALT and image placeholders.
`.trim();

export const SYSTEM_VIDEO = `
${SYSTEM_BASE}
You are a showrunner's room generator. Apply the VIDEO protocol strictly.
`.trim();

export const SYSTEM_AUDIO = `
${SYSTEM_BASE}
You are a music producer/writer. Apply the AUDIO protocol strictly.
`.trim();

// ---------- User Templates (Analysis → Creation) ----------
// NOTE: All templates demand minified JSON only. We keep schemas small for token efficiency.

// ---- Video Step 1 (Analysis) ----
export function usrVideoAnalysis(reference: string) {
  return `
Analyze this reference: "${reference}"
Return ${JSON_MINIFIED_ONLY}
Schema:
{"meta_themes":["string"],"dynamics":["string"],"motifs":["string"],"humor_notes":["string"],"why_it_works":"string"}
Caps: meta_themes 3-6; dynamics 3-6; motifs 3-6; humor_notes 0-4.
`.trim();
}

// ---- Video Step 2 (Creation) ----
export function usrVideoCreation(args: {
  analysisJson: string; setting: string; genre: string; subject: string;
}) {
  const { analysisJson, setting, genre, subject } = args;
  return `
Using prior analysis JSON: ${analysisJson}
Setting: ${setting}
Genre: ${genre}
Subject: ${subject}
Generate pilot pack.
Return ${JSON_MINIFIED_ONLY}
Schema:
{"pilot":{"logline":"string","outline":["string"],"scenes":[{"slug":"string","description":"string"}]},"export":{"video_ai_targets":[{"name":"string","hint":"string","prompt":"string"}]}}
Caps: outline 8-12; scenes 6-12; descriptions ≤38 words; prompts ≤180 words.
`.trim();
}

// ---- Audio Step 1 (Analysis) ----
export function usrAudioAnalysis(reference: string) {
  return `
Analyze this music reference (artist/album/track permitted): "${reference}"
Return ${JSON_MINIFIED_ONLY}
Schema:
{"sonic_signature":"string","chords_keys":["string"],"tempo_energy":"string","structure":["string"],"why_it_works":"string"}
Caps: chords_keys 3-8; structure 4-8. Use roman numerals where helpful (I–vi–IV–V).
`.trim();
}

// ---- Audio Step 2 (Creation) ----
export function usrAudioCreation(args: {
  analysisJson: string; wantLyrics: boolean;
}) {
  const { analysisJson, wantLyrics } = args;
  return `
Using prior analysis JSON: ${analysisJson}
Lyrics enabled: ${wantLyrics ? "true" : "false"}
Return ${JSON_MINIFIED_ONLY}
Schema:
{"generalized_style":"string","lyrics":{"parts":{"Intro?":"string","Verse 1?":"string","Pre-Chorus?":"string","Chorus?":"string","Bridge?":"string","Outro?":"string"},"full":"string"},"export":{"audio_ai_targets":[{"name":"string","hint":"string","prompt":"string"}]}}
Rules: if lyrics disabled, set lyrics to {}. Keep "full" ≤ 350 words total.
`.trim();
}

// ---- Web Step 1 (Analysis) ----
export function usrWebAnalysis(whatIf: string) {
  return `
"What if" brief: "${whatIf}"
Apply WEB DESIGN PROTOCOL to infer market angle, personas, and the narrative hook.
Return ${JSON_MINIFIED_ONLY}
Schema:
{"market_angle":"string","persona_notes":["string"],"story_hook":"string"}
Caps: persona_notes 3-6. Keep sentences short and actionable.
`.trim();
}

// ---- Web Step 2 (Creation) ----
export function usrWebCreation(args: {
  analysisJson: string;
  brand?: string;
  vibe?: "Modern Minimal"|"Neon Glass"|"Editorial Serif"|"Playful Pastel"|"Dark Pro";
}) {
  const { analysisJson, brand = "Project", vibe = "Neon Glass" } = args;
  return `
Using analysis JSON: ${analysisJson}
Design vibe: ${vibe}
Produce a multi-page site with semantic sections per the allowed kinds.
Each section requires concise copy. Provide image placeholders with w/h and meaningful ALT if visuals help.
Include SEO title/description, and a variability note list for design exploration.
Return ${JSON_MINIFIED_ONLY}
Allowed section kinds: "hero","feature","cta","faq","pricing","gallery","comparison","testimonial","custom"
Schema:
{"site":{"brand":"string","pages":[{"path":"string","title":"string","sections":[{"kind":"hero"|"feature"|"cta"|"faq"|"pricing"|"gallery"|"comparison"|"testimonial"|"custom","copy":"string","img_placeholder":{"w":number,"h":number,"alt":"string","prompt":"string"}?}]}],"seo":{"title":"string","description":"string"}},"export":{"repo_scaffold":[{"path":"string","contents":"string"}],"design_variability":["string"]}}
Caps: pages 2-5; sections per page 3-7; copy ≤60 words per section; ALT ≤14 words; SEO title ≤60 chars; description 140–160 chars; variability 3-6.
`.trim();
}

// ---------- System Message Builders ----------
export function systemForVideo(): ChatMsg {
  return { role: "system", content: `${SYSTEM_VIDEO}\n${VIDEO_PROTOCOL}` };
}
export function systemForAudio(): ChatMsg {
  return { role: "system", content: `${SYSTEM_AUDIO}\n${AUDIO_PROTOCOL}` };
}
export function systemForWeb(): ChatMsg {
  return { role: "system", content: `${SYSTEM_WEB}\n${WEB_DESIGN_PROTOCOL}` };
}

// ---------- Message Assemblers (ready for llmCall) ----------
export function buildVideoStep1Messages(reference: string): ChatMsg[] {
  return [systemForVideo(), { role: "user", content: usrVideoAnalysis(reference) }];
}

export function buildVideoStep2Messages(params: {
  analysisJson: string; setting: string; genre: string; subject: string;
}): ChatMsg[] {
  return [systemForVideo(), { role: "user", content: usrVideoCreation(params) }];
}

export function buildAudioStep1Messages(reference: string): ChatMsg[] {
  return [systemForAudio(), { role: "user", content: usrAudioAnalysis(reference) }];
}

export function buildAudioStep2Messages(params: {
  analysisJson: string; wantLyrics: boolean;
}): ChatMsg[] {
  return [systemForAudio(), { role: "user", content: usrAudioCreation(params) }];
}

export function buildWebStep1Messages(whatIf: string): ChatMsg[] {
  return [systemForWeb(), { role: "user", content: usrWebAnalysis(whatIf) }];
}

export function buildWebStep2Messages(params: {
  analysisJson: string; brand?: string; vibe?: "Modern Minimal"|"Neon Glass"|"Editorial Serif"|"Playful Pastel"|"Dark Pro";
}): ChatMsg[] {
  return [systemForWeb(), { role: "user", content: usrWebCreation(params) }];
}

// ---------- Inference Hints (tune per model) ----------
export const INFERENCE_HINTS = {
  temperature: 0.6,        // keep creative but grounded
  top_p: 0.9,
  presence_penalty: 0.2,
  frequency_penalty: 0.1,
  // max_tokens: set by caller per step (JSON is compact; 512–1200 is typical)
};
