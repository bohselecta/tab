import { NextResponse } from "next/server";
import { runVideoStep1, runVideoStep2, runAudioStep1, runAudioStep2, runWebStep1, runWebStep2 } from "@/lib/ai/pipelines";
import { generateId } from "@/lib/util/id";

export async function POST(req: Request) {
  try {
    const { mode, step, input } = await req.json();
    let specDelta: any = {};

    if (mode === "video" && step === 1) {
      const analysis = await runVideoStep1(input.reference);
      specDelta = {
        id: generateId(), 
        mode, 
        step: 1,
        title: input.reference,
        summary: analysis.why_it_works,
        createdAt: new Date().toISOString(),
        analysis,
      };
    } else if (mode === "video" && step === 2) {
      const creation = await runVideoStep2({
        analysis: input.analysis,
        setting: input.setting, 
        genre: input.genre, 
        subject: input.subject,
      });
      specDelta = { step: 2, creation };
    } else if (mode === "audio" && step === 1) {
      const analysis = await runAudioStep1(input.reference);
      specDelta = {
        id: generateId(), 
        mode, 
        step: 1,
        title: input.reference,
        summary: analysis.why_it_works,
        createdAt: new Date().toISOString(),
        analysis,
      };
    } else if (mode === "audio" && step === 2) {
      const creation = await runAudioStep2({
        analysis: input.analysis,
        generalized_style: input.generalized_style,
      });
      specDelta = { step: 2, creation };
    } else if (mode === "web" && step === 1) {
      const analysis = await runWebStep1(input.what_if);
      specDelta = {
        id: generateId(), 
        mode, 
        step: 1,
        title: input.what_if,
        summary: analysis.story_hook,
        createdAt: new Date().toISOString(),
        analysis,
      };
    } else if (mode === "web" && step === 2) {
      const creation = await runWebStep2({
        analysis: input.analysis,
        brand: input.brand,
        vibe: input.vibe,
        mode: input.mode,
      });
      specDelta = { step: 2, creation };
    }

    return NextResponse.json({ specDelta });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
