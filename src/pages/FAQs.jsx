import { useState, useRef, useEffect } from 'react';
import Reveal from '../components/Reveal';
import FaqItem from '../components/FaqItem';
import CTABanner from '../components/CTABanner';
import GermanyBackdrop from '../components/GermanyBackdrop';

const groups = [
  {
    id: 'salary',
    title: 'Salary, Benefits & Taxes',
    items: [
      { q: 'Will accommodation be arranged for me in Germany?', a: 'Yes — furnished accommodation is arranged before you arrive. Rent and related costs are simply deducted from your gross salary each month, so there\u2019s no upfront scramble to find a place.' },
      { q: 'Am I covered by health insurance?', a: 'Yes, you\u2019re covered through Germany\u2019s statutory health insurance system from the day your employment begins.' },
      { q: 'What can I expect to earn as a registered nurse?', a: 'It depends on experience, location and the hiring facility. As a rough guide: before your qualification is formally recognised, expect €2,600–2,900/month; after recognition, €3,000–3,400/month.' },
    ],
  },
  {
    id: 'recognition',
    title: 'Recognition Process',
    items: [
      { q: 'What do I need to qualify as a Registered Nurse in Germany?', a: 'A recognised nursing qualification (B.Sc Nursing or GNM diploma), plus active registration as an RN with your State Nursing Council in India.' },
    ],
  },
  {
    id: 'language',
    title: 'Language & Exams',
    items: [
      { q: "Don't know German? No problem.", a: 'You will need B2-level German to practise as a nurse — covering reading, listening, writing and speaking — verified through an accredited provider (Goethe, ÖSD, TELC or ECL). We train you there from scratch.' },
      { q: 'Where can I actually sit the German exam?', a: 'At any Goethe, ÖSD, TELC or ECL centre accredited by ALTE (Association of Language Testers in Europe) — several operate across major Indian cities.' },
    ],
  },
  {
    id: 'career',
    title: 'Career Path',
    items: [
      { q: 'Can I grow beyond a staff nurse role?', a: 'Yes — with additional training you can move into roles like nurse practitioner, nurse manager or clinical specialist. Germany offers 200+ specialisation courses, all tuition-free.' },
    ],
  },
  {
    id: 'family',
    title: 'Family Reunification',
    items: [
      { q: 'When can my family join me?', a: 'After you pass your recognition exam and secure accommodation, you can apply for a Family Reunification Visa — typically a 6 to 12 month process.' },
      { q: 'Does my spouse need to learn German too?', a: 'Yes — your spouse needs an A1 German certificate to qualify for the Family Reunification Visa. Children are exempt from this requirement.' },
      { q: 'Is this a forever move, or just a job?', a: 'Your call. You can apply for Permanent Residency after 3 years of residence and meeting integration requirements, and German citizenship after 5 years.' },
      { q: 'What cultural differences should I prepare for?', a: 'Things like communication style, working hours, and patient expectations differ from India. Understanding these early makes the adjustment to the German healthcare system much smoother.' },
    ],
  },
  {
    id: 'program',
    title: 'About the Program',
    items: [
      { q: 'How do I actually apply?', a: 'Fill out the form on this site, or reach out directly — our team will screen your eligibility within 48 hours.' },
      { q: 'What\u2019s the time commitment on my end?', a: 'Roughly 8–10 months of German language training, followed by your B2-level certification exam.' },
      { q: 'I have a career gap — am I still in the running?', a: 'Yes. A career gap won\u2019t rule you out, as long as you can provide a valid reason and supporting documentation during screening.' },
    ],
  },
];

export default function FAQs() {
  const [active, setActive] = useState(groups[0].id);
  const refs = useRef({});

  function scrollToGroup(id) {
    setActive(id);
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero">
        <GermanyBackdrop />
        <div className="container">
          <Reveal><span className="eyebrow">Resource hub</span></Reveal>
          <Reveal delay={0.06}><h1 className="page-hero-title">FAQs</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-hero-sub">Your questions, answered.</p>
          </Reveal>
        </div>
      </section>

      <div className="faq-jumpnav-wrap">
        <div className="container faq-jumpnav">
          {groups.map((g) => (
            <button
              key={g.id}
              className={`faq-jumpnav-pill ${active === g.id ? 'faq-jumpnav-pill-active' : ''}`}
              onClick={() => scrollToGroup(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>
      </div>

      <section className="section faq-section">
        <div className="container faq-categorized">
          {groups.map((g, gi) => (
            <div
              key={g.id}
              id={g.id}
              ref={(el) => (refs.current[g.id] = el)}
              className="faq-category-block"
            >
              <Reveal>
                <h2 className="faq-category-title">{g.title}</h2>
              </Reveal>
              <div className="faq-list">
                {g.items.map((it, i) => (
                  <FaqItem
                    key={it.q}
                    q={`${i + 1}. ${it.q}`}
                    a={it.a}
                    defaultOpen={gi === 0 && i === 0}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
