import { useState, useEffect, useCallback } from 'react';
import { useLeadForm } from './LeadFormContext';
import bannerImg from '../assets/brand/id-sale-banner.png';

/* ── Seat schedule (IST) ─────────────────────────────────────
   Each entry: [month(0-based), day, hour, min, seats]
   "seats" = value FROM this threshold onward              */
const SCHEDULE = [
  [7,13, 0, 0,40],[7,13,12, 0,37],[7,13,15, 0,33],
  [7,13,18, 0,31],[7,13,21, 0,29],
  [7,14, 0, 0,29],[7,14,12, 0,26],[7,14,14, 0,22],
  [7,14,17, 0,18],[7,14,21, 0,10],
  [7,15, 0, 0,10],[7,15,14, 0, 7],[7,15,16, 0, 2],
];
const CAMPAIGN_START = new Date('2025-08-13T00:00:00+05:30').getTime();
const CAMPAIGN_END   = new Date('2025-08-16T00:00:00+05:30').getTime();

function getIST() {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
}

function getSeats(ist) {
  const ms = ist.getTime();
  if (ms < CAMPAIGN_START || ms >= CAMPAIGN_END) return null;
  const m = ist.getMonth(), d = ist.getDate();
  const totalMins = ist.getHours() * 60 + ist.getMinutes();
  let result = 40;
  for (const [sm, sd, sh, smin, seats] of SCHEDULE) {
    if (sm === m && sd === d && totalMins >= sh * 60 + smin) result = seats;
    else if (sm === m && sd < d) result = seats;
    else if (sm === m && sd > d) break;
  }
  return result;
}

function isFinalDay(ist) {
  return ist.getMonth() === 7 && ist.getDate() === 15;
}

export default function IndependenceDayBanner() {
  const { open } = useLeadForm();
  const [seats, setSeats]         = useState(() => getSeats(getIST()));
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [flip, setFlip]           = useState(false);
  const [finalDay, setFinalDay]   = useState(() => isFinalDay(getIST()));

  /* Poll every 30s and animate number change */
  const refresh = useCallback(() => {
    const ist      = getIST();
    const newSeats = getSeats(ist);
    setFinalDay(isFinalDay(ist));
    setSeats(prev => {
      if (prev !== newSeats) {
        setFlip(true);
        setTimeout(() => setFlip(false), 300);
      }
      return newSeats;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(refresh, 30000);
    return () => clearInterval(id);
  }, [refresh]);

  /* Campaign expired or dismissed — render nothing */
  if (seats === null || dismissed) return null;

  const seatLabel = seats === 2 && isFinalDay(getIST()) ? 'OFFER ENDING SOON' : `${seats} SEATS LEFT`;

  return (
    <>
      {/* ── BANNER ─────────────────────────────────────────── */}
      <div className="id-banner" onClick={() => setModalOpen(true)}>
        {/* Tricolour top stripe */}
        <div className="id-banner-stripe" />

        {/* The provided creative as background */}
        <div className="id-banner-img-wrap">
          <img src={bannerImg} alt="Independence Day Sale" className="id-banner-bg-img" />
          {/* Dynamic seat counter overlay — replaces the static "33 SEATS LEFT" in image */}
          <div className="id-seat-overlay">
            <span className="id-seat-fire">🔥</span>
            <div className="id-seat-nums">
              <span className={`id-seat-number${flip ? ' id-flip' : ''}`}>{seatLabel}</span>
            </div>
          </div>
          {/* VIEW OFFER button overlay */}
          <button
            className="id-view-offer-btn"
            onClick={e => { e.stopPropagation(); setModalOpen(true); }}
          >
            VIEW OFFER →
          </button>
        </div>

        {/* Close */}
        <button
          className="id-banner-close"
          aria-label="Close banner"
          onClick={e => { e.stopPropagation(); setDismissed(true); }}
        >✕</button>
      </div>

      {/* ── OFFER MODAL ────────────────────────────────────── */}
      {modalOpen && (
        <div className="id-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="id-modal" onClick={e => e.stopPropagation()}>

            {/* Final-day strip */}
            {finalDay && (
              <div className="id-modal-final-day">
                🇮🇳 FINAL DAY — Offer closes at midnight tonight
              </div>
            )}

            {/* Header */}
            <div className="id-modal-header">
              <button className="id-modal-close" onClick={() => setModalOpen(false)}>✕</button>
              <div className="id-modal-eyebrow">
                <svg width="14" height="10" viewBox="0 0 26 18" style={{ borderRadius: 2 }}>
                  <rect width="26" height="18" fill="#fff"/>
                  <rect width="26" height="6" fill="#FF9933"/>
                  <rect y="12" width="26" height="6" fill="#138808"/>
                  <circle cx="13" cy="9" r="2.2" fill="none" stroke="#000088" strokeWidth="0.45"/>
                  <circle cx="13" cy="9" r="0.45" fill="#000088"/>
                </svg>
                Independence Day Special Offer
              </div>
              <div className="id-modal-title">
                ₹10,000 OFF — <span>Start Your Germany Career</span>
              </div>
              <div className="id-modal-seat-badge">
                🔥 <span className={flip ? 'id-flip' : ''}>{seats}</span> SEATS LEFT — Once gone, gone
              </div>
            </div>

            {/* Body */}
            <div className="id-modal-body">
              {/* Price */}
              <div className="id-price-strip">
                <div>
                  <div className="id-price-orig">₹18,999</div>
                  <div className="id-price-new">₹8,999</div>
                </div>
                <span className="id-price-arrow">→</span>
                <div className="id-price-note">Save ₹10,000<br/>Independence Day Price</div>
              </div>

              {/* Offer points */}
              <ul className="id-offer-list">
                {[
                  ['📅','New batch starts <strong>14th August</strong> — don\'t miss it'],
                  ['🎯','Only <strong>40 seats</strong> total. Once gone, gone.'],
                  ['💡','Start with just <strong>₹8,999</strong>'],
                  ['📱','AI app, offline hubs, online classes — learn your way'],
                  ['🇩🇪','Valid till <strong>15th August only</strong>'],
                ].map(([icon, text]) => (
                  <li key={icon}>
                    <span className="id-offer-icon">{icon}</span>
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  </li>
                ))}
              </ul>

              <div className="id-validity">🕐 Valid till <strong>15th August only.</strong> Offer ends at midnight.</div>

              <button
                className="id-cta-primary"
                onClick={() => { setModalOpen(false); open('independence-day-banner'); }}
              >CLAIM ₹10,000 OFF NOW</button>
              <button
                className="id-cta-secondary"
                onClick={() => { setModalOpen(false); open('independence-day-cta'); }}
              >Start Your Global Career →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
