import { useEffect, useState } from 'react';

// Next batch date — update this whenever you lock in a real cohort date.
const TARGET_DATE = new Date('2026-07-15T00:00:00');

function getRemaining() {
  const now = new Date();
  const diff = Math.max(0, TARGET_DATE - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, mins };
}

export default function CountdownTimer({ compact = false }) {
  const [t, setT] = useState(getRemaining());

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 60000);
    return () => clearInterval(id);
  }, []);

  if (compact) {
    return (
      <span className="countdown-compact mono">
        {t.days}d {t.hours}h left
      </span>
    );
  }

  return (
    <div className="countdown">
      {[{ v: t.days, l: 'Days' }, { v: t.hours, l: 'Hours' }, { v: t.mins, l: 'Mins' }].map((b) => (
        <div className="countdown-block" key={b.l}>
          <span className="countdown-num mono">{String(b.v).padStart(2, '0')}</span>
          <span className="countdown-label">{b.l}</span>
        </div>
      ))}
    </div>
  );
}
