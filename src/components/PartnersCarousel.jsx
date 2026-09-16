import { useState } from 'react';
import testbookLogo from '../assets/brand/testbook-logo-official.png';

/*
 * NSDC / Skill India certified-partner strip.
 *
 * Auto-rotating infinite marquee (pauses on hover, resumes automatically,
 * loops continuously, works on desktop + mobile). See hero-2026.css.
 *
 * LOGOS: NSDC and Skill India use their official marks from Wikimedia Commons
 * (loaded at runtime by the live site). If a logo URL ever fails to load, the
 * tile automatically falls back to a neutral wordmark so it never shows a
 * broken image. To self-host instead, drop the official files into
 * src/assets/brand/partners/, import them, and set `img` to the import.
 */
const PARTNERS = [
  {
    name: 'NSDC', sub: 'National Skill Dev. Corp.', mark: 'N',
    grad: 'linear-gradient(135deg,#0A7DA0,#14B8DD)',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/NSDC_Logo.svg',
  },
  {
    name: 'Skill India', sub: 'कौशल भारत', mark: 'SI',
    grad: 'linear-gradient(135deg,#FF7A33,#E8590C)',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skill_India_Logo.jpg',
  },
  { name: 'Testbook', sub: 'Trusted by 1.8Cr+ learners', img: testbookLogo },
  {
    name: 'Skill India', sub: 'Certified Training Partner', mark: 'SI',
    grad: 'linear-gradient(135deg,#FF7A33,#E8590C)',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Skill_India_Logo.jpg',
  },
  {
    name: 'NSDC', sub: 'Re-imagine Future', mark: 'N',
    grad: 'linear-gradient(135deg,#0A7DA0,#14B8DD)',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/NSDC_Logo.svg',
  },
];

function PartnerTile({ p }) {
  const [broken, setBroken] = useState(false);
  const showImg = p.img && !broken;
  return (
    <div className="gc-partner">
      {showImg ? (
        <img src={p.img} alt={p.name} onError={() => setBroken(true)} loading="lazy" />
      ) : (
        <>
          <span className="gc-partner-mark" style={{ background: p.grad }}>{p.mark}</span>
          <span className="gc-partner-wm">
            <b>{p.name}</b>
            <span>{p.sub}</span>
          </span>
        </>
      )}
    </div>
  );
}

export default function PartnersCarousel() {
  // Repeat the base list so a single half of the track is wider than any
  // viewport, then render the half twice for a seamless -50% loop.
  const half = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  const track = [...half, ...half];

  return (
    <section className="gc-partners" aria-label="Certified partners">
      <div className="container">
        <p className="gc-partners-head">NSDC &amp; Skill India Certified Partner</p>
      </div>
      <div className="gc-marquee">
        <div className="gc-marquee-track">
          {track.map((p, i) => <PartnerTile key={i} p={p} />)}
        </div>
      </div>
    </section>
  );
}
