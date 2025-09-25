# Tablature

Plan your creativity. Generate copy-ready specs for Video, Audio, and Web.
Built with Next.js (App Router), Tailwind, Vercel KV, Vercel AI Gateway → Fireworks.

## Env
AI_GATEWAY_URL, AI_GATEWAY_API_KEY, KV_REST_API_URL, KV_REST_API_TOKEN, KV_URL, NEXT_PUBLIC_BASE_URL

## Dev
npm install
npm run dev

## Deploy
Add env vars on Vercel, connect KV, configure AI Gateway route to Fireworks, deploy.

## Notes
- Autosave runs after Step 2 to prevent data loss.
- Gallery uses a sanitized spec to avoid publishing sensitive content.
- Web flow renders an immediate HTML preview, then enriches copy in the background.