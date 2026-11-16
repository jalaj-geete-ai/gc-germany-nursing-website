/**
 * Lead Intelligence Portal — zero-dependency Node server.
 * Serves the dashboard and proxies Groq (keeps the API key server-side).
 *
 * Run:  GROQ_API_KEY=... node server.js      (default port 3000)
 * In this sandbox the agent proxy injects the key, so a placeholder is fine.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

// Local-preview only: route Node's fetch through the sandbox agent proxy so the
// injected Groq credential is applied. In a normal deployment there is no
// HTTPS_PROXY and you set a real GROQ_API_KEY, so this block is skipped.
try {
  const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (PROXY) {
    const { setGlobalDispatcher, ProxyAgent } = require("undici");
    const caPath = "/root/.ccr/ca-bundle.crt";
    const ca = fs.existsSync(caPath) ? fs.readFileSync(caPath) : undefined;
    setGlobalDispatcher(new ProxyAgent({ uri: PROXY, requestTls: ca ? { ca } : undefined }));
    console.log("[preview] routing fetch via proxy " + PROXY);
  }
} catch (e) { console.log("proxy setup skipped:", e.message); }

const PORT = process.env.PORT || 3000;
const GROQ_KEY = process.env.GROQ_API_KEY || "proxy-injected";
const STT_MODEL = process.env.STT_MODEL || "whisper-large-v3";
const LLM_MODEL = process.env.LLM_MODEL || "openai/gpt-oss-20b";
const LANG = process.env.STT_LANG || "hi";

const RUBRIC = `
You are a lead-qualification analyst for GC Germany Nursing / Global Careers by Testbook,
which recruits Indian nurses for jobs in Germany. You read a transcript of an AI sales call
(Hindi / Hinglish / English; may contain speech-to-text errors - judge by meaning).

ELIGIBILITY GATE - is the person a NURSE?
 - "yes"  : has or is pursuing a nursing qualification (GNM, ANM, B.Sc Nursing, Post-Basic B.Sc,
            M.Sc Nursing) OR clearly works/trains as a nurse.
 - "no"   : clearly not a nurse (unrelated job, says not a nurse, wrong person).
 - "unknown": call didn't really connect / too short / nursing never discussed.

QUALITY RATING (only meaningful if is_nurse = yes): integer 0-10.
 Start from a qualified nurse and adjust:
  + qualification tier: B.Sc/M.Sc/Post-Basic > GNM > ANM
  + active state nursing council (SNC) registration
  + clinical experience, currently working
  + high interest / agreed to recruiter call / asked questions
  + willing to learn German B2; open to relocating to Germany
  - older age LOWERS the score gradually (NO hard cap - age never disqualifies)
  - lukewarm interest, no registration, hard refusal of German/relocation
 Guide: 10 textbook+ready now; 9 strong; 6-8 solid; 3-5 weak; 1-2 very weak. If not a nurse, score 0.

Return ONLY JSON:
{"is_nurse":"yes|no|unknown","score":<int 0-10>,"summary":"<2-3 sentences>",
 "qualification":"<or unknown>","snc_registration":"<Active/No/unknown>","age":"<or unknown>",
 "experience":"<or unknown>","interest":"<High/Medium/Low/unknown>",
 "reasons":["short bullet why this score"],"next_action":"<one step for the BD>"}
`.trim();

function bandFor(isNurse, score) {
  if (isNurse !== "yes") return isNurse === "no" ? "Not Eligible" : "Needs Review";
  if (score >= 10) return "Platinum";
  if (score === 9) return "Gold";
  if (score >= 6) return "Silver";
  if (score >= 3) return "Bronze";
  return "Low";
}
function eligibilityFor(isNurse) {
  return isNurse === "yes" ? "Eligible" : isNurse === "no" ? "Not Eligible" : "Needs Review";
}

function readBody(req) {
  return new Promise((resolve) => {
    let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => resolve(b));
  });
}
function rlHeaders(resp) {
  const h = {};
  ["x-ratelimit-remaining-requests", "x-ratelimit-remaining-tokens",
   "x-ratelimit-limit-requests", "retry-after"].forEach((k) => {
    const v = resp.headers.get(k); if (v) h[k] = v;
  });
  return h;
}

async function groqTranscribe(url) {
  const audio = await fetch(url);
  if (!audio.ok) throw new Error("download " + audio.status);
  const buf = Buffer.from(await audio.arrayBuffer());
  const form = new FormData();
  form.append("model", STT_MODEL);
  form.append("response_format", "json");
  if (LANG) form.append("language", LANG);
  form.append("file", new Blob([buf], { type: "audio/wav" }), "call.wav");
  const r = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST", headers: { Authorization: "Bearer " + GROQ_KEY }, body: form,
  });
  const rl = rlHeaders(r);
  if (r.status === 429) return { rateLimited: true, rl };
  if (!r.ok) throw new Error("groq stt " + r.status + " " + (await r.text()).slice(0, 200));
  const j = await r.json();
  return { text: (j.text || "").trim(), duration: j.duration || null, rl };
}

async function groqScore(transcript) {
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: "Bearer " + GROQ_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: LLM_MODEL, temperature: 0.1, response_format: { type: "json_object" },
      messages: [{ role: "system", content: RUBRIC },
                 { role: "user", content: 'CALL TRANSCRIPT:\n"""\n' + transcript + '\n"""' }],
    }),
  });
  const rl = rlHeaders(r);
  if (r.status === 429) return { rateLimited: true, rl };
  if (!r.ok) throw new Error("groq llm " + r.status + " " + (await r.text()).slice(0, 200));
  const j = await r.json();
  const v = JSON.parse(j.choices[0].message.content);
  let score = Math.max(0, Math.min(10, Math.round(Number(v.score) || 0)));
  if (v.is_nurse !== "yes") score = 0;
  v.score = score;
  v.eligibility = eligibilityFor(v.is_nurse);
  v.band = bandFor(v.is_nurse, score);
  return { verdict: v, rl };
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/transcribe") {
      const { url } = JSON.parse(await readBody(req));
      const out = await groqTranscribe(url);
      res.writeHead(out.rateLimited ? 429 : 200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(out));
    }
    if (req.method === "POST" && req.url === "/api/score") {
      const { transcript } = JSON.parse(await readBody(req));
      const out = await groqScore(transcript);
      res.writeHead(out.rateLimited ? 429 : 200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(out));
    }
    // static
    let file = req.url === "/" ? "/index.html" : req.url.split("?")[0];
    const fp = path.join(__dirname, "public", path.normalize(file).replace(/^(\.\.[/\\])+/, ""));
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      const ext = path.extname(fp);
      const type = ext === ".html" ? "text/html" : ext === ".js" ? "text/javascript" : "text/plain";
      res.writeHead(200, { "Content-Type": type + "; charset=utf-8" });
      return res.end(fs.readFileSync(fp));
    }
    res.writeHead(404); res.end("not found");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: String(e.message || e) }));
  }
});
server.listen(PORT, () => console.log("Portal on http://localhost:" + PORT));
