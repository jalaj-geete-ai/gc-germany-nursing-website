import Reveal from './Reveal';
import testbookLogo from '../assets/brand/testbook-only.jpg';
import { images } from '../assets/images';

const points = [
  { value: '2014', label: 'Founded by IIT Bombay & IIT Delhi alumni' },
  { value: '1.8Cr+', label: 'Students trust the Testbook platform' },
  { value: '900+', label: 'Government & competitive exams covered' },
];

const hallOfFame = [
  { name: 'Samridhi Talwar', rank: 'AIR 1 | Delhi Judicial 2024', photo: images.hof1 },
  { name: 'Ashish Tiwari',   rank: 'AIR 2 | SSC CGL 2024',       photo: images.hof2 },
  { name: 'Debesh Bairagi',  rank: 'AIR 4 | SSC CGL 2024',       photo: images.hof3 },
  { name: 'Ishant Shukla',   rank: 'AIR 8 | SSC CGL 2024',       photo: images.hof4 },
];

export default function TestbookIntro() {
  return (
    <section className="section testbook-intro-v2">
      <div className="container">

        {/* Top: Testbook logo only + headline + stats */}
        <div className="tbi-header">
          <Reveal className="tbi-logo-wrap">
            <img src={testbookLogo} alt="Testbook" className="tbi-logo" />
          </Reveal>
          <div className="tbi-copy">
            <Reveal><span className="eyebrow">A new vertical from Testbook</span></Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title tbi-title">Backed by India's most trusted exam-prep platform</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="tbi-stats">
                {points.map((p) => (
                  <div className="tbi-stat" key={p.label}>
                    <strong className="mono">{p.value}</strong>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hall of Fame strip */}
        <Reveal delay={0.14}>
          <div className="tbi-hof">
            <p className="tbi-hof-label">
              <img src="https://cdn.testbook.com/resources/productionimages/Testbook_icon_1673619133.png"
                alt="Testbook" className="tbi-hof-tb-icon" />
              Testbook Wall of Fame — real students, real results
            </p>
            <div className="tbi-hof-cards">
              {hallOfFame.map((s) => (
                <div className="tbi-hof-card" key={s.name}>
                  <div className="tbi-hof-avatar-ring">
                    <img src={s.photo} alt={s.name} className="tbi-hof-avatar" />
                    <span className="tbi-hof-star">⭐</span>
                  </div>
                  <strong className="tbi-hof-name">{s.name}</strong>
                  <span className="tbi-hof-rank">{s.rank}</span>
                </div>
              ))}
            </div>

            {/* Support contact */}
            <div className="tbi-hof-contact">
              <span className="tbi-hof-contact-label">📞 Talk to a counsellor</span>
              <a href="tel:+918882604341" className="tbi-hof-phone">+91 88826 04341</a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
