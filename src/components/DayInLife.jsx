import Reveal from './Reveal';

const hours = [
  { time: '7:00 AM', text: 'Calm morning coffee — no 2-hour commute to fight through.' },
  { time: '8:00 AM', text: '8-hour shift begins. Defined hours, no unpaid overtime.' },
  { time: '4:00 PM', text: 'Shift ends on time. Cycle home through tree-lined streets.' },
  { time: '6:00 PM', text: 'Dinner with flatmates, gym, or a language class — your evening, your call.' },
  { time: '9:00 PM', text: 'Check your savings. Still ahead, even after rent and bills.' },
];

export default function DayInLife() {
  return (
    <section className="section day-in-life">
      <div className="container">
        <Reveal><span className="eyebrow">A day in the life</span></Reveal>
        <Reveal delay={0.06}>
          <h2 className="section-title">This could be your Tuesday in Germany</h2>
        </Reveal>

        <div className="dil-grid">
          {hours.map((h, i) => (
            <Reveal delay={0.08 * i} key={h.time} className="dil-card">
              <span className="dil-time mono">{h.time}</span>
              <p>{h.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
