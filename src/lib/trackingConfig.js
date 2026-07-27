// ─────────────────────────────────────────────────────────────────────────
// TRACKING IDs — drop your real values here.
// Leave a value as '' to disable that channel entirely.
//
//   ga4Id                     GA4 Measurement ID   → 'G-XXXXXXXXXX'
//   metaPixelId               Meta (Facebook) Pixel ID → '1234567890123456'
//   googleAdsId               Google Ads tag       → 'AW-XXXXXXXXX'
//   googleAdsConversionLabel  Conversion label     → 'abcDEfGhIJ'
//                             (fires send_to `${googleAdsId}/${label}`)
//
// Nothing loads until the visitor accepts marketing cookies (see analytics.js),
// so these stay dormant + privacy-compliant until consent is given.
// ─────────────────────────────────────────────────────────────────────────
export const TRACKING = {
  ga4Id: '',
  metaPixelId: '',
  googleAdsId: '',
  googleAdsConversionLabel: '',
};
