// Random ad audience for the Jhanvi chatbot: realistic mix of who clicks a "Germany nursing" ad and how they chat.
// makeAudience(n, seed) → persona list for run-personas.mjs (AUDIENCE=100 node chatbot/tests/run-personas.mjs)
const c = (click) => ({ click }), t = (type) => ({ type }), q = (check) => ({ check });

function rng(seed) { let x = seed >>> 0 || 1; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); }

const NAMES = ["Pooja Meena", "Anjali Verma", "Sneha Nair", "Priyanka Das", "Rekha Kumari", "Merin Thomas", "Divya S", "Kavita Yadav", "Shalini Gupta", "Ritu Singh",
  "Aman Khan", "Rohit Sharma", "Sister Mary Joseph", "Neha", "Jyoti Patel", "Manisha Rawat", "Arun Kumar", "Bincy George", "Sunita Devi", "Farhana Begum"];
const HOSPITALS = ["AIIMS Rishikesh, medical ward", "Fortis Mohali ICU", "Apollo Hyderabad, OT", "Max Saket emergency", "district hospital Sikar, general ward",
  "civil hospital Ludhiana, labour room", "PGI Chandigarh NICU", "Medanta Gurgaon cardiac ICU", "CMC Vellore dialysis unit", "private nursing home in Patna",
  "ESIC hospital Noida OPD", "Narayana Health oncology ward", "Govt medical college Kota, surgery ward", "KIMS Trivandrum, CCU"];
const STUDENT_POSTINGS = ["clinical posting in civil hospital Jaipur, medicine ward", "internship at govt medical college Nagpur, OT", "posting chal rahi hai district hospital me, paeds ward"];
const COLLEGES = ["Government College of Nursing Jaipur", "RAK College of Nursing Delhi", "SGRD College of Nursing Amritsar", "Govt School of Nursing Patna",
  "Christian College of Nursing Ludhiana", "Sri Ramachandra College of Nursing", "Rufaida College of Nursing", "Govt nursing college Kota"];
const FAKE_WORK = ["call center", "shop", "i do data entry job", "hospital", "working in office", "BPO noida", "not working, BA final year", "Amazon warehouse"];
const FAKE_COLLEGE = ["Delhi University", "IGNOU", "AIIMS college", "Mumbai University", "12th pass", "ITI Pusa"];
const RESEARCH = ["no", "nahi", "UK me IELTS lagta hai", "an agent asked for 5 lakh", "seen youtube videos about Germany", "my friend is in Dubai as nurse", "not really", "Australia AHPRA is costly", "heard Germany needs German language"];

const Q_NURSE_EN = ["what is the salary after tax?", "how long does it take to learn german", "can my husband come with me?", "is there any age limit? i am 36",
  "do i need experience?", "is IELTS required", "what documents do i need", "can i take my kids", "how much is the fees", "is this a scam?",
  "will i get job guarantee", "can i do it with my night duties", "what if i fail B2", "which city will i get", "is it safe for women",
  "can i come back to india", "how is the weather there", "do they give accommodation", "can i do MSc there later", "will my ICU experience count",
  "how many hours per week work", "is food a problem for vegetarians", "loan facility available?", "classes online or offline?"];
const Q_NURSE_HING = ["salary kitni milegi", "german sikhne me kitna time lagega", "mere pati bhi ja sakte hai kya", "fees kitni hai", "kya ye fraud to nahi",
  "job pakki hai?", "mere 2 bacche hai, unko le ja sakti hu?", "ghar ki yaad aayegi bahut", "night duty karke class kaise karungi", "visa kaise milega",
  "kitna paisa lagega total", "kya main 35 saal ki hu to chalega", "hindi me baat karo", "emi milegi?"];
const Q_NURSE_HI = ["सैलरी कितनी मिलेगी?", "जर्मन सीखने में कितना समय लगेगा?", "क्या मेरे पति भी जा सकते हैं?", "फीस कितनी है?", "क्या यह सच में genuine है?",
  "मेरी उम्र 34 है, क्या चलेगा?", "क्या वहाँ रहने की जगह मिलेगी?", "क्या मैं हर साल घर आ सकती हूँ?"];
const Q_FAKE = ["can i get any job in germany", "i am BA, can i also apply?", "driver job available?", "how to get work visa for germany", "i am not nurse but want to go abroad",
  "salary kitni hai", "any job is fine for me"];
const Q_PARENT = ["my daughter is in GNM 2nd year", "is it safe for girls?", "how much money we need to arrange", "she doesn't know german", "can you call me to explain", "who will take care of her there"];
const Q_TROLL = ["who won the match", "tell me a joke", "are you a bot", "i love you", "send pic", "what is your age", "hello?", "hmm", "ok", "😂😂", "kya kar rahi ho", "bye"];
const SIDE_Q = ["wait is this free?", "pehle batao fees kitni hai", "is this online?", "who are you exactly?", "kya ye sach me hai?"];
const CALL_ASK = [c("📞"), t("can someone call me"), t("mujhe call karo"), t("I want to talk to counsellor"), t("call me please")];
const TIMES = ["evening after 6", "5 pm", "morning", "kal subah 11 baje", "anytime after 7", "lunch time"];

export function makeAudience(n = 100, seed = 20261128) {
  const r = rng(seed), pick = (a) => a[Math.floor(r() * a.length)], chance = (p) => r() < p;
  const out = [];
  for (let i = 0; i < n; i++) {
    const roll = r();
    const seg = roll < 0.45 ? "nurse" : roll < 0.60 ? "student" : roll < 0.80 ? "fake" : roll < 0.88 ? "honest_non" : roll < 0.95 ? "parent" : "troll";
    const hindi = chance(seg === "troll" ? 0.3 : 0.45);
    const typer = chance(0.45);                       // types answers instead of tapping
    const L = (en, hi) => (hindi ? hi : en);
    const steps = [];
    steps.push(typer ? t(hindi ? pick(["hindi", "हिंदी", "Hindi me"]) : pick(["english", "English", "eng"])) : c(hindi ? "हिंदी" : "English"));

    const qual = seg === "student" ? pick(["B.Sc Nursing", "GNM"]) : seg === "nurse" ? pick(["GNM", "GNM", "B.Sc Nursing", "B.Sc Nursing", "Post Basic B.Sc", "ANM"]) : pick(["GNM", "B.Sc Nursing"]);
    if (seg === "honest_non" || seg === "parent") {
      steps.push(typer ? t(hindi ? "nahi" : "no") : c(L("No", "नहीं")));
      if (seg === "parent") steps.push(typer ? t("for my daughter") : c(L("Yes, for a family member", "हाँ, family member के लिए")));
      else steps.push(typer ? t(hindi ? "bas dekh raha hu" : "just exploring") : c(L("No, just exploring", "नहीं, बस देख रहा/रही हूँ")));
    } else {
      if (seg === "student") steps.push(typer ? t(hindi ? `${qual} final year me hu` : `final year ${qual} student`) : c(L("Final-year student", "Final year student")));
      else steps.push(typer ? t(hindi ? `haan ${qual} kiya hai` : pick([`yes i am ${qual} nurse`, "yes", `${qual}`])) : c(L("Yes, I am a nurse", "हाँ, मैं nurse हूँ")));
      const typedQual = typer && seg !== "student" && !/yes$/.test(steps[steps.length - 1].type || "x") ;
      if (!(typer && steps[steps.length - 1].type && /gnm|b\.sc|bsc|post|anm/i.test(steps[steps.length - 1].type))) steps.push(c(qual));
      if (chance(0.2)) steps.push(t(pick(SIDE_Q)));                        // side question in the nursing round
      const knows = seg === "fake" ? (chance(0.35) ? "right" : chance(0.5) ? "wrong" : "unsure") : chance(0.85) ? "right" : "unsure";
      steps.push(q(knows), q(seg === "fake" ? (chance(0.3) ? "right" : "wrong") : chance(0.8) ? "right" : "unsure"));
      steps.push(t(seg === "fake" ? pick(FAKE_WORK) : seg === "student" ? pick(STUDENT_POSTINGS) : chance(0.12) ? "not working currently, career gap" : pick(HOSPITALS)));
      steps.push(t(seg === "fake" ? pick(FAKE_COLLEGE) : pick(COLLEGES)));
      if (seg === "student") steps.push(typer ? t("final year, not registered yet") : c(L("Final year — not registered yet", "Final year — अभी registered नहीं")));
      else steps.push(typer ? t(pick(["yes registered", "state council", "haan"])) : c(L("My State Nursing Council", "मेरी State Nursing Council")));
      steps.push(typer ? t(pick(["18000", "25k", "30 hazar", "40000", "prefer not to say", "stipend 6000"])) : c(pick(["Below ₹20,000", "₹20,000 – ₹35,000", "₹35,000 – ₹50,000", L("Prefer not to say", "बताना नहीं चाहती")])));
      steps.push(t(pick(RESEARCH)));
      // suspects may get the re-confirm question
      steps.push({ maybe: seg === "fake" ? c("I'm a qualified nurse") : c("I'm a qualified nurse"), ifStage: "reconfirm", alt: seg === "fake" && chance(0.4) ? c("I'm not a nurse") : null });
      steps.push(typer ? t(pick(["germany", "Germany", hindi ? "जर्मनी" : "germany pakka", "UK", "not sure"])) : c(L(pick(["Germany", "Germany", "UK", "Canada"]), "जर्मनी")));
    }
    // chat in the hub
    const bank = seg === "fake" || seg === "honest_non" ? Q_FAKE : seg === "parent" ? Q_PARENT : seg === "troll" ? Q_TROLL : hindi ? [...Q_NURSE_HI, ...Q_NURSE_HING] : [...Q_NURSE_EN, ...Q_NURSE_HING.slice(0, 4)];
    const nq = seg === "troll" ? 3 + Math.floor(r() * 4) : Math.floor(r() * 6);
    const used = new Set();
    for (let k = 0; k < nq; k++) { let qq = pick(bank); if (used.has(qq)) continue; used.add(qq); steps.push(t(qq)); }
    if (chance(0.15)) steps.push(c(pick(["Salary", "Cost & EMI", "Compare countries", "Which pays best?", "सैलरी"])));
    if (seg !== "troll" && seg !== "honest_non" && chance(seg === "fake" ? 0.3 : 0.5)) { const ask = pick(CALL_ASK); steps.push(ask.click ? t("can someone call me") : ask); steps.push(t(pick(TIMES))); }
    out.push({ name: `aud_${String(i + 1).padStart(3, "0")}_${seg}${hindi ? "_hi" : ""}${typer ? "_typer" : ""}`, segment: seg, hindi, typer,
      desc: `${seg}, ${hindi ? "Hindi" : "English"}, ${typer ? "types" : "taps"}`, name_input: pick(NAMES), phone: "98" + String(10000000 + Math.floor(r() * 89999999)), steps });
  }
  return out;
}
