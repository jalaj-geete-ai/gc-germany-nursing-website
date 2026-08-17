import { useEffect } from 'react';
import { useLeadForm } from './LeadFormContext';

const DELAY = 10000; // 10 seconds

// Opens the shared lead form 10s after the visitor arrives. If they close it,
// it reappears 10s later, cycling while they stay on the site — but it stops
// permanently once the form is submitted, and never stacks on another popup
// (cookie banner or the Independence Day offer modal).
//
// Scheduling is driven by `closedAt` from the context (set on page load and on
// every close), NOT by polling — so it's immune to background-tab timer
// throttling and can never reopen before the full delay has elapsed.
export default function TimedLeadPopup() {
  const { open, isOpen, submittedOnce, closedAt } = useLeadForm();

  useEffect(() => {
    if (submittedOnce || isOpen) return;

    const wait = Math.max(0, closedAt + DELAY - Date.now());
    let timer = setTimeout(function tryOpen() {
      // Only one popup at a time — hold if the cookie banner or offer modal is up.
      if (document.body.classList.contains('cookie-open') ||
          document.querySelector('.id-modal-backdrop')) {
        timer = setTimeout(tryOpen, 2000);
        return;
      }
      open('timed-popup');
    }, wait);

    return () => clearTimeout(timer);
  }, [isOpen, submittedOnce, closedAt, open]);

  return null;
}
