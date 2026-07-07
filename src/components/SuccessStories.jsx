import Reveal from './Reveal';
import { images } from '../assets/images';

const stories = [
  { name: 'Priya S.', route: 'Delhi → Berlin', before: '₹26,000/mo', after: '₹2.3L/mo', quote: 'I went from double shifts in Delhi to a 38-hour week in Berlin — and I still send more home than before.', photo: images.story1 },
  { name: 'Ankit R.', route: 'Jaipur → Hamburg', before: '₹24,000/mo', after: '₹2.8L/mo', quote: 'The German classes felt impossible at first. Six months later I was interviewing with a hospital in Hamburg.', photo: images.story2 },
  { name: 'Meera K.', route: 'Hyderabad → Munich', before: '₹30,000/mo', after: '₹3.1L/mo', quote: 'Visa, flights, accommodation — every step was handled. I just had to show up and learn.', photo: images.story3 },
];

export default function SuccessStories() {
  return (
    <section className="section stories">
      <div className="container">
        <Reveal><h2 className="section-title">From ₹30K to ₹2.5L+ a month</h2></Reveal>

        <div className="story-grid">
          {stories.map((s, i) => (
            <Reveal delay={0.1 * i} key={s.name} className="story-card">
              <div className="story-top">
                <img src={s.photo} alt={`${s.name}, nurse now working in Germany`} className="story-avatar-img" />
                <div>
                  <strong className="story-name">{s.name}</strong>
                  <p className="story-route mono">{s.route}</p>
                </div>
              </div>
              <p className="story-quote">{s.quote}</p>
              <div className="story-shift">
                <span className="story-before">{s.before}</span>
                <span className="story-arrow">→</span>
                <span className="story-after">{s.after}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
