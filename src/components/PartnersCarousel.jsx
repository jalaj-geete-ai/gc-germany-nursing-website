import testbookLogo from '../assets/brand/testbook-logo-official.png';

/*
 * NSDC / Skill India certified-partner strip.
 *
 * Auto-rotating infinite marquee (pauses on hover, resumes automatically,
 * loops continuously, works on desktop + mobile). See hero-2026.css.
 *
 * NOTE ON LOGOS: official NSDC / Skill India logo files are not bundled in
 * this repo, and official marks must not be recreated or distorted. Each
 * partner below can carry a real `img` (drop the official PNG/SVG into
 * src/assets/brand/partners/ and set `img`); until then a neutral wordmark
 * tile is shown as a placeholder. Testbook uses its genuine logo asset.
 */
const PARTNERS = [
  { name: 'NSDC', sub: 'National Skill Dev. Corp.', mark: 'N', grad: 'linear-gradient(135deg,#0A7DA0,#14B8DD)' },
  { name: 'Skill India', sub: 'कौशल भारत', mark: 'SI', grad: 'linear-gradient(135deg,#FF7A33,#E8590C)' },
  { name: 'Testbook', sub: 'Trusted by 1.8Cr+ learners', img: testbookLogo },
  { name: 'Skill India', sub: 'Certified Training Partner', mark: 'SI', grad: 'linear-gradient(135deg,#FF7A33,#E8590C)' },
  { name: 'NSDC', sub: 'Re-imagine Future', mark: 'N', grad: 'linear-gradient(135deg,#0A7DA0,#14B8DD)' },
];

function PartnerTile({ p }) {
  return (
    <div className="gc-partner">
      {p.img ? (
        <img src={p.img} alt={p.name} />
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
