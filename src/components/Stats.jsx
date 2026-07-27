import { motion } from 'framer-motion';
import Reveal from './Reveal';
import Icon from './Icon';

const stats = [
  { value: '100%',            sub: 'End-to-End Guidance',          icon: 'target' },
  { value: 'A1 → B2',        sub: 'German Language Support',       icon: null, flag: true },
  { value: 'India → Germany', sub: 'Complete Migration Assistance', icon: 'plane' },
];

function GermanFlag() {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" style={{ borderRadius: 3, display: 'block' }}>
      <rect width="36" height="8" fill="#000" />
      <rect y="8" width="36" height="8" fill="#D00" />
      <rect y="16" width="36" height="8" fill="#FFCE00" />
    </svg>
  );
}

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
              <span className="stat-icon">
                {s.flag ? <GermanFlag /> : <Icon name={s.icon} size={30} />}
              </span>
              <h3 className="stat-value mono">{s.value}</h3>
              <p className="stat-label">{s.sub}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
