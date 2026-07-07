import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import DecoratedPhoto from './DecoratedPhoto';
import GermanyBackdrop from './GermanyBackdrop';
import nursePortrait from '../assets/brand/nurse-portrait.jpg';

const items = [
  { title: 'High Salaries & Job Security', desc: 'Earn up to €2,800–€3,500/month as a registered nurse, with steady career growth and strong demand for healthcare professionals.' },
  { title: 'Work-Life Balance', desc: '38–40 hour weeks, regulated shifts, paid overtime, and 20–30 days of leave a year — a rhythm built for a full life outside work.' },
  { title: 'Free Healthcare & Social Benefits', desc: 'Free or subsidised healthcare, pension contributions, unemployment insurance and parental leave, built into every job.' },
  { title: 'Cultural Diversity & Inclusivity', desc: 'Home to 150+ nationalities, with established Indian and international communities easing the transition.' },
  { title: 'Pathway to Permanent Residency', desc: 'PR in as little as 21 months with B1-level German, or 33 months on the standard track.' },
  { title: 'Affordable Living & Savings', desc: 'Despite a high standard of living, most nurses save up to 50% of their income — for themselves and family back home.' },
];

export default function LifeHeroAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="page-hero lha-hero">
      <GermanyBackdrop />
      <div className="container">
        <Reveal><span className="eyebrow">Opportunities for Indian Nurses</span></Reveal>
        <Reveal delay={0.06}>
          <h1 className="lha-title">
            Life in Germany <span className="lha-flag">🇩🇪</span> <span className="lha-title-accent">A Rewarding Journey!</span>
          </h1>
        </Reveal>

        <div className="lha-panel">
          <Reveal delay={0.1} className="lha-accordion">
            {items.map((it, i) => (
              <div key={it.title} className={`lha-item ${open === i ? 'lha-item-open' : ''}`}>
                <button className="lha-item-head" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{it.title}</span>
                  <span className="lha-item-chevron">{open === i ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="lha-item-body-wrap"
                    >
                      <p className="lha-item-body">{it.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="lha-photo-col">
            <DecoratedPhoto src={nursePortrait} alt="Nurse pursuing a rewarding nursing career in Germany" showZigzag={false} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
