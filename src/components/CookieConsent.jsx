import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { grantMarketingConsent } from '../lib/analytics';

const STORAGE_KEY = 'gc_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setTimeout(() => setVisible(true), 1200);
  }, []);

  // Publish the banner height so the floating WhatsApp FAB can lift clear of it
  // (see --cookie-h usage in index.css). Reset to 0 when hidden.
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (!visible || !bannerRef.current) {
      body.classList.remove('cookie-open');
      root.style.setProperty('--cookie-h', '0px');
      return;
    }
    const el = bannerRef.current;
    const measure = () => root.style.setProperty('--cookie-h', `${el.offsetHeight + 14}px`);
    measure();
    body.classList.add('cookie-open');
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      body.classList.remove('cookie-open');
      root.style.setProperty('--cookie-h', '0px');
    };
  }, [visible, showDetails]);

  function accept(type) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ type, ts: Date.now() }));
    // Only "Accept all" turns on analytics/marketing tags.
    if (type === 'all') grantMarketingConsent();
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          className="cookie-banner"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="cookie-inner">
            <div className="cookie-text">
              <p className="cookie-title"><Icon name="lock" size={16} /> We value your privacy</p>
              <p className="cookie-body">
                This website uses cookies to improve your experience and for analytics.
                Your data is never sold. You can choose what you accept.
                {' '}<button className="cookie-details-toggle" onClick={() => setShowDetails(v => !v)}>
                  {showDetails ? 'Hide details ▲' : 'Learn more ▼'}
                </button>
              </p>

              {showDetails && (
                <div className="cookie-details">
                  <div className="cookie-detail-row">
                    <span><Icon name="check" size={15} /> <strong>Essential</strong></span>
                    <span>Always on — required for the site to function</span>
                  </div>
                  <div className="cookie-detail-row">
                    <span><Icon name="chart" size={15} /> <strong>Analytics</strong></span>
                    <span>Helps us understand how you use the site (anonymous)</span>
                  </div>
                  <div className="cookie-detail-row">
                    <span><Icon name="target" size={15} /> <strong>Marketing</strong></span>
                    <span>Used to show relevant ads and track campaign performance</span>
                  </div>
                  <p className="cookie-rights">
                    You have the right to access, correct or erase your data.
                    Contact us at <a href="mailto:support.gc@testbook.com">support.gc@testbook.com</a>.
                  </p>
                </div>
              )}
            </div>

            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn-essential" onClick={() => accept('essential')}>
                Essential only
              </button>
              <button className="cookie-btn cookie-btn-all" onClick={() => accept('all')}>
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
