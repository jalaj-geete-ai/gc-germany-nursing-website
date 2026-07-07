import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const cards = [
  { tag: 'Salary', value: '₹2.5–4 Lakh/month', desc: 'Earn €2,600–3,500/month as a registered nurse in Germany.', icon: '€' },
  { tag: 'Work-Life Balance', value: '38–40 hrs/week', desc: 'Regulated shifts, overtime pay, and 20–30 days of paid leave.', icon: '⏱' },
  { tag: 'Family Visa', value: '6–12 months', desc: 'Bring your family over through the Family Reunification Visa.', icon: '⚭' },
  { tag: 'PR Pathway', value: '21–33 months', desc: 'Secure Permanent Residency, faster with strong German skills.', icon: '✓' },
  { tag: 'Healthcare Benefits', value: 'Fully covered', desc: 'Free/subsidised healthcare, pension, and parental leave.', icon: '+' },
  { tag: 'Career Growth', value: '200+ courses', desc: 'Tuition-free specialisation courses to advance your career.', icon: '↗' },
];

export default function LifeInGermanyShowcase() {
  return (
    <section className="section life-showcase">
      <div className="container">
        <Reveal>
          <h2 className="section-title">This is the life upgrade, not just the job</h2>
        </Reveal>

        <div className="life-showcase-grid">
          {cards.map((c, i) => (
            <Reveal delay={0.07 * i} key={c.tag} className="life-showcase-card">
              <span className="life-showcase-icon">{c.icon}</span>
              <span className="life-showcase-tag">{c.tag}</span>
              <strong className="life-showcase-value">{c.value}</strong>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link to="/life-in-germany" className="life-showcase-link">See the full picture of life in Germany →</Link>
        </Reveal>
      </div>
    </section>
  );
}
