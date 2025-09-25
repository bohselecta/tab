import { llmCall } from "./gateway";
import { 
  buildVideoStep1Messages, buildVideoStep2Messages,
  buildAudioStep1Messages, buildAudioStep2Messages,
  buildWebStep1Messages, buildWebStep2Messages,
  INFERENCE_HINTS
} from "./prompts";

export async function runVideoStep1(reference: string) {
  const messages = buildVideoStep1Messages(reference);
  const content = await llmCall({
    messages,
    temperature: INFERENCE_HINTS.temperature,
    max_tokens: 800,
  });
  return JSON.parse(content);
}

export async function runVideoStep2(args: {
  analysis: object; setting: string; genre: string; subject: string;
}) {
  const messages = buildVideoStep2Messages({
    analysisJson: JSON.stringify(args.analysis),
    setting: args.setting, 
    genre: args.genre, 
    subject: args.subject,
  });
  const content = await llmCall({
    messages,
    temperature: INFERENCE_HINTS.temperature,
    max_tokens: 1200,
  });
  return JSON.parse(content);
}

export async function runAudioStep1(reference: string) {
  const messages = buildAudioStep1Messages(reference);
  const content = await llmCall({
    messages,
    temperature: INFERENCE_HINTS.temperature,
    max_tokens: 800,
  });
  return JSON.parse(content);
}

export async function runAudioStep2(args: {
  analysis: object; generalized_style: string;
}) {
  const messages = buildAudioStep2Messages({
    analysisJson: JSON.stringify(args.analysis),
    wantLyrics: true, // Enable lyrics by default
  });
  const content = await llmCall({
    messages,
    temperature: INFERENCE_HINTS.temperature,
    max_tokens: 1200,
  });
  return JSON.parse(content);
}

export async function runWebStep1(whatIf: string) {
  const messages = buildWebStep1Messages(whatIf);
  const content = await llmCall({
    messages,
    temperature: INFERENCE_HINTS.temperature,
    max_tokens: 600,
    timeoutMs: 3500,
  });
  return JSON.parse(content);
}

export async function runWebStep2(args: {
  analysis: object; brand: string; vibe?: string; mode?: "quick" | "deep";
}) {
  // Use progressive generation for Web
  const { createSiteSpec } = await import("./pipelines.web");
  
  const mode = args.mode || "quick";
  const result = await createSiteSpec({
    analysisJson: JSON.stringify(args.analysis),
    brand: args.brand,
    vibe: args.vibe || "Neon Glass",
    mode: mode as any,
  });
  
  return result;
}
