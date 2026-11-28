// Persona test harness for the Jhanvi chatbot.
// Drives the real page in headless Chromium with every lead sink MOCKED (Supabase, OCRM, YouTube),
// so no test lead ever reaches the CRM. /api/chat is served by the local Pages Function.
//
//   node chatbot/tests/run-personas.mjs [page.html] [personaName ...]
//   GROQ_API_KEY must be set (any value works inside the Claude cloud proxy; a real key elsewhere).
//   Writes transcripts to chatbot/tests/out/<persona>.txt
import { createRequire } from "module";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PERSONAS } from "./personas.mjs";
import { makeAudience } from "./audience.mjs";
// resolve playwright locally or from the global install
const req = createRequire(import.meta.url);
let pw; try { pw = req("playwright"); } catch { pw = req(execSync("npm root -g").toString().trim() + "/playwright"); }
const { chromium } = pw;

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const pageFile = args[0] && args[0].endsWith(".html") ? path.resolve(args.shift()) : path.join(here, "..", "gctb_nursing_ad_chat.html");
const only = new Set(args);
const html = fs.readFileSync(pageFile, "utf8");
const { onRequestPost } = await import(path.join(here, "..", "functions", "api", "chat.js"));
const env = { GROQ_API_KEY: process.env.GROQ_API_KEY || "dummy" };
const ORIGIN = "https://chat.test";
// AUDIENCE=100 runs a random ad audience instead of the fixed personas (CONC=parallel chats, SEED=reproducible mix)
const LIST = process.env.AUDIENCE ? makeAudience(+process.env.AUDIENCE, +(process.env.SEED || 20261128)) : PERSONAS;
const OUT = path.join(here, "out", process.env.AUDIENCE ? "audience" : "");
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });

async function settle(page) {
  // wait until no typing indicator and no new message for 1.6s (bot runs are chained with timeouts)
  let last = -1, still = 0;
  for (let i = 0; i < 120; i++) {
    await sleep(250);
    const n = await page.evaluate(() => document.querySelectorAll(".grp").length + (document.querySelector(".typing") ? 1000 : 0));
    if (n === last && n < 1000) { if (++still >= 7) return; } else still = 0;
    last = n;
  }
}

async function run(p) {
  const ctx = await browser.newContext({ viewport: { width: 400, height: 860 }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const sinks = [];
  await page.route("**/*", async (route) => {
    const req = route.request(), u = req.url();
    if (u.startsWith(ORIGIN + "/api/chat")) {
      if (process.env.LLM_DOWN) { sinks.push("[llm 502 forced: all providers exhausted]"); return route.fulfill({ status: 502, contentType: "application/json", body: '{"error":"llm unavailable","exhausted":true}' }); }
      const t = Date.now();
      const res = await onRequestPost({ request: new Request(u, { method: "POST", headers: { "content-type": "application/json", origin: ORIGIN }, body: req.postData() }), env });
      const body = await res.text();
      sinks.push(`[llm ${res.status} ${Date.now() - t}ms] ${body.slice(0, 160)}`);
      return route.fulfill({ status: res.status, contentType: "application/json", body });
    }
    if (u.startsWith(ORIGIN)) return route.fulfill({ status: 200, contentType: "text/html", body: html });
    if (u.includes("supabase.co")) {
      sinks.push(`[supabase ${req.method()}] ${(req.postData() || "").slice(0, 0)}`);
      if (req.method() === "POST") return route.fulfill({ status: 201, contentType: "application/json", body: '[{"id":"test-row"}]' });
      return route.fulfill({ status: 204, body: "" });
    }
    if (u.includes("apiocrm.testbook.com")) { sinks.push("[ocrm POST]"); return route.fulfill({ status: 200, contentType: "application/json", body: "{}" }); }
    if (u.includes("youtube")) return route.fulfill({ status: 200, body: "" });
    return route.continue();
  });
  const errors = [];
  const t0 = Date.now();
  page.on("pageerror", (e) => errors.push(e.message));

  await page.goto(ORIGIN + "/gctb_nursing_ad_chat?utm_source=facebook&utm_campaign=test_" + p.name);
  await page.waitForSelector(".welcome input", { timeout: 30000 });
  const inputs = page.locator(".welcome input");
  await inputs.nth(0).fill(p.name_input || "Test Nurse");
  await inputs.nth(1).fill(p.phone || "9876543210");
  await page.click("button.go");
  await settle(page);

  for (const step of p.steps) {
    if (step.maybe) {
      // only if the bot is currently asking this (e.g. the re-confirm question for suspects)
      const st = await page.evaluate(() => window.__stage);
      if (st !== step.ifStage) continue;
      const s2 = step.alt || step.maybe;
      const btn = page.locator("button.opt").filter({ hasText: s2.click }).first();
      if (await btn.count()) await btn.click();
    } else if (step.check) {
      // answer the randomised nursing round by role: right / wrong / unsure
      const label = await page.evaluate((mode) => {
        const l = window.__lead || {}, c = (l.checkQs || [])[l.checkIdx || 0], bank = window.__nurseCheck || [];
        const d = c && bank.find((x) => x.id === c.id); if (!d) return null;
        const k = l.lang === "hi" ? "hi" : "en";
        return mode === "unsure" ? (k === "hi" ? "पता नहीं" : "Not sure") : d.opts[mode === "right" ? d.ok : (d.ok + 1) % 3][k];
      }, step.check);
      if (!label) { errors.push("no nursing-round question"); continue; }
      await page.locator("button.opt").filter({ hasText: label }).first().click();
    } else if (step.click) {
      const btn = page.locator("button.opt, button.chip, button.cmp-chip").filter({ hasText: step.click }).first();
      if (!(await btn.count())) { errors.push(`no button "${step.click}"`); continue; }
      await btn.click();
    } else if (step.type) {
      const box = page.locator(".inbar input");
      if (!(await box.count())) { errors.push(`no input for "${step.type}"`); continue; }
      await box.fill(step.type);
      await box.press("Enter");
      if (process.env.THROTTLE_MS) await sleep(+process.env.THROTTLE_MS);   // stay under Groq free-tier tokens/minute
    }
    await settle(page);
  }

  const state = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll(".msgs .grp, .grp").forEach((g) => {
      const who = g.classList.contains("user") ? "NURSE" : "JHANVI";
      const b = g.querySelector(".bubble, .card, .cmp, table");
      let t = (b ? b.innerText : g.innerText).replace(/\d{1,2}:\d{2}\s?(AM|PM|am|pm)?\s*(✓✓)?\s*$/, "").trim();
      if (t) out.push(`${who}: ${t.replace(/\n+/g, " | ")}`);
    });
    const chips = [...document.querySelectorAll("button.opt, button.chip")].map((b) => b.innerText.trim());
    return { out, chips, lead: window.__lead, stage: window.__stage };
  });
  const L = state.lead || {};
  const summary = `lead: nurse=${L.nurse} qual=${L.qualification} spec="${L.specialization || ""}"(${L.specializationValid}) college="${L.college || ""}"(${L.collegeValid}) council=${L.council} conf=${L.nurseConfidence} quality=${L.leadQuality} verify=${L.verifyVerdict}/${L.verifyScore} flags=${(L.verifyFlags || []).join(',')} ai=${L.aiVerdict} slot=${L.slot || ""} q=${L.qCount || 0}`;
  const text = [`# ${p.name} — ${p.desc}`, ...state.out, "", `chips now: ${state.chips.join(" · ")}`, summary, ...(errors.length ? ["ERRORS: " + errors.join(" | ")] : []), "", ...sinks].join("\n");
  fs.writeFileSync(path.join(OUT, p.name + ".txt"), text);
  fs.writeFileSync(path.join(OUT, p.name + ".json"), JSON.stringify({ name: p.name, segment: p.segment, hindi: p.hindi, typer: p.typer, ms: Date.now() - t0,
    msgs: state.out.map((x) => { const i = x.indexOf(": "); return { who: x.slice(0, i), text: x.slice(i + 2) }; }), chips: state.chips, stage: state.stage,
    lead: L, sinks, errors }, null, 1));
  console.log(`✓ ${p.name}: ${state.out.length} lines, ${errors.length} errors — ${summary}`);
  await ctx.close();
}

const todo = LIST.filter((p) => !only.size || only.has(p.name));
const CONC = Math.max(1, +(process.env.CONC || 1));
let next = 0;
await Promise.all(Array.from({ length: CONC }, async () => {
  while (next < todo.length) { const p = todo[next++];
    try { await run(p); } catch (e) { console.log(`✗ ${p.name}: ${e.message}`); } }
}));
await browser.close();
