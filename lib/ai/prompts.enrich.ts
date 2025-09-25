export function enrichSectionPrompt({ pageTitle, sectionKind, currentCopy, vibe }:{
  pageTitle: string; sectionKind: string; currentCopy: string; vibe: string;
}) {
  return `
Improve this ${sectionKind} copy for page "${pageTitle}" in the vibe "${vibe}".
Rules: ≤60 words, actionable, concrete benefits, no clichés; keep semantics.
Return ONLY text (no JSON).
Current:
${currentCopy}
`.trim();
}
