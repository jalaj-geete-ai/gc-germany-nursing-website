import { motion } from 'framer-motion';
import { useLeadForm } from './LeadFormContext';
import Reveal from './Reveal';
import nursePortrait from '../assets/brand/nurse-portrait.jpg';
import berlinSkyline from '../assets/brand/berlin-skyline.jpg';

export default function Hero() {
  const { open } = useLeadForm();

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${berlinSkyline})` }} />
      <div className="hero-bg-scrim" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <Reveal>
            <span className="eyebrow eyebrow-no-dash">Don't let borders limit your career</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="hero-title">Build Your Nursing Career in Germany</h1>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={() => open('hero-apply')}>Apply Now</button>
            </div>
          </Reveal>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-photo-frame">
            <img src={nursePortrait} alt="Nurse preparing for a Germany nursing career" className="hero-photo" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
