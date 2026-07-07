import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const milestones = [
  { month: 'Jan', label: 'Applied' },
  { month: 'Sep', label: 'B1 German cleared' },
  { month: 'Oct', label: 'Hospital interview' },
  { month: 'Nov', label: 'Visa approved' },
  { month: 'Dec', label: 'Landed in Germany' },
];

function NurseMarker() {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" className="mtl-nurse-svg">
      <ellipse cx="15" cy="31" rx="10" ry="2.5" fill="rgba(10,80,100,0.15)" />
      <path d="M6 30c0-7 3-12 9-12s9 5 9 12z" fill="#14B8DD" />
      <path d="M9.5 19h11l-1 4h-9z" fill="#fff" />
      <circle cx="15" cy="10" r="6.5" fill="#E8B98C" />
      <path d="M8.7 8a6.3 6.3 0 0 1 12.6 0c-2-1.3-4-2-6.3-2s-4.3.7-6.3 2z" fill="#3A2418" />
      <circle cx="15" cy="6.5" r="7" fill="none" stroke="#fff" strokeWidth="1.5" />
      <rect x="12.5" y="3" width="5" height="5" rx="1" fill="#fff" />
      <rect x="13.7" y="4.2" width="2.6" height="2.6" fill="#14B8DD" />
    </svg>
  );
}

export default function SuccessTimeline() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 35%'],
  });
  const markerLeft = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="section success-timeline">
      <div className="container">
        <Reveal><span className="eyebrow">One real journey</span></Reveal>
        <Reveal delay={0.06}><h2 className="section-title">Jan to December. Start to Germany.</h2></Reveal>

        <div className="mtl-track" ref={trackRef}>
          <div className="mtl-line" />
          <motion.div className="mtl-line-fill" style={{ width: lineFill }} />

          <motion.div className="mtl-nurse-marker" style={{ left: markerLeft }}>
            <NurseMarker />
          </motion.div>

          {milestones.map((m, i) => (
            <Reveal delay={0.08 * i} key={m.month} className="mtl-point">
              <span className="mtl-dot" />
              <span className="mtl-month mono">{m.month}</span>
              <span className="mtl-label">{m.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
