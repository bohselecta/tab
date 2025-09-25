import { z } from "zod";

export const BaseSpecZ = z.object({
  id: z.string(), 
  mode: z.enum(["video","audio","web"]),
  title: z.string(), 
  summary: z.string(),
  createdAt: z.string(), 
  step: z.union([z.literal(1), z.literal(2)]),
});

export const VideoSpecZ = BaseSpecZ.extend({
  mode: z.literal("video"),
  input: z.object({ reference: z.string() }),
  analysis: z.object({
    meta_themes: z.array(z.string()),
    dynamics: z.array(z.string()),
    motifs: z.array(z.string()),
    humor_notes: z.array(z.string()).optional(),
    why_it_works: z.string(),
  }),
  creation: z.object({
    setting: z.string(),
    genre: z.string(),
    subject: z.string(),
    pilot: z.object({
      logline: z.string(),
      outline: z.array(z.string()),
      scenes: z.array(z.object({ slug: z.string(), description: z.string() })),
    }),
    export: z.object({
      video_ai_targets: z.array(z.object({
        name: z.string(), hint: z.string(), prompt: z.string(),
      })),
    }),
  }).optional(),
});

export const AudioSpecZ = BaseSpecZ.extend({
  mode: z.literal("audio"),
  input: z.object({ reference: z.string() }),
  analysis: z.object({
    sonic_signature: z.string(),
    chords_keys: z.array(z.string()),
    tempo_energy: z.string(),
    structure: z.array(z.string()),
    why_it_works: z.string(),
  }),
  creation: z.object({
    generalized_style: z.string(),
    lyrics: z.object({
      full: z.string().optional(),
      parts: z.record(z.string()).optional(),
    }).optional(),
    export: z.object({
      audio_ai_targets: z.array(z.object({
        name: z.string(), hint: z.string(), prompt: z.string(),
      })),
    }),
  }).optional(),
});

export const WebSpecZ = BaseSpecZ.extend({
  mode: z.literal("web"),
  input: z.object({ what_if: z.string() }),
  analysis: z.object({
    market_angle: z.string(),
    persona_notes: z.array(z.string()),
    story_hook: z.string(),
  }),
  creation: z.object({
    site: z.object({
      brand: z.string(),
      pages: z.array(z.object({
        path: z.string(), 
        title: z.string(),
        sections: z.array(z.object({
          kind: z.enum(["hero", "feature", "cta", "faq", "pricing", "gallery", "custom"]),
          copy: z.string(),
          img_placeholder: z.object({
            w: z.number(), h: z.number(), alt: z.string(), prompt: z.string(),
          }).optional(),
        })),
      })),
      seo: z.object({ title: z.string(), description: z.string() }),
    }),
    export: z.object({
      repo_scaffold: z.array(z.object({ path: z.string(), contents: z.string() })),
      design_variability: z.array(z.string()),
    }),
  }).optional(),
});

export type VideoSpec = z.infer<typeof VideoSpecZ>;
export type AudioSpec = z.infer<typeof AudioSpecZ>;
export type WebSpec = z.infer<typeof WebSpecZ>;
