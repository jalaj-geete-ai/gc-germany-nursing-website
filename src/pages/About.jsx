import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import GrowthGraph from '../components/GrowthGraph';
import DecoratedPhoto from '../components/DecoratedPhoto';
import GermanyBackdrop from '../components/GermanyBackdrop';
import Counter from '../components/Counter';
import nursePortrait from '../assets/brand/nurse-portrait.jpg';

const pillars = [
  {
    title: 'Structured Learning',
    desc: 'A defined curriculum and roadmap — not random videos and hope. Every learner knows what to study, when, and why.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><rect x="9" y="8" width="22" height="26" rx="2" stroke="#fff" strokeWidth="2" fill="none" /><path d="M14 16h12M14 21h12M14 26h7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: 'Transparency',
    desc: 'Clear terms, visible progress, and honest guidance at every step. No hidden costs, no vague promises.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="12" stroke="#fff" strokeWidth="2" fill="none" /><path d="M20 14v6l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: 'Long-Term Career Growth',
    desc: "We measure success by the careers we help build, not just the courses we sell.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><path d="M9 28l7-9 6 5 9-13" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M25 11h6v6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

const whatWeDo = [
  {
    title: 'Live Online Training',
    desc: 'Structured German language and professional training classes with regular practice, assessments and expert feedback.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC" /><path d="M13 16h14M13 20h10M13 24h12" stroke="#14B8DD" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: 'Career Roadmap & Ethical Recruitment',
    desc: 'A clear path forward, with guidance on recruitment that\u2019s ethical and above board — no shortcuts, no exploitation.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC" /><path d="M12 24l5-9 4 5 7-10" stroke="#14B8DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
    ),
  },
  {
    title: 'Documentation & Relocation Guidance',
    desc: 'Support navigating visa paperwork and relocation steps, so the process is understood, not just outsourced.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC" /><rect x="13" y="12" width="14" height="17" rx="2" stroke="#14B8DD" strokeWidth="1.8" fill="none" /><path d="M16 18h8M16 22h8M16 26h5" stroke="#14B8DD" strokeWidth="1.4" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: 'Progress Tracking & Support',
    desc: 'A built-in support system with FAQs, help resources, and visibility into exactly how far you\u2019ve come.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC" /><path d="M20 12v8l6 4" stroke="#14B8DD" strokeWidth="2" strokeLinecap="round" fill="none" /><circle cx="20" cy="20" r="9" stroke="#14B8DD" strokeWidth="1.8" fill="none" /></svg>
    ),
  },
];

const testbookMilestones = [
  { year: '2014', text: 'Founded by IIT Bombay & IIT Delhi alumni, starting with mock tests for government exam aspirants.' },
  { year: '2017', text: 'Crossed 25 lakh registered students and 80 lakh tests attempted on the platform.' },
  { year: '2018', text: 'Launched live courses; app installs crossed 6 million within months.' },
  { year: '2026', text: 'One of India\u2019s leading exam-prep platforms — now extending that same rigour to global nursing careers.' },
];

const trustNumbers = [
  { value: 1000, suffix: '+', label: 'Nurses placed' },
  { value: 95, suffix: '%', label: 'Visa success rate' },
  { value: 40, suffix: '+', label: 'Partner hospitals' },
];

const certifications = ['NSDC Aligned Training', 'Goethe-recognised Partners', 'Visa & Immigration Compliant', 'Testbook Group Company'];

export default function About() {
  return (
    <>
      <section className="page-hero about-hero">
        <GermanyBackdrop />
        <div className="container about-hero-inner">
          <div>
            <Reveal><span className="eyebrow">About us</span></Reveal>
            <Reveal delay={0.06}>
              <h1 className="page-hero-title about-hero-title">Trusted training for global careers</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="page-hero-sub">
                Global Careers by Testbook focuses on structured learning, transparency, and long-term
                career growth — helping Indian nurses build real careers in Germany, the honest way.
              </p>
            </Reveal>
          </div>
          <motion.div
            className="about-hero-photo-wrap"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <DecoratedPhoto src={nursePortrait} alt="Nurse trained through Global Careers by Testbook" />
          </motion.div>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="container">
          <Reveal>
            <p className="about-manifesto-text">
              We started Global Careers because skilled nurses deserved <em>better</em> than what
              was on offer — better training, better honesty, and a real shot at a better life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="pillar-grid">
            {pillars.map((p, i) => (
              <Reveal delay={0.08 * i} key={p.title} className="pillar-card">
                <span className="pillar-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-honesty">
        <div className="container about-honesty-inner">
          <Reveal>
            <h2>We won't promise what we can't deliver</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              We don't guarantee jobs or visas, and we don't act as a recruitment agent. What we do
              is train you properly, guide you honestly through documentation and relocation, and stay
              transparent about timelines and outcomes — every step of the way.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What we actually do</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Beyond promises, here's the platform</h2></Reveal>

          <div className="value-360-grid about-dowhat-grid">
            {whatWeDo.map((it, i) => (
              <Reveal delay={0.06 * i} key={it.title} className="value-360-card">
                <span className="value-360-icon">{it.icon}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-testbook">
        <div className="container about-testbook-grid">
          <div>
            <Reveal><span className="eyebrow">The parent company</span></Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title">Built on Testbook's decade in exam prep</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="about-testbook-intro">
                Before Global Careers existed, Testbook spent over a decade helping lakhs of Indian students
                crack competitive exams — building the same trust we now bring to a Germany nursing career.
              </p>
            </Reveal>

            <div className="testbook-milestones">
              {testbookMilestones.map((m, i) => (
                <Reveal delay={0.1 + i * 0.06} key={m.year} className="testbook-milestone">
                  <span className="testbook-year mono">{m.year}</span>
                  <p>{m.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="about-growth-graph about-testbook-graph">
            <GrowthGraph value={15} label="Growth in nurse placements, year on year" />
          </Reveal>
        </div>
      </section>

      <section className="section about-trust">
        <div className="container">
          <Reveal><span className="eyebrow">Trust & credibility</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Authority that's earned, not claimed</h2></Reveal>

          <Reveal delay={0.1}>
            <div className="why-badge-grid about-numbers-grid">
              {trustNumbers.map((b) => (
                <div className="why-badge about-number" key={b.label}>
                  <strong className="mono"><Counter to={b.value} suffix={b.suffix} /></strong>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="cert-row">
              {certifications.map((c) => (
                <span className="cert-chip" key={c}>{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
