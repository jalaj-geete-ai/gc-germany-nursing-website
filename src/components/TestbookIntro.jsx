import Reveal from './Reveal';
import logo from '../assets/brand/logo.jpg';

const points = [
  { value: '2014', label: 'Founded by IIT Bombay & IIT Delhi alumni' },
  { value: '1.8Cr+', label: 'Students trust the Testbook platform' },
  { value: '900+', label: 'Government & competitive exams covered' },
];

export default function TestbookIntro() {
  return (
    <section className="section testbook-intro">
      <div className="container testbook-intro-grid">
        <Reveal className="testbook-intro-logo-wrap">
          <img src={logo} alt="Testbook" className="testbook-intro-logo" />
        </Reveal>

        <div className="testbook-intro-content">
          <Reveal><span className="eyebrow">A new vertical from Testbook</span></Reveal>
          <Reveal delay={0.06}>
            <h2 className="section-title testbook-intro-title">Backed by India's trusted exam-prep platform</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="testbook-intro-points">
              {points.map((p) => (
                <div className="testbook-intro-point" key={p.label}>
                  <strong className="mono">{p.value}</strong>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
