import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import GrowthGraph from '../components/GrowthGraph';
import GermanyBackdrop from '../components/GermanyBackdrop';
import Counter from '../components/Counter';

const pillars = [
  {
    title: 'Structured Learning',
    desc: 'A defined curriculum and roadmap — not random videos and hope. Every learner knows what to study, when, and why.',
    icon: '📚',
  },
  {
    title: 'Transparency',
    desc: 'Clear terms, visible progress, and honest guidance at every step. No hidden costs, no vague promises.',
    icon: '🔍',
  },
  {
    title: 'Long-Term Career Growth',
    desc: "We measure success by the careers we help build, not just the courses we sell.",
    icon: '📈',
  },
];

const whatWeDo = [
  {
    title: 'Live Online Training',
    desc: 'Structured German language and professional training classes with regular practice, assessments and expert feedback.',
    icon: '🖥️',
  },
  {
    title: 'Career Roadmap & Ethical Recruitment',
    desc: "A clear path forward, with guidance on recruitment that's ethical and above board — no shortcuts, no exploitation.",
    icon: '🗺️',
  },
  {
    title: 'Documentation & Relocation Guidance',
    desc: 'Support navigating visa paperwork and relocation steps, so the process is understood, not just outsourced.',
    icon: '📄',
  },
  {
    title: 'Progress Tracking & Support',
    desc: "A built-in support system with FAQs, help resources, and visibility into exactly how far you've come.",
    icon: '📊',
  },
];

const testbookMilestones = [
  { year: '2014', text: 'Founded by IIT Bombay & IIT Delhi alumni, starting with mock tests for government exam aspirants.' },
  { year: '2017', text: 'Crossed 25 lakh registered students and 80 lakh tests attempted on the platform.' },
  { year: '2018', text: 'Launched live courses; app installs crossed 6 million within months.' },
  { year: '2026', text: 'One of India\'s leading exam-prep platforms — now extending that same rigour to global nursing careers.' },
];

// Updated trust numbers
const trustNumbers = [
  { value: 500,  suffix: '+', label: 'Nurses Enrolled',        icon: '👩‍⚕️', color: '#14B8DD' },
  { value: 300,  suffix: '+', label: 'Visa Approvals',         icon: '🛂', color: '#22c55e' },
  { value: 300,  suffix: '+', label: 'Successful Placements',  icon: '🏥', color: '#f59e0b' },
  { value: 95,   suffix: '%', label: 'Visa Success Rate',      icon: '✅', color: '#8b5cf6' },
  { value: 40,   suffix: '+', label: 'Partner Hospitals',      icon: '🤝', color: '#ec4899' },
];

const certifications = ['NSDC Aligned Training', 'Goethe-recognised Partners', 'Visa & Immigration Compliant', 'Testbook Group Company'];

export default function About() {
  return (
    <>
      {/* Hero — no nurse photo */}
      <section className="page-hero about-hero">
        <GermanyBackdrop />
        <div className="container about-hero-solo">
          <Reveal><span className="eyebrow">About us</span></Reveal>
          <Reveal delay={0.06}>
            <h1 className="page-hero-title about-hero-title">Trusted training for global careers</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="page-hero-sub about-hero-sub">
              Global Careers by Testbook focuses on structured learning, transparency, and long-term
              career growth — helping Indian nurses build real careers in Germany, the honest way.
            </p>
          </Reveal>
          {/* Inline stat chips in hero */}
          <Reveal delay={0.18}>
            <div className="about-hero-chips">
              <span className="about-hero-chip">500+ Nurses Enrolled</span>
              <span className="about-hero-chip">300+ Visa Approvals</span>
              <span className="about-hero-chip">300+ Successful Placements</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto */}
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

      {/* Pillars */}
      <section className="section about-pillars-section">
        <div className="container">
          <Reveal><span className="eyebrow">Our principles</span></Reveal>
          <Reveal delay={0.04}><h2 className="section-title">What drives everything we do</h2></Reveal>
          <div className="about-pillars-grid">
            {pillars.map((p, i) => (
              <Reveal delay={0.08 * i} key={p.title} className="about-pillar-card">
                <span className="about-pillar-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty banner */}
      <section className="about-honesty">
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

      {/* What we do */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What we actually do</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Beyond promises, here's the platform</h2></Reveal>
          <div className="about-dowhat-grid">
            {whatWeDo.map((it, i) => (
              <Reveal delay={0.06 * i} key={it.title} className="about-dowhat-card">
                <span className="about-dowhat-icon">{it.icon}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testbook timeline */}
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

      {/* Trust & credibility — updated numbers, attractive layout */}
      <section className="section about-trust">
        <div className="container">
          <Reveal><span className="eyebrow">Trust &amp; credibility</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Authority that's earned, not claimed</h2></Reveal>

          <Reveal delay={0.1}>
            <div className="about-trust-grid">
              {trustNumbers.map((b, i) => (
                <motion.div
                  key={b.label}
                  className="about-trust-card"
                  style={{ '--card-color': b.color }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <span className="about-trust-icon">{b.icon}</span>
                  <strong className="about-trust-value mono">
                    <Counter to={b.value} suffix={b.suffix} />
                  </strong>
                  <span className="about-trust-label">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
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
