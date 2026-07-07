import Reveal from './Reveal';

const items = [
  {
    title: 'Speak German with Confidence',
    desc: 'Structured A1–B2 training built around real hospital vocabulary — zero to job-ready.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><path d="M13 16h14M13 20h10M13 24h12" stroke="#14B8DD" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'Crack the Certification',
    desc: 'Mock exams and guided practice for Goethe, ÖSD, TELC or ECL — built for first-attempt passes.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><path d="M14 21l4 4 9-10" stroke="#14B8DD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    title: 'Meet Real Hospitals',
    desc: 'Direct interviews with verified German hospitals — no agents, no middlemen, no guesswork.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><path d="M20 12v16M12 20h16" stroke="#14B8DD" strokeWidth="2.5" strokeLinecap="round"/><rect x="14" y="14" width="12" height="12" rx="2" stroke="#14B8DD" strokeWidth="1.5" fill="none"/></svg>
    ),
  },
  {
    title: 'Visa, Off Your Plate',
    desc: 'Document prep, translation and filing handled end-to-end, so the paperwork never becomes the blocker.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><rect x="12" y="11" width="16" height="18" rx="2" stroke="#14B8DD" strokeWidth="2" fill="none"/><path d="M16 17h8M16 21h8M16 25h5" stroke="#14B8DD" strokeWidth="1.6" strokeLinecap="round"/></svg>
    ),
  },
  {
    title: 'Land, Fully Set Up',
    desc: 'Flights, accommodation and onboarding sorted before you even step off the plane.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><path d="M12 22l8-10 8 10M16 22v6h8v-6" stroke="#14B8DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
    ),
  },
  {
    title: 'Supported After You Land',
    desc: 'Recognition exam guidance and on-ground support, well past your first day on the ward.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#E4F8FC"/><path d="M20 13a7 7 0 0 1 7 7c0 4-3 6-7 10-4-4-7-6-7-10a7 7 0 0 1 7-7z" stroke="#14B8DD" strokeWidth="2" fill="none"/></svg>
    ),
  },
];

export default function ValueProp360() {
  return (
    <section className="section value-360">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Built for top performance, start to finish</h2>
        </Reveal>

        <div className="value-360-grid">
          {items.map((it, i) => (
            <Reveal delay={0.06 * i} key={it.title} className="value-360-card">
              <span className="value-360-icon">{it.icon}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
