import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 560" className="hero-illustration" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A7DA0" />
          <stop offset="100%" stopColor="#14B8DD" />
        </linearGradient>
        <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4F8FC" />
        </linearGradient>
      </defs>

      <rect width="480" height="560" rx="28" fill="url(#skyGrad)" />

      {/* Germany skyline silhouette */}
      <g opacity="0.18" fill="#ffffff">
        <rect x="20" y="380" width="34" height="140" />
        <rect x="60" y="340" width="26" height="180" />
        <polygon points="98,340 124,340 124,520 98,520" />
        <polygon points="111,300 124,340 98,340" />
        <rect x="140" y="360" width="40" height="160" />
        <rect x="360" y="350" width="30" height="170" />
        <rect x="400" y="320" width="22" height="200" />
        <polygon points="430,360 460,360 460,520 430,520" />
      </g>

      {/* dotted route */}
      <motion.path
        d="M40 120 Q 200 40 440 100"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeDasharray="2 10"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      <motion.text
        x="40" y="105" fontSize="26"
        animate={{ x: [40, 420] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >✈️</motion.text>
      <text x="14" y="95" fontSize="30">🇮🇳</text>
      <text x="436" y="80" fontSize="30">🇩🇪</text>

      {/* Nurse figure */}
      <g transform="translate(140,160)">
        {/* hair/head */}
        <circle cx="100" cy="70" r="46" fill="#3A2418" />
        <circle cx="100" cy="76" r="38" fill="#E8B98C" />
        {/* cap */}
        <path d="M62 60 a38 30 0 0 1 76 0 z" fill="#ffffff" />
        <rect x="92" y="40" width="16" height="16" fill="#14B8DD" rx="2" />
        {/* body / coat */}
        <path
          d="M40 320 C 40 220 60 170 100 160 C 140 170 160 220 160 320 Z"
          fill="url(#coatGrad)"
        />
        {/* collar */}
        <path d="M76 168 L100 200 L124 168 Z" fill="#14B8DD" />
        {/* stethoscope */}
        <path d="M70 190 q 30 50 60 0" stroke="#0A7DA0" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="232" r="8" fill="#0A7DA0" />
        {/* badge */}
        <rect x="120" y="215" width="22" height="16" rx="3" fill="#FF7A33" />
      </g>

      {/* floating salary chips */}
      <g>
        <rect x="34" y="430" width="118" height="56" rx="14" fill="#ffffff" />
        <text x="50" y="452" fontSize="11" fill="#5B6470" fontFamily="IBM Plex Mono, monospace">IN INDIA</text>
        <text x="50" y="474" fontSize="20" fill="#1B2027" fontWeight="700" fontFamily="IBM Plex Mono, monospace">₹28K/mo</text>

        <rect x="330" y="430" width="118" height="56" rx="14" fill="#FF7A33" />
        <text x="346" y="452" fontSize="11" fill="#FFE8D9" fontFamily="IBM Plex Mono, monospace">IN GERMANY</text>
        <text x="346" y="474" fontSize="20" fill="#ffffff" fontWeight="700" fontFamily="IBM Plex Mono, monospace">₹2.8L/mo</text>
      </g>
    </svg>
  );
}
