# Tablature

Plan your creativity. Generate copy-ready specs for Video, Audio, and Web.
Built with Next.js (App Router), Tailwind, Vercel KV, Vercel AI Gateway → xAI Grok Code Fast 1.

## Models
**xAI Grok Code Fast 1** via Vercel AI Gateway
- Model ID: `xai/grok-code-fast-1`
- Pricing: ~$0.20/M input, $1.50/M output; ~2M TPM, 480 RPM
- Optimized for coding and structured outputs

## Auth
**Clerk** via Vercel Marketplace
- One-click installation with automatic env sync
- Sign-in/Sign-up pages included
- Protected routes for Studio and user projects

## Storage
**Vercel Storage Suite**
- KV (projects, gallery cache)
- Postgres (optional for relational data)
- Blob (optional for file exports)

## Env Variables
Required:
- `AI_GATEWAY_URL`, `AI_GATEWAY_API_KEY` (for Grok via Gateway)
- `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` (via Marketplace)
- `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_URL` (via Storage)
- `NEXT_PUBLIC_BASE_URL`

## Dev
```bash
npm install
npm run dev
```

## Deploy
1. Install Clerk via Vercel Marketplace
2. Add xAI integration via Vercel AI Gateway
3. Connect Vercel KV storage
4. Deploy

## Features
- **Progressive Web Generation**: Immediate skeleton → background enrichment
- **Content Sanitization**: Safe public publishing with copyright protection
- **Rate Limiting**: Built-in protection for AI endpoints
- **Real-time Updates**: Client-side polling for enriched content
- **Multi-mode Studio**: Video, Audio, and Web creation workflows