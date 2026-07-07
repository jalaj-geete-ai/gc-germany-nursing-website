import Reveal from './Reveal';

const rows = [
  { label: 'Monthly salary', india: '₹25,000 – 30,000', germany: '₹2.5L – 3L (€2,600–3,400)' },
  { label: 'Work hours/week', india: '48–60 hours', germany: '38–40 hours' },
  { label: 'Paid leave', india: '12–15 days', germany: '20–30 days' },
  { label: 'Healthcare', india: 'Out-of-pocket', germany: 'Fully covered' },
  { label: 'Path to PR', india: '—', germany: '21–33 months' },
  { label: 'Savings potential', india: 'Limited', germany: 'Up to 50% of income' },
];

export default function Comparison() {
  return (
    <section className="section comparison">
      <div className="container">
        <Reveal>
          <span className="eyebrow">The shift</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title">Same skills. Completely different life.</h2>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="compare-table">
            <div className="compare-row compare-head">
              <span></span>
              <span>India</span>
              <span>Germany</span>
            </div>
            {rows.map((r) => (
              <div className="compare-row" key={r.label}>
                <span className="compare-label">{r.label}</span>
                <span className="compare-india">{r.india}</span>
                <span className="compare-germany">{r.germany}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
