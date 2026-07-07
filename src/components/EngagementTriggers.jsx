import { useEffect, useRef } from 'react';
import { useLeadForm } from './LeadFormContext';

export default function EngagementTriggers() {
  const { open, isOpen } = useLeadForm();
  const scrollFired = useRef(false);
  const exitFired = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (scrollFired.current || isOpen) return;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && scrolled / max > 0.3) {
        scrollFired.current = true;
        open('scroll-30');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open, isOpen]);

  useEffect(() => {
    function onMouseLeave(e) {
      if (exitFired.current || isOpen) return;
      if (e.clientY <= 0 && scrollFired.current) {
        exitFired.current = true;
        open('exit');
      }
    }
    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [open, isOpen]);

  return null;
}
