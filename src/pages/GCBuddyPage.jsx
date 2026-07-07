import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import GermanyBackdrop from '../components/GermanyBackdrop';

const features = [
  { num: '01', title: 'Smart Level Detection', desc: 'A placement test identifies your German level (A1–B2) for a personalised starting point.' },
  { num: '02', title: 'Structured Curriculum', desc: '20 topics across A1–B2, with AI-powered lessons, examples and mini exercises — learn any topic, anytime.' },
  { num: '03', title: 'Daily Practice Engine', desc: '500+ nursing-focused MCQs with instant feedback, tracking your best score and consistency.' },
  { num: '04', title: 'Vocabulary & Flashcards', desc: 'German–English–Hindi flashcards with audio pronunciation, built around real hospital scenarios.' },
  { num: '05', title: 'Real-World Listening', desc: '50+ nursing phrases per level in native German audio, at normal and slow speed.' },
  { num: '06', title: 'Mock Interview Simulation', desc: 'Practice hospital interviews and Ausländerbehörde scenarios with voice recording and AI-scored feedback.' },
  { num: '07', title: 'Progress Dashboard', desc: 'Track your level, streak, completed topics and upcoming recommendations in one place.' },
];

export default function GCBuddyPage() {
  return (
    <>
      <section className="page-hero">
        <GermanyBackdrop />
        <div className="container">
          <Reveal><span className="eyebrow">GC Buddy</span></Reveal>
          <Reveal delay={0.06}>
            <h1 className="page-hero-title">Your AI-powered Germany preparation platform</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="page-hero-sub">
              Built by Global Careers × Testbook specifically for Indian nurses — no downloads, no subscriptions.
              Log in from any browser and pick up exactly where you left off.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="gc-page-cta-row">
              <button className="btn btn-primary" disabled>Launch GC Buddy — Coming Soon</button>
              <span className="gc-page-cta-note">Live access opens shortly — apply now to get notified first.</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What's inside</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Everything you need to go from zero to job-ready</h2></Reveal>

          <div className="gc-buddy-grid">
            {features.map((f, i) => (
              <Reveal delay={0.05 * i} key={f.title} className="gc-buddy-card">
                <span className="why-icon mono">{f.num}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="gc-buddy-highlight-row">
            <Reveal className="gc-buddy-mentor">
              <span className="eyebrow gc-buddy-mentor-eyebrow">AI Mentor</span>
              <h3>Meet Lena</h3>
              <p>
                Your personal AI mentor — tracks your progress, recommends a daily study plan, and answers
                questions in Hindi, English or German, any time you need it.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="gc-buddy-refer">
              <span className="eyebrow">Refer & Earn</span>
              <h3>₹5,000 per successful referral</h3>
              <p>Top performers can earn rewards like a MacBook Air for helping other nurses get started.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
