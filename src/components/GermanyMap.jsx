import { motion } from 'framer-motion';

// Stylized (not geographically precise) Germany outline with example city markers.
const cities = [
  { name: 'Hamburg', x: 150, y: 90, hospitals: '8 partner hospitals' },
  { name: 'Berlin', x: 245, y: 125, hospitals: '12 partner hospitals' },
  { name: 'Munich', x: 195, y: 345, hospitals: '9 partner hospitals' },
];

const routePath = `M${cities[0].x} ${cities[0].y} Q 200 100, ${cities[1].x} ${cities[1].y} T ${cities[2].x} ${cities[2].y}`;

export default function GermanyMap() {
  return (
    <div className="germany-map-wrap">
      <svg viewBox="0 0 380 420" className="germany-map-svg">
        <defs>
          <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E4F8FC" />
            <stop offset="100%" stopColor="#BCEEF7" />
          </linearGradient>
          <filter id="mapShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0A7DA0" floodOpacity="0.18" />
          </filter>
        </defs>

        <path
          d="M150 18 L195 14 L222 38 L260 48 L288 78 L278 112 L308 138 L322 178 L296 210 L310 248 L288 282
             L300 320 L266 358 L232 402 L196 408 L178 374 L142 366 L118 336 L132 296 L98 270 L84 230
             L108 198 L88 162 L104 122 L78 92 L106 56 Z"
          fill="url(#mapGrad)"
          stroke="var(--blue-deep)"
          strokeWidth="1.75"
          strokeLinejoin="round"
          filter="url(#mapShadow)"
        />

        <motion.path
          d={routePath}
          fill="none"
          stroke="var(--blue-deep)"
          strokeWidth="2"
          strokeDasharray="2 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        {cities.map((c, i) => (
          <g key={c.name}>
            <motion.circle
              cx={c.x} cy={c.y} r="16"
              fill="none" stroke="var(--blue-deep)" strokeWidth="1.5" opacity="0.4"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: [0.6, 1.5], opacity: [0.5, 0] }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1.8, repeat: Infinity }}
            />
            <motion.circle
              cx={c.x} cy={c.y} r="7"
              fill="var(--amber)"
              stroke="#fff" strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            />
            <motion.g
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
            >
              <rect x={c.x + 12} y={c.y - 11} width={c.name.length * 7 + 16} height="22" rx="11" fill="#fff" stroke="var(--line)" />
              <text x={c.x + 20} y={c.y + 4} fontSize="12" fontWeight="700" fill="var(--ink)" fontFamily="Inter, sans-serif">{c.name}</text>
            </motion.g>
          </g>
        ))}
      </svg>

      <div className="germany-map-legend">
        {cities.map((c) => (
          <div className="germany-map-city" key={c.name}>
            <strong>{c.name}</strong>
            <span>{c.hospitals}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
