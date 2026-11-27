# Jhanvi chatbot v5 (Testbook Global · Germany nursing ad funnel)

Source for the live pages on **gccrmv2.pages.dev**, which are deployed from the `jalaj-geete-ai/CRMV2` repo:

| File here | Goes to (CRMV2 repo root) | Live URL |
|---|---|---|
| `gctb_nursing_ad_chat.html` | `gctb_nursing_ad_chat.html` | `/gctb_nursing_ad_chat` |
| `gctb_chatbot_leads.html` | `gctb_chatbot_leads.html` | `/gctb_chatbot_leads` |
| `functions/api/chat.js` + `functions/api/_kb.js` | `functions/api/` | `/api/chat` (Pages Function) |

## What's new in v5

1. **Nurse verification**, to cut fake "I am a nurse" leads:
   - **Nursing round:** 2 random basics that any GNM or B.Sc nurse knows (NBM, BD, SOS, pulse, RR, normal saline, GCS). Options are shuffled and there is always a "Not sure" option. Answer time is recorded.
   - **Workplace:** a hospital and ward, or the clinical posting for students. Non-healthcare jobs and vague one-word answers count against the lead.
   - **Non-nurse self-statements** in anything typed, such as "I am BA graduate" or "any job is fine". Statements about *other people* ("my husband is a driver") are ignored.
   - **AI review:** one LLM call reads the lead's own free-text answers.
   - **Result:** a `verify_score` (0–100) and a `verify_verdict` (`verified`, `review`, `suspect`, `proxy` or `not_nurse`).
     - Suspects get one friendly re-confirm question. Many fakes take the honest exit there.
     - Non-nurses cannot book a counsellor call.
     - Family enquiries (proxy) can still book one.
   - **Nobody is blocked.** Every lead is still captured.
2. **AI answers through a free-tier chain:** free text the KB can't answer goes to `/api/chat`.
   - **Chain order:** Groq (`gpt-oss-120b`, then `gpt-oss-20b`) → **Cloudflare Workers AI** (Llama 3.3 70B, no key needed) → **Gemini Flash-Lite**.
   - **Grounding and guardrails:** answers are grounded in the same KB through retrieval. No fees, no guarantees, no invented facts, stays on topic, never asks for a phone number.
   - **Cool-down:** a provider that hits its rate limit or daily quota is skipped for a while (until the next 00:00 UTC for daily quotas), so later visitors don't wait on it.
   - **All exhausted:** the bot replies "our counsellors can answer this properly for your profile, I've noted it — when's a good time for a call?" and shows the time slots.
     - Later questions get varied "noted for your call" replies.
     - "I want to talk to someone" goes straight to the slots.
     - The questions are saved as `counsellor_questions` and shown in the dashboard.
   - **Small talk:** short messages ("ok", "thanks") still get the instant scripted reply.
   - **AI check:** the AI review of a lead's answers only runs for borderline profiles, since the rules settle clear nurses and clear fakes on their own.
3. **Flow:** after the qualification questions comes a value moment: a personal "Germany snapshot" with the salary multiple. The redundant "are you hoping to work abroad?" question is gone.
4. **Fixes:**
   - The text box no longer disappears when the auto "Explore Germany?" or video prompts appear.
   - No stacked "Did that help?" on top of those prompts.
   - "Hey Dr!" is fixed (titles are stripped from the first name).
   - Fewer emojis in KB answers.
   - "Book a call" requests from chat go straight to the time slots.
5. **Dashboard:**
   - New statuses: 🚩 Suspected fake and 👪 Family enquiry.
   - New Check column (score and nursing-round result).
   - The drawer shows the nursing round, workplace, AI review, red flags and the AI's answers.
   - New CSV columns.
   - Leads from before v5 keep the old rule.

New `source_detail` keys: `workplace`, `workplace_valid`, `nurse_check[]`, `nurse_check_score`, `verify_score`, `verify_verdict`, `verify_flags[]`, `ai_verdict`, `ai_reason`, `non_nurse_signals[]`, `asking_for_someone`, `reconfirm`, `llm_answers`. `lead_quality` can now also be `proxy` or `not_nurse`. The answer to each LLM-handled question is logged in `activity.question_list[].a`.

## Deploy

1. Copy the 4 files into the CRMV2 repo at the paths above, then commit to `main`. Cloudflare Pages deploys `functions/` automatically.
2. In Cloudflare, open **Pages → gccrmv2 → Settings**:
   - **Bindings → Add → Workers AI**, variable name **`AI`**. This is free (10,000 neurons a day) and needs no key.
   - **Environment variables (Production)**, all marked encrypted:
     - `GROQ_API_KEY`: a free key from console.groq.com.
     - `GEMINI_API_KEY`: a free key from aistudio.google.com. Note: on Google's free tier, prompts may be used to improve Google's products.
     - Optional: `CHAT_ALLOWED_ORIGINS` = `https://gccrmv2.pages.dev`. This stops other sites from using your quota.
     - Optional overrides: `GEMINI_MODEL` (if Google renames Flash-Lite) and `WORKERS_AI_MODEL`.
   - Any provider you leave out is skipped. With none configured, every question gets the counsellor reply.
3. Redeploy so the settings take effect, then check it:
   ```bash
   curl -s https://gccrmv2.pages.dev/api/chat -H 'content-type: application/json' -H 'origin: https://gccrmv2.pages.dev' -d '{"lang":"en","messages":[{"role":"user","content":"Can my husband work in Germany?"}]}'
   ```
   The response's `provider` field shows which AI answered. When it fails, `tried` shows why each provider was skipped.

### Capacity at 4,000 visitors a day
**Expected demand:** about 1,000 people chatting × 3–5 questions each, plus the AI check for borderline profiles. That's roughly **4,000–6,000 AI calls a day**.

**Free chain capacity, roughly:**
| Provider | ≈ AI calls a day |
|---|---|
| Groq | 150–300 |
| Workers AI | ~130 |
| Gemini Flash-Lite | ~500 |
| **Total** | **~800–1,000** |

So AI answers cover roughly the first 15–20% of each day's chats. After that, everyone gets the counsellor reply until the quotas reset (00:00 UTC, which is 5:30 AM IST). Groq's free tier also has a per-minute cap of about 5 answers, so bursts spill over to Workers AI and Gemini sooner.

**To answer everyone:** move Groq to its paid Developer tier. At about $0.0003 per call, that's roughly **$1.5–2 a day (about ₹4–5k a month)** at this volume. Keep Workers AI and Gemini as free backups; no code change is needed. `CONFIG.LLM_MAX_PER_SESSION` (30) caps each visitor.

## Maintenance

- **KB edits:** after changing the `KB` or `COUNTRIES` arrays in the page, run `node chatbot/scripts/build-kb.cjs`. This regenerates `functions/api/_kb.js`, so the LLM uses the same facts.
- **Chain tests:** `node chatbot/tests/test-chain.mjs`. Groq is real; Workers AI and Gemini are mocked. It covers each fallback, daily-quota cool-downs and everything exhausted.
- **Persona tests:** add `LLM_DOWN=1` to see the everything-exhausted experience.
- **Persona tests:** run `node chatbot/tests/run-personas.mjs [page.html] [persona …]`.
  - It drives the real page in headless Chromium with Supabase, OCRM and YouTube **mocked**, so no test lead reaches the CRM. `/api/chat` runs locally.
  - It needs `GROQ_API_KEY` and Playwright.
  - Set `THROTTLE_MS=9000` to stay under the free tier.
  - Transcripts go to `chatbot/tests/out/`. Personas are in `tests/personas.mjs`.
- **Verification rules:** `verifyOf()` (scoring), `NURSE_CHECK` (question bank), `NON_NURSE_RX` and `NON_HEALTH_WORK_RX` in the page.
