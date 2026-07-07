import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Counter from './Counter';

// Simple upward growth curve as an SVG path — animates in on scroll.
const PATH = 'M4 86 C 40 80, 70 70, 100 58 C 140 42, 170 38, 200 22 C 226 8, 244 6, 256 4';

export default function GrowthGraph({ value = 15, label = 'Growth in nurse placements YoY' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div className="growth-card" ref={ref}>
      <span className="eyebrow growth-eyebrow">Track record</span>
      <h3 className="growth-headline">
        <Counter to={value} suffix="x" /> Growth
      </h3>
      <p className="growth-sub">{label}</p>

      <svg viewBox="0 0 260 100" className="growth-svg">
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14B8DD" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14B8DD" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${PATH} L256 100 L4 100 Z`}
          fill="url(#growthFill)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.path
          d={PATH}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="256" cy="4" r="5" fill="#fff"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.3 }}
        />
      </svg>

      <div className="growth-axis">
        <span>2022</span>
        <span>2023</span>
        <span>2024</span>
        <span>2025</span>
        <span>2026</span>
      </div>
    </div>
  );
}
