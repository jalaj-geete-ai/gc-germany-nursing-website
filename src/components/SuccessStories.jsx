import Reveal from './Reveal';
import { images } from '../assets/images';
import nurseMale from '../assets/brand/nurse-male.png';
import nurseFemale from '../assets/brand/nurse-female.png';

const stories = [
  {
    name: 'Priya S.',
    route: 'Delhi → Berlin',
    before: '₹26,000/mo',
    after: '₹2.3L/mo',
    quote: 'I went from double shifts in Delhi to a 38-hour week in Berlin — and I still send more home than before.',
    photo: images.story1,
  },
  {
    name: 'Ankit R.',
    route: 'Jaipur → Hamburg',
    before: '₹24,000/mo',
    after: '₹2.8L/mo',
    quote: 'The German classes felt impossible at first. Six months later I was interviewing with a hospital in Hamburg.',
    photo: nurseMale,
  },
  {
    name: 'Meera K.',
    route: 'Hyderabad → Munich',
    before: '₹30,000/mo',
    after: '₹3.1L/mo',
    quote: 'Visa, flights, accommodation — every step was handled. I just had to show up and learn.',
    photo: nurseFemale,
  },
  {
    name: 'Rohit M.',
    route: 'Pune → Frankfurt',
    before: '₹22,000/mo',
    after: '₹2.6L/mo',
    quote: 'I had zero German when I started. The structured training gave me confidence I never thought I\'d have in a foreign language.',
    photo: images.story4,
  },
  {
    name: 'Sunita P.',
    route: 'Chennai → Cologne',
    before: '₹28,000/mo',
    after: '₹2.9L/mo',
    quote: 'My family was skeptical, but when I called home after my first German paycheck, that conversation changed everything.',
    photo: images.story5,
  },
  {
    name: 'Deepak T.',
    route: 'Lucknow → Stuttgart',
    before: '₹20,000/mo',
    after: '₹2.4L/mo',
    quote: 'The team handled my visa paperwork so thoroughly that my application was approved on the first attempt.',
    photo: images.story6,
  },
];

export default function SuccessStories() {
  return (
    <section className="section stories">
      <div className="container">
        <Reveal><h2 className="section-title">From ₹30K to ₹2.5L+ a month</h2></Reveal>
        <div className="story-grid">
          {stories.map((s, i) => (
            <Reveal delay={0.08 * i} key={s.name} className="story-card">
              <div className="story-top">
                <img src={s.photo} alt={s.name} className="story-avatar-img" />
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
