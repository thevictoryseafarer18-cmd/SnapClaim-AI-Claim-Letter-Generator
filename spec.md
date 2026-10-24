# SnapClaim: Technical spec
- Next.js 14 App Router, TypeScript, Tailwind. State via useState.
- `POST /api/analyze` {images[],insuranceType,description} → {analysis}. `POST /api/generate-letter` {analysis,insuranceType,date,description} → {letter,ref}.
- `lib/ai.ts` calls OpenAI gpt-4o or Anthropic via `AI_PROVIDER`; keys from `.env.local`.
- Images resized to max 1280px, JPEG 0.8, in the browser before upload.
- PDF via @react-pdf/renderer, loaded lazily on click.
- Analysis JSON: {damageType, location, overallSeverity, items[{component,description,severity}], repairScope}.
