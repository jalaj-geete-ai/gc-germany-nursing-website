// ─────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for headline stats, contact details, and the
// canonical option lists used across forms. Import from here everywhere so the
// numbers never contradict each other again.
// ─────────────────────────────────────────────────────────────────────────

// Canonical headline metrics (the ONLY approved set — used site-wide + OG meta)
export const STATS = {
  placements:   { value: 300, suffix: '+', label: 'Successful Placements' },
  partners:     { value: 40,  suffix: '+', label: 'Partner Hospitals' },
  visaRate:     { value: 95,  suffix: '%', label: 'Visa Success Rate' },
  salaryFromEur: 2800, // starting monthly salary floor, in EUR
};

// EUR→INR indicative conversion used in salary displays
export const EUR_TO_INR = 95;

// Contact — use THESE everywhere (phone, email, WhatsApp). Single source of truth.
const WA_TEXT = 'Hi%2C%20I%27m%20interested%20in%20the%20Germany%20Nursing%20Program';
export const CONTACT = {
  phone:    '+91 92173 85145',
  phoneRaw: '919217385145',
  tel:      'tel:+919217385145',            // click-to-call href
  email:    'support.gc@testbook.com',
  whatsapp: `https://wa.me/919217385145?text=${WA_TEXT}`,
  hours:    'Mon–Sat, 9 AM – 8 PM IST',
};

// Canonical qualification + experience lists (identical wording in every form)
export const QUALIFICATIONS = ['GNM', 'B.Sc Nursing', 'Post Basic B.Sc', 'M.Sc Nursing'];
export const EXPERIENCE_LEVELS = ['Fresher', '0–1 years', '1–3 years', '3+ years'];

// Helper: format a EUR amount as "€2,800"
export const eur = (n) => `€${n.toLocaleString('en-IN')}`;
// Helper: EUR → indicative INR, rounded to nearest thousand, as "₹2,66,000"
export const eurToInr = (n) => `₹${(Math.round((n * EUR_TO_INR) / 1000) * 1000).toLocaleString('en-IN')}`;
