import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import { useLeadForm } from '../components/LeadFormContext';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];

const curriculum = [
  { level: 'A1', color: '#22c55e', topics: ['Phonetics & Basics', 'Greetings & Introductions', 'Numbers & Time', 'Hospital Vocabulary I', 'Patient Communication I'] },
  { level: 'A2', color: '#3b82f6', topics: ['Daily Routines', 'Medical Procedures', 'Body Parts & Symptoms', 'Directions & Navigation', 'Patient History Taking'] },
  { level: 'B1', color: '#f59e0b', topics: ['Medication & Dosage', 'Emergency Communication', 'Team Coordination', 'Documentation', 'Cultural Sensitivity'] },
  { level: 'B2', color: '#8b5cf6', topics: ['Advanced Medical Terminology', 'Hospital Hierarchy', 'Interview Preparation', 'Ausländerbehörde Scenarios', 'Professional Reports'] },
];

const quickActions = [
  { icon: '💪', label: 'Exercises', desc: '500+ MCQs' },
  { icon: '📖', label: 'Vocabulary', desc: 'Flashcards' },
  { icon: '🎧', label: 'Listening', desc: '50+ audio clips' },
  { icon: '🎤', label: 'Mock Interview', desc: 'AI-scored' },
];

const features = [
  { icon: '🧠', title: 'Smart Level Detection', desc: 'Placement test identifies your exact German level (A1–B2) for a personalised starting point — no guessing.' },
  { icon: '📚', title: 'Structured Curriculum', desc: '20 topics across A1–B2, built around real hospital vocabulary. Learn at your pace, anytime.' },
  { icon: '🔥', title: 'Daily Practice Engine', desc: '500+ nursing-focused MCQs with instant feedback. Build streaks, track your best score.' },
  { icon: '🃏', title: 'Vocabulary & Flashcards', desc: 'German–English–Hindi flashcards with audio pronunciation, mapped to hospital scenarios.' },
  { icon: '🎧', title: 'Real-World Listening', desc: '50+ nursing phrases per level in native German audio, at normal and slow speed.' },
  { icon: '🎤', title: 'Mock Interview Simulation', desc: 'Practice hospital interviews with voice recording and AI-scored feedback.' },
  { icon: '📊', title: 'Progress Dashboard', desc: 'Track your level, streak, completed topics and daily recommendations in one place.' },
  { icon: '🤖', title: 'Ask GC Buddy (AI)', desc: 'Get answers in Hindi, English or German — any time, any topic, instantly.' },
];

const stats = [
  { value: '500+', label: 'Practice MCQs' },
  { value: '20', label: 'Structured topics' },
  { value: 'A1–B2', label: 'Full coverage' },
  { value: '3', label: 'Languages supported' },
];

// Simulated chat messages for the GC Buddy demo
const chatMessages = [
  { from: 'lena', text: 'Hallo! 👋 I\'m Lena, your GC Buddy. What would you like to practice today?' },
  { from: 'user', text: 'I want to learn how to greet a patient in German.' },
  { from: 'lena', text: 'Great choice! Start with: "Guten Morgen, wie geht es Ihnen?" — Good morning, how are you?\n\nFor formal settings like a hospital, always use "Ihnen" (formal you), not "dir".' },
  { from: 'user', text: 'How do I ask about pain level?' },
  { from: 'lena', text: '🩺 Say: "Wie stark sind Ihre Schmerzen auf einer Skala von 1 bis 10?"\n\nMeaning: "How strong is your pain on a scale of 1 to 10?" — You\'ll use this every day on the ward.' },
];

function DashboardMockup() {
  const [activeLevel, setActiveLevel] = useState('A1');
  const [chatOpen, setChatOpen] = useState(false);
  const activeCurr = curriculum.find(c => c.level === activeLevel);

  return (
    <div className="gcb-dashboard">
      {/* Sidebar */}
      <aside className="gcb-sidebar">
        <div className="gcb-sidebar-brand">
          <span className="gcb-de-badge">DE</span>
          <div>
            <strong>GC Buddy</strong>
            <span>by Global Careers × Testbook</span>
          </div>
        </div>
        <nav className="gcb-sidenav">
          {['🏠 Home','📘 Curriculum','🎓 Learn Hub','🎧 Listening','💼 Interview','📝 Daily Test','📊 Performance','🤖 GC Buddy','🎬 Media','🎁 Refer'].map((item, i) => (
            <button key={i} className={`gcb-sidenav-item ${i === 0 ? 'active' : ''}`}>{item}</button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="gcb-main">
        {/* Welcome banner */}
        <div className="gcb-welcome-banner">
          <div>
            <p className="gcb-welcome-sub">Welcome back,</p>
            <h3 className="gcb-welcome-name">Priya 👋</h3>
            <p className="gcb-level-line">Level <strong>A1</strong> · 4/20 topics · 🔥 3</p>
            <div className="gcb-progress-bar"><div className="gcb-progress-fill" style={{ width: '20%' }} /></div>
          </div>
          <button className="gcb-ask-btn">🤖 Ask GC Buddy</button>
        </div>

        {/* Stats row */}
        <div className="gcb-stats-row">
          <div className="gcb-stat-card"><span className="gcb-stat-val">3 🔥</span><span>Streak</span></div>
          <div className="gcb-stat-card"><span className="gcb-stat-val">4/20</span><span>Topics</span></div>
          <div className="gcb-stat-card"><span className="gcb-stat-val">72%</span><span>Avg Score</span></div>
        </div>

        {/* Up next */}
        <div className="gcb-section-label">⚡ UP NEXT</div>
        <div className="gcb-up-next">
          <div className="gcb-next-item">
            <span className="gcb-next-icon">abc</span>
            <div><strong>Phonetics & Basics</strong><p>Alphabet, Umlauts, pronunciation rules</p></div>
            <span className="gcb-arrow">→</span>
          </div>
          <div className="gcb-next-item">
            <span className="gcb-next-icon">👋</span>
            <div><strong>Greetings & Introductions</strong><p>Formal/informal greetings, saying your name</p></div>
            <span className="gcb-arrow">→</span>
          </div>
        </div>

        {/* Level selector + topics */}
        <div className="gcb-section-label">📘 CURRICULUM</div>
        <div className="gcb-level-tabs">
          {LEVELS.map(l => (
            <button key={l} className={`gcb-level-tab ${activeLevel === l ? 'active' : ''}`}
              style={activeLevel === l ? { borderColor: activeCurr.color, color: activeCurr.color } : {}}
              onClick={() => setActiveLevel(l)}>{l}</button>
          ))}
        </div>
        <div className="gcb-topics-grid">
          {activeCurr.topics.map((t, i) => (
            <div key={i} className="gcb-topic-chip" style={{ borderLeft: `3px solid ${activeCurr.color}` }}>
              <span>{t}</span>
              {i < 1 && <span className="gcb-done-badge">✓</span>}
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="gcb-section-label">⚡ QUICK ACTIONS</div>
        <div className="gcb-actions-grid">
          {quickActions.map((a) => (
            <div key={a.label} className="gcb-action-card">
              <span className="gcb-action-icon">{a.icon}</span>
              <strong>{a.label}</strong>
              <span>{a.desc}</span>
            </div>
          ))}
        </div>
      </main>

      {/* GC Buddy Chat Panel */}
      <div className={`gcb-chat-panel ${chatOpen ? 'open' : ''}`}>
        <div className="gcb-chat-header" onClick={() => setChatOpen(v => !v)}>
          <span>🤖 Ask GC Buddy — Lena</span>
          <span>{chatOpen ? '▼' : '▲'}</span>
        </div>
        <AnimatePresence>
          {chatOpen && (
            <motion.div className="gcb-chat-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 280, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <div className="gcb-messages">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`gcb-msg ${m.from}`}>
                    {m.from === 'lena' && <span className="gcb-lena-dot">L</span>}
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="gcb-chat-input-row">
                <input type="text" placeholder="Ask in Hindi, English or German..." readOnly />
                <button>Send</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function GCBuddyPage() {
  const { open } = useLeadForm();

  return (
    <>
      {/* Hero */}
      <section className="gcb-hero">
        <div className="gcb-hero-bg" />
        <div className="container gcb-hero-inner">
          <Reveal>
            <span className="eyebrow eyebrow-light">GC Buddy — Powered by AI</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="gcb-hero-title">Your personal Germany prep platform. Always on.</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="gcb-hero-sub">
              German language training + mock interviews + daily practice — all built for Indian nurses. No downloads. Starts at A1, takes you to B2.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="gcb-hero-ctas">
              <button className="btn btn-primary" onClick={() => open('gc-buddy')}>Get Early Access →</button>
              <span className="gcb-hero-note">Free for enrolled students · Launches with next batch</span>
            </div>
          </Reveal>

          {/* Mini stat pills */}
          <Reveal delay={0.22}>
            <div className="gcb-hero-pills">
              {stats.map(s => (
                <div className="gcb-hero-pill" key={s.label}>
                  <strong>{s.value}</strong><span>{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Live Interface Preview */}
      <section className="section gcb-preview-section">
        <div className="container">
          <Reveal><span className="eyebrow">Live preview</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">See what your dashboard looks like</h2></Reveal>
          <Reveal delay={0.1}><p className="gcb-preview-sub">This is the actual GC Buddy interface — interactive, real-time, and built specifically for nurses preparing for Germany.</p></Reveal>

          <Reveal delay={0.14}>
            <div className="gcb-preview-frame">
              <div className="gcb-preview-bar">
                <span /><span /><span />
                <span className="gcb-preview-url">gcbuddy.testbook.com</span>
              </div>
              <DashboardMockup />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features grid */}
      <section className="section gcb-features-section">
        <div className="container">
          <Reveal><span className="eyebrow">What's inside</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Everything you need to go from zero to job-ready</h2></Reveal>
          <div className="gcb-features-grid">
            {features.map((f, i) => (
              <Reveal delay={0.05 * i} key={f.title} className="gcb-feature-card">
                <span className="gcb-feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lena + Refer strip */}
      <section className="section gcb-lena-section">
        <div className="container gcb-lena-grid">
          <Reveal className="gcb-lena-card">
            <span className="gcb-lena-avatar">🤖</span>
            <div>
              <span className="eyebrow">AI Mentor</span>
              <h3>Meet Lena</h3>
              <p>Your personal AI mentor — tracks your progress, recommends a daily study plan, and answers questions in Hindi, English or German, any time you need help.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="gcb-refer-card">
            <span className="gcb-refer-icon">🎁</span>
            <div>
              <span className="eyebrow">Refer & Earn</span>
              <h3>₹5,000 per successful referral</h3>
              <p>Top performers can earn rewards including a MacBook Air for helping other nurses get started on their Germany journey.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
