import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';
import CostCalculator from '../components/CostCalculator';
import LifeHeroAccordion from '../components/LifeHeroAccordion';
import ligSectionBg from '../assets/brand/lig-section-bg.jpg';
import costNurseHero from '../assets/brand/cost-nurse-hero.jpg';
import costLivingroom from '../assets/brand/cost-livingroom.jpg';
import costTram from '../assets/brand/cost-tram.jpg';
import costGroceries from '../assets/brand/cost-groceries.jpg';
import costRemit from '../assets/brand/cost-remit.jpg';

const overviewStats = [
  { value: '500K', label: 'Healthcare professionals Germany will need by 2030' },
  { value: '5M', label: 'People in Germany will need long-term care by 2035' },
  { value: '40%', label: 'Of German nurses are over 50 and retiring within 10–15 years' },
  { value: '60%', label: 'Of nurses report spending under 10 minutes per patient today' },
];

const culturalCards = [
  {
    title: "Germany's diverse, welcoming environment",
    desc: 'Home to 150+ nationalities, with established Indian and international communities easing the transition.',
    accent: '#14B8DD',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="14" cy="16" r="6" fill="#fff" fillOpacity="0.9" />
        <circle cx="26" cy="16" r="6" fill="#fff" fillOpacity="0.6" />
        <path d="M8 30c0-5 3-9 6-9s6 4 6 9M20 30c0-5 3-9 6-9s6 4 6 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Public transport, parks & recreation',
    desc: 'An efficient transport network plus abundant parks, museums and sports clubs for life outside work.',
    accent: '#3FAE6A',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="9" y="14" width="22" height="14" rx="3" stroke="#fff" strokeWidth="2" fill="none" />
        <circle cx="14" cy="29" r="2.2" fill="#fff" />
        <circle cx="26" cy="29" r="2.2" fill="#fff" />
        <path d="M9 19h22" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Festivals, food & social integration',
    desc: 'Diwali and Holi are widely celebrated, with easy access to Indian groceries and restaurants.',
    accent: '#FF7A33',
    icon: (
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M20 8c2 4 2 7 0 9-2-2-2-5 0-9z" fill="#fff" />
        <path d="M20 17v15M13 32h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 24c2-3 4-3 6 0M20 24c2-3 4-3 6 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
];

export default function LifeInGermany() {
  return (
    <>
      <LifeHeroAccordion />

      <section
        className="section lig-why-section"
        style={{ backgroundImage: `linear-gradient(100deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.93) 45%, rgba(228,248,252,0.85) 100%), url(${ligSectionBg})` }}
      >
        <div className="container">
          <Reveal><span className="eyebrow">Why Germany, why now</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">A critical shortage means opportunity for you</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="map-intro-text">
              Germany faces a critical shortage of nurses, with over 500,000 vacancies expected by 2030.
              That means strong job security, faster hiring, and competitive salaries for qualified nurses.
            </p>
          </Reveal>

          <div className="lig-stats-grid">
            {overviewStats.map((s, i) => (
              <Reveal delay={0.06 * i} key={s.label} className="lig-stat-card">
                <strong className="mono">{s.value}</strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section lig-cost">
        <div className="container lig-cost-grid">
          <Reveal className="lig-cost-photo-wrap">
            <img src={costNurseHero} alt="Nurse saving money while living in Germany" className="lig-cost-photo" />
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">Cost of living & savings potential</span>
              <h2 className="section-title">Save more than you think</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="map-intro-text">
                Despite a high standard of living, nurses can save up to 50% of their income — supporting
                both personal growth and family back home.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="cost-tile-row">
                <img src={costLivingroom} alt="Comfortable apartment living room in Germany" className="cost-tile cost-tile-wide" />
                <div className="cost-tile-text">
                  <strong>Rent for a single apartment is reasonable</strong>
                  <span className="mono">typically €500–800</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="cost-tile-row">
                <img src={costRemit} alt="Sending money back home to family in India" className="cost-tile cost-tile-wide" />
                <div className="cost-tile-text">
                  <strong>Send money back home every month</strong>
                  <span className="mono">€500–1,000 to support your family</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="cost-tile-row">
                <div className="cost-tile-pair">
                  <img src={costTram} alt="Efficient public transport in Germany" className="cost-tile" />
                  <img src={costGroceries} alt="Affordable groceries in Germany" className="cost-tile" />
                </div>
                <div className="cost-tile-text">
                  <strong>Transport & groceries stay affordable</strong>
                  <span className="mono">Efficient transit keeps daily costs low</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Calculate your living cost</span>
            <h2 className="section-title">What would you actually save?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <CostCalculator />
          </Reveal>
        </div>
      </section>

      <section className="section lig-benefits">
        <div className="container">
          <Reveal><span className="eyebrow">Cultural & social life</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Life outside the hospital</h2></Reveal>

          <div className="culture-grid">
            {culturalCards.map((p, i) => (
              <Reveal delay={0.06 * i} key={p.title} className="culture-card">
                <span className="culture-icon" style={{ background: p.accent }}>{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="culture-card-bar" style={{ background: p.accent }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
