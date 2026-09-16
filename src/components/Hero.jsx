import { useLeadForm } from './LeadFormContext';
import Reveal from './Reveal';
import Icon from './Icon';
import nursePortrait from '../assets/brand/nurse-portrait.jpg';
import berlinSkyline from '../assets/brand/berlin-skyline.jpg';
import avatar1 from '../assets/brand/story-sunita.png';
import avatar2 from '../assets/brand/story-rohit.png';
import avatar3 from '../assets/brand/story-deepak.png';

/* Small gift glyph (no equivalent in the shared Icon set) */
function GiftIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11h16v8.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11Z" />
      <path d="M3 7.5h18V11H3zM12 7.5V21" />
      <path d="M12 7.5S10.5 3.5 8.4 4.1C6.9 4.5 7 6.9 9 7.4c1.2.3 3 .1 3 .1ZM12 7.5s1.5-4 3.6-3.4c1.5.4 1.4 2.8-.6 3.3-1.2.3-3 .1-3 .1Z" />
    </svg>
  );
}

/* One floating benefit card */
function BenefitCard({ variant, icon, kicker, value, sub, className }) {
  return (
    <div className={`gc-hero-card ${className}`}>
      <span className={`gc-card-ic ${variant}`}>{icon}</span>
      <div className="gc-card-body">
        {kicker && <div className="gc-card-kicker">{kicker}</div>}
        <div className="gc-card-value">{value}</div>
        {sub && <div className="gc-card-sub">{sub}</div>}
      </div>
    </div>
  );
}

export default function Hero() {
  const { open } = useLeadForm();

  return (
    <section className="gc-hero">
      <div className="gc-hero-atmos" aria-hidden="true" />

      <div className="container gc-hero-grid">
        {/* ---- copy (top): eyebrow + headline + supporting copy ---- */}
        <div className="gc-hero-copy-top">
          <Reveal>
            <span className="gc-hero-eyebrow">
              <span className="gc-flag" aria-hidden="true">🇩🇪</span> Your pathway to a better life in Germany
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="gc-hero-title">
              Learn German.<br />
              Get Placed.<br />
              Build Your Future in{' '}
              <span className="gc-hero-accent">
                Germany.
                <svg className="gc-hero-underline" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M6 15C70 5 165 5 294 11" />
                </svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="gc-hero-sub">
              Complete A1–B2 German Training with <strong>Hospital Placement</strong>,{' '}
              <strong>Visa Support</strong> &amp; <strong>End-to-End Career Assistance</strong>.
            </p>
          </Reveal>
        </div>

        {/* ---- copy (bottom): CTA + trust ---- */}
        <div className="gc-hero-copy-bottom">
          <Reveal delay={0.18}>
            <div className="gc-hero-actions">
              <button className="btn btn-primary gc-hero-cta" onClick={() => open('hero-eligibility')}>
                Check My Eligibility
                <svg className="gc-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="gc-hero-trust">
              <span className="gc-trust-ic"><Icon name="shieldCheck" size={17} /></span>
              Backed by Testbook
              <span className="gc-dot" aria-hidden="true" />
              <span className="gc-trust-ic"><Icon name="globe" size={16} /></span>
              1.8Cr+ Learners
            </div>
          </Reveal>
        </div>

        {/* ---- integrated nurse + Germany visual ---- */}
        <div className="gc-hero-visual">
          <div className="gc-hero-scene">
            <div className="gc-hero-sky" style={{ '--sky': `url(${berlinSkyline})` }} aria-hidden="true" />
            <img
              className="gc-hero-nurse"
              src={nursePortrait}
              alt="Indian nurse ready to build her career in Germany"
              loading="eager"
            />
            {/* India → Germany flight path */}
            <svg className="gc-hero-flight" viewBox="0 0 200 120" fill="none" aria-hidden="true">
              <path className="gc-flight-line" d="M8 104 C 54 34, 128 26, 182 44" />
              <g className="gc-plane" transform="translate(178 34) rotate(28)">
                <path d="M0 6 L20 0 L4 20 L1 11 L-6 9 Z" />
              </g>
            </svg>
          </div>

          {/* trust badge */}
          <div className="gc-hero-badge">
            <span className="gc-badge-avatars">
              <img src={avatar1} alt="" />
              <img src={avatar2} alt="" />
              <img src={avatar3} alt="" />
            </span>
            <span className="gc-badge-text">
              <b>1.8Cr+ Learners</b>
              <span>Trust Testbook</span>
            </span>
          </div>

          {/* floating benefit cards */}
          <BenefitCard
            className="gc-hero-card-earn"
            variant="earn"
            icon={<Icon name="salary" size={21} />}
            kicker="Earn"
            value={<><span className="rupee">₹2.5L – ₹4L</span> / Month</>}
            sub="as a Registered Nurse"
          />
          <BenefitCard
            className="gc-hero-card-family"
            variant="family"
            icon={<Icon name="family" size={21} />}
            value="Bring Your Family"
            sub="Family Visa & PR Pathway"
          />
          <BenefitCard
            className="gc-hero-card-scholar"
            variant="scholar"
            icon={<GiftIcon />}
            value={<><span className="rupee">₹50,000</span> Scholarship*</>}
            sub="+ Free AI Learning App"
          />
        </div>
      </div>

      {/* ---- benefit strip ---- */}
      <div className="container">
        <div className="gc-hero-strip">
          <div className="gc-strip-item">
            <span className="gc-strip-ic"><Icon name="book" size={26} /></span>
            <span className="gc-strip-txt"><b>A1–B2</b><span>German Training</span></span>
          </div>
          <div className="gc-strip-item">
            <span className="gc-strip-ic"><Icon name="hospital" size={26} /></span>
            <span className="gc-strip-txt"><b>Hospital</b><span>Placement Support</span></span>
          </div>
          <div className="gc-strip-item">
            <span className="gc-strip-ic"><Icon name="doc" size={26} /></span>
            <span className="gc-strip-txt"><b>Visa</b><span>Assistance</span></span>
          </div>
          <div className="gc-strip-item">
            <span className="gc-strip-ic"><Icon name="partners" size={26} /></span>
            <span className="gc-strip-txt"><b>Post-Landing</b><span>Support</span></span>
          </div>
          <div className="gc-strip-item">
            <span className="gc-strip-ic"><Icon name="shieldCheck" size={26} /></span>
            <span className="gc-strip-txt"><b>1.8Cr+</b><span>Learners Trust Testbook</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
