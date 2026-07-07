import Reveal from './Reveal';
import { images } from '../assets/images';

const items = [
  { num: '01', title: 'German training, zero to B2', desc: "Don't know German? No problem — we train you from scratch with medical vocabulary built in." },
  { num: '02', title: 'Direct hospital interviews', desc: 'Verified German hospitals interview you directly — no middlemen, no fake agents.' },
  { num: '03', title: 'Visa, fully handled', desc: 'Document prep, translation & visa filing — done end-to-end by our team.' },
  { num: '04', title: 'Support till you land', desc: 'From your first call to your first day on the ward in Germany.' },
];

const badges = [
  { value: '1,000+', label: 'Nurses placed' },
  { value: '95%', label: 'Visa success rate' },
  { value: '40+', label: 'Partner hospitals' },
  { value: '₹300Cr+', label: 'Salary generated' },
];

export default function WhyUs() {
  return (
    <section className="section why-us">
      <div className="container why-layout">
        <Reveal className="why-trust-col">
          <div className="why-trust-card">
            <span className="eyebrow why-trust-eyebrow">Why trust us</span>
            <h3>Authority that's earned, not claimed</h3>
            <div className="why-badge-grid">
              {badges.map((b) => (
                <div className="why-badge" key={b.label}>
                  <strong className="mono">{b.value}</strong>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
            <p className="why-trust-note">RAL-aligned fair recruitment · NSDC-aligned training · Goethe-recognised partners</p>
            <div className="why-trust-photos">
              <img src={images.trust1} alt="Nurse placed through Global Careers" />
              <img src={images.trust2} alt="Nurse placed through Global Careers" />
              <span>Real nurses. Real placements.</span>
            </div>
          </div>
        </Reveal>

        <div className="why-content-col">
          <Reveal><span className="eyebrow">Why us</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">One partner, the whole way</h2></Reveal>

          <div className="why-grid">
            {items.map((it, i) => (
              <Reveal delay={0.08 * i} key={it.title} className="why-card">
                <span className="why-icon mono">{it.num}</span>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
