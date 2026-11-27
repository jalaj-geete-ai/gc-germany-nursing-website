# One-off patch: v4 (live) -> v5 chatbot. Nurse verification, LLM fallback, flow + UX fixes.
# Usage: python3 chatbot/scripts/patch-v5.py chatbot/gctb_nursing_ad_chat.html
import sys, re
p = sys.argv[1]
s = open(p, encoding="utf-8").read()

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n != count:
        raise SystemExit(f"anchor found {n}x (want {count}): {old[:90]!r}")
    s = s.replace(old, new)

# ── header + config ────────────────────────────────────────────────────────
rep("   Rule-based, no LLM. Free-text KB below answers nurse questions.",
    "   v5: rule-based flow + KB, with an LLM fallback (/api/chat, Groq, key server-side)\n"
    "   for free text the KB can't answer, and a nurse-verification round to cut fake-nurse leads.")
rep('  DEMO_CLASS_URL: "https://meetpro.club/Germanlanguagedemobytestbook",',
    '  DEMO_CLASS_URL: "https://meetpro.club/Germanlanguagedemobytestbook",\n'
    '  // LLM fallback (Cloudflare Pages Function in functions/api/chat.js). Same-origin; on any error the KB answers.\n'
    '  LLM_ENDPOINT: "/api/chat",\n'
    '  LLM_MAX_PER_SESSION: 30,')

# ── verification helpers (after scoreNurse) ────────────────────────────────
rep("function App(){", r'''/* ── Nurse verification ─────────────────────────────────────────
   Ad leads often tap "I am a nurse" without being one. We add a short, friendly
   "nursing round" (2 basics every GNM/B.Sc nurse knows, framed like a German
   hospital interview warm-up), a workplace question, and non-nurse signal
   detection in everything they type. Nobody is blocked — the lead is scored
   (verify_score / verify_verdict) and suspects are asked to re-confirm. */
const NURSE_CHECK = [
  { id:"nbm",  q:{en:"On a patient's chart, what does NBM mean?", hi:"Patient के chart पर NBM का मतलब क्या है?"},
    opts:[{en:"Nil by mouth",hi:"Nil by mouth"},{en:"Normal blood measure",hi:"Normal blood measure"},{en:"New born monitoring",hi:"New born monitoring"}], ok:0 },
  { id:"bd",   q:{en:"On a drug chart, what does 'BD' mean?", hi:"Drug chart पर 'BD' का मतलब क्या है?"},
    opts:[{en:"Twice a day",hi:"दिन में दो बार"},{en:"Before dinner",hi:"खाने से पहले"},{en:"Once daily",hi:"दिन में एक बार"}], ok:0 },
  { id:"pulse",q:{en:"Normal resting pulse of a healthy adult?", hi:"Healthy adult की normal pulse rate कितनी होती है?"},
    opts:[{en:"60–100 per minute",hi:"60–100 प्रति मिनट"},{en:"20–40 per minute",hi:"20–40 प्रति मिनट"},{en:"130–160 per minute",hi:"130–160 प्रति मिनट"}], ok:0 },
  { id:"rr",   q:{en:"Normal respiratory rate of an adult?", hi:"Adult का normal respiratory rate कितना होता है?"},
    opts:[{en:"12–20 per minute",hi:"12–20 प्रति मिनट"},{en:"40–60 per minute",hi:"40–60 प्रति मिनट"},{en:"2–6 per minute",hi:"2–6 प्रति मिनट"}], ok:0 },
  { id:"ns",   q:{en:"0.9% NaCl IV fluid is commonly called…", hi:"0.9% NaCl IV fluid को आमतौर पर क्या कहते हैं?"},
    opts:[{en:"Normal saline",hi:"Normal saline"},{en:"Ringer lactate",hi:"Ringer lactate"},{en:"Dextrose 25%",hi:"Dextrose 25%"}], ok:0 },
  { id:"sos",  q:{en:"'SOS' written on a prescription means…", hi:"Prescription पर 'SOS' का मतलब…"},
    opts:[{en:"Give only if needed",hi:"ज़रूरत हो तभी देना"},{en:"Give every hour",hi:"हर घंटे देना"},{en:"Stop all medicines",hi:"सारी दवाइयाँ बंद करना"}], ok:0 },
  { id:"gcs",  q:{en:"Lowest possible Glasgow Coma Scale (GCS) score?", hi:"Glasgow Coma Scale (GCS) का सबसे कम score कितना होता है?"},
    opts:[{en:"3",hi:"3"},{en:"0",hi:"0"},{en:"10",hi:"10"}], ok:0 },
];
// pick 2 questions + shuffle options; stored in the lead so a reload keeps the same round
function makeCheck(){
  const pool = NURSE_CHECK.slice().sort(()=>Math.random()-0.5).slice(0,2);
  return pool.map(c=>{ const order=[0,1,2].sort(()=>Math.random()-0.5); return { id:c.id, order }; });
}
const checkDef = (id)=> NURSE_CHECK.find(c=>c.id===id);
// workplace answer: must look like healthcare (hospital / clinic / PHC / ward / speciality)
const HEALTH_KEYS = ["hospital","hosp","clinic","nursing home","medical college","medical centre","medical center","health centre","health center","phc","chc","dispensary","aiims","esic","esi ","civil","district","govt hospital","government hospital","apollo","fortis","max ","manipal","narayana","medanta","aster","kims","care hospital","rainbow","cloudnine","cmc","jipmer","pgi","safdarjung","ward","icu","ot ","operation theatre","opd","emergency","casualty","clinical","posting","internship","duty","dialysis","labour room","nicu","picu","home care","old age home","staff nurse","nurse","nursing"];
function validateWorkplace(text){
  const t = " "+(text||"").toLowerCase().replace(/[^a-z0-9ऀ-ॿ ]+/g," ").replace(/\s+/g," ")+" ";
  if(t.trim().length<3) return false;
  if(/(अस्पताल|हॉस्पिटल|क्लिनिक|वार्ड|ड्यूटी)/.test(t)) return true;
  return HEALTH_KEYS.some(k=> t.includes(k.length<=4 ? " "+k.trim()+" " : k)) || validateSpecialization(text).valid;
}
// a college answer that names nursing is stronger evidence than a generic university
const isNursingCollege = (t)=> /(nurs|gnm|b\.?\s?sc|con\b|medical|health|paramedical|नर्सिंग)/i.test(t||"");
// things people type that reveal they are NOT a nurse, or that they are asking for someone else
const NON_NURSE_RX = /\b(b\.?\s?a\.?|b\.?\s?com|bba|bca|b\.?\s?tech|m\.?\s?b\.?\s?a|engineer(ing)?|software|it job|call ?cent(er|re)|bpo|data entry|driver|warehouse|delivery boy|security guard|shop|sales(man)?|teacher|10th pass|12th pass|any job|not a nurse|not nurse|i am not (a )?nurse|nurse nahi|nurse nahin)\b/i;
const PROXY_RX = /\b(for|asking for|on behalf of) (my )?(daughter|son|wife|husband|sister|brother|friend|cousin|niece|beti|behen|bhai)\b|\bmy (daughter|wife|sister|son|niece|beti|behen) (is|does|did|wants)\b/i;
// verify score 0–100 from everything we know; verdict drives lead quality + the re-confirm step
function verifyOf(d){
  let s = 0; const flags = [];
  if(d.nurse==="no") return { score:0, verdict:"not_nurse", flags:["said_not_nurse"] };
  if(d.nurse==="nurse") s += 10; else if(d.nurse==="student") s += 8;
  if(NURSING_QUALS.includes(d.qualification)) s += 5;
  if(d.qualification==="ANM") flags.push("anm_only");
  const ch = d.checkAns||[]; ch.forEach(a=>{ if(a.correct) s += 22; else if(a.unsure) flags.push("check_unsure"); else { s -= 12; flags.push("check_wrong"); } });
  if(d.workplace!=null){ if(d.workplaceValid) s += 15; else { s -= 15; flags.push("workplace_not_health"); } }
  if(d.college){ if(isNursingCollege(d.college)) s += 10; else if(d.collegeValid) s += 3; else { s -= 5; flags.push("college_unclear"); } }
  if(d.council==="registered") s += 10; else if(d.council==="studying") s += (d.nurse==="student" ? 6 : -5); else if(d.council==="none"){ s -= 40; flags.push("council_none"); }
  if(d.nonNurseHits && d.nonNurseHits.length){ s -= 45; flags.push("said_non_nurse_things"); }
  if(d.proxy) flags.push("asking_for_someone");
  if(d.aiVerdict==="likely_not"){ s -= 20; flags.push("ai_likely_not"); } else if(d.aiVerdict==="likely_nurse") s += 8;
  if(d.reconfirm==="nurse") s = Math.max(s, 35);
  s = Math.max(0, Math.min(100, s));
  const verdict = s>=60 ? "verified" : s>=35 ? "review" : "suspect";
  return { score:s, verdict, flags };
}
// first name without titles ("Dr Merin Joseph" -> "Merin")
const firstName = (n)=>{ const w=String(n||"").trim().split(/\s+/).filter(x=>!/^(dr|mr|mrs|ms|miss|sister|sis|staff|nurse|smt|shri|kumari)\.?$/i.test(x)); return w[0] ? w[0].charAt(0).toUpperCase()+w[0].slice(1) : "there"; };
// KB entries that are just small talk: answer these instantly; everything else can go to the LLM
const CASUAL_IDS = new Set(["ack","positive","thanks","greet","howru","bye","love","rude","robot","hindi"]);

function App(){''')

# ── persistence: track new fields in the CRM patch ─────────────────────────
rep("lead.slot, lead.nurse, lead.qualification, lead.country, lead.abroad, lead.language, ",
    "lead.slot, lead.nurse, lead.qualification, lead.country, lead.abroad, lead.language, lead.verifyVerdict, lead.verifyScore, lead.aiVerdict, lead.workplace, lead.council, lead.college, lead.currentSalary, lead.researched, lead.llmN, ")
rep("nurse_confidence:data.nurseConfidence||null, lead_quality:data.leadQuality||null,",
    "nurse_confidence:data.nurseConfidence||null, lead_quality:data.leadQuality||null,\n"
    "        workplace:data.workplace||null, workplace_valid:(data.workplaceValid===undefined?null:data.workplaceValid),\n"
    "        nurse_check:(data.checkAns||[]).map(a=>({ q:a.id, a:a.label, correct:a.correct, ms:a.ms })), nurse_check_score:(data.checkAns||[]).filter(a=>a.correct).length,\n"
    "        verify_score:(data.verifyScore===undefined?null:data.verifyScore), verify_verdict:data.verifyVerdict||null, verify_flags:data.verifyFlags||[],\n"
    "        ai_verdict:data.aiVerdict||null, ai_reason:data.aiReason||null, non_nurse_signals:data.nonNurseHits||[], asking_for_someone:!!data.proxy, reconfirm:data.reconfirm||null,\n"
    "        llm_answers:(data.llmN||0),")
rep("      CurrentSalary: data.currentSalary||\"\", ResearchedBefore: data.researched||\"\",",
    "      CurrentSalary: data.currentSalary||\"\", ResearchedBefore: data.researched||\"\",\n"
    "      Workplace: data.workplace||\"\", NurseCheckScore: (data.checkAns||[]).filter(a=>a.correct).length, VerifyScore: data.verifyScore, VerifyVerdict: data.verifyVerdict||\"\",")

# ── greeting: proper first name, promise value fast ────────────────────────
rep('const nm = (lead.name||"there").split(" ")[0];', 'const nm = firstName(lead.name);')

open(p, "w", encoding="utf-8").write(s)
print("patch part 1 ok")

# ═════════════════ PART 2: flow ═════════════════
def region(start, end, new):
    global s
    a = s.index(start); b = s.index(end, a)
    assert s.count(start) == 1, start
    s = s[:a] + new + s[b:]

rep("  useEffect(()=>{ window.__lead = lead; }, [lead]);   // harmless debug hook; remove if you like",
    "  useEffect(()=>{ window.__lead = lead; window.__nurseCheck = NURSE_CHECK; }, [lead]);   // debug/test hook\n"
    "  const checkShownRef = useRef(Date.now());   // when the current nursing-round question appeared (answer time)\n"
    "  const busyRef = useRef(false);              // an LLM reply is in flight")

region("  const pickNurse = (o)=>{", "  const pickAbroad = (o)=>{", r'''  // apply a verify result to the lead (score, verdict, CRM quality fields)
  const withVerify = (d)=>{
    const v = verifyOf(d);
    const q = v.verdict==="verified" ? ["high","genuine"] : v.verdict==="review" ? ["medium","review"] : v.verdict==="suspect" ? ["low","unlikely"] : ["low","not_nurse"];
    return { ...d, verifyScore:v.score, verifyVerdict:v.verdict, verifyFlags:v.flags, nurseConfidence:q[0], leadQuality:(d.proxy && v.verdict!=="not_nurse") ? "proxy" : q[1] };
  };
  // note anything typed that reveals a non-nurse / proxy
  const scanText = (v)=>{
    const nn = NON_NURSE_RX.test(v||""), px = PROXY_RX.test(v||"");
    if(nn || px) setLead((l)=>({ ...l, nonNurseHits: nn ? [...(l.nonNurseHits||[]), String(v).slice(0,80)].slice(-5) : l.nonNurseHits, proxy: l.proxy || px }));
    return nn || px;
  };

  const pickNurse = (o)=>{
    me(o.label); setLead((l)=>({ ...l, nurse:o.key }));
    if(o.key==="no"){
      setLead((l)=> withVerify({ ...l, nurse:"no" }));
      say(M("Thanks for being honest! This Germany program is only for qualified nurses and final-year nursing students. Are you asking for someone in your family who is a nurse? 👇",
            "सच बताने के लिए शुक्रिया! यह Germany program सिर्फ़ qualified nurses और final-year nursing students के लिए है। क्या आप family में किसी nurse के लिए पूछ रहे हैं? 👇"), 600);
      setTimeout(()=> setStage("notnurse"), 1150); return;
    }
    say(o.key==="student"
      ? M("Lovely — final year is the perfect time to start! Which course are you in? 👇", "बढ़िया — final year शुरू करने का सबसे अच्छा समय है! आप कौन-सा course कर रही हैं? 👇")
      : M("That's wonderful! Which nursing qualification do you have? 👇", "बढ़िया! आपकी nursing qualification क्या है? 👇"), 500);
    setTimeout(()=> setStage("qual"), 1000);
  };
  const pickNotNurse = (forFamily)=>{
    if(forFamily){
      me(M("Yes, for a family member","हाँ, family member के लिए"));
      setLead((l)=> withVerify({ ...l, proxy:true }));
      say(M("That's so caring of you! Ask me anything and I'll explain it simply so you can guide them. Even better — share this chat with them, so they can check their own eligibility and talk to our counsellor directly. 👇",
            "आप कितना ध्यान रखते हैं! कुछ भी पूछिए, मैं आसान भाषा में समझा दूँगी ताकि आप उन्हें guide कर सकें। और भी अच्छा — यह chat उनके साथ share कर दीजिए, ताकि वो खुद eligibility check करके counsellor से बात कर सकें। 👇"), 700);
    } else {
      me(M("No, just exploring","नहीं, बस देख रहा/रही हूँ"));
      say(M("No problem at all! Ask me anything you're curious about. Just so you know, the Germany path and our counsellor calls are only for nurses — but if you're planning to study nursing, I can tell you how it works. 👇",
            "कोई बात नहीं! जो भी जानना हो, पूछिए। बस इतना बता दूँ — Germany वाला रास्ता और counsellor calls सिर्फ़ nurses के लिए हैं — पर अगर आप nursing पढ़ने का सोच रहे हैं, तो मैं बता सकती हूँ कैसे। 👇"), 700);
    }
    setTimeout(()=> setStage("hub"), 1300);
  };

  const pickQual = (o)=>{
    me(o); setLead((l)=>({ ...l, qualification:o, checkQs: makeCheck(), checkIdx:0, checkAns:[] }));
    if(o==="ANM"){
      say(M("Thank you! Honestly, ANM on its own is usually not enough for Germany — they need GNM or B.Sc level. But many ANMs upgrade to GNM and then go, so let's still check your profile.",
            "शुक्रिया! सच बताऊँ तो सिर्फ़ ANM आमतौर पर Germany के लिए काफ़ी नहीं होता — GNM या B.Sc level चाहिए। पर कई ANM पहले GNM करके फिर जाती हैं, तो चलिए आपका profile फिर भी check करते हैं।"), 600);
    }
    const lead0 = o==="ANM" ? 1500 : 0;
    setTimeout(()=> say(M("Let's do a quick 2-question nursing round — the kind of basics German hospitals ask in interviews. No pressure, just tap your answer!",
                          "चलिए एक छोटा 2 सवालों का nursing round करते हैं — वैसे ही basics जो German hospitals interview में पूछते हैं। कोई pressure नहीं, बस answer tap कीजिए!"), 600), lead0);
    setTimeout(()=> askCheck(0), lead0 + 1300);
  };
  const askCheck = (i)=>{
    setLead((l)=>{
      const c = (l.checkQs||[])[i]; if(!c) return l;
      const d = checkDef(c.id);
      say(M(`Q${i+1}. ${d.q.en}`, `सवाल ${i+1}. ${d.q.hi}`), 500);
      setTimeout(()=>{ checkShownRef.current = Date.now(); setStage("check"); }, 900);
      return { ...l, checkIdx:i };
    });
  };
  const answerCheck = (optIdx)=>{
    const i = lead.checkIdx||0, c = (lead.checkQs||[])[i]; if(!c) return;
    const d = checkDef(c.id), right = M(d.opts[d.ok].en, d.opts[d.ok].hi);
    const unsure = optIdx<0, correct = optIdx===d.ok;
    const label = unsure ? M("Not sure","पता नहीं") : M(d.opts[optIdx].en, d.opts[optIdx].hi);
    me(label); setStage("checkwait");
    const ans = { id:c.id, label, correct, unsure, ms: Date.now()-checkShownRef.current };
    setLead((l)=>({ ...l, checkAns:[...(l.checkAns||[]).filter(a=>a.id!==c.id), ans] }));
    say(correct ? M("Correct! ✅","सही जवाब! ✅")
        : unsure ? M(`No worries — it's "${right}".`, `कोई बात नहीं — सही जवाब है "${right}"।`)
        : M(`Close! It's "${right}" — no worries.`, `लगभग! सही जवाब है "${right}" — कोई बात नहीं।`), 450);
    if(i===0){ setTimeout(()=> askCheck(1), 1000); return; }
    const nRight = [...(lead.checkAns||[]).filter(a=>a.id!==c.id), ans].filter(a=>a.correct).length;
    const student = lead.nurse==="student";
    setTimeout(()=> say(
      (nRight===2 ? M("2 out of 2 — you clearly know your basics! ","2 में से 2 — आपके basics एकदम पक्के हैं! ") : M("Thanks! ","शुक्रिया! ")) +
      (student ? M("Where are you doing your clinical posting right now? Hospital name and ward, please (e.g. \"District Hospital Jaipur, Medical ward\").",
                   "अभी आपकी clinical posting कहाँ चल रही है? Hospital का नाम और ward बताइए (जैसे \"District Hospital Jaipur, Medical ward\")।")
               : M("Where are you working right now? Hospital name and ward/department, please (e.g. \"AIIMS Delhi, Medical ICU\"). If you're not working currently, just say so.",
                   "आप अभी कहाँ काम कर रही हैं? Hospital का नाम और ward/department बताइए (जैसे \"AIIMS Delhi, Medical ICU\")। अगर अभी काम नहीं कर रहीं, तो वही बता दीजिए।")), 700), 1000);
    setTimeout(()=> setStage("workplace"), 1800);
  };

  const saveWorkplace = ()=>{
    const v = input.trim(); if(!v) return;
    me(v); setInput(""); scanText(v);
    const notWorking = /(not working|no job|career gap|housewife|currently not|left (my )?job|break|unemployed|nahi kar rahi|nahi karti|ghar par|काम नहीं)/i.test(v);
    const ok = notWorking ? null : validateWorkplace(v);
    const sp = validateSpecialization(v);
    setLead((l)=>({ ...l, workplace:v, workplaceValid:ok, specialization: l.specialization || (sp.valid ? sp.matched : v), specializationValid: sp.valid || ok===true, specializationMatched: sp.matched }));
    say(notWorking
      ? M("That's completely okay — a break doesn't stop you from going to Germany. Which college did you do your nursing from? 🏫","बिल्कुल ठीक है — break से Germany जाना नहीं रुकता। आपने किस nursing college से पढ़ाई की? 🏫")
      : ok ? M("Nice! That's real experience German hospitals value. Which college did you do your nursing from? Please type the full name 🏫","बढ़िया! यह असली experience है जिसकी German hospitals कद्र करते हैं। आपने किस nursing college से पढ़ाई की? पूरा नाम type कर दीजिए 🏫")
      : M("Thanks! And which college did you do your nursing from? Please type the full name 🏫","शुक्रिया! और आपने किस nursing college से पढ़ाई की? पूरा नाम type कर दीजिए 🏫"), 600);
    setTimeout(()=> setStage("college"), 1100);
  };

  // kept for old saved sessions that are mid-way through the v4 "specialization" step
  const saveSpecialization = ()=>{
    const v = input.trim(); if(!v) return;
    me(v); setInput(""); scanText(v);
    const sp = validateSpecialization(v);
    setLead((l)=>({ ...l, specialization:v, specializationValid:sp.valid, specializationMatched:sp.matched }));
    say(M("Lovely! And which college did you do your nursing from? Please type the full name 🏫",
          "बढ़िया! और आपने किस nursing college से पढ़ाई की? पूरा नाम type कर दीजिए। 🏫"), 600);
    setTimeout(()=> setStage("college"), 1100);
  };

  const saveCollege = ()=>{
    const v = input.trim(); if(!v) return;
    me(v); setInput(""); scanText(v);
    const ok = validateCollege(v);
    setLead((l)=>({ ...l, college:v, collegeValid:ok }));
    say(M("Thank you! Almost done — are you registered with a Nursing Council? 👇",
          "शुक्रिया! बस थोड़ा और — क्या आप किसी Nursing Council में registered हैं? 👇"), 600);
    setTimeout(()=> setStage("council"), 1100);
  };

  const pickCouncil = (o)=>{
    me(o.label);
    setLead((l)=>{ const d={ ...l, council:o.key }; const q=scoreNurse(d); return withVerify({ ...d, nurseConfidence:q.conf, leadQuality:q.quality }); });
    if(o.key==="none"){
      setLead((l)=> withVerify({ ...l, nurse:"no" }));
      say(M("Thanks for telling me honestly! The Germany path is only for registered nurses and final-year nursing students, so our counsellor calls are for them. But ask me anything you're curious about 👇",
            "सच बताने के लिए शुक्रिया! Germany का रास्ता सिर्फ़ registered nurses और final-year nursing students के लिए है, इसलिए counsellor calls भी उन्हीं के लिए हैं। पर जो भी जानना हो, पूछिए 👇"), 600);
      setTimeout(()=> setStage("hub"), 1200); return;
    }
    if(bookRef.current){ bookRef.current=false; say(M("Perfect — you're all set! ✅","बढ़िया — सब तैयार है! ✅"), 500); setTimeout(()=> askSlot(), 1100); return; }
    say(M("Got it. If you don't mind sharing — what's your current monthly salary? It helps me show you a real comparison. 👇",
          "समझ गई। अगर बुरा न लगे तो बताइए — अभी आपकी monthly salary कितनी है? इससे मैं आपको सही comparison दिखा पाऊँगी। 👇"), 550);
    setTimeout(()=> setStage("salary"), 1050);
  };

  const SALARY_OPTS = [
    { key:"<20k",   label:"Below ₹20,000" },
    { key:"20-35k", label:"₹20,000 – ₹35,000" },
    { key:"35-50k", label:"₹35,000 – ₹50,000" },
    { key:"50k+",   label:"Above ₹50,000" },
    { key:"na",     label:M("Prefer not to say","बताना नहीं चाहती") },
  ];
  const pickSalary = (o)=>{
    me(o.label); setLead((l)=>({ ...l, currentSalary:o.key }));
    say(M("Thanks! Last one — have you looked into going abroad as a nurse before? Tell me anything you've read or heard (or just say \"no\"). 👇",
          "शुक्रिया! आख़िरी सवाल — क्या आपने पहले nurse के तौर पर विदेश जाने के बारे में कुछ पढ़ा या सुना है? जो भी पता हो, type कीजिए (या बस \"नहीं\" लिख दीजिए)। 👇"), 550);
    setTimeout(()=> setStage("researched"), 1050);
  };

  // AI second opinion on the free-text answers (non-blocking: times out to null)
  const aiVerify = async (d)=>{
    if(!CONFIG.LLM_ENDPOINT) return null;
    const ctrl = new AbortController(); const tm = setTimeout(()=>ctrl.abort(), 5000);
    try{
      const chat = (d.qList||[]).map(x=>x.q).join(" | ");
      const r = await fetch(CONFIG.LLM_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, signal:ctrl.signal,
        body: JSON.stringify({ mode:"verify", answers:{ claimed:d.nurse, qualification:d.qualification, workplace:d.workplace, college:d.college, researched:d.researched, council:d.council, chat } }) });
      clearTimeout(tm); if(!r.ok) return null; const j = await r.json(); return j && j.verdict ? j : null;
    }catch(e){ clearTimeout(tm); return null; }
  };

  const saveResearched = async ()=>{
    const v = input.trim(); if(!v) return;
    me(v); setInput(""); scanText(v);
    const d0 = { ...lead, researched:v };
    setLead((l)=>({ ...l, researched:v }));
    setStage("checkwait");
    say(M("Thank you! Give me a second, let me check your Germany eligibility…","शुक्रिया! एक second, मैं आपकी Germany eligibility check कर रही हूँ…"), 500);
    const t0 = Date.now();
    const ai = await aiVerify(d0);
    const nn = NON_NURSE_RX.test(v) || PROXY_RX.test(v);
    const d = withVerify({ ...d0, aiVerdict: ai ? ai.verdict : null, aiReason: ai ? ai.reason : null,
      nonNurseHits: (NON_NURSE_RX.test(v) ? [...(d0.nonNurseHits||[]), v.slice(0,80)] : d0.nonNurseHits), proxy: d0.proxy || PROXY_RX.test(v) });
    setLead((l)=> withVerify({ ...l, aiVerdict:d.aiVerdict, aiReason:d.aiReason, nonNurseHits:d.nonNurseHits, proxy:d.proxy }));
    setTimeout(()=>{
      if(d.verifyVerdict==="suspect" && !d.reconfirm) askReconfirm();
      else showPlan(d);
    }, Math.max(0, 1600-(Date.now()-t0)));
  };

  // a soft, honest re-confirm for suspicious profiles (asked at most once)
  const askReconfirm = ()=>{
    setLead((l)=>({ ...l, reconfirmAsked:true }));
    say(M(`Thanks, ${firstName(lead.name)}! One honest check before I share your plan — this program is only for qualified nurses and final-year nursing students, and our counsellors only call nurses. Which of these describes you? 👇`,
          `शुक्रिया, ${firstName(lead.name)}! Plan बताने से पहले एक honest check — यह program सिर्फ़ qualified nurses और final-year nursing students के लिए है, और हमारे counsellors सिर्फ़ nurses को call करते हैं। आप इनमें से कौन हैं? 👇`), 700);
    setTimeout(()=> setStage("reconfirm"), 1300);
  };
  const pickReconfirm = (k, label)=>{
    me(label);
    if(k==="no"){
      setLead((l)=> withVerify({ ...l, nurse:"no", reconfirm:"no" }));
      say(M("Thank you for being honest — I really appreciate it! I can't book a counsellor call for this program, but ask me anything you like 👇",
            "सच बताने के लिए दिल से शुक्रिया! इस program के लिए मैं counsellor call book नहीं कर सकती, पर जो भी जानना हो, पूछिए 👇"), 600);
      setTimeout(()=> setStage("hub"), 1200); return;
    }
    if(k==="proxy"){ setLead((l)=> withVerify({ ...l, proxy:true, reconfirm:"proxy" })); pickNotNurse(true); return; }
    setLead((l)=> withVerify({ ...l, reconfirm:"nurse", nurse:(k==="student"?"student":l.nurse==="no"?"nurse":l.nurse) }));
    say(M("Thank you! I've noted that for your counsellor.","शुक्रिया! मैंने counsellor के लिए note कर लिया है।"), 500);
    setTimeout(()=> showPlan(lead), 900);
  };

  // the "value moment": personal snapshot after qualifying, then into country Q&A
  const showPlan = (d)=>{
    const mult = { "<20k":"10×", "20-35k":"6–10×", "35-50k":"4–6×", "50k+":"3–4×" }[d.currentSalary];
    say(M(`Here's your Germany snapshot, ${firstName(d.name)} 👇`, `${firstName(d.name)}, यह रहा आपका Germany snapshot 👇`), 500);
    setTimeout(()=> push({ from:"bot", card:"salary" }), 1000);
    setTimeout(()=> say(
      M(`As a ${d.qualification||"nurse"}${mult ? ", you could earn about "+mult+" your current salary" : ""} in Germany — with no IELTS, and your family can join you. Your path: German A1→B2 (about 10–12 months) → degree recognition → job + visa through licensed recruiters.`,
        `${d.qualification||"nurse"} के तौर पर Germany में आप${mult ? " अपनी अभी की salary का लगभग "+mult : " बहुत ज़्यादा"} कमा सकती हैं — बिना IELTS, और family भी साथ आ सकती है। आपका रास्ता: German A1→B2 (करीब 10–12 महीने) → degree recognition → licensed recruiters के ज़रिए job + visa।`), 900), 1500);
    setTimeout(()=> say(M("Before we go deeper — is Germany your first choice, or are you comparing a few countries? 👇","आगे बढ़ने से पहले — क्या Germany आपकी पहली पसंद है, या आप कुछ देशों को compare कर रही हैं? 👇"), 700), 3300);
    setTimeout(()=> setStage("country"), 4100);
  };

''')

# ── free text → KB / LLM ───────────────────────────────────────────────────
region("  const handleFreeText = ()=>{", "  const askSlot = ()=>", r'''  // recent string messages as LLM history (cards/JSX skipped)
  const llmHistory = ()=> msgs.filter(m=> typeof m.node==="string" && m.node.trim()).slice(-8)
    .map(m=>({ role: m.from==="user" ? "user" : "assistant", content: m.node }));
  const askLLM = async (v)=>{
    const ctrl = new AbortController(); const tm = setTimeout(()=>ctrl.abort(), 10000);
    try{
      const r = await fetch(CONFIG.LLM_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, signal:ctrl.signal,
        body: JSON.stringify({ lang:LANG, lead:{ name:firstName(lead.name), nurse:lead.nurse, qualification:lead.qualification, specialization:lead.specialization, country:lead.country, slot:lead.slot },
          messages:[...llmHistory(), { role:"user", content:v }] }) });
      clearTimeout(tm); if(!r.ok) return null;
      const j = await r.json(); return (j && j.reply) ? j : null;
    }catch(e){ clearTimeout(tm); return null; }
  };
  const kbAnswer = (e, back)=>{
    if(e){ const a=A(e); say(a); if(!back()) followUp(a); return; }
    setLead((l)=>({ ...l, question: lead.question ? lead.question : undefined }));
    say(M("That one's a bit outside what I can answer properly here, so I've noted it for your counsellor. I'm best with nursing careers abroad — Germany salary, German classes, visa, fees. Ask me anything there!",
          "यह सवाल मेरी जानकारी से थोड़ा बाहर है, इसलिए मैंने इसे counsellor के लिए note कर लिया है। मैं विदेश में nursing career में सबसे अच्छी हूँ — Germany salary, German classes, visa, fees। वहाँ कुछ भी पूछिए!"));
    back();
  };
  const afterLLM = (j)=>{
    if(j.nurse_signal==="not_nurse" || j.nurse_signal==="proxy"){
      setLead((l)=> withVerify({ ...l, proxy: l.proxy || j.nurse_signal==="proxy", nonNurseHits: j.nurse_signal==="not_nurse" ? [...(l.nonNurseHits||[]), "llm:"+String((l.qList||[]).slice(-1)[0]?.q||"").slice(0,70)].slice(-5) : l.nonNurseHits }));
      if(j.nurse_signal==="not_nurse" && lead.nurse!=="no" && !lead.reconfirmAsked){ setTimeout(()=> askReconfirm(), 1400); return; }
    }
    if(j.intent==="exit" && !lead.nudged){ setTimeout(()=> nudgeExit(), 900); return; }
    if(j.intent==="book_call" && !lead.slot && lead.nurse!=="no" && lead.verifyVerdict!=="not_nurse"){
      setTimeout(()=>{ say(M("Shall I book your free call with a counsellor now? 👇","क्या मैं अभी आपकी free counsellor call book कर दूँ? 👇"), 600); setTimeout(()=> setStage("book_offer"), 700); }, 900);
    }
  };

  const handleFreeText = async ()=>{
    const v = input.trim(); if(!v || busyRef.current) return;
    me(v); setInput("");
    const inG = stage==="ghub" || (stage!=="hub" && lead.gpushed);
    if(!["hub","ghub"].includes(stage)) setStage(inG ? "ghub" : "hub");   // typing always works, even when chips are showing
    const back = inG ? bumpG : bumpHub;
    if(!lead.nudged && /(not interested|no thanks|no thank|stop|leave|goodbye|\bbye\b|quit|exit|not now|cancel|don'?t want|nahi chahiye|busy|talk later|later)/i.test(v)){ nudgeExit(); return; }
    const flagged = scanText(v);
    const e = matchFor(v);
    const words = norm(v).split(" ").filter(Boolean).length;
    setLead((l)=>({ ...l, qCount:(l.qCount||0)+1, qList:[...(l.qList||[]).slice(-14), { q:v, topic:e?e.id:"unmatched", at:new Date().toISOString() }] }));
    if(e && e.id==="process" && inG && !flagged){ offerVideo(); return; }
    if(e && CASUAL_IDS.has(e.id) && words<=4 && !flagged){ say(A(e)); return; }   // small talk: instant canned reply
    const canLLM = !!CONFIG.LLM_ENDPOINT && (lead.llmN||0) < CONFIG.LLM_MAX_PER_SESSION;
    if(!canLLM){ kbAnswer(e, back); return; }
    busyRef.current = true; setTyping(true);
    const t0 = Date.now();
    const j = await askLLM(v);
    const minShow = j ? Math.min(1700, 600 + j.reply.length*10) : 0;   // natural "typing…" time
    setTimeout(()=>{
      setTyping(false); busyRef.current = false;
      if(!j){ kbAnswer(e, back); return; }
      push({ from:"bot", node:j.reply });
      setLead((l)=>{ const ql=[...(l.qList||[])]; if(ql.length) ql[ql.length-1] = { ...ql[ql.length-1], topic:"llm"+(e?":"+e.id:""), a:j.reply.slice(0,240) }; return { ...l, llmN:(l.llmN||0)+1, qList:ql }; });
      back();
      afterLLM(j);
    }, Math.max(0, minShow-(Date.now()-t0)));
  };

''')
rep("  const askSlot = ()=>{ say(", "  const askSlot = ()=>{\n    if(lead.nurse===\"no\" || lead.verifyVerdict===\"not_nurse\"){\n      say(M(\"Our counsellor calls are only for nurses and nursing students, so I can't book one here — but I'm happy to answer anything you'd like to know!\",\"हमारी counsellor calls सिर्फ़ nurses और nursing students के लिए हैं, इसलिए मैं यहाँ book नहीं कर सकती — पर जो भी जानना हो, खुशी से बताऊँगी!\"));\n      setStage(lead.gpushed ? \"ghub\" : \"hub\"); return;\n    }\n    say(")

# bump helpers return whether they triggered an auto push (so we don't stack a "Did that help?" on top)
rep("  const bumpHub = ()=>{ const n=(lead.hubN||0)+1; setLead((l)=>({ ...l, hubN:n }));\n    if(n>=2 && !lead.gpushed){ setLead((l)=>({ ...l, gpushed:true })); setTimeout(()=> gpush(true), 2000); } };",
    "  const bumpHub = ()=>{ const n=(lead.hubN||0)+1; setLead((l)=>({ ...l, hubN:n }));\n    if(n>=2 && !lead.gpushed){ setLead((l)=>({ ...l, gpushed:true })); setTimeout(()=> gpush(true), 2400); return true; } return false; };")
rep("  const bumpG = ()=>{ const n=(lead.gN||0)+1; setLead((l)=>({ ...l, gN:n }));\n    if(n>=2 && !lead.vpushed){ setLead((l)=>({ ...l, vpushed:true })); setTimeout(()=> offerVideo(), 2100); } };",
    "  const bumpG = ()=>{ const n=(lead.gN||0)+1; setLead((l)=>({ ...l, gN:n }));\n    if(n>=2 && !lead.vpushed){ setLead((l)=>({ ...l, vpushed:true })); setTimeout(()=> offerVideo(), 2400); return true; } return false; };")
rep("const answerChip = (id, label)=>{ const e=KB.find(x=>x.id===id); me(label); const a=A(e); say(a); bumpG(); followUp(a); };",
    "const answerChip = (id, label)=>{ const e=KB.find(x=>x.id===id); me(label); const a=A(e); say(a); if(!bumpG()) followUp(a); };")

# country pick: skip the old "abroad" question in the new flow (still reachable from old sessions)
rep('''    say(M("Great! Ask me anything 👇 — compare countries, which pays best, visa & documents, or the cost of going. I'm right here for you.",''',
    '''    say(M(k==="germany" ? "Great choice! Ask me anything 👇 — salary, German classes, visa, cost, or compare it with other countries." : "Great! Ask me anything 👇 — compare countries, which pays best, visa & documents, or the cost of going. I'm right here for you.",''')

# ── inputs ─────────────────────────────────────────────────────────────────
s = re.sub(r'  const onKey = \(e\)=>\{.*?\n', '  const onKey = (e)=>{ if(e.key!=="Enter") return; sendClick(); };\n', s, count=1)
s = re.sub(r'  const sendClick = \(\)=>.*?\n', '  const sendClick = ()=> stage==="name" ? saveName() : stage==="phone" ? savePhone() : stage==="workplace" ? saveWorkplace() : stage==="specialization" ? saveSpecialization() : stage==="college" ? saveCollege() : stage==="researched" ? saveResearched() : handleFreeText();\n', s, count=1)
s = re.sub(r'  const showInput = \[.*?\n', '  // the text box stays visible on chip stages too (gpush / video / book offers) so a nurse can always type a question\n  const showInput = ["name","phone","hub","ghub","workplace","specialization","college","researched","gpush","nudge","video_lang","video_feedback","book_offer","country"].includes(stage);\n', s, count=1)
rep('stage==="specialization" ? M("Type your specialization","अपनी specialization type करें")',
    'stage==="workplace" ? M("Hospital name, ward…","Hospital का नाम, ward…") : stage==="specialization" ? M("Type your specialization","अपनी specialization type करें")')

# ── new stage UIs (inserted before the council chips) ──────────────────────
rep('        {stage==="council" && (', r'''        {stage==="check" && (()=>{ const c=(lead.checkQs||[])[lead.checkIdx||0]; if(!c) return null; const d=checkDef(c.id); return (
          <div className="opts one">
            {c.order.map((i)=> <button key={i} className="opt" onClick={()=>answerCheck(i)}>{M(d.opts[i].en,d.opts[i].hi)}</button>)}
            <button className="opt" onClick={()=>answerCheck(-1)}>{M("Not sure","पता नहीं")}</button>
          </div>); })()}

        {stage==="notnurse" && (
          <div className="opts one">
            <button className="opt" onClick={()=>pickNotNurse(true)}>{M("Yes, for a family member","हाँ, family member के लिए")}</button>
            <button className="opt" onClick={()=>pickNotNurse(false)}>{M("No, just exploring","नहीं, बस देख रहा/रही हूँ")}</button>
          </div>
        )}

        {stage==="reconfirm" && (
          <div className="opts one">
            {[{k:"nurse",l:M("I'm a qualified nurse (GNM / B.Sc)","मैं qualified nurse हूँ (GNM / B.Sc)")},{k:"student",l:M("I'm a final-year nursing student","मैं final-year nursing student हूँ")},
              {k:"proxy",l:M("Asking for a family member","Family member के लिए पूछ रहा/रही हूँ")},{k:"no",l:M("I'm not a nurse","मैं nurse नहीं हूँ")}].map((o)=>
              <button key={o.k} className="opt" onClick={()=>pickReconfirm(o.k, o.l)}>{o.l}</button>)}
          </div>
        )}

        {stage==="book_offer" && (
          <div className="opts">
            <button className="opt" onClick={()=>{ me(M("Yes, book my free call","हाँ, free call book करें")); askSlot(); }}>{M("📞 Yes, book my free call","📞 हाँ, free call book करें")}</button>
            <button className="opt" onClick={()=>{ me(M("Not right now","अभी नहीं")); say(M("Sure! Ask me anything else 👇","ज़रूर! और कुछ भी पूछिए 👇"), 500); setStage(lead.gpushed ? "ghub" : "hub"); }}>{M("Not right now","अभी नहीं")}</button>
          </div>
        )}

        {stage==="council" && (''')

# typo from the emoji clean-up
s = s.replace("Got it And tell me", "Got it. And tell me")
s = s.replace("Global So glad", "Global. So glad")

open(p, "w", encoding="utf-8").write(s)
print("patch part 2 ok")
