// Provider-chain test: Groq is real (needs GROQ_API_KEY or the Claude proxy); Workers AI and Gemini are mocked.
//   node chatbot/tests/test-chain.mjs
import { onRequestPost, __test } from "../functions/api/chat.js";

const realFetch = globalThis.fetch;
let geminiMode = "ok";      // ok | 429 | 404
globalThis.fetch = async (url, init) => {
  if (String(url).includes("generativelanguage.googleapis.com")) {
    if (geminiMode === "429") return new Response('{"error":{"message":"Quota exceeded for GenerateRequestsPerDay"}}', { status: 429 });
    if (geminiMode === "404" || (geminiMode === "alias404" && String(url).includes("latest"))) return new Response("{}", { status: 404 });
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"reply":"(gemini) Yes, your husband can join you on a family visa and usually work.","intent":"none","nurse_signal":"nurse"}' }] } }] }), { status: 200 });
  }
  return realFetch(url, init);
};
const ai = (mode) => ({ run: async () => {
  if (mode === "3036") throw new Error("3036: you have used up your daily free allocation of 10,000 neurons");
  if (mode === "text") return { response: "(workers-ai) Sure! Spouses can join once you are settled, and can usually work." };   // ignored JSON instruction
  return { response: '{"reply":"(workers-ai) Yes — spouses can join on a family visa and usually work there.","intent":"none","nurse_signal":"nurse"}' };
}});
const ask = async (env, q = "Can my husband also work in Germany?") => {
  const req = new Request("https://x/api/chat", { method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ lang: "en", lead: { name: "Pooja", nurse: "nurse" }, messages: [{ role: "user", content: q }] }) });
  const r = await onRequestPost({ request: req, env });
  return { status: r.status, ...(await r.json()) };
};
const reset = () => { for (const k of Object.keys(__test.coolUntil)) delete __test.coolUntil[k]; };
let fails = 0;
const check = (name, cond, got) => { console.log(`${cond ? "PASS" : "FAIL"}  ${name}  →  ${JSON.stringify(got).slice(0, 170)}`); if (!cond) fails++; };

let r;
r = await ask({ GROQ_API_KEY: "x", AI: ai("ok"), GEMINI_API_KEY: "g" });
check("1. Groq answers first", r.status === 200 && r.provider === "groq", r);

reset();
r = await ask({ AI: ai("ok"), GEMINI_API_KEY: "g" });
check("2. No Groq key → Workers AI", r.provider === "workers-ai", r);

reset();
r = await ask({ AI: ai("text"), GEMINI_API_KEY: "g" });
check("3. Workers AI plain text (no JSON) still usable", r.provider === "workers-ai" && /Spouses/.test(r.reply), r);

reset();
r = await ask({ AI: ai("3036"), GEMINI_API_KEY: "g" });
check("4. Workers AI out of daily neurons → Gemini", r.provider === "gemini", r);
const k = Object.keys(__test.coolUntil).find((x) => x.startsWith("workers-ai"));
check("4b. Workers AI cooled until next 00:00 UTC", k && new Date(__test.coolUntil[k]).getUTCHours() === 0, { k, until: k && new Date(__test.coolUntil[k]).toISOString() });

geminiMode = "alias404";
reset();
r = await ask({ GEMINI_API_KEY: "g" });
check("5. Gemini alias unknown → pinned model id", r.provider === "gemini" && r.model === "gemini-2.5-flash-lite", r);

geminiMode = "429";
// simulate Groq exhaustion by cooling it; Workers AI and Gemini are out of quota too
reset();
for (const m of ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]) __test.coolUntil["groq:" + m] = Date.now() + 60000;
r = await ask({ GROQ_API_KEY: "x", AI: ai("3036"), GEMINI_API_KEY: "g" });
check("6. All providers exhausted → 502 exhausted (page shows counsellor reply)", r.status === 502 && r.exhausted === true, r);

const t0 = Date.now();
r = await ask({ GROQ_API_KEY: "x", AI: ai("3036"), GEMINI_API_KEY: "g" });
check("7. Next visitor: cooled providers skipped instantly", r.status === 502 && Date.now() - t0 < 300, { ms: Date.now() - t0, tried: r.tried });

r = await ask({});
check("8. Nothing configured → 503", r.status === 503, r);

geminiMode = "ok"; reset();
const vreq = new Request("https://x/api/chat", { method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ mode: "verify", answers: { claimed: "nurse", qualification: "GNM", workplace: "call center", college: "Delhi University" } }) });
const vr = await (await onRequestPost({ request: vreq, env: { GROQ_API_KEY: "x" } })).json();
check("9. Verify mode through the chain (Groq)", vr.verdict === "likely_not", vr);

console.log(fails ? `\n${fails} FAILED` : "\nall passed");
process.exit(fails ? 1 : 0);
