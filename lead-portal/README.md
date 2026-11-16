# Lead Intelligence Portal — run & deploy

A DB-free portal: upload a call CSV → it fetches each recording, transcribes with Groq
`whisper-large-v3`, decides nurse-eligibility + a 0–10 quality rating, and shows everything
in a dashboard. Results stay in the page until you **Download enriched CSV** (that file is
your store; re-upload it later and already-transcribed rows are skipped — zero Groq cost).

## Files
- `server.js` — zero-dep Node server; serves the UI and proxies Groq (keeps key server-side).
- `public/index.html` — the whole dashboard (upload, table, filters, transcript+audio drawer,
  budget meter, export). No build step.
- `package.json` — `undici` is only needed for the sandbox proxy; harmless elsewhere.

## Run locally / on any Node host (Render, Railway, Fly, a VPS, or the spare laptop)
```bash
npm install
GROQ_API_KEY=your_groq_key  node server.js
# open http://localhost:3000
```
That's the whole deploy on a normal Node host: set `GROQ_API_KEY` as an env var and run
`npm start`. (Render/Railway: new Web Service → this repo → start command `npm start` →
add the `GROQ_API_KEY` env var. Done.)

> Vercel note: Vercel wants serverless functions, not a long-running server. This single-
> process app runs as-is on Render/Railway/Fly/VPS/laptop. If you specifically want Vercel,
> ask and I'll split `server.js` into `/api/transcribe` + `/api/score` functions.

## Config (env vars, all optional)
- `GROQ_API_KEY` — required in a real deployment.
- `PORT` — default 3000.
- `STT_MODEL` — default `whisper-large-v3`.
- `LLM_MODEL` — default `openai/gpt-oss-20b` (what this Groq account exposes).
- `STT_LANG` — default `hi` (set `''` to auto-detect).

## How it behaves
- **Eligibility:** nurse → Eligible (rated); clearly not → Not Eligible; unclear → Needs Review.
- **Rating:** 0–10 → Platinum/Gold/Silver/Bronze/Low; age lowers score, never disqualifies.
- **Groq budget guard:** counts calls/day (client-side, per browser), caps at the free-tier
  daily limit, throttles to stay under ~18 req/min, and pauses (no failed rows) with a banner
  if the limit is hit or Groq returns 429.
- **Cache:** a row that already has a `Transcript` value is skipped — re-uploads cost nothing.
- **Column detection:** finds the recording-URL + name columns automatically; works with your
  existing export schema.

## Security / next steps (not in this MVP)
- Add team login before exposing publicly (currently open).
- Later: read/write your live Google Sheet directly instead of CSV in/out.
- Later: BD round-robin/assignment + SLAs.
