import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';

const steps = [
  { n: '01', title: 'Learn German', desc: "Don't know German? No problem — structured training takes you from zero." },
  { n: '02', title: 'Clear Certification', desc: 'Pass your B1/B2 exam through an accredited provider (Goethe, ÖSD, TELC or ECL).' },
  { n: '03', title: 'Get Interviewed', desc: 'Get matched and interviewed directly by verified German hospitals.' },
  { n: '04', title: 'Visa & Documentation', desc: 'End-to-end visa filing, translation & legal support — handled for you.' },
  { n: '05', title: 'Fly To Germany', desc: 'Land with accommodation, onboarding & on-ground support already arranged.' },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 50%'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section process">
      <div className="container">
        <Reveal><span className="eyebrow">The path</span></Reveal>
        <Reveal delay={0.06}><h2 className="section-title">Your pathway to a Germany nursing career</h2></Reveal>

        <div className="timeline" ref={ref}>
          <div className="timeline-track">
            <motion.div className="timeline-track-fill" style={{ height: lineHeight }} />
          </div>
          {steps.map((s, i) => (
            <Reveal delay={0.08 * i} key={s.n} className="timeline-item">
              <div className="timeline-marker">
                <span className="timeline-num mono">{s.n}</span>
              </div>
              <div className="timeline-content">
                <h3>Step {Number(s.n)} — {s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
