import { createContext, useCallback, useContext, useState } from 'react';

const LeadFormContext = createContext(null);

export function LeadFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('general');
  // True once the visitor has successfully completed the form. Auto-popups
  // (timed / scroll / exit) check this so they never nag after a submission.
  const [submittedOnce, setSubmittedOnce] = useState(false);
  // Timestamp of the last time the form closed (or page load). The timed popup
  // schedules its next appearance from here, so it always waits the full delay
  // after a close — never reopens early.
  const [closedAt, setClosedAt] = useState(() => Date.now());

  const open = useCallback((src = 'general') => {
    setSource(src);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => { setIsOpen(false); setClosedAt(Date.now()); }, []);
  const markSubmitted = useCallback(() => setSubmittedOnce(true), []);

  return (
    <LeadFormContext.Provider value={{ isOpen, source, open, close, submittedOnce, markSubmitted, closedAt }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}
