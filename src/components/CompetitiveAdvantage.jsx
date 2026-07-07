import Reveal from './Reveal';

const columns = [
  {
    name: 'Job boards',
    type: 'against',
    points: [
      'No German language training provided',
      'No support adjusting to the German healthcare system',
      'No financial support during the transition',
      'No visa or immigration assistance',
    ],
  },
  {
    name: 'Global Careers',
    type: 'us',
    points: [
      'Structured German language training, zero to B2',
      'Finishing-school program tailored for nurses',
      'Visa & immigration assistance, including document translation',
      'Support continues after you land in Germany',
    ],
  },
  {
    name: 'Recruitment agencies',
    type: 'against',
    points: [
      'Language training at your own cost, externally',
      'Limited mentorship for life in Germany',
      'No guaranteed financial support during transition',
      'No guarantee of post-landing support',
    ],
  },
];

export default function CompetitiveAdvantage() {
  return (
    <section className="section advantage">
      <div className="container">
        <Reveal>
          <h2 className="section-title">An integrated approach, not a transaction</h2>
        </Reveal>

        <div className="advantage-grid">
          {columns.map((col, i) => (
            <Reveal delay={0.08 * i} key={col.name} className={`advantage-col ${col.type === 'us' ? 'advantage-col-us' : ''}`}>
              <h3>{col.name}</h3>
              <ul>
                {col.points.map((p) => (
                  <li key={p}>
                    <span className={`advantage-mark ${col.type === 'us' ? 'advantage-mark-yes' : 'advantage-mark-no'}`}>
                      {col.type === 'us' ? '✓' : '✕'}
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
