// ─────────────────────────────────────────────────────────────────────────
// Consent-gated analytics + conversion tracking.
// GA4 + Meta Pixel + Google Ads load ONLY after the visitor accepts marketing
// cookies. The key conversion event is `qualified_lead` — fired when a lead
// passes the qualification gate and reaches v2_staging.
// IDs live in trackingConfig.js (placeholders until you fill them in).
// ─────────────────────────────────────────────────────────────────────────
import { TRACKING } from './trackingConfig';

const CONSENT_KEY = 'gc_cookie_consent';
let loaded = false;

function injectScript(src) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
}

export function analyticsLoaded() {
  return loaded;
}

// Load the tag libraries. Safe to call more than once (guarded).
export function loadAnalytics() {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  // ── Google (GA4 + Ads) via gtag ────────────────────────────────
  const primaryGtagId = TRACKING.ga4Id || TRACKING.googleAdsId;
  if (primaryGtagId) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${primaryGtagId}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    if (TRACKING.ga4Id) window.gtag('config', TRACKING.ga4Id, { send_page_view: false });
    if (TRACKING.googleAdsId) window.gtag('config', TRACKING.googleAdsId);
  }

  // ── Meta Pixel ──────────────────────────────────────────
  if (TRACKING.metaPixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', TRACKING.metaPixelId);
    window.fbq('track', 'PageView');
  }
}

// On app mount: if the visitor previously accepted marketing cookies, load.
export function initAnalyticsFromConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
    if (saved && saved.type === 'all') loadAnalytics();
  } catch { /* ignore */ }
}

// Called by the cookie banner when the user clicks "Accept all".
export function grantMarketingConsent() {
  loadAnalytics();
}

function gtagEvent(name, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', name, params || {});
}
function fbqTrack(name, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', name, params || {});
}

export function trackPageView(path) {
  if (!loaded) return;
  if (window.gtag && TRACKING.ga4Id) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href });
  if (window.fbq) window.fbq('track', 'PageView');
}

// Fired on every form submission attempt (qualified or not).
export function trackLeadSubmit(source) {
  gtagEvent('lead_submit', { source });
}

// THE conversion: a qualified lead reached v2_staging. Wire your Google Ads
// conversion + Meta "Lead" event to this.
export function trackQualifiedLead({ source, qualification } = {}) {
  gtagEvent('qualified_lead', { source, qualification });
  fbqTrack('Lead', { content_name: 'germany_nursing', source });
  if (window.gtag && TRACKING.googleAdsId && TRACKING.googleAdsConversionLabel) {
    window.gtag('event', 'conversion', {
      send_to: `${TRACKING.googleAdsId}/${TRACKING.googleAdsConversionLabel}`,
    });
  }
}

export function trackWhatsAppClick(source) {
  gtagEvent('whatsapp_click', { source });
  fbqTrack('Contact', { method: 'whatsapp', source });
}
