import Hero from '../components/Hero';
import TestbookIntro from '../components/TestbookIntro';
import ValueProp360 from '../components/ValueProp360';
import OneStopApproach from '../components/OneStopApproach';
import SuccessTimeline from '../components/SuccessTimeline';
import SuccessStories from '../components/SuccessStories';
import LifeInGermanyShowcase from '../components/LifeInGermanyShowcase';
import CompetitiveAdvantage from '../components/CompetitiveAdvantage';
import SalaryCalculator from '../components/SalaryCalculator';
import Stats from '../components/Stats';
import GermanyMap from '../components/GermanyMap';
import Reveal from '../components/Reveal';
import CTABanner from '../components/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <TestbookIntro />
      <ValueProp360 />
      <OneStopApproach />
      <SuccessTimeline />

      <section id="success-stories">
        <SuccessStories />
      </section>

      <LifeInGermanyShowcase />
      <CompetitiveAdvantage />

      <section className="section salary-calc-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">See your Germany salary in 10 seconds</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <SalaryCalculator />
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Where you could be placed</span></Reveal>
          <Reveal delay={0.06}><h2 className="section-title">Hospitals across Germany, hiring now</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="map-intro-text">A few of the cities where our partner hospitals are actively hiring (illustrative — your exact placement depends on your profile and the hospitals recruiting at the time).</p>
          </Reveal>
          <Reveal delay={0.16}>
            <GermanyMap />
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
