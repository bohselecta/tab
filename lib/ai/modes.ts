export const MODES = {
  quick:  { maxTokens: 650,  temperature: 0.5, sectionCap: 4,  wordCap: 45 },
  deep:   { maxTokens: 1400, temperature: 0.7, sectionCap: 7,  wordCap: 60 },
} as const;

export type Mode = keyof typeof MODES;
