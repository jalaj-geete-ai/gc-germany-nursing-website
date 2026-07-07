# Global Careers by Testbook — Germany Nursing Program

Marketing & lead-generation website for the Germany Nursing Program by Testbook.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Animations | Framer Motion |
| Database | Supabase (existing project) |
| Routing | React Router v6 (HashRouter) |
| Styling | Plain CSS (`src/index.css`) |

## Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Main landing page |
| `/life-in-germany` | `LifeInGermany` | Life & cost of living |
| `/about` | `About` | About Global Careers & Testbook |
| `/faqs` | `FAQs` | Categorised FAQ with jump nav |
| `/gc-buddy` | `GCBuddyPage` | AI preparation platform |
| `/terms` | `Terms` | Terms & Conditions |

## Lead Flow

All leads submitted via the "Apply Now" / eligibility check form are:

1. **Deduplicated** against `form_leads` (by phone) and `users` (CRM v2, by phone) — duplicates are silently skipped.
2. **Stored** in `form_leads` with `source = "website"` — visible in the BD Dashboard → 📥 Social Media Leads tab.
3. **Round-robin assigned** to active BD members via `bd_counter`.

See `src/lib/supabase.js` for the full logic.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
# Output: dist/index.html (single-file, self-contained)
```

The build produces a single inlined `index.html` via `vite-plugin-singlefile`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

## Supabase

The project connects to the existing Supabase instance. Credentials are in `src/lib/supabase.js`.

> The anon key is safe to expose in frontend code — Supabase Row Level Security (RLS) controls what the anon role can and cannot do. Ensure RLS policies on `form_leads`, `bd_members`, and `bd_counter` allow anon INSERT/SELECT as needed.
