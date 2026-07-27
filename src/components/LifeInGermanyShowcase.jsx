import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Icon from './Icon';

const cards = [
  { tag: 'Salary', value: 'From €2,800/month', desc: 'Earn from €2,800/month (≈ ₹2.66 Lakh) as a registered nurse in Germany — rising with recognition and experience.', icon: 'salary' },
  { tag: 'Work-Life Balance', value: '38–40 hrs/week', desc: 'Regulated shifts, overtime pay, and 20–30 days of paid leave.', icon: 'clock' },
  { tag: 'Family Visa', value: '6–12 months', desc: 'Bring your family over through the Family Reunification Visa.', icon: 'family' },
  { tag: 'PR Pathway', value: '21–33 months', desc: 'Secure Permanent Residency, faster with strong German skills.', icon: 'shieldCheck' },
  { tag: 'Healthcare Benefits', value: 'Fully covered', desc: 'Free/subsidised healthcare, pension, and parental leave.', icon: 'health' },
  { tag: 'Career Growth', value: '200+ courses', desc: 'Tuition-free specialisation courses to advance your career.', icon: 'trend' },
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
              <span className="life-showcase-icon"><Icon name={c.icon} size={26} /></span>
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
