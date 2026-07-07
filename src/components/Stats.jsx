import Reveal from './Reveal';
import Counter from './Counter';

const stats = [
  { to: 1000, suffix: '+', label: 'Nurses placed in Germany' },
  { to: 300, prefix: '₹', suffix: ' Cr+', label: 'Salary generated for nurses' },
  { to: 95, suffix: '%', label: 'Visa success rate' },
];

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal delay={0.1 * i} key={s.label} className="stat-block">
            <h3 className="stat-value mono">
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </h3>
            <p className="stat-label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
