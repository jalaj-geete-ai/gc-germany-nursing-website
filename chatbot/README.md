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
2. **LLM fallback:** free text the KB can't answer goes to `/api/chat`.
   - It uses Groq `openai/gpt-oss-120b`, falling back to `gpt-oss-20b`, and is grounded in the same KB through retrieval.
   - Guardrails: no fees, no guarantees, no invented facts, stays on topic, never asks for a phone number.
   - Short small talk ("ok", "thanks") still gets the instant scripted reply.
   - If the function is down or rate-limited, the KB answers as before.
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
2. In Cloudflare, open **Pages → gccrmv2 → Settings → Environment variables (Production)** and add:
   - `GROQ_API_KEY` = your Groq key (mark it encrypted). Without it `/api/chat` returns 503 and the bot quietly uses the KB only.
   - Optional: `CHAT_ALLOWED_ORIGINS` = `https://gccrmv2.pages.dev`. This blocks other sites from using your key.
3. Redeploy so the variable takes effect, then check it:
   ```bash
   curl -s https://gccrmv2.pages.dev/api/chat -H 'content-type: application/json' -H 'origin: https://gccrmv2.pages.dev' -d '{"lang":"en","messages":[{"role":"user","content":"Can my husband work in Germany?"}]}'
   ```

### Groq capacity (important)
The free tier allows about **8,000 tokens per minute**. One chat answer uses about 1–1.5k tokens, which is roughly **5 answers a minute across all users**. Above that, answers silently fall back to the KB. For ad traffic, move to Groq's paid Developer tier. It's pay-as-you-go and fractions of a rupee per answer. `CONFIG.LLM_MAX_PER_SESSION` (30) caps each visitor.

## Maintenance

- **KB edits:** after changing the `KB` or `COUNTRIES` arrays in the page, run `node chatbot/scripts/build-kb.cjs`. This regenerates `functions/api/_kb.js`, so the LLM uses the same facts.
- **Persona tests:** run `node chatbot/tests/run-personas.mjs [page.html] [persona …]`.
  - It drives the real page in headless Chromium with Supabase, OCRM and YouTube **mocked**, so no test lead reaches the CRM. `/api/chat` runs locally.
  - It needs `GROQ_API_KEY` and Playwright.
  - Set `THROTTLE_MS=9000` to stay under the free tier.
  - Transcripts go to `chatbot/tests/out/`. Personas are in `tests/personas.mjs`.
- **Verification rules:** `verifyOf()` (scoring), `NURSE_CHECK` (question bank), `NON_NURSE_RX` and `NON_HEALTH_WORK_RX` in the page.
