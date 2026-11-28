// Realistic personas from a Meta/Google "Germany nursing" ad (v5 flow).
// Steps: click a button by visible text, type free text, or answer the nursing round by role.
const c = (click) => ({ click }), t = (type) => ({ type }), q = (check) => ({ check });

export const PERSONAS = [
  { name: "genuine_gnm_hindi", desc: "Real GNM staff nurse, private hospital, Rajasthan, chats in Hindi/Hinglish",
    name_input: "Pooja Meena",
    steps: [c("हिंदी"), c("हाँ, मैं nurse हूँ"), c("GNM"), q("right"), q("right"),
      t("Fortis hospital Jaipur, medical ward"), t("Government School of Nursing Jaipur"), c("मेरी State Nursing Council"),
      c("₹20,000 – ₹35,000"), t("suna hai UK me IELTS lagta hai, Germany me nahi"), c("जर्मनी"),
      t("mere pati driver hain, kya unko bhi wahan kaam milega?"), t("fees kitni hai"), t("class kab se start hogi aur timing kya hogi?"),
      t("mujhe ghar ki bahut yaad aayegi, kya main saal me ek baar aa sakti hu"), t("ok")] },

  { name: "fake_nurse_ba_grad", desc: "Not a nurse (BA graduate) who taps 'I am a nurse' to hear about German jobs",
    name_input: "Rahul Kumar",
    steps: [c("English"), c("Yes, I am a nurse"), c("GNM"), q("wrong"), q("unsure"),
      t("i am working in call center"), t("Delhi University"), c("My State Nursing Council"),
      c("Prefer not to say"), t("no"),
      c("I'm a qualified nurse"), c("Germany"),
      t("I am actually BA graduate, can I also get job in Germany?"), t("any job is fine for me, warehouse or driver")] },

  { name: "smart_fake_nurse", desc: "Non-nurse who guesses chips, types 'ICU' and a real college name",
    name_input: "Aman Singh",
    steps: [c("English"), c("Yes, I am a nurse"), c("B.Sc Nursing"), q("right"), q("wrong"),
      t("hospital"), t("AIIMS college"), c("Indian Nursing Council"), c("₹20,000 – ₹35,000"), t("yes"),
      c("I'm a qualified nurse"), c("Germany"),
      t("how much salary"), t("ok when will i get the job")] },

  { name: "bsc_student_skeptic", desc: "Final-year B.Sc student, seniors warned her about agents, comparing UK",
    name_input: "Ananya Thomas",
    steps: [c("English"), c("Final-year student"), c("B.Sc Nursing"), q("right"), q("unsure"),
      t("internship at govt medical college hospital kottayam, OT"), t("Government College of Nursing Kottayam"),
      c("Final year — not registered yet"), c("Below ₹20,000"), t("my seniors said agents take 5 lakh and cheat people"),
      c("UK"), c("Compare countries"), c("Ireland"), c("Canada"), c("Compare now"),
      t("is this a scam?"), t("what if I fail B2 exam"), t("can I do classes while my internship is going on? I have 12 hour duties")] },

  { name: "parent_for_daughter", desc: "Father filling it for his daughter who is in GNM 2nd year",
    name_input: "Suresh Yadav",
    steps: [c("English"), c("No"), c("Yes, for a family member"),
      t("my daughter is doing GNM 2nd year"), t("is it safe for girls to go alone?"), t("how much money we need to arrange?"),
      t("she does not know German at all"), t("can you call me to explain?")] },

  { name: "random_offtopic", desc: "Genuine nurse but chatty/off-topic, tests naturalness",
    name_input: "Kavya R",
    steps: [c("English"), c("Yes, I am a nurse"), c("GNM"), q("right"), q("right"),
      t("Apollo Chennai, emergency"), t("Sri Ramachandra College of Nursing"), c("My State Nursing Council"),
      c("₹20,000 – ₹35,000"), t("not really"), c("Not sure yet"),
      t("who won yesterday's cricket match?"), t("tell me a joke"), t("can you make my resume"),
      t("are you a real person or AI?"), t("i love you"), t("what is the weather in germany in december"), t("bye")] },

  { name: "experienced_icu_english", desc: "B.Sc nurse, 6 yrs cardiac ICU, researched Australia, serious & detailed questions",
    name_input: "Dr Merin Joseph",
    steps: [c("English"), c("Yes, I am a nurse"), c("B.Sc Nursing"), q("right"), q("right"),
      t("Narayana Health Bangalore, cardiac ICU, 6 years"), t("Manipal College of Nursing"), c("My State Nursing Council"),
      c("₹35,000 – ₹50,000"), t("I looked at Australia AHPRA but OBA is too costly"), c("Germany"),
      t("will my 6 years ICU experience count in Germany or will I start as a junior?"),
      t("can I work directly in ICU there or do I have to start in general ward?"),
      t("how many night shifts per month?"), t("what will be my in hand salary in Munich after tax?"),
      t("I want to talk to the counsellor today")] },

  { name: "anm_worker", desc: "ANM worker (not eligible on its own), asks if she can still go",
    name_input: "Sunita Devi",
    steps: [c("हिंदी"), c("हाँ, मैं nurse हूँ"), c("ANM"), q("right"), q("unsure"),
      t("PHC me ANM hu, gaon me"), t("ANM training centre Gaya"), c("मेरी State Nursing Council"),
      c("Below ₹20,000"), t("nahi"), c("जर्मनी"),
      t("kya ANM wale bhi ja sakte hain?"), t("agar main GNM kar lu to?")] },

  // ── people who TYPE instead of tapping (v6) ──
  { name: "typer_hinglish", desc: "Types everything WhatsApp-style, asks a question mid-flow, gives salary as '28k', picks a time by typing",
    name_input: "Neha Sharma",
    steps: [t("english"), t("yes i am GNM nurse"), t("wait is this course paid or free?"), q("right"), t("pata nahi"),
      t("Max hospital saket, ICU"), t("RAK college of nursing delhi"), t("yes delhi nursing council"),
      t("28k"), t("my cousin went to UK, she said IELTS is very tough"), t("germany"),
      t("mummy papa are scared to send me alone"), t("how long it will take to learn german? i am working 12 hr shifts"),
      t("ok can someone call me"), t("evening after 6")] },

  { name: "typer_hindi_student", desc: "Final-year student who types in Hindi, asks a side question during the nursing round",
    name_input: "Riya Patel",
    steps: [t("हिंदी"), t("मैं B.Sc nursing final year में हूँ"), t("क्या ये online है?"), q("right"), q("right"),
      t("civil hospital ahmedabad me posting chal rahi hai, medicine ward"), t("Government College of Nursing Ahmedabad"),
      t("abhi registration nahi hua, final year hai"), t("stipend 8000 milta hai"), t("nahi"), t("जर्मनी"),
      t("kya main exam ke baad turant ja sakti hu?")] },
];
