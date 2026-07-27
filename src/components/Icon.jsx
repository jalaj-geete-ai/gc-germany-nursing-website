// ─────────────────────────────────────────────────────────────────────────
// Custom single-stroke line-icon set. One consistent stroke weight, inherits
// colour via `currentColor` (set colour on the parent / via CSS). Replaces all
// system emoji in the UI so icons render identically on every device.
// Usage: <Icon name="target" />  |  <Icon name="check" size={20} />
// ─────────────────────────────────────────────────────────────────────────

const PATHS = {
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  plane: <path d="M4 13.5 21 4 14 21l-2.5-7.5L4 13.5Z" />,
  salary: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.5 9.2a3.4 3.4 0 0 0-5.7 2.8 3.4 3.4 0 0 0 5.7 2.8" />
      <path d="M7.6 11h4.2M7.6 13h4.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </>
  ),
  family: (
    <>
      <circle cx="8.5" cy="9" r="2.4" />
      <circle cx="15.5" cy="9" r="2.4" />
      <path d="M4.5 18c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8M12.5 18c0-2.2 1.8-3.8 4-3.8s3 1 3.5 2.4" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3.5 5.5 6v5c0 4 2.8 7.2 6.5 8.5 3.7-1.3 6.5-4.5 6.5-8.5V6L12 3.5Z" />
      <path d="M9.3 12l1.9 1.9 3.6-3.8" />
    </>
  ),
  health: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.3v7.4M8.3 12h7.4" />
    </>
  ),
  trend: <path d="M4 16.5 10 11l3 2.6L20 7M20 7h-4M20 7v4" />,
  book: (
    <>
      <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H18v13H6.5A1.5 1.5 0 0 0 5 18.5V5.5Z" />
      <path d="M5 18.5A1.5 1.5 0 0 0 6.5 20H18" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M14.6 14.6 20 20" />
    </>
  ),
  monitor: (
    <>
      <rect x="3.5" y="5" width="17" height="11" rx="1.5" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  map: (
    <>
      <path d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2Z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3.5h7L18 8v12.5H6.5V3.5Z" />
      <path d="M13 3.5V8h4.5M9 12h6M9 15.5h6" />
    </>
  ),
  chart: <path d="M4 20V4M4 20h16M8 20v-6M12 20v-9M16 20v-4" />,
  hospital: (
    <>
      <path d="M5 20V7l7-3 7 3v13" />
      <path d="M12 8.5v4M10 10.5h4M9 20v-3.5h6V20" />
    </>
  ),
  partners: (
    <>
      <path d="M4 20V9l4-2 4 2M12 20V9" />
      <rect x="12" y="11" width="8" height="9" rx="1" />
      <path d="M7 11v0M7 14v0M15 14.5h2M15 17h2" />
    </>
  ),
  check: <path d="M5 12.5 10 17.5 19 6.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8.2v0.1" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="10.5" width="13" height="9" rx="1.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.4 3.7 8.5S14.4 18.2 12 20.5C9.6 18.2 8.3 15.1 8.3 12S9.6 5.8 12 3.5Z" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.75, ...rest }) {
  const glyph = PATHS[name];
  if (!glyph) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`gc-icon ${className}`}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  );
}
