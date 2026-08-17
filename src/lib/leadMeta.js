// ─────────────────────────────────────────────────────────────────────────
// Lead attribution metadata — UTM params, landing page, referrer, device type.
// Captured ONCE on first load (before client-side navigation can drop the query
// string) and stored in sessionStorage, then read at form-submit time and sent
// along with the lead into v2_staging.source_detail.
// ─────────────────────────────────────────────────────────────────────────
const KEY = 'gc_lead_attribution';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function deviceType() {
  if (typeof window === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w <= 640) return 'mobile';
  if (w <= 1024) return 'tablet';
  return 'desktop';
}

// Call once, as early as possible (App mount). Safe to call repeatedly — it only
// writes on the first visit of the session so the original UTM source sticks.
export function captureAttributionOnce() {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm = {};
    for (const f of UTM_FIELDS) {
      const v = params.get(f);
      if (v) utm[f] = v.slice(0, 200);
    }
    const snapshot = {
      ...utm,
      landing_page: window.location.href.slice(0, 500),
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
      captured_at: new Date().toISOString(),
    };
    sessionStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch { /* storage blocked — meta will fall back to live values at submit */ }
}

// Read at submit time. Merges the captured snapshot with live page + device info.
export function getLeadMeta() {
  let snap = {};
  try {
    snap = JSON.parse(sessionStorage.getItem(KEY) || '{}') || {};
  } catch { /* ignore */ }
  return {
    ...snap,
    page_url: typeof window !== 'undefined' ? window.location.href.slice(0, 500) : null,
    device_type: deviceType(),
    submitted_at: new Date().toISOString(),
  };
}
