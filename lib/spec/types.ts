export type ProjectMode = "video" | "audio" | "web";

export interface BaseSpec {
  id: string;
  mode: ProjectMode;
  title: string;            // user input or generated
  summary: string;
  palette?: { primary: string; accent: string };
  createdAt: string;        // ISO
  step: 1 | 2;              // where the user is in the flow
}

export interface VideoSpec extends BaseSpec {
  mode: "video";
  input: { reference: string }; // "The Bear", "Blade Runner"
  analysis: {
    meta_themes: string[];
    dynamics: string[];         // pacing/devices (tension, release, irony)
    motifs: string[];
    humor_notes?: string[];
    why_it_works: string;       // plain explanation
  };
  creation?: {
    setting: string;            // "Austin, TX 1994"
    genre: string;              // enum string from selector
    subject: string;            // "what is the main idea"
    pilot: {
      logline: string;
      outline: string[];        // beat breakdown
      scenes: Array<{ slug: string; description: string }>;
    };
    export: {
      video_ai_targets: Array<{
        name: string; hint: string;    // Kling, etc. (brand-agnostic text)
        prompt: string;                 // formatted prompt ready to paste
      }>;
    };
  };
}

export interface AudioSpec extends BaseSpec {
  mode: "audio";
  input: { reference: string }; // "Bon Iver - ...", or artist/album/song
  analysis: {
    sonic_signature: string;    // timbre/instrumentation
    chords_keys: string[];
    tempo_energy: string;       // BPM, dynamics
    structure: string[];        // Verse/Chorus/Bridge
    why_it_works: string;
  };
  creation?: {
    generalized_style: string;  // "like, but distinct"
    lyrics?: {
      full?: string;
      parts?: Record<string, string>; // Verse 1, Chorus, etc.
    };
    export: {
      audio_ai_targets: Array<{ name: string; hint: string; prompt: string }>;
    };
  };
}

export interface WebSpec extends BaseSpec {
  mode: "web";
  input: { what_if: string };  // "water powered car…"
  analysis: {
    market_angle: string;
    persona_notes: string[];
    story_hook: string;
  };
  creation?: {
    site: {
      brand: string;
      pages: Array<{
        path: string; title: string;
        sections: Array<{
          kind: "hero" | "feature" | "cta" | "faq" | "pricing" | "gallery" | "custom";
          copy: string;
          img_placeholder?: { w: number; h: number; alt: string; prompt: string };
        }>;
      }>;
      seo: { title: string; description: string };
    };
    export: {
      repo_scaffold: Array<{ path: string; contents: string }>;
      design_variability: string[]; // notes to randomize vibes
    };
  };
}

export type AnySpec = VideoSpec | AudioSpec | WebSpec;
