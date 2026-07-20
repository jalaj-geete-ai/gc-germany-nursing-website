import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'gc_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setTimeout(() => setVisible(true), 1200);
  }, []);

  function accept(type) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ type, ts: Date.now() }));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
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
              <p className="cookie-title">🍪 We value your privacy</p>
              <p className="cookie-body">
                This website uses cookies to improve your experience and for analytics.
                We comply with <strong>India's DPDP Act 2023</strong> and <strong>GDPR</strong>.
                Your data is never sold. You can choose what you accept.
                {' '}<button className="cookie-details-toggle" onClick={() => setShowDetails(v => !v)}>
                  {showDetails ? 'Hide details ▲' : 'Learn more ▼'}
                </button>
              </p>

              {showDetails && (
                <div className="cookie-details">
                  <div className="cookie-detail-row">
                    <span>✅ <strong>Essential</strong></span>
                    <span>Always on — required for the site to function</span>
                  </div>
                  <div className="cookie-detail-row">
                    <span>📊 <strong>Analytics</strong></span>
                    <span>Helps us understand how you use the site (anonymous)</span>
                  </div>
                  <div className="cookie-detail-row">
                    <span>🎯 <strong>Marketing</strong></span>
                    <span>Used to show relevant ads and track campaign performance</span>
                  </div>
                  <p className="cookie-rights">
                    Under the DPDP Act 2023 &amp; GDPR, you have the right to access, correct or erase your data.
                    Contact us at <a href="mailto:support.gc@testbook.com">support.gc@testbook.com</a>.
                    See our <Link to="/terms" onClick={() => setVisible(false)}>Terms &amp; Conditions</Link>.
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
