import { AnySpec } from '@/lib/spec/types';

export function sanitizeForGallery(spec: AnySpec): AnySpec {
  const sanitized = { ...spec };

  // Remove sensitive or copyrighted content for public gallery
  if (sanitized.mode === 'audio' && sanitized.creation?.lyrics) {
    // Keep structured parts but remove full lyrics
    sanitized.creation = {
      ...sanitized.creation,
      lyrics: {
        parts: sanitized.creation.lyrics.parts,
        // Remove full lyrics to avoid copyright issues
      }
    };
  }

  if (sanitized.mode === 'video' && sanitized.creation?.pilot) {
    // Keep logline and outline but truncate scenes
    sanitized.creation = {
      ...sanitized.creation,
      pilot: {
        ...sanitized.creation.pilot,
        scenes: sanitized.creation.pilot.scenes.slice(0, 2), // Only show first 2 scenes
      }
    };
  }

  if (sanitized.mode === 'web' && sanitized.creation?.site) {
    // Keep structure but limit content
    sanitized.creation = {
      ...sanitized.creation,
      site: {
        ...sanitized.creation.site,
        pages: sanitized.creation.site.pages.map(page => ({
          ...page,
          sections: page.sections.slice(0, 3), // Limit to first 3 sections per page
        }))
      }
    };
  }

  return sanitized;
}

export function sanitizeForExport(spec: AnySpec): AnySpec {
  // For exports, we can be more permissive but still remove obvious copyrighted content
  const sanitized = { ...spec };

  if (sanitized.mode === 'audio' && sanitized.creation?.lyrics?.full) {
    // Replace full lyrics with a note for exports
    sanitized.creation = {
      ...sanitized.creation,
      lyrics: {
        ...sanitized.creation.lyrics,
        full: '[Generated lyrics - review and modify as needed]',
      }
    };
  }

  return sanitized;
}

export function sanitizeForPublic(spec: any) {
  const clone = JSON.parse(JSON.stringify(spec));
  if (clone.mode === "audio") {
    if (clone.creation?.lyrics?.full) clone.creation.lyrics.full = "[redacted for public]";
  }
  // Add any other redactions here…
  return clone;
}
