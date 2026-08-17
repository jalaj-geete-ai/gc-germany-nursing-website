import { useLeadForm } from './LeadFormContext';

// Mobile-only persistent bottom bar. The WhatsApp entry point now lives in the
// floating FAB (WhatsAppButton), so this bar is a single full-width Apply CTA.
export default function StickyApplyBar() {
  const { open } = useLeadForm();
  return (
    <div className="sticky-bar">
      <button className="btn btn-primary sticky-apply" onClick={() => open('sticky-bar')}>
        Apply Now — Free Eligibility Check
      </button>
    </div>
  );
}
