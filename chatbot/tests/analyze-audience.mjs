// Scores the random-audience transcripts (chatbot/tests/out/audience/*.json) for engagement problems.
//   node chatbot/tests/analyze-audience.mjs [--list <metric>]
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "out", "audience");
const runs = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_")).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
const DEV = /[ऀ-ॿ]/;
const isCard = (t) => /What nurses earn|SALARY \/ MONTH|BEST VALUE/.test(t);

const rows = runs.map((r) => {
  const m = r.msgs, L = r.lead || {};
  const userIdx = m.map((x, i) => (x.who === "NURSE" ? i : -1)).filter((i) => i >= 0);
  // a user message with no bot reply before the next user message (or the end)
  const unanswered = userIdx.filter((i, k) => { const end = k + 1 < userIdx.length ? userIdx[k + 1] : m.length; return !m.slice(i + 1, end).some((x) => x.who === "JHANVI"); });
  const bot = m.filter((x) => x.who === "JHANVI" && !isCard(x.text));
  const seen = {}, dupes = [];
  bot.forEach((b) => { const k = b.text.slice(0, 80); if (seen[k] && b.text.length > 25) dupes.push(b.text.slice(0, 70)); seen[k] = 1; });
  let streak = 0, maxStreak = 0; m.forEach((x) => { streak = x.who === "JHANVI" ? streak + 1 : 0; maxStreak = Math.max(maxStreak, streak); });
  const llm = r.sinks.filter((s) => s.startsWith("[llm"));
  const hindiChat = L.lang === "hi";
  // English replies in a Hindi chat (long bubbles with no Devanagari, after the language was chosen)
  const langIdx = m.findIndex((x) => x.who === "NURSE");
  const langSlips = hindiChat ? m.slice(langIdx + 1).filter((x) => x.who === "JHANVI" && !isCard(x.text) && x.text.length > 50 && !DEV.test(x.text)).map((x) => x.text.slice(0, 80)) : [];
  const realErrors = r.errors.filter((e) => !/^no button "(Salary|Cost & EMI|Compare countries|Which pays best\?|सैलरी)"/.test(e));
  return {
    name: r.name, seg: r.segment, hindi: r.hindi, typer: r.typer,
    userTurns: userIdx.length, botBubbles: bot.length, unanswered: unanswered.map((i) => m[i].text),
    dupes, maxStreak,
    didntGet: bot.filter((b) => /didn't quite catch|not sure I got that|समझ नहीं पाई|समझी नहीं/.test(b.text)).length,
    counsellorFallback: bot.filter((b) => /noted it for (them|your counsellor)|added (it )?to your|saved for your call|counsellor की list|note कर लिया/.test(b.text)).length,
    aiOk: llm.filter((s) => /^\[llm 200/.test(s) && /"reply"/.test(s)).length,
    aiFail: llm.filter((s) => /^\[llm 50/.test(s)).length,
    verifyCalls: llm.filter((s) => /"verdict"/.test(s)).length,
    leaks: bot.filter((b) => /"intent"|"reply"|nurse_signal|\{"|"\}|undefined|NaN|\[object/.test(b.text)).map((b) => b.text.slice(0, 90)),
    langSlips,
    snapshot: m.some((x) => /snapshot|के तौर पर Germany में/i.test(x.text)), booked: !!L.slot,
    verdict: L.verifyVerdict || "-", quality: L.leadQuality || "-",
    errors: realErrors, pageErrors: r.errors.filter((e) => !/^no (button|input)/.test(e)), endStage: r.stage, ms: r.ms,
  };
});

const n = rows.length, sum = (f) => rows.reduce((a, r) => a + f(r), 0), pct = (k) => Math.round((100 * k) / n) + "%";
console.log(`\n=== ${n} random audience chats ===`);
const segs = {}; rows.forEach((r) => (segs[r.seg] = (segs[r.seg] || 0) + 1)); console.log("mix:", JSON.stringify(segs));
console.log(`user turns: ${sum((r) => r.userTurns)}  bot bubbles: ${sum((r) => r.botBubbles)}  avg chat time: ${Math.round(sum((r) => r.ms) / n / 1000)}s`);
console.log(`\nENGAGEMENT PROBLEMS (lower is better)`);
console.log(`  chats with an unanswered message : ${rows.filter((r) => r.unanswered.length).length}  (${sum((r) => r.unanswered.length)} messages)`);
console.log(`  chats with a repeated bot line   : ${rows.filter((r) => r.dupes.length).length}  (${sum((r) => r.dupes.length)} repeats)`);
console.log(`  "didn't catch that" replies      : ${sum((r) => r.didntGet)} in ${rows.filter((r) => r.didntGet).length} chats`);
console.log(`  leaked code / junk in a bubble   : ${sum((r) => r.leaks.length)}`);
console.log(`  English reply in a Hindi chat    : ${sum((r) => r.langSlips.length)} in ${rows.filter((r) => r.langSlips.length).length} chats`);
console.log(`  longest run of bot bubbles       : max ${Math.max(...rows.map((r) => r.maxStreak))}, chats with ≥6: ${rows.filter((r) => r.maxStreak >= 6).length}`);
console.log(`  test errors (missing box/button) : ${sum((r) => r.errors.length)}   page JS errors: ${sum((r) => r.pageErrors.length)}`);
console.log(`\nAI USAGE`);
console.log(`  AI answers: ${sum((r) => r.aiOk)}   AI unavailable: ${sum((r) => r.aiFail)}   counsellor-fallback replies: ${sum((r) => r.counsellorFallback)}   AI checks: ${sum((r) => r.verifyCalls)}`);
console.log(`\nFUNNEL`);
const quals = rows.filter((r) => ["nurse", "student", "fake"].includes(r.seg));
console.log(`  reached Germany snapshot: ${quals.filter((r) => r.snapshot).length}/${quals.length} of those who claimed nurse/student`);
console.log(`  booked a call: ${rows.filter((r) => r.booked).length}/${n}`);
console.log(`\nLEAD QUALITY (truth → verdict)`);
const mat = {}; rows.forEach((r) => { mat[r.seg] = mat[r.seg] || {}; mat[r.seg][r.verdict] = (mat[r.seg][r.verdict] || 0) + 1; });
for (const [k, v] of Object.entries(mat)) console.log(`  ${k.padEnd(11)} ${JSON.stringify(v)}`);
console.log(`  booked calls by segment: ${JSON.stringify(rows.filter((r) => r.booked).reduce((a, r) => ((a[r.seg] = (a[r.seg] || 0) + 1), a), {}))}`);

const list = process.argv.indexOf("--list");
if (list > 0) { const k = process.argv[list + 1]; rows.filter((r) => (Array.isArray(r[k]) ? r[k].length : r[k])).forEach((r) => console.log(`\n${r.name}:`, JSON.stringify(r[k]).slice(0, 600))); }
fs.writeFileSync(path.join(dir, "_summary.json"), JSON.stringify(rows, null, 1));
