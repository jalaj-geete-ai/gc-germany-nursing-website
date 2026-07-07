import { motion } from 'framer-motion';
import Reveal from './Reveal';
import nursePortrait from '../assets/brand/nurse-portrait.jpg';

const steps = [
  { title: 'Assessment', desc: 'We evaluate your eligibility and guide you personally.' },
  { title: 'Learn & Prepare', desc: 'German language training and nursing adaptation support.' },
  { title: 'Documentation', desc: 'We help you with documentation and registration.' },
  { title: 'Job Placement', desc: 'Get placed in reputed hospitals and care facilities in Germany.' },
  { title: 'Visa & Processing', desc: 'Complete visa support and preparation for your new journey.' },
  { title: 'Fly to Germany', desc: 'Begin your career and a better life in Germany.' },
];

const badges = [
  { title: 'Expert Guidance', desc: 'Every step, by nursing experts.' },
  { title: '100% Transparent', desc: 'Clear process. No hidden charges.' },
  { title: 'End-to-End Support', desc: 'From learning to landing & beyond.' },
  { title: 'Career & Life Growth', desc: 'Better opportunities. Better future.' },
];

export default function OneStopApproach() {
  return (
    <section className="section one-stop">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Your pathway to a Germany nursing career</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="map-intro-text">We guide you every step of the way — from dreams to destination.</p>
        </Reveal>

        <div className="pathway-panel">
          <div className="pathway-photo-col">
            <img src={nursePortrait} alt="Nurse on her way to a Germany nursing career" className="pathway-photo" />
          </div>

          <div className="pathway-steps-col">
            <div className="pathway-steps-line" />
            <div className="pathway-steps-grid">
              {steps.map((s, i) => (
                <motion.div
                  className="pathway-step"
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                >
                  <span className="pathway-step-num mono">{i + 1}</span>
                  <strong>{s.title}</strong>
                  <p>{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="pathway-badge-row">
          {badges.map((b) => (
            <div className="pathway-badge" key={b.title}>
              <strong>{b.title}</strong>
              <span>{b.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
