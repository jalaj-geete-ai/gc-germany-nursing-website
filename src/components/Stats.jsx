import Reveal from './Reveal';

const stats = [
  { value: '100%',           sub: 'End-to-End Guidance' },
  { value: 'A1 → B2',       sub: 'German Language Support' },
  { value: 'India → Germany', sub: 'Complete Migration Assistance' },
];

export default function Stats() {
  return (
    <section className="section stats">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal delay={0.1 * i} key={s.sub} className="stat-block">
            <h3 className="stat-value mono">{s.value}</h3>
            <div className="stat-divider" />
            <p className="stat-label">{s.sub}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
