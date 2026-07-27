import Reveal from './Reveal';
import testbookLogo from '../assets/brand/testbook-logo-official.png';

const points = [
  { value: '2014', label: 'Founded by IIT Bombay & IIT Delhi alumni' },
  { value: '1.8Cr+', label: 'Students trust the Testbook platform' },
  { value: '900+', label: 'Government & competitive exams covered' },
];

export default function TestbookIntro() {
  return (
    <section className="section testbook-intro-v2">
      <div className="container">
        {/* Testbook logo + headline + stats */}
        <div className="tbi-header">
          <Reveal className="tbi-logo-wrap">
            <img src={testbookLogo} alt="Testbook" className="tbi-logo-official" loading="lazy" decoding="async" />
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
      </div>
    </section>
  );
}
