// Simple, premium illustrated person avatars — used as stand-ins until real photos are uploaded.
const palettes = [
  { bg: '#DCEBFF', skin: '#E8B98C', hair: '#3B2418', top: '#155EEF' },
  { bg: '#FFE6D1', skin: '#C98A5E', hair: '#1B1B1B', top: '#0A2F6B' },
  { bg: '#E3F5E6', skin: '#F0C49C', hair: '#5A3A22', top: '#155EEF' },
  { bg: '#F3E8FF', skin: '#D9A06B', hair: '#2B1A10', top: '#0A2F6B' },
];

export default function Avatar({ variant = 0, size = 40, className = '' }) {
  const p = palettes[variant % palettes.length];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Nurse avatar illustration"
    >
      <circle cx="32" cy="32" r="32" fill={p.bg} />
      <circle cx="32" cy="27" r="11" fill={p.skin} />
      <path d="M21 24c0-7 5-12 11-12s11 5 11 12c-3-2-7-3-11-3s-8 1-11 3z" fill={p.hair} />
      <path
        d="M14 58c2-10 9-16 18-16s16 6 18 16c-6 3-12 5-18 5s-12-2-18-5z"
        fill={p.top}
      />
      <rect x="28" y="44" width="8" height="6" rx="2" fill={p.skin} />
    </svg>
  );
}
