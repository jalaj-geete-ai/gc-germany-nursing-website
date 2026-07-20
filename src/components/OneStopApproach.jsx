import { motion } from 'framer-motion';
import Reveal from './Reveal';

const steps = [
  { icon: '📋', label: 'Assessment',      color: '#3b82f6' },
  { icon: '🇩🇪', label: 'German Language', color: '#3b82f6' },
  { icon: '📄', label: 'Documentation',   color: '#3b82f6' },
  { icon: '💼', label: 'Job Placement',   color: '#3b82f6' },
  { icon: '🛂', label: 'Visa Processing', color: '#3b82f6' },
];

const cards = [
  { n: 1, icon: '📋', title: 'Assessment',        desc: 'We evaluate your eligibility and guide you personally.' },
  { n: 2, icon: '📖', title: 'Learn & Prepare',   desc: 'German language training and nursing adaptation support.' },
  { n: 3, icon: '📁', title: 'Documentation',      desc: 'We help you with documentation and registration.' },
  { n: 4, icon: '👥', title: 'Job Placement',      desc: 'Get placed in reputed hospitals and care facilities in Germany.' },
  { n: 5, icon: '✈️', title: 'Visa & Processing',  desc: 'Complete visa support and preparation for your new journey.' },
  { n: 6, icon: '🏥', title: 'Fly to Germany',     desc: 'Begin your career and a better life in Germany.' },
];

export default function OneStopApproach() {
  return (
    <section className="section pathway-section">
      <div className="container">
        <div className="pathway-layout">

          {/* ── LEFT: India → steps → Germany journey ── */}
          <Reveal className="pathway-journey">
            {/* India pin */}
            <div className="pathway-country pathway-country-india">
              <div className="pathway-country-flag">🇮🇳</div>
              <strong>INDIA</strong>
              <div className="pathway-country-landmark">🕌</div>
            </div>

            {/* Step spine */}
            <div className="pathway-spine">
              {steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="pathway-spine-step"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <div className="pathway-spine-dot">
                    <span>{s.icon}</span>
                  </div>
                  {i < steps.length - 1 && <div className="pathway-spine-line" />}
                  <span className="pathway-spine-label">{s.label}</span>
                </motion.div>
              ))}

              {/* Plane animation */}
              <motion.div
                className="pathway-plane"
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 30 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeInOut' }}
              >✈️</motion.div>
            </div>

            {/* Germany pin */}
            <div className="pathway-country pathway-country-germany">
              <div className="pathway-country-flag">🇩🇪</div>
              <strong>GERMANY</strong>
              <div className="pathway-hospital-chip">🏥 Hospital</div>
            </div>
          </Reveal>

          {/* ── RIGHT: Title + 6 step cards ── */}
          <div className="pathway-right">
            <Reveal>
              <h2 className="section-title pathway-title">Your pathway to a<br/>Germany nursing career</h2>
              <p className="pathway-subtitle">We guide you every step of the way — from dreams to destination.</p>
            </Reveal>

            <div className="pathway-cards-grid">
              {cards.map((c, i) => (
                <motion.div
                  key={c.n}
                  className="pathway-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i, duration: 0.45 }}
                >
                  <div className="pathway-card-num">{c.n}</div>
                  <div className="pathway-card-icon">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
