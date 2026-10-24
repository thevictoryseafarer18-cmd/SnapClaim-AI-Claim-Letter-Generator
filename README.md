# SnapClaim
Upload damage photos, get a professional insurance claim letter and a PDF.

## Setup
```bash
npm install
cp .env.example .env.local   # add your OPENAI_API_KEY (or set AI_PROVIDER=anthropic)
npm run dev                  # http://localhost:3000
```
## Flow
Upload → Details → Generate (damage report + letter) → Edit → Export PDF.

## Notes
Planning docs: `scope.md`, `prd.md`, `spec.md`. No auth, database, payments or email by design.
Screenshots: add yours to `/docs` after your first run.
