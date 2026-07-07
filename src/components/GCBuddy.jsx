import Reveal from './Reveal';
import { useLeadForm } from './LeadFormContext';

const features = [
  { num: '01', title: 'Smart Level Detection', desc: 'A placement test identifies your German level (A1–B2) for a personalised starting point.' },
  { num: '02', title: 'Structured Curriculum', desc: '20 topics across A1–B2, with AI-powered lessons, examples and mini exercises — learn any topic, anytime.' },
  { num: '03', title: 'Daily Practice Engine', desc: '500+ nursing-focused MCQs with instant feedback, tracking your best score and consistency.' },
  { num: '04', title: 'Vocabulary & Flashcards', desc: 'German–English–Hindi flashcards with audio pronunciation, built around real hospital scenarios.' },
  { num: '05', title: 'Real-World Listening', desc: '50+ nursing phrases per level in native German audio, at normal and slow speed.' },
  { num: '06', title: 'Mock Interview Simulation', desc: 'Practice hospital interviews and Ausländerbehörde scenarios with voice recording and AI-scored feedback.' },
];

export default function GCBuddy() {
  const { open } = useLeadForm();
  return (
    <section className="section gc-buddy">
      <div className="container">
        <Reveal><span className="eyebrow">Technology</span></Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title">GC Buddy — your AI-powered Germany preparation platform</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="gc-buddy-intro">
            Built by Global Careers × Testbook specifically for Indian nurses — no downloads, no subscriptions.
            Log in from any browser and pick up exactly where you left off.
          </p>
        </Reveal>

        <div className="gc-buddy-grid">
          {features.map((f, i) => (
            <Reveal delay={0.06 * i} key={f.title} className="gc-buddy-card">
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

        <Reveal delay={0.12}>
          <div className="gc-buddy-cta-row">
            <button className="btn btn-primary" onClick={() => open('gc-buddy')}>Get Access to GC Buddy</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
