# Global Careers by Testbook — Germany Nursing Program

Marketing & lead-generation website for the Germany Nursing Program by Testbook.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + Vite |
| Animations | Framer Motion |
| Database | Supabase (existing CRM v2 project) |
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

All leads submitted via the "Apply Now" / eligibility-check form (`LeadFormModal`)
are handled by `submitLead()` in `src/lib/supabase.js`:

1. **Qualification gate.** Only recognised nursing qualifications proceed —
   `GNM`, `B.Sc Nursing`, `Post Basic B.Sc`, `M.Sc Nursing`. Anything else
   (e.g. "Other") is **not stored and not assigned**: `submitLead` returns
   `{ qualified: false }` and the modal shows a polite "we don't currently cater
   to your profile — we'll reach out if that changes" screen, so the user does
   not expect a call.

2. **Ingest to V2 staging.** Qualified leads are inserted into **`v2_staging`**
   with `source = 'website'` and `status = 'pending'`. Extra fields
   (email, qualification, experience) are stored in the `source_detail` jsonb.
   The **BD Team Lead assigns** these to BDs from the staging queue — `website`
   is registered in `v2_pipeline_config` with `auto_assign = false` (manual
   assignment).

3. **Duplicate handling (automatic, DB-side).** A `BEFORE INSERT` trigger
   (`trg_v2_staging_dedup`) checks the live CRM (`v2_leads`) by phone; if the
   lead already exists it is marked `status = 'duplicate'` with `duplicate_of`
   set. No client-side dedup or round-robin is performed.

> Note: the older `form_leads` + `bd_counter` round-robin flow has been removed.
> If you're reading historical commits, that was the previous pipeline.

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
(Note: the RLS/checklist section of DEPLOYMENT.md still references the old
`form_leads` flow and is pending an update — the live tables are now
`v2_staging` and `v2_pipeline_config`.)

## Supabase

The project connects to the existing Supabase CRM v2 instance. Credentials are
in `src/lib/supabase.js`.

> The anon key is safe to expose in frontend code — Supabase Row Level Security
> (RLS) controls what the anon role can and cannot do. The anon role needs
> `INSERT` on `v2_staging` (an `allow_all` policy currently covers this).
