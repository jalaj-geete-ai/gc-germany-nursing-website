import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import testbookLogo from '../assets/brand/testbook-logo-official.png';
import { images } from '../assets/images';

const points = [
  { value: '2014', label: 'Founded by IIT Bombay & IIT Delhi alumni' },
  { value: '1.8Cr+', label: 'Students trust the Testbook platform' },
  { value: '900+', label: 'Government & competitive exams covered' },
];

// All 8 toppers from both screenshots
const hallOfFame = [
  { name: 'Samridhi Talwar', rank: 'AIR 1 | Delhi Judicial 2024', photo: images.hof1 },
  { name: 'Ashish Tiwari',   rank: 'AIR 2 | SSC CGL 2024',       photo: images.hof2 },
  { name: 'Debesh Bairagi',  rank: 'AIR 4 | SSC CGL 2024',       photo: images.hof3 },
  { name: 'Ishant Shukla',   rank: 'AIR 8 | SSC CGL 2024',       photo: images.hof4 },
  { name: 'Rohit Chadhar',   rank: 'AIR 1 | SSC CHSL 2024',      photo: images.hof5 },
  { name: 'Sagardip Ghosh',  rank: 'AIR 3 | SSC CHSL 2024',      photo: images.hof6 },
  { name: 'Mohan Kumar',     rank: 'AIR 1 | SSC JE (ME) 2023',   photo: images.hof7 },
  { name: 'Sanket Paul',     rank: 'AIR 1 | SSC JE (CE) 2023',   photo: images.hof8 },
];

// Duplicate for seamless infinite scroll
const scrollList = [...hallOfFame, ...hallOfFame];

export default function TestbookIntro() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf;
    let paused = false;

    const step = () => {
      if (!paused) {
        pos += 0.5;
        // Reset when first half scrolled — seamless loop
        const half = track.scrollWidth / 2;
        if (pos >= half) pos = 0;
        track.style.transform = `translateX(-${pos}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="section testbook-intro-v2">
      <div className="container">

        {/* Top: Testbook logo + headline + stats */}
        <div className="tbi-header">
          <Reveal className="tbi-logo-wrap">
            <img src={testbookLogo} alt="Testbook" className="tbi-logo-official" />
          </Reveal>
          <div className="tbi-copy">
            <Reveal><span className="eyebrow">A new vertical from Testbook</span></Reveal>
            <Reveal delay={0.06}>
              <h2 className="section-title tbi-title">Backed by India's most trusted exam-prep platform</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="tbi-stats">
                {points.map((p) => (
                  <div className="tbi-stat" key={p.label}>
                    <strong className="mono">{p.value}</strong>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Auto-scrolling Hall of Fame — no label, hover to pause */}
        <Reveal delay={0.14}>
          <div className="tbi-hof">
            <div className="tbi-hof-scroll-wrap">
              <div className="tbi-hof-track" ref={trackRef}>
                {scrollList.map((s, i) => (
                  <div className="tbi-hof-card" key={`${s.name}-${i}`}>
                    <div className="tbi-hof-avatar-ring">
                      <img src={s.photo} alt={s.name} className="tbi-hof-avatar" />
                      <span className="tbi-hof-star">⭐</span>
                    </div>
                    <strong className="tbi-hof-name">{s.name}</strong>
                    <span className="tbi-hof-rank">{s.rank}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
