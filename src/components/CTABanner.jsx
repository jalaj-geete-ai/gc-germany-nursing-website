import Reveal from './Reveal';
import { useLeadForm } from './LeadFormContext';
import berlinSkyline from '../assets/brand/berlin-skyline.jpg';

export default function CTABanner() {
  const { open } = useLeadForm();
  return (
    <section
      className="cta-banner"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(10,47,107,0.88), rgba(20,184,221,0.85)), url(${berlinSkyline})`,
      }}
    >
      <div className="container cta-banner-inner">
        <Reveal>
          <h2>Start your Germany journey today</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p>Free Germany eligibility check. No obligation. 10-minute call.</p>
        </Reveal>
        <Reveal delay={0.12}>
          <button className="btn btn-ghost-white cta-banner-btn" onClick={() => open('cta-banner')}>
            Get My Free Eligibility Check
          </button>
        </Reveal>
      </div>
    </section>
  );
}
