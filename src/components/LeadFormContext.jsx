import { createContext, useCallback, useContext, useState } from 'react';

const LeadFormContext = createContext(null);

export function LeadFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('general');

  const open = useCallback((src = 'general') => {
    setSource(src);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ isOpen, source, open, close }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}
