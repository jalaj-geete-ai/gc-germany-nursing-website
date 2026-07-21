import { motion } from 'framer-motion';
import Reveal from './Reveal';

const stats = [
  { value: '100%',            sub: 'End-to-End Guidance',          icon: '🎯' },
  { value: 'A1 → B2',        sub: 'German Language Support',       icon: '🇩🇪' },
  { value: 'India → Germany', sub: 'Complete Migration Assistance', icon: '✈️' },
];

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal delay={0.12 * i} key={s.sub} className="stat-block-wrap">
            <motion.div
              className="stat-block"
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <motion.span
                className="stat-icon"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {s.icon}
              </motion.span>
              <h3 className="stat-value mono">{s.value}</h3>
              <p className="stat-label">{s.sub}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
