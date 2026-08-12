import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { useLeadForm } from './LeadFormContext';

/* ═══════════════════════════════════════════════════════════════════════
   INDEPENDENCE DAY CAMPAIGN — 13–15 August (IST)
   ───────────────────────────────────────────────────────────────────────
   • Seat counter is a DETERMINISTIC function of the current IST time — it
     never changes randomly, only when a scheduled threshold is crossed.
   • Time is taken from the SERVER (HTTP `Date` header) so we don't trust the
     visitor's device clock; falls back to the device clock if that fails.
   • To run the campaign next year, bump CAMPAIGN_YEAR — nothing else.
   • QA: append ?idpreview=2026-08-14T18:00 to preview any moment (as IST).
   ═══════════════════════════════════════════════════════════════════════ */
const CAMPAIGN_YEAR = 2026;
const AUG = 7;                       // month index (0-based)
const IST_OFFSET_MS = 5.5 * 3600000; // IST = UTC+5:30, no DST

// Absolute UTC epoch for a given IST wall-clock time during the campaign.
const istEpoch = (day, hh, mm = 0) =>
  Date.UTC(CAMPAIGN_YEAR, AUG, day, hh, mm) - IST_OFFSET_MS;

/* [thresholdEpoch, seatsFromThisPointOnward] — ascending order. */
const SCHEDULE = [
  [istEpoch(13, 0),  40],
  [istEpoch(13, 12), 37],
  [istEpoch(13, 15), 33],
  [istEpoch(13, 18), 31],
  [istEpoch(13, 21), 29],
  [istEpoch(14, 12), 26],
  [istEpoch(14, 14), 22],
  [istEpoch(14, 17), 18],
  [istEpoch(14, 21), 10],
  [istEpoch(15, 14), 7],
  [istEpoch(15, 16), 2],
];
const CAMPAIGN_START  = istEpoch(13, 0);
const CAMPAIGN_END    = istEpoch(16, 0);  // midnight after 15 Aug (IST)
const FINAL_DAY_START = istEpoch(15, 0);

/* ── Server-time sync (avoid trusting the device clock) ─────────────────── */
let clockSkew = 0; // serverNow - Date.now()
async function syncClock() {
  try {
    const res = await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
    const d = res.headers.get('date');
    if (d) {
      const server = new Date(d).getTime();
      if (!Number.isNaN(server)) clockSkew = server - Date.now();
    }
  } catch { /* offline / blocked — fall back to device clock */ }
}

/* Optional QA override: ?idpreview=2026-08-14T18:00 (interpreted as IST). */
function previewNow() {
  const m = /[?&]idpreview=([^&#]+)/.exec(window.location.href);
  if (!m) return null;
  const raw = decodeURIComponent(m[1]);
  const parsed = Date.parse(raw.includes('T') ? `${raw}+05:30` : raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function nowMs() {
  const p = previewNow();
  return p != null ? p : Date.now() + clockSkew;
}

function seatsAt(ms) {
  if (ms < CAMPAIGN_START || ms >= CAMPAIGN_END) return null;
  let seats = SCHEDULE[0][1];
  for (const [t, s] of SCHEDULE) { if (ms >= t) seats = s; else break; }
  return seats;
}

export default function IndependenceDayBanner() {
  const { open } = useLeadForm();
  const bannerRef = useRef(null);
  const [seats, setSeats]         = useState(() => seatsAt(nowMs()));
  const [finalDay, setFinalDay]   = useState(() => { const n = nowMs(); return n >= FINAL_DAY_START && n < CAMPAIGN_END; });
  const [flip, setFlip]           = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const refresh = useCallback(() => {
    const ms = nowMs();
    setFinalDay(ms >= FINAL_DAY_START && ms < CAMPAIGN_END);
    setSeats(prev => {
      const next = seatsAt(ms);
      if (prev !== next && next != null) {
        setFlip(true);
        setTimeout(() => setFlip(false), 320);
      }
      return next;
    });
  }, []);

  // Sync the server clock once, then re-check the schedule on an interval so
  // the number updates automatically without a page refresh.
  useEffect(() => {
    let alive = true;
    syncClock().then(() => { if (alive) refresh(); });
    const tick   = setInterval(refresh, 15000);            // threshold check
    const resync = setInterval(syncClock, 300000);         // re-sync every 5 min
    return () => { alive = false; clearInterval(tick); clearInterval(resync); };
  }, [refresh]);

  const active = seats !== null && !dismissed;

  // Publish the banner's height so the (fixed) navbar and hero padding can
  // shift down by exactly that much — see .id-banner-active rules in index.css.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (!active || !bannerRef.current) {
      body.classList.remove('id-banner-active');
      root.style.setProperty('--id-banner-h', '0px');
      return;
    }
    const el = bannerRef.current;
    const measure = () => root.style.setProperty('--id-banner-h', `${el.offsetHeight}px`);
    measure();
    body.classList.add('id-banner-active');
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      body.classList.remove('id-banner-active');
      root.style.setProperty('--id-banner-h', '0px');
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* ── TOP BANNER ─────────────────────────────────────────────── */}
      <div
        className="id-banner"
        ref={bannerRef}
        role="button"
        tabIndex={0}
        aria-label="Independence Day offer — view details"
        onClick={() => setModalOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalOpen(true); } }}
      >
        <div className="id-banner-inner">
          <div className="id-banner-lead">
            <span className="id-banner-eyebrow">
              <span className="id-flagdot" aria-hidden="true" />
              {finalDay ? 'Final Day — Independence Day Special' : 'Independence Day Special'}
            </span>
            <span className="id-banner-tagline">
              Freedom to Choose. Freedom to Grow. <b>Freedom to Go Global.</b>
            </span>
          </div>

          <div className="id-banner-meta">
            <span className="id-chip id-chip-offer">₹10,000 OFF</span>
            {finalDay
              ? <span className="id-chip id-chip-final">FINAL DAY</span>
              : <span className="id-chip id-chip-valid">Valid 13–15 Aug</span>}
            <span className="id-seatchip" aria-live="polite">
              <span className="fire" aria-hidden="true">🔥</span>
              {finalDay && <span className="id-seatlabel">ONLY</span>}
              <span className={`id-seatnum${flip ? ' id-flip' : ''}`}>{seats}</span>
              <span className="id-seatlabel">{finalDay ? 'LEFT' : 'SEATS LEFT'}</span>
            </span>
          </div>

          <button
            className="id-view-offer-btn"
            onClick={e => { e.stopPropagation(); setModalOpen(true); }}
          >VIEW OFFER →</button>
        </div>

        <button
          className="id-banner-close"
          aria-label="Dismiss offer banner"
          onClick={e => { e.stopPropagation(); setDismissed(true); }}
        >✕</button>
      </div>

      {/* ── OFFER MODAL ────────────────────────────────────────────── */}
      {modalOpen && (
        <OfferModal
          seats={seats}
          flip={flip}
          finalDay={finalDay}
          onClose={() => setModalOpen(false)}
          onApply={src => { setModalOpen(false); open(src); }}
        />
      )}
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────────
   Offer-details modal. CTAs route into the existing lead-capture flow
   (LeadFormModal) via the shared LeadForm context.
   ─────────────────────────────────────────────────────────────────────── */
function OfferModal({ seats, flip, finalDay, onClose, onApply }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const offerPoints = [
    ['📅', 'New batch starts <strong>14th August</strong> — don\'t miss it'],
    ['🎟️', 'Only <strong>40 seats</strong>. Once gone, gone.'],
    ['💡', 'Start with just <strong>₹8,999</strong>'],
    ['📱', 'AI app, offline hubs, online classes — learn your way'],
    ['🗓️', 'Valid till <strong>15th August only</strong>'],
  ];

  return (
    <div className="id-modal-backdrop" onClick={onClose}>
      <div className="id-modal" role="dialog" aria-modal="true" aria-label="Independence Day offer details" onClick={e => e.stopPropagation()}>
        {finalDay && (
          <div className="id-modal-final-day">🇮🇳 Final Day — offer closes tonight, 15th August</div>
        )}

        <div className="id-modal-header">
          <button className="id-modal-close" aria-label="Close" onClick={onClose}>✕</button>
          <div className="id-modal-eyebrow">
            <svg width="14" height="10" viewBox="0 0 26 18" style={{ borderRadius: 2 }} aria-hidden="true">
              <rect width="26" height="18" fill="#fff" />
              <rect width="26" height="6" fill="#FF9933" />
              <rect y="12" width="26" height="6" fill="#138808" />
              <circle cx="13" cy="9" r="2.2" fill="none" stroke="#000088" strokeWidth="0.45" />
              <circle cx="13" cy="9" r="0.45" fill="#000088" />
            </svg>
            Independence Day Special
          </div>
          <div className="id-modal-title">
            ₹10,000 off — <span>Independence Day Special</span>
          </div>
          <div className="id-modal-seat-badge">
            🔥 {finalDay ? 'ONLY ' : ''}<span className={flip ? 'id-flip' : ''}>{seats}</span> {finalDay ? 'LEFT' : 'SEATS LEFT'} — once gone, gone
          </div>
        </div>

        <div className="id-modal-body">
          <div className="id-price-strip">
            <div>
              <div className="id-price-orig">₹18,999</div>
              <div className="id-price-new">₹8,999</div>
            </div>
            <span className="id-price-arrow">→</span>
            <div className="id-price-note">Save ₹10,000<br />Independence Day Price</div>
          </div>

          <ul className="id-offer-list">
            {offerPoints.map(([icon, text]) => (
              <li key={icon}>
                <span className="id-offer-icon">{icon}</span>
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </li>
            ))}
          </ul>

          <div className="id-validity">🕐 Valid till <strong>15th August only.</strong> Offer ends at midnight IST.</div>

          <button className="id-cta-primary" onClick={() => onApply('independence-day-offer')}>
            CLAIM ₹10,000 OFF
          </button>
          <button className="id-cta-secondary" onClick={() => onApply('independence-day-cta')}>
            Start Your Global Career →
          </button>
        </div>
      </div>
    </div>
  );
}
